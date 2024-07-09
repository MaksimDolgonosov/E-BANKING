/* eslint-disable */
require("dotenv").config();
const express = require("express");

const app = express();

const PORT = process.env.PORT || 3002;


app.get("/", (req, res)=>{
    res.status(200).json("Working");
})


app.listen(PORT, () => console.log("Server started on port: " + PORT))

