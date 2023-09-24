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
  const question = req.body.data.question;
  const answer = req.body.data.answer;

  connection.query(
    "INSERT INTO set1 (question, answer) VALUES (?,?)",
    [question, answer],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.listen(server_port, () => {
  console.log(`Running on port ${server_port}.`);
});
