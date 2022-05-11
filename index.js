const express = require('express')
const app =express()
require('dotenv').config()
const session = require('express-session')
const bodyParser = require('body-parser');

const signup = require('./router/signup.js')
const login = require('./router/login.js')
const home = require('./router/home.js')
app.use(
    session({
      secret: "ini contoh secret",
      saveUninitialized: false,
      resave: false,
    })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
 
// app.use(express.static(__dirname + "/"));
// var temp;
app.use('/signup', signup);
app.use('/login', login); 
app.use('/home', home); 
app.get('/', (req,res) => {
    res.send('berhasil masuk ke auth /')
})

PORT = process.env.PORT
app.listen(PORT, () => {console.log(`Application is running on ${PORT}!! `)})