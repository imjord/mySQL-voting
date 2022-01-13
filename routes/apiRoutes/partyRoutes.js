const express = require('express');
const db = require('../../db/connection');
const router = express.Router();



// GET FOR PARTIES 


router.get('/api/parties', (req,res) => {
    const sql = `SELECT * FROM parties`;
    db.query(sql, (err, rows) => {
      if(err){
        res.status(500).json({ error: err.messaeg})
        return;
      } 
      res.json({
        message: 'Sucess',
        data: rows
      })
    })
  })
  
  
  
  
  
  
  router.get('/api/parties/:id', (req,res) => {
    const sql = `SELECT * FROM parties WHERE id = ?`;
    params = [req.params.id];
    db.query(sql, params, (err, rows) => {
      if(err){
        res.status(500).json({ error: err.messaeg})
        return;
      } 
      res.json({
        message: 'Sucess',
        data: rows
      })
    })
  })
  
  
  
  
  router.delete('/api/party/:id', (req, res) => {
    const sql = `DELETE FROM parties WHERE id = ?`;
    const params = [req.params.id];
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: res.message });
        // checks if anything was deleted
      } else if (!result.affectedRows) {
        res.json({
          message: 'Party not found'
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


  module.exports = router;