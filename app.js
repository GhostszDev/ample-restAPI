require('dotenv-flow').config();
const express = require('express');
const app = express();
const path = require('path');
const host = process.env.HOST;
const port = process.env.PORT;
const db = require("./db");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/'+process.env.API_PRE+'/login', db.login)
app.post('/'+process.env.API_PRE+'/add-to-list', db.addToStockList)

app.get('/'+process.env.API_PRE+'/stock-list', db.stockList)

app.listen(port, () =>
    console.log(`Server is listening on port ${host}:${port}!`)
)
