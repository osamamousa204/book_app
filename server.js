'use strict';


//************(reqier dotenv)*************\\

require('dotenv').config();

//********(reqier express function)********\\

const express = require('express')

//******(reqier superagent function)*******\\

const superagent = require('superagent')

//****************(Port)*******************\\

const PORT = process.env.PORT || 3030

//****************(pg and client)*******************\\

const pg = require('pg');

const client = new pg.Client(process.env.DATABASE_URL)
//************(app variable)***************\\

const  app = express();
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');


//*****************(home page)*******************\\

app.get('/index' , (req,res)=>{
  res.render('./pages/index');
})

app.get('/' , getDataFromDB);
function getDataFromDB(req,res){
  const SQL = 'SELECT * FROM books;';
  client.query(SQL)
    .then(result =>{
      res.render('./pages/index',{data:result.rows})
    })
}

app.get('/searches/new',(req,res)=>{
  res.render('./pages/searches/new');
})

//*****************(the books route)*******************\\
app.get('/books/:books_id' , booksDeatail);

function booksDeatail (request , response){
let sql = `SELECT * FROM books WHERE id = $1; `;
let safeValues = [request.params.books_id];
return client.query(sql,safeValues)
.then(result=>{
  response.render('./pages/books/show',{data : result.rows[0]})
  // response.redirect('./show')
})
}

// app.get('/show' , showBooksDeatail);

// function showBooksDeatail  (request , response){
//  return response.render('./pages/books/show')
// }

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
  this.image = value.volumeInfo.imageLinks.smallThumbnail ? value.volumeInfo.imageLinks.smallThumbnail: 'https://www.freeiconspng.com/uploads/book-icon--icon-search-engine-6.png';
  this.title = value.volumeInfo.title ? value.volumeInfo.title : 'No book with this title' ;
  this.author= value.volumeInfo.authors[0] ? value.volumeInfo.authors[0]: 'No books for this author';
  this.description = value.volumeInfo.description ? value.volumeInfo.description:'....';
  this.isbn = value.volumeInfo.industryIdentifiers[0].type + value.volumeInfo.industryIdentifiers[0].identifier ? value.volumeInfo.industryIdentifiers[0].type + value.volumeInfo.industryIdentifiers[0].identifier : '000000';
}

//************(listening to port)***********\\
client.connect()
.then(()=>{
  app.listen(PORT,()=>{
      console.log(`Listening on PORT ${PORT}`)
  })

})

//***************(error handler)**************\\

function errorHandler (err,req,res){
  res.status(500).send(err);
}


app.get('*',(req,res)=>{
    res.status(404).send('This route does not exist!!');
  })






