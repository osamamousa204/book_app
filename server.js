'use strict';


//************(reqier dotenv)*************\\
require('dotenv').config();

//********(reqier express function)********\\
const express = require('express')

//******(reqier superagent function)*******\\
const superagent = require('superagent')

//****************(Port)*******************\\
const PORT = process.env.PORT || 3030

//************(app variable)***************\\
const  app = express();
app.use(express.static('./public/styles/'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');



//*****************(test)*******************\\


app.get('/hello',(req,res)=>{
  res.render('./pages/index');
  // res.status(200).send('okkkkkkkkk');
})


//******(reqier superagent function)********\\


//************(listening to port)***********\\

app.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`)
})


app.get('*',(req,res)=>{
    res.status(404).send('This route does not exist!!');
  })






