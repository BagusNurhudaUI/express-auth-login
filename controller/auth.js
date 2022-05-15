
const jwt = require('jsonwebtoken');
const db = require('../db/db')

SECRET = process.env.SECRET
const Auth = {
    verifyToken(req, res, next){
        const token = req.cookies.jwt;
        
        if (token) {
            console.log('berhasil masuk token');
            jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
              if (err) {
                console.log(err.message);
                
              } else {
                console.log('berhasil ');
                console.log(decodedToken);
                req.id = decodedToken.userId
                req.email = decodedToken.email 
                next();
              }
            });
        } else {
            console.log('cannot loggin');
            res.redirect('/login');
        }
    // try {
    //   const decoded = jwt.verify(token, SECRET);
    //     req.user = decoded;
    //   console.log('successfully retrieved token');
    //   next();
    // } catch(error) {
    //   return res.status(400).send(error);
    // }
  }
}

module.exports = Auth;