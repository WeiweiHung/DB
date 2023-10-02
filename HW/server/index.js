const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  user: "root",
  host: "localhost",
  password: "Wei1040145",
  database: "portfolio",
});

app.post("/create", (req, res) => {
  const workNAME = req.body.workNAME;
  const workID = req.body.workID;
  const workINTRO = req.body.workINTRO;
  const workPATH = req.body.workPATH;

  db.query(
    "INSERT INTO works(workID, workNAME, workINTRO, workPATH) VALUES (?,?,?,?)",
    [workID, workNAME, workINTRO, workPATH],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/works", (req, res) => {
  db.query("SELECT * FROM works", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const workID = req.params.id;
  const workINTRO = req.body.workINTRO;
  db.query(
    "UPDATE works SET workINTRO = ? WHERE workID = ?",
    [workINTRO, workID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
