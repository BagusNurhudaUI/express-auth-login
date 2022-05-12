const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt");
const db = require('../db/db')


router.get('/',(req, res, next) =>{
    res.send('berhasil masuk login page')
})

router.post("/", (req, res) => {
    temp = req.session;
    temp.username = req.body.username;
    temp.password = req.body.password;
    const query = `SELECT * FROM users WHERE username = '${temp.username}';`;
    db.query(query, (err, results) => {
      //jika ada error pada function
      if (err) {
        console.error(err);
        res.send(err);
        return;
      }
      // jika tidak ada error query
      if (Array.isArray(results.rows) && results.rows.length) {
        hashed = results.rows[0].password;
        bcrypt.compare(temp.password, hashed, (err, result) => {
          // jika ada error pada compare
          if (err) {
            console.log(err);
            res.send(err);
            return;
          } else {
            // jika hasil compare password benar
            if (result) {
            console.log("berhasil login success");
            return res.redirect('http://localhost:8080/home');
            // jika hasil compare password salah
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