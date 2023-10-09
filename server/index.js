import express from "express";
import mysql from "mysql";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const server_port = 5174;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const hostName = process.env.HOST_NAME || "localhost";
const user = process.env.USER || "root";
const password = process.env.PASSWORD || "";
const databaseName = process.env.DATABASE || "flashcards";
const databasePort = process.env.PORT || 4306;

const connection = mysql.createConnection({
  host: hostName,
  user: user,
  password: password,
  database: databaseName,
  port: databasePort,
});

app.post("/set", (req, res) => {
  const tableName = req.body.tableName;
  const dataArray = req.body.qnaArray;
  const values = dataArray.map((item) => [item.question, item.answer]);
  connection.query(
    `CREATE TABLE IF NOT EXISTS ?? (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    question VARCHAR(1000) NOT NULL,
    answer VARCHAR(1000) NOT NULL
  )`,
    [tableName],
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Table created/exists");
      }
    }
  );
  connection.query(
    "INSERT INTO ?? (question, answer) VALUES ?",
    [tableName, values],
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Values Inserted");
      }
    }
  );
});

app.delete("/set/:tableName", (req, res) => {
  const tableName = req.params.tableName;
  connection.query("DROP TABLE ??", [tableName], (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Table deleted");
    }
  });
});

app.get("/sets", (req, res) => {
  connection.query("show tables in ??", [databaseName], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const data = JSON.parse(JSON.stringify(result));
      res.send(data);
    }
  });
});

app.get("/set/:tableName", (req, res) => {
  const tableName = req.params.tableName;
  connection.query(
    "SELECT question, answer FROM ??",
    [tableName],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        const data = JSON.parse(JSON.stringify(result));
        res.send(data);
      }
    }
  );
});

app.listen(server_port, () => {
  console.log(`Running on port ${server_port}.`);
});
