const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// 連接到 MongoDB，請將 CONNECTION_STRING 替換為您的 MongoDB 連接字串
mongoose.connect("mongodb+srv://weiwei:123@cluster0.3m8hihc.mongodb.net/portfolioDB?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

// 監聽 MongoDB 連接事件
db.on("error", console.error.bind(console, "MongoDB 連接錯誤："));
db.once("open", () => {
  console.log("成功連接到 MongoDB！");
});

// 定義 MongoDB 模型
const Work = mongoose.model("Work", {
  workID: Number,
  workNAME: String,
  workINTRO: String,
  workPATH: String,
});

app.post("/create", (req, res) => {
  const { workID, workNAME, workINTRO, workPATH } = req.body;

  // 創建一個新的 Work 文檔
  const newWork = new Work({
    workID,
    workNAME,
    workINTRO,
    workPATH,
  });

  // 儲存到 MongoDB
  newWork.save()
    .then(result => {
      res.send("Values Inserted");
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("Error inserting data.");
    });
});

app.get("/works", (req, res) => {
  // 查詢所有的 Work 文檔
  Work.find()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("Error fetching data.");
    });
});

app.put("/update/:id", (req, res) => {
  const workID = req.params.id;
  const { workINTRO } = req.body;
  console.log(workINTRO);
  // 根據 workID 更新 Work 文檔的 workINTRO
  Work.findOneAndUpdate({ workID }, { workINTRO })
    .then(result => {
      res.send(result);
      console.log(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("Error updating data.");
    });
});

app.delete("/delete/:id", (req, res) => {
  const workID = req.params.id;

  // 根據 workID 刪除相應的 Work 文檔
  Work.deleteOne({ workID })
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("Error deleting data.");
    });
});

app.listen(3001, () => {
  console.log("Your server is running on port 3001");
});