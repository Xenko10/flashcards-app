import express from "express";
import mysql from "mysql";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const server_port = 5174;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const host_name = process.env.HOST_NAME;
const user = process.env.USER;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;
const database_port = process.env.PORT;

const connection = mysql.createConnection({
  host: host_name,
  user: user,
  password: password,
  database: database,
  port: database_port,
});

app.post("/insert", (req, res) => {
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
      if (err) throw new Error(err);
      console.log("Table created/exists");
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

app.delete("/delete/:tableName", (req, res) => {
  const tableName = req.params.tableName;
  connection.query("DROP TABLE ??", [tableName], (err) => {
    if (err) throw new Error(err);
    console.log("Table deleted");
  });
});

app.get("/getsets", (req, res) => {
  connection.query("show tables in ??", [database], (err, result) => {
    if (err) throw new Error(err);
    const data = JSON.parse(JSON.stringify(result));
    res.send(data);
  });
});

app.get("/getquestions/:flashcardId", (req, res) => {
  const flashcardId = req.params.flashcardId;
  connection.query(
    "SELECT question, answer FROM ??",
    [flashcardId],
    (err, result) => {
      if (err) throw new Error(err);
      const data = JSON.parse(JSON.stringify(result));
      res.send(data);
    }
  );
});

app.listen(server_port, () => {
  console.log(`Running on port ${server_port}.`);
});
