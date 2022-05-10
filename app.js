const express = require('express');
const app = express();
const path = require('path');
require('dotenv-flow').config({path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}`)} );
const host = process.env.HOST;
const port = process.env.PORT;
const pool = require("./db")

app.use(express.json());

app.post('/ample-api/login', (req, res) => {
    let data = [];
    let queryData = [];

    pool
        .query('SELECT $1::text as name FROM login', queryData)
        .then(res => console.log(res))
        .catch(err => console.error('Error executing query', err.stack))

    res.send(data);
})

app.post('/ample-api/stock-list', (req, res) => {
    let data = [];

    res.send(data);
})

app.listen(port, () =>
    console.log(`Server is listening on port ${host}:${port}!`)
)
