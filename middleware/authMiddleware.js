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

// check current user
const checkUser = (req, res) =>{
    const token = req.cookies.jwt;

    if (token){
        jwt.verify(token, 'net ninja secret', async (err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.local.user = null;
                next();
            }else{
                console.log(decodedToken)
                let user = await UserfindbyId(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    }
    else{
        res.local.user = null;
        next();
    }
}

module.exports = {requireAuth, checkUser};