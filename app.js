const express = require('express');
const app = express();
require("dotenv").config();
const host = process.env.HOST;
const port = process.env.PORT;
const pool = require("./db")

app.use(express.json());



app.listen(port, () =>
    console.log(`Server is listening on port ${host}:${port}!`)
)
