const e = require('express');
const express = require('express');
const PORT = process.env.PORT || 3001 || 3000;
const app = express();
const db = require('./db/connection');
const inputCheck = require('./utils/inputCheck');
const apiRoutes = require('./routes/apiRoutes');



// middleware 
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/api', apiRoutes);


//  for any other endpoint
app.use((req,res) => {
    res.status(404).end();
}) 


app.listen(PORT, () => {
    console.log(`now listening on ${PORT}`);
})