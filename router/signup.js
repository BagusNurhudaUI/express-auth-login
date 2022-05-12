const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt");
const db = require('../db/db')

router.get('/',(req, res, next) =>{
    res.send('berhasil masuk signup page')
})

router.post("/", (req, res) => {
    temp = req.session;
    temp.username = req.body.username;
    temp.password = req.body.password;
    temp.email = req.body.email;
    temp.fullname = req.body.fullname;
    const checkUserQuery = `SELECT * FROM users WHERE username = '${temp.username}';`
    db.query( checkUserQuery,(err, result)=> {
        if (Array.isArray(result.rows) && result.rows.length) {
          res.send({ status: "User already exists" });
        } else {
          bcrypt.hash( temp.password, 10, (err, resultHash) => {
              const signupQuery = `INSERT INTO users(username, fullname, password, email) VALUES('${temp.username}','${temp.fullname}','${resultHash}', '${temp.email}');`
              db.query(signupQuery, (err, results) => {
                if (err) {
                  console.error(err.detail);
                  res.send(err.detail);
                  return;
                } else {
                  console.log('Signup Success');
                  res.redirect('/login')
                  return
                }
              });
            }
          );  
        }
      }
    );
    
});



module.exports = router;