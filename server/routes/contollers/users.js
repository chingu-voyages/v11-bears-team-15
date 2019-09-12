const User = require('../../models/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {

  create: (req, res) => {
    const { username, email, password } = req.body;

    User.findOne({ email }).exec((error, user) => {
      if (user) {
        return res.status(401).send({
          message: "User Email Already Taken"
        });
      }
      const newUser = new User({ username, email, password });
      
      bcrypt.hash(password, 10, (err, hash) => {
        newUser.password = hash;
        newUser.save((err) => {
          if (err) {
            return res.status(500).send({
              status: 'Fail',
              message: 'An error Occured while creating an Account , Try Again ',
            })
          }
          return res.status(201).send({
            status: 'success',
            message: 'Account Succesfully Created',
            data: {
              _id: newUser._id,
              username: newUser.username,
              email: newUser.email
            }
          })
        })
      });
    });
  },

  login: (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username }).exec((error, user) => {
      if (error) {
        return res.status(401).send({
          message: "Authentication Failed, Username or Password Incorrect"
        });
      }
      bcrypt.compare(password, user.password, (err, resp) => {
        if (resp) {
          const token = jwt.sign({
            data: { _id: user._id, username: user.username, email: user.email }
          },
            process.env.SECRET,
            { expiresIn: '1h' },
          );
          return res.status(200).send({
            message: "Successfully Logged In",
            data: {
              username: user.username,
              email: user.email,
              token
            }
          });
        }
        return res.status(403).send({
          message: "Authentication Failed, Username or Password Incorrect"
        });
      })
    });
  },

};