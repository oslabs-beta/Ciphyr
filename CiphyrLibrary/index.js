const jwt = require('jsonwebtoken');
const gql = require('graphql-tag');
const { GraphQLError } = require('graphql');
const dotenv = require('dotenv');
const pkg = require('pg');

dotenv.config();

const { Pool } = pkg;

const PG_URI = process.env.SQL_DB;

const pool = new Pool({
  connectionString: PG_URI,
});

const db = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};

const ciphyr = {};

// ciphyr.authError = new GraphQLError('You are not authorized.', {
//   extensions: {
//     code: 'Unauthorized',
//   },
// });

ciphyr.getStartTime = () => {
  ciphyr.startTime = Date.now();
};

// getAuthInfo need more test

// ciphyr.getAuthInfo = (obj) => {
//   const token = obj.contextValue.token
//   // case: no Auth
//   if (token === '') {
//     return '';
//   }

//   // case: JWT
//   if (true) {
//     return jwt.verify(token, process.env.JWT_SECRET)
//   }
// }

ciphyr.convertStr = async (query) => {
  const getDepth = (str) => {
    let max = 0;
    let count = 0;

    for (let i = 0; i < str.length; i++) {
      if (str[i] === '{') {
        count++;
        if (count > max) {
          max = count;
        }
      } else if (str[i] === '}') {
        count--;
      }
    }

    return max - 1; // Subtract 1 because the outermost brackets should not be considered in the count
  };

  const queryString = query.request.query;
  // Parse the GraphQL query string into an AST
  const queryAST = gql(queryString);
  // Convert the AST to a JavaScript object
  const queryObject = JSON.parse(JSON.stringify(queryAST));
  const definitions = queryObject.definitions;

  const result = {};
  //type of query
  result.operation = definitions[0].operation;
  //name of query (check if name is provided)
  result.queryName =
    definitions[0].name === undefined ? '' : definitions[0].name.value;
  //query string
  result.queryString = queryString
    .replace(/ /g, '')
    .replace(/\s+/g, '')
    .replace(`${result.operation}`, '')
    .replace(`${result.queryName}`, '');
  //query raw string
  result.raw = queryString;
  //depth of query
  result.depth = getDepth(queryString);
  // if error occured
  if (query.response.body.singleResult.errors === undefined) {
    result.error_occured = false;
    result.error_code = '';
  } else {
    result.error_occured = true;
    result.error_code =
      query.response.body.singleResult.errors[0].extensions.code;
  }
  //latency of query
  result.latency = Date.now() - ciphyr.startTime;

  console.log('result', result);

  //ciphyr.savingQuery(result);
};

//save incoming query into PostgresQL
ciphyr.savingQuery = async (result) => {
   const queryObj = {
    operation: result.operation,
    query_name: result.queryName,
    log: result.queryString,
    raw: result.raw
    depth: result.depth,
    latency: result.latency,
    api_key: process.env.API_KEY
  };
  const sqlQuery = `INSERT INTO log (operation, query_name, log, raw, depth,
    latency, api_key, error_occured, error_code)
    VALUES ('${result.operation}', '${result.queryName}',
      '${result.queryString}', '${result.raw}', '${result.depth}', '${result.latency}',
      '${process.env.API_KEY}', '${result.error_occured}', '${result.error_code}');`
  try {
    const output = await db.query(sqlQuery);
    console.log(output);

        //send query to server
        const result = fetch('/api/alert', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(queryObj);
        }).then((res) => console.log(res));
        
  } catch(err) {
    console.log(err);
  }
};

ciphyr.myPlugin = {
  async serverWillStart() {
    console.log('Server starting up!');
  },
  // ciphyr.convertStr is used in this event to sanitize query logs and send them to DB
  async requestDidStart(context) {
    console.log('In requestDidStart');
    ciphyr.getStartTime();
    return {
      async willSendResponse(requestContext) {
        console.log('In willSendResponse');
        ciphyr.convertStr(requestContext);
      },
    };
  },
};

module.exports = ciphyr;
