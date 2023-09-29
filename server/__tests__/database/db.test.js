const { Pool } = require("pg");
const db = require("../../db");

const createClientsTable = `
CREATE TABLE test_clients (
  client_id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  auth_token INT
);`;

const createInstancesTable = `
CREATE TABLE test_instances (
  id SERIAL PRIMARY KEY,
  label VARCHAR(255),
  api_key VARCHAR(255) NOT NULL,
  created_on date DEFAULT (CURRENT_DATE),
  client_id INT NOT NULL,
  FOREIGN KEY (client_id) REFERENCES clients (client_id),
  CONSTRAINT unique_key_api_key UNIQUE (api_key)
);`;

const createLogsTable = `
CREATE TABLE test_logs (
  id SERIAL PRIMARY KEY,
  operation VARCHAR(255),
  query_name VARCHAR(255),
  log TEXT,
  raw TEXT,
  depth INT,
  latency INT,
  api_key VARCHAR(255) NOT NULL,
  FOREIGN KEY (api_key) REFERENCES instance (api_key),
  timestamp TIMESTAMP default NOW()
);`;

// DESCRIPTION
/**
 * The following queries check for existence of client, instance, and log test tables
 * Before every test, these 3 tables need to be clear and falsy
 */
const checkClientsTable = `
  SELECT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_name = 'test_clients'
  ) AS table_exists;
`;
const checkInstanceTable = `
  SELECT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_name = 'test_instances'
  ) AS table_exists;
`;
const checkLogTable = `
  SELECT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_name = 'test_logs'
  ) AS table_exists;
`;

const dropClientsTable = `DROP TABLE IF EXISTS test_clients;`;
const dropInstancesTable = `DROP TABLE IF EXISTS test_instances;`;
const dropLogsTable = `DROP TABLE IF EXISTS test_logs;`;

describe("SQL Database connection and ability to create main tables", () => {
  beforeEach(async () => {
    const mockQuery = vi.spyOn(db, "query");
  });
  test("mock tables should be empty", async () => {
    await db.query(dropClientsTable);
    const clientTableExists = await db.query(checkClientsTable);
    expect(clientTableExists).toBeFalsy;
    await db.query(dropInstancesTable);
    const instancesTableExists = await db.query(checkInstanceTable);
    expect(instancesTableExists).toBeFalsy;
    await db.query(dropLogsTable);
    const logsTableExists = await db.query(checkLogTable);
    expect(logsTableExists).toBeFalsy;
  });

  test("should create a clients table", async () => {
    try {
      await db.query(createClientsTable);
      expect(db.query).toHaveBeenCalledWith(createClientsTable);
    } catch (e) {
      console.error("An error occurred:", e);
      throw e;
    }
  });
  test("should create an instances table", async () => {
    try {
      await db.query(createInstancesTable);
      expect(db.query).toHaveBeenCalledWith(createInstancesTable);
    } catch (e) {
      console.error("An error occurred:", e);
      throw e;
    }
  });
  test("should create a logs table", async () => {
    try {
      await db.query(createLogsTable);
      expect(db.query).toHaveBeenCalledWith(createLogsTable);
    } catch (e) {
      console.error("An error occurred:", e);
      throw e;
    }
  });
});
