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
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');



//*****************(test)*******************\\


// app.get('/hello',(req,res)=>{
//   res.render('./pages/index');
//   // res.status(200).send('okkkkkkkkk');
// })

//*****************(test)*******************\\

app.get('/index' , (req,res)=>{
  res.render('./pages/index');
})
app.get('/' , (req,res)=>{
  res.render('./pages/index');
})

app.get('/searches/new',(req,res)=>{
  res.render('./pages/searches/new');
})

//*****************(the main route)*******************\\




//********************(the search route)***********************\\

app.post('/searches',(request,response)=>{
  const inputt = request.body.search;
  const radio = request.body.radio;
  let url = `https://www.googleapis.com/books/v1/volumes?q=${inputt}+in${radio}:${inputt}`;
  superagent.get(url)
    .then(bookData =>{
      let dataArray = bookData.body.items.map(value =>{
        return new Book(value);
      })
      response.render('./pages/searches/show',{data:dataArray});
    }).catch((error) => {
      errorHandler(error, request, response);
    });

})

//********************(constructor)***********************\\

function Book (value){
  if(value.volumeInfo.imageLinks.smallThumbnail === null) {
    this.image = 'https://www.freeiconspng.com/uploads/book-icon--icon-search-engine-6.png';
  } else {
    this.image = value.volumeInfo.imageLinks.smallThumbnail;
  }
  this.title = value.volumeInfo.title;
  this.author= value.volumeInfo.authors[0];
  this.description = value.volumeInfo.description;
}

//************(listening to port)***********\\

app.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`)
})

//***************(error handler)**************\\

function errorHandler (err,req,res){
  res.status(500).send(err);
}


app.get('*',(req,res)=>{
    res.status(404).send('This route does not exist!!');
  })






