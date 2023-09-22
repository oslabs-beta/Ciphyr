import gql from 'graphql-tag';
import db from './PSQL.js';
import dotenv from 'dotenv';
dotenv.config();

const ciphyrPlugin = {
  async serverWillStart() {
    const ciphyr = require('./ciphyr');
    console.log('Ciphyr starting up!');
  },
  async requestDidStart() {
    ciphyr.getStartTime();
    return {
      async willSendResponse(requestContext) {
        ciphyr.convertStr(requestContext);
      },
    };
  },
};

const ciphyr = {};

// class ciphyr {
//   constructor(query)
// };

ciphyr.getStartTime = () => {
  ciphyr.startTime = Date.now();
};

ciphyr.convertStr = async (query) => {
  const nested = (str) => {
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
  //name of query
  result.queryName = definitions[0].name.value;
  //query string
  result.queryString = queryString
    .replace(/ /g, '')
    .replace(/\s+/g, '')
    .replace(`${result.operation}`, '')
    .replace(`${result.queryName}`, '');
  //query string structure
  result.raw = queryString;
  //depth of query
  result.depth = nested(queryString);
  //latency of query
  result.latency = Date.now() - ciphyr.startTime;

  console.log('result', result);

  ciphyr.savingQuery(result);
};

ciphyr.savingQuery = async (result) => {
  // will the user be willing to send query log to Ciphyr's database?
  // how to connect to user's own database instead
  const sqlQuery = `INSERT INTO log (operation, query_name, log, raw, depth, latency, api_key) 
    VALUES ('${result.operation}', '${result.queryName}', 
      '${result.queryString}', '${result.raw}', '${result.depth}', '${result.latency}', '${process.env.API_KEY}');`;
  try {
    const output = await db.query(sqlQuery);
    console.log(output);
  } catch (err) {
    console.log(err);
  }
};
