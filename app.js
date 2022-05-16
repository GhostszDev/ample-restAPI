require('dotenv-flow').config();
const express = require('express');
const app = express();
const path = require('path');
const host = process.env.HOST;
const port = process.env.PORT;
const pool = require("./db");

app.use(express.json());

app.post('/'+process.env.API_PRE+'/login', (req, res) => {
    let data = [];
    let queryData = [];

    pool
        .query('SELECT * FROM public.ample_data')
        .then(res => console.log(res))
        .catch(err => console.error('Error executing query', err.stack))

    res.send(data);
})

app.post('/'+process.env.API_PRE+'/stock-list', (req, res) => {
    let data = [];

    data['Test'] = true;

    res.send(data);
})

app.listen(port, () =>
    console.log(`Server is listening on port ${host}:${port}!`)
)
