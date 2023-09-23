import express from "express";
import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const server_port = 5174;

const host_name = process.env.HOST_NAME;
const user = process.env.USER;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;
const database_port = process.env.PORT;

const db = mysql.createPool({
  host: host_name,
  user: user,
  password: password,
  database: database,
  port: database_port,
});

app.get("/", (req, res) => {
  const sqlInsert = `INSERT INTO set1 (question, answer) VALUES ('Yes or no?', 'Maybe');`;
  db.query(sqlInsert, (err, result) => {
    res.send("Hello worldd");
  });
});

app.listen(server_port, () => {
  console.log(`Running on port ${server_port}.`);
});
