import gql from "graphql-tag";
import db from "./PSQL.js";
import dotenv from "dotenv";
dotenv.config();

const ciphyr = {};

// Plugin methods
ciphyr.myPlugin = {
  async serverWillStart() {
    try {
      console.log("Ciphyr starting up!");
      // Additional logic related to server startup can go here
    } catch (error) {
      throw new Error("Error during server startup: " + error.message);
    }
  },

  async requestDidStart(context) {
    try {
      // Call the function to set start time
      ciphyr.getStartTime();
      // Return an object containing the willSendResponse function
      return {
        async willSendResponse(requestContext) {
          try {
            // Call the function to convert the response
            ciphyr.convertStr(requestContext);
          } catch (err) {
            throw new Error("Conversion failed: " + err.message);
          }
        },
      };
    } catch (err) {
      throw new Error("Request did not start: " + err.message);
    }
  },
};

ciphyr.getStartTime = () => {
  ciphyr.startTime = Date.now();
};

ciphyr.convertStr = async (query) => {
  const nested = (str) => {
    let max = 0;
    let count = 0;

    for (let i = 0; i < str.length; i++) {
      if (str[i] === "{") {
        count++;
        if (count > max) {
          max = count;
        }
      } else if (str[i] === "}") {
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
    .replace(/ /g, "")
    .replace(/\s+/g, "")
    .replace(`${result.operation}`, "")
    .replace(`${result.queryName}`, "");
  //query string structure
  result.raw = queryString;
  //depth of query
  result.depth = nested(queryString);
  //latency of query
  result.latency = Date.now() - ciphyr.startTime;

  console.log("result", result);

  ciphyr.savingQuery(result);
};

ciphyr.savingQuery = async (result) => {
  const queryObj = {
    operation: result.operation,
    query_name: result.queryName,
    log: result.queryString,
    raw: result.raw
    depth: result.depth,
    latency: result.latency,
    api_key: process.env.API_KEY
  }
  // will the user be willing to send query log to Ciphyr's database?
  // how to connect to user's own database instead
  const sqlQuery = `INSERT INTO log (operation, query_name, log, raw, depth, latency, api_key)
    VALUES ('${result.operation}', '${result.queryName}',
      '${result.queryString}', '${result.raw}', '${result.depth}', '${result.latency}', '${process.env.API_KEY}');`;
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
    })
  } catch (err) {
    console.log(err);
  }
  //add a post to server

};

module.exports = ciphyr;
