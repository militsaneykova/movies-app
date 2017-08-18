const express = require('express');
const authRouter = express.Router();
const passport = require('../services/auth/local');
const authHelpers = require('../services/auth/auth-helpers');
const userController = require('../controllers/users-controller');

// authRouter.get('/login',authHelpers.loginRedirect, (req, res)=>{
//     res.render('auth/login',{
//         currentPage: 'login',
//     });
// });

// authRouter.get('/register',authHelpers.loginRedirect,(req,res)=>{
//     res.render('auth/register',{
//         currentPage: 'register',
//     });
// });
//post auth send back json information
authRouter.post('/register', userController.create);
authRouter.post('/login',passport.authenticate('local',{
    successRedirect: '/auth/success',
    failureRedirect: '/auth/failure',
    failureFlash: true,
}))
//Get auth
authRouter.get('/logout',(req, res) =>{
    req.logOut();
    res.json({
        message: 'logged out',
        auth: false,
    })
});
authRouter.get('/success',(req, res)=>{
    res.json({
        auth: true,
        message: 'ok',
        user: req.user,
    });
});

authRouter.get('/failure',(req, res)=>{
    res.json({
        auth: false,
        message: 'Login failer',
        user: null,
    });
});

module.exports = authRouter;