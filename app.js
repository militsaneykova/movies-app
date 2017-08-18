// Add dependencies
const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const app = express();
require('dotenv').config();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
    session({
        key: process.env.SECRET_KEY,
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: true,
    }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));
// Set up Port 
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
});
//Routes
app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname,'client', 'build', 'index.html'));
})
const authRoutes = require('./routes/auth-routes');
app.use('/auth',authRoutes);
const movieRoutes = require('./routes/movie-routes');
app.use('/movies',movieRoutes);
const userRoutes = require('./routes/user-routes');
app.use('/user', userRoutes);

//Error handler
app.use('*',(req,res)=>{
    res.status(400).json({
        message: 'Not found!',
    });
});


