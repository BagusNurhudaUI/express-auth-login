const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt");
const db = require('../db/db')
const jwt =require("jsonwebtoken");
const Helper = require('../controller/helper');

router.get('/',(req, res, next) =>{
    res.send('berhasil masuk login page')
})

SECRET = process.env.SECRET


router.post("/", async (req, res) => {
    temp = req.body;
    temp.email = req.body.email;
    temp.password = req.body.password;

    if (!temp.email|| !temp.password) {
      return res.status(400).send({'message': 'email and password is provided'});
    }

    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ 'message': 'Please enter a valid email address' });
    }

    

    
    const query = `SELECT * FROM users WHERE email = '${temp.email}';`;
    try {
      const { rows } = await db.query(query);
      if (!rows[0]) {
        return res.status(400).send({'message': 'The credentials you provided is incorrect'});
      }
      if(!Helper.comparePassword(rows[0].password, temp.password)) {
        return res.status(400).send({ 'message': 'The credentials you provided is incorrect' });
      }
      const token = Helper.generateToken(rows[0].id, rows[0].email);
      res.cookie('jwt', token);
      return res.status(200).send({ token });
    } catch(error) {
      return res.status(400).send(error)
    }
  });

  module.exports =router;