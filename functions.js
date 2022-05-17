const pool = require("./db");
const store = require("store2");
const express = require("express");

class functions {

    static getUser(){
        if(store('User')) {
            return store('User')
        }

        return 0
    }

    static actionReport(user_ = '', action_ = '') {
        pool.query(
            "INSERT INTO public.actions(user_name, action, date, show) VALUES ($1, $2, $3, $4) RETURNING *",
            [user_, action_, new Date(), 1],
            (err, res) =>{
                if(err){
                    console.error(err);
                }
            }
        )
    }

}

module.exports = functions;