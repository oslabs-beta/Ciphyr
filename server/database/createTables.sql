CREATE TABLE instance (
  id SERIAL PRIMARY KEY,
  label VARCHAR(255),
  api_key VARCHAR(255) NOT NULL,
  created_on date DEFAULT (CURRENT_DATE),
  client_id INT NOT NULL,
  FOREIGN KEY (client_id) REFERENCES clients (client_id),
  CONSTRAINT unique_key UNIQUE (api_key)
)

CREATE TABLE clients (
  client_id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  auth_token INT
)

CREATE TABLE log (
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
);
