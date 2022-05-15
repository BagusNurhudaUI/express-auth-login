const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt");
const db = require('../db/db')
const Helper = require('../controller/helper')
const { uuid } = require('uuid');
const crypto = require('crypto')

router.get('/',(req, res, next) =>{
    res.send('berhasil masuk signup page')
})

router.post("/", async (req, res) => {
  try {
    temp = req.session;
    temp.username = req.body.username;
    temp.password = req.body.password;
    temp.email = req.body.email;
    temp.phone = req.body.phone;

    if (!temp.password || !temp.email ){
      return res.status(400).send({'message': 'email and password must be provided'});
    }

    if (!Helper.isValidEmail(temp.email)) {
      return res.status(400).send({ 'message': 'Please enter a valid email address' });
    }

    const checkUserQuery = `SELECT * FROM users WHERE email = '${temp.email}';`
    const result = await db.query(checkUserQuery)
    if (Array.isArray(result.rows) && result.rows.length) {
      return res.status(400).send({ status: "email is already used" });
    } 
    
    try { 
    const resultHash = await Helper.hashPassword(temp.password);
    const signupQuery = `INSERT INTO users(id, username, email, no_phone, password) VALUES($1, '${temp.username}','${temp.email}','${temp.phone}','${resultHash}');`
      
    db.query(signupQuery, [crypto.randomUUID()], (err, result) => {
      res.status(200).send({ status: "successfully signup"})
    }) 
    console.log('Signup Success');
    } catch (err) {
        console.error(err.message);
    }
       
  } catch (err) {
    console.error(err);
  }
    
});

module.exports = router;