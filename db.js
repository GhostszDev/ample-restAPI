const Pool = require('pg').Pool;
var validator = require('validator');
const store = require("store2");

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    ssl: false
})

const returnJSON = (data = []) =>{
    var arrayToString = JSON.stringify(Object.assign({}, data));  // convert array to string
    var stringToJsonObject = JSON.parse(arrayToString);  // convert string to json object

    // console.log(stringToJsonObject);
    return stringToJsonObject
}

const login = (request, response) => {
    let username = request.body.username;
    let password = request.body.password;
    // Ensure the input fields exists and are not empty
    if (username && password) {
        // Execute SQL query that'll select the account from the database based on the specified username and password
        pool.query('SELECT * FROM public.login WHERE user_name = $1 AND password = $2',
            [username, password],
            function(error, results, fields) {

            if (error) console.log(error);

            if (results.rows.length > 0) {
                response.send(results.rows[0].user_name + ' has logged In')
                store('User', results.rows[0].id)
            } else {
                response.send('Incorrect Username and/or Password!');
            }
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
}

const stockList = (request, response) => {
    const data = {
        table_data: []
    };
    let key = 0;
    pool.query('SELECT * FROM public.ample_data',
        function(error, results, fields) {

            if (error) console.log(error);

            if (results.rows.length > 0) {

                for(i=0;i<results.rows.length;i++){
                    data.table_data.push(results.rows[i])
                }

                console.log(data)
                response.send(data)

            } else {
                response.send('No jobs on this list.');
            }
            response.end();
        });
}

const addToStockList = (request, response) => {
    let addData = {
        job: request.body.job,
        width: request.body.width,
        description: request.body.description,
        footage: request.body.footage,
        press: request.body.press
    }

    pool.query("INSERT INTO public.ample_data(job,width,description,footage,press)VALUES($1,$2,$3,$4,$5)",
        [addData.job, addData.width, addData.description, addData.footage, addData.press],
        function(error, results, fields) {

        if (error){
            console.log(error)
        }else{
            response.send("Success");
        }

        response.end();
    });
}

module.exports = {
    pool,
    login,
    stockList,
    addToStockList
};
