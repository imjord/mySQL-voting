// connect to mysql 

const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1290BecomeEZdeveloper123',
    database: 'election'
},
console.log('connecteed to the elction database'))






module.exports = db;