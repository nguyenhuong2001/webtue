const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
//create connect database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  //create database
  database: "shopdb",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected");
});

const app = express();
app.use(
  express.urlencoded({ limit: "50mb", extended: false, parameterLimit: 50000 })
);
app.use(express.json({ extended: false, limit: '50mb' }))
app.use(cors());

//create table
app.get("/createtable", (req, res) => {
  const sql =
    "CREATE TABLE users(id int AUTO_INCREMENT, email VARCHAR(255),password VARCHAR(30), PRIMARY KEY (id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).json("Create database sucess");
  });
});

//create database
app.get("/createDB", (req, res) => {
  const sql = "CREATE DATABASE shopDatabase";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).json("Create database sucess");
  });
});
//register user
app.post("/register", (req, res) => {
  const userRegister = {
    Username: '',
    HoTen: '',
    SDT:'',
    DiaChi: '',
    Role:'0',
    Email: req.body.email,
    Pass: req.body.password,
  };
  const sqlUsers = "SELECT * FROM dangnhap";
  db.query(sqlUsers, (err, result) => {
    if (err)
      return res.status(400).json({ messgae: "Can not connect databse" });
    const newRess = result.map((item) => {
      return {
        email: item.Email,
        password: item.Pass,
      };
    });
    console.log("new",newRess);
    const user = newRess.findIndex((item) => {
      return item.email === userRegister.email;
    });
    if (user === -1) {
      const sql = "INSERT INTO dangnhap SET ?";
        return db.query(sql, userRegister, (err, result) => {
        if (err)
          return res
            .status(400)
            .json({ messgae: "Can not register this email" });
        return res.status(200).json(userRegister);
      });
    }
    return res.status(400).json({ messgae: "Email is invalid" });
  });
});
app.listen("3080", () => {
  console.log("Server is woking");
});
