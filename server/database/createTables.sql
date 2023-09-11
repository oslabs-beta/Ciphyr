CREATE TABLE instance (
id SERIAL PRIMARY KEY,
label VARCHAR(255),
access_token VARCHAR(255),
created_on date DEFAULT (CURRENT_DATE),
client_id INT,
FOREIGN KEY (client_id) REFERENCES clients (client_id)
)

CREATE TABLE clients (
client_id SERIAL PRIMARY KEY,
username VARCHAR(255),
password VARCHAR(255),
email VARCHAR(255),
auth_token INT
)

CREATE TABLE Log (
id SERIAL PRIMARY KEY,
operation VARCHAR(255),
query_name VARCHAR(255),
log TEXT,
raw TEXT,
depth INT,
timestamp TIMESTAMP default NOW()
);
