require('dotenv').config();
const express= require('express');
const mysql = require('mysql');
const cors = require('cors');
const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;
const app = express();
app.use(cors());
//server listens to port 3001
app.listen(3001,()=>{
  console.log('dropdown-demo app listening on port 3001');
});
//so express server can route to the location of my static html, js, and css files
app.use(express.static('client'));
app.use('/selection', express.static('client/selection.html'));
//request the database for the data needed to populate select elements
app.get('/data', (req, res) => {
  //connect to mysql database
    let connection = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database
  });
  connection.connect();
  connection.query("SELECT * FROM dropdown", (err,results)=>{
    if(err) throw err;
    //convert the data from the database to a json string and send that back as the response to the get request
     res.json(JSON.stringify(results));
  });
    connection.end();
});