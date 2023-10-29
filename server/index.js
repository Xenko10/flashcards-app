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

connection.query(
  `CREATE TABLE IF NOT EXISTS sets_names (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL
);`,
  (err) => {
    if (err) {
      console.error(err);
    }
  }
);

connection.query(
  `CREATE TABLE IF NOT EXISTS questions_and_answers (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    names_id INT NOT NULL,
    question VARCHAR(1000) NOT NULL,
    answer VARCHAR(1000) NOT NULL,
    CONSTRAINT qa_names_fk FOREIGN KEY (names_id) REFERENCES sets_names(id)
)`,
  (err) => {
    if (err) {
      console.error(err);
    }
  }
);

function getNamesId(setName) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT id FROM sets_names WHERE name = ?",
      [setName],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          const namesId = JSON.parse(JSON.stringify(result))[0].id;
          resolve(namesId);
        }
      }
    );
  });
}

app.post("/set", async (req, res) => {
  const setName = req.body.setName;
  const dataArray = req.body.qnaArray;

  await connection.query(
    "INSERT INTO sets_names (name) VALUES (?)",
    [setName],
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );

  const namesId = await getNamesId(setName);
  const values = dataArray.map((item) => [namesId, item.question, item.answer]);

  await connection.query(
    "INSERT INTO questions_and_answers (names_id, question, answer) VALUES ?",
    [values],
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );
});

app.delete("/set/:setName", async (req, res) => {
  const setName = req.params.setName;
  const namesId = await getNamesId(setName);
  connection.query(
    "DELETE FROM questions_and_answers WHERE names_id = ?",
    [namesId],
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );
  connection.query(
    "DELETE FROM sets_names WHERE name = ?",
    [setName],
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );
});

app.get("/sets", (req, res) => {
  connection.query("SELECT name FROM sets_names", (err, result) => {
    if (err) {
      console.error(err);
    } else {
      const data = JSON.parse(JSON.stringify(result));
      res.send(data);
    }
  });
});

app.get("/set/:setName", async (req, res) => {
  const setName = req.params.setName;
  const namesId = await getNamesId(setName);
  connection.query(
    "SELECT question, answer FROM questions_and_answers WHERE names_id = ?",
    [namesId],
    (err, result) => {
      if (err) {
        console.error(err);
      } else {
        const data = JSON.parse(JSON.stringify(result));
        res.send(data);
      }
    }
  );
});

app.patch("/set/:setName", async (req, res) => {
  const setName = req.params.setName;
  const dataArray = req.body.qnaArray;

  const namesId = await getNamesId(setName);
  connection.query(
    "DELETE FROM questions_and_answers WHERE names_id = ? ",
    [namesId],
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );

  const values = dataArray.map((item) => [namesId, item.question, item.answer]);

  await connection.query(
    "INSERT INTO questions_and_answers (names_id, question, answer) VALUES ?",
    [values],
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );
});

app.listen(server_port, () => {
  console.log(`Running on port ${server_port}.`);
});
