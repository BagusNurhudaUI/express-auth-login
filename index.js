const express = require('express')
const app =express()
require('dotenv').config()
const session = require('express-session')
const bodyParser = require('body-parser');
const db = require('./db/db')
const signup = require('./router/signup.js')
const login = require('./router/login.js')
const home = require('./router/home.js')
app.use(
    session({
      secret: "ini contoh secret",
      saveUninitialized: false,
      resave: false,
      cookie: { maxAge:60*60*1000}
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
    // res.send('berhasil masuk ke auth /')
    res.send(req.session.id)
})

app.get('/getAllUsers', (req, res) => {
  const query = `SELECT * FROM users ORDER BY id asc;`;
  db.query(query, (err, results) => {
      if (err) {
          console.error(err);
          res.send(null);
          return;
      }
      res.send(results.rows);
  });
});

app.get('/logout', function(req, res){
  res.send('berhasil masuk ke logout /')
  req.session.destroy(() => {
     console.log("user logged out.")
  });
  res.redirect('/login');
});

PORT = process.env.PORT
app.listen(PORT || 8080, () => {console.log(`Application is running on ${PORT}!! `)})