const {db} = require('../db/config');
const {validateSignupData, validateLoginData, reduceUserDetails} = require('../utils/validator');

const signUp = (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle
    }

    const { valid, errors } = validateSignupData(newUser); 

    if (!valid) return res.status(400).json(errors);
    
    const noImg = 'no-image.png';

    //add user authorization (togen creation)
  
}


module.exports = {
    signUp
}