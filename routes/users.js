var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/users');
const errors = require('restify-errors');
const Config = require('../util/Config');
const auth = require('../auth');
const jwt = require('jsonwebtoken');

router.post('/register',  function(req, res, next) {
  
    const {email , password} = req.body;

    const user = new User({
      email,
      password
    });

    bcrypt.genSalt(10 , (err , salt)=> {

      if (err) {
        throw err;
      }

      bcrypt.hash(user.password , salt , async (err , hashedPassword)=>{
        // hash the user password

        user.password = hashedPassword;

        try {

          const newUser = await user.save();
          res.send(newUser);
        } catch (error) {
          res.send(new errors.InternalError(error));
        }

      });


    });




});

// here we autheticate the user

router.post('/auth' , async (req,res,next)=>{

      const {email , password} = req.body;

      try {

        // authticate user

        const user = await auth.authenticate(email,password);
        
        // create the token

        const token = jwt.sign(user.toJSON() , Config.JWT_SECRET , {
          expiresIn : '1y'
        });
        const {iat , exp} = jwt.decode(token);
        res.send({iat , exp , token});
      } catch (error) {
          res.send(new errors.UnauthorizedError(error));
      }
});



module.exports = router;
