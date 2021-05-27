const User = require('../models/User');

//handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {email:'', password:""};

    // duplicate error code
    if(err.code === 11000){
        errors.email = 'that email is already registered';
        return errors;
    }

    // validation errors
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties})=> {
            // console.log(err.properties);
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}

module.exports.signup_get = (req, res) =>{
    res.render('signup');
}
module.exports.login_get = (req, res) =>{
    res.render('login');
}
module.exports.signup_post = async(req, res) =>{
    const {email, password} = req.body;
    // console.log(email, password);
    try{
        const user = User.create({email,password});
        res.send(201).json(user);
    }
    catch(err){
        console.log(err);
        res.status(404).json({errors});
    }
}
module.exports.login_post = async(req, res) =>{
    const {email, password} = req.body;
    console.log(email, password);
    res.send('user login');
}