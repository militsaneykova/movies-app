const bcrypt = require('bcryptjs');
const User = require('../../models/user');
// Function to compare the pass from the input and the one in the DB
function comparePass(userPassword, databasePassword,){
    return bcrypt.compareSync(userPassword,databasePassword);
}

function LoginRedirect(req,res,next){
    if(req.user) return res.redirect('/user');
    return next();
}

// function LoginRedirect(req, res, next){
//     if(!req.user) return res.redirect('/auth/login');
//     return next();
// }

module.exports = {
    comparePass,
    loginRequired,
}