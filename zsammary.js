'use strict';

//package.json
npm init -y

//install 
npm i express pg superagent dotenv method-override 

//database
pgstart or sudo service postgers start  (start the database)

CREATE DATABASE database_name; (create a New database)

psql -f scema_file_path -d database_name (connect your sql file with the database)

DATABASE_URL=postgres://user_name:password@localhost:5432/database_name (connect the server file with the DATABASE)

//==========(require)===========\\
require('dotenv').config();
const express = require('express');
const pg = require('pg');
const superagent = require('superagent');
const methodOverRide = require('method-override') 

//==========(main variebles)===========\\
const app = express();
const PORT = process.env.PORT || 3030;
const client = new pg.Client(process.env.DATABASE_URL);


//==========(express server uses)===========\\
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(methodOverRide('_method'))

//==========(ex: using the get method)===========\\

//*****(in your form in ejs file)*****\\

<form action="./searches" methode ="get">
<input type ="text" name="username" placeholder="username">
</form>

//*******(in your server)*******\\
app.get('/searches', (request, response) => {
    //collect the data from (req.bode)
    //pass it to the url 
    //with the superagent variable create an objects using a constructer with spacific properties
    //render them in a ejs file and send your data with the render method 
  })

//==========(ex: using the post method)===========\\

//*****(in your form in ejs file)*****\\

<form action="./add" methode ="post">
<input type ="text" name="username" placeholder="username">
</form>

//*******(in your server)*******\\
app.post('/add', (request, response) => {
    //collect the data from (req.bode)
    //insert into the database
    //redirect to an other page or you can use the render method and send the data with the render method as an object 
    
  })

//==========(ex: using the update  method)===========\\

//*****(in your form in ejs file)*****\\

<form action="./update/<%=val.id%>?_method=put" methode ="post">
<input type ="text" name="username" placeholder="username">
</form>

//*******(in your server)*******\\
app.put('/update/:book_id', (request, response) => {
    //collect the data from (req.bode)
    //update your database 
    //redirect to a page with route comtains a parameter
  })

//==========(ex: using the delete  method)===========\\

//*****(in your form in ejs file)*****\\

<form action="./delete/<%=val.id%>?_method=delete" methode ="post">
<button type="submit">delete</button>
</form>

//*******(in your server)*******\\
app.delete('/delete/:book_id', (request, response) => {
    //collect the parameter value and store it as a safe value
    //delete from your database where id = param value 
    //redirect to the home page
  })

