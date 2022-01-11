const express = require('express');
const PORT = process.env.PORT || 3001 || 3000;
const app = express();

// connect to mysql 

const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1290BecomeEZdeveloper123',
    database: 'election'
},
console.log('connecteed to the elction database'))

// middleware 
app.use(express.json());
app.use(express.urlencoded({extended: false}));



// test get


app.get('/', (req,res) => {
    res.json({
        message: 'helo world'
    })
})

db.query('SELECT * FROM candidates', (err,rows) => {
    console.log(rows)
})




//  for any other endpoint
app.use((req,res) => {
    res.status(404).end();
}) 


app.listen(PORT, () => {
    console.log(`now listening on ${PORT}`);
})