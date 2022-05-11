const express = require('express')
const router = express.Router()
const session = require('express-session')
const bcrypt = require("bcrypt");
const db = require('../db/db')
router.get('/',(req, res, next) =>{
    res.send('berhasil masuk signup')
})

router.get('/home',(req, res, next) =>{
    res.send('berhasil masuk home')
    })

const authTokens = {};
router.post("/", (req, res) => {
    temp = req.session;
    temp.username = req.body.username;
    temp.password = req.body.password;
    const query = `SELECT * FROM users WHERE username = '${temp.username}';`;
    db.query(query, (err, results) => {
        
      if (err) {
        console.error(err);
        res.send(err);
        return;
      }
      if (Array.isArray(results.rows) && results.rows.length) {
        hashed = results.rows[0].password || null;
        temptemp = results.rows[0];
        bcrypt.compare(temp.password, hashed, (err, result) => {
          if (err) {
            console.log(err);
            res.send(err);
            return;
          } else {
            if (result) {
            //   res.json({
            //     status: "Login Success",
            //     fullname: temptemp.fullname,
            //     email: temptemp.email,
            //   });
            const authToken = () =>{
                bcrypt.hash.toString('hex');
            };
            authTokens[authToken] = result;
            res.cookie('AuthToken', authToken);
            console.log("berhasil login success");
            
            return res.redirect('http://localhost:8080/home');
              
            } else {
              res.json({ status: "Wrong Password" });
            }
          }
        });
      } else {
        res.json({ status: "Wrong Username" });
      }
    });
  });

  module.exports =router;