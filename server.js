const e = require('express');
const express = require('express');
const PORT = process.env.PORT || 3001 || 3000;
const app = express();

const inputCheck = require('./utils/inputCheck');

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



app.get("/api/candidate", (req,res) => {
    const sql = `SELECT candidates.*, parties.name AS party_name FROM candidates LEFT JOIN parties ON candidates.party_id = parties.id`;

    db.query(sql, (err,rows) => {
        if(err){
            res.status(500).json({error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: rows
        })
    })
})



// get/query a single candidate

app.get('/api/candidate/:id', (req,res) =>{
  const sql = `SELECT candidates.*, parties.name 
  AS party_name 
  FROM candidates 
  LEFT JOIN parties 
  ON candidates.party_id = parties.id 
  WHERE candidates.id = ?`;    const params = [req.params.id];


    db.query(sql, params, (err,row) => {
        if(err){
            console.log(err)
        } else {
            res.json({
                message: "success",
                data: row
            })
        }
    })
})



// Delete a candidate
app.delete('/api/candidate/:id', (req, res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.statusMessage(400).json({ error: res.message });
      } else if (!result.affectedRows) {
        res.json({
          message: 'Candidate not found'
        });
      } else {
        res.json({
          message: 'deleted',
          changes: result.affectedRows,
          id: req.params.id
        });
      }
    });
  });




 // Create a candidate
app.post('/api/candidate', ({ body }, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
  VALUES (?,?,?)`;
const params = [body.first_name, body.last_name, body.industry_connected];

db.query(sql, params, (err, result) => {
  if (err) {
    res.status(400).json({ error: err.message });
    return;
  }
  res.json({
    message: 'success',
    data: body
  });
  });
})


//  for any other endpoint
app.use((req,res) => {
    res.status(404).end();
}) 


app.listen(PORT, () => {
    console.log(`now listening on ${PORT}`);
})