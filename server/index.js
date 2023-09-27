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
  console.log(req.body);
  connection.query(
    `CREATE TABLE IF NOT EXISTS ?? (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    question VARCHAR(255) NOT NULL,
    answer VARCHAR(255) NOT NULL
  )`,
    [req.body.setTableName],
    (err) => {
      if (err) throw new Error(err);
      console.log("Table created/exists");
    }
  );
  connection.query(
    "INSERT INTO ?? (question, answer) VALUES ?",
    [req.body.setTableName, req.body.dataArray],
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Values Inserted");
      }
    }
  );
});

app.get("/getsets", (req, res) => {
  connection.query("show tables in ??", [database], (err, result) => {
    if (err) throw new Error(err);
    const data = JSON.parse(JSON.stringify(result));
    res.send(data);
  });
});

app.listen(server_port, () => {
  console.log(`Running on port ${server_port}.`);
});
