/* eslint-disable */
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const syncConn = require("./db");
const router = require("./routes/index");

const PORT = process.env.PORT || 3002;

const app = express();
app.use(cors());
app.use(express.json());


// console.log(router)
app.use("/api", router);



// console.log(syncConn)


// app.get("/", (req, res)=>{
//     const basketM = syncConn.query(`SELECT * FROM user`);
//     res.status(200).json(basketM);
// })


app.listen(PORT, () => console.log("Server started on port: " + PORT))

