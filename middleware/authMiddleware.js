const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt

    // check web token exists & is valid
    if(token){
        jwt.verify(token, 'net ninja secret', (er, decodedToken) =>{
            if(err){
                console.log(err.message);
            }
            else{
                console.log(decodedToken);
                next();
            }
        })
    }
    else{
        res.redirect('/login');
    }
}

module.exports = {requireAuth};