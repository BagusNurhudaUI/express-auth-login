const express = require('express')
const router = express.Router()
const session = require('express-session')
const bcrypt = require("bcrypt");
const db = require('../db/db')
router.get('/',(req, res, next) =>{
    res.send('berhasil masuk signup')
})

router.post("/update", (req, res) => {
    temp = req.session;
    temp.username = req.body.username;
    temp.password = req.body.password;
    temp.email = req.body.email;
    temp.fullname = req.body.fullname;
    const check = db.query(
      `SELECT * FROM users WHERE username = '${temp.username}';`,
      function (err, result) {
        if (Array.isArray(result.rows) && result.rows.length) {
          console.log(result.rows);
          res.json({ status: "User already exists" });
        } else {
          console.log("tidak ada");
          await bcrypt.hash(
            temp.password,
            10,
            (err, hashedPassword) => {
              const signup = db.query(
                `INSERT INTO users(username, fullname, password, email) VALUES('${temp.username}','${temp.fullname}','${hashedPassword}', '${temp.email}');`
              );
              const result = await db.query(signup, (err, results) => {
                if (err) {
                  console.error(err.detail);
                  res.send(err.detail);
                  return;
                }
              });
              res.json({
                status: "Signup Success",
                fullname: temp.fullname,
                email: temp.email,
              });
            }
          );
        }
      }
    );
  });

  module.exports = router;