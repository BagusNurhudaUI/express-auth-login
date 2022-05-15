const express = require('express')
const app =express()
require('dotenv').config()
const session = require('express-session')
const bodyParser = require('body-parser');
const db = require('./db/db')
const signup = require('./router/signup.js')
const login = require('./router/login.js')
const home = require('./router/home.js');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')
const { query } = require('express');
const Auth = require('./controller/auth')
app.use(
    session({
      secret: "ini contoh secret",
      saveUninitialized: false,
      resave: false,
      cookie: { maxAge:60*60*1000}
    })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true}));
 
// app.use(express.static(__dirname + "/"));
// var temp;
app.use('/signup', signup);
app.use('/login', login); 
// app.use('/home', home); 


app.get('/', async (req, res) => {
  try {
    res.send("Welcome to API Page for Kasbaik Backend");
    
    if (token) {
      const user = jwt.verify(token, JWT_SECRET) 
      if (user) {
        console.log("berhasil terautentikasi token");
      } else {
        console.log("youre not logged in token");
        
      }
    } else {
      console.log("youre not logged");
      
    }
  } catch (error) {
    console.log(error);;
  }
});

app.use('/auth', Auth.verifyToken, home)

app.get('/getAllUsers', async (req, res) => {
  try {
    const query = `SELECT * FROM users ;`
    const results = await db.query(query)
    res.send(results.rows)
  } catch (error) {
    console.log(error);
  }
});



app.get('/logout', (req, res) => {
  req.session.destroy(() => {
     console.log("user logged out.")
  });
  res.redirect('/');
});

// const secret = 'testsecret'
async function validateToken(token, secret) {
  try {
      const result  = jwt.verify(token, secret);
      console.log(result);
      console.log('salah');
      return 
  }
  catch(err){
      console.log(err);
  }

}
PORT = process.env.PORT
app.listen(PORT || 8080, () => {console.log(`Application is running on ${PORT}!! `)})