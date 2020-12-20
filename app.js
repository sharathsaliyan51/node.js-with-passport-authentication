const express = require('express');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/users');
const mongoose = require('mongoose');
const db = require('./config/keys').MongoURI;
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
require('./config/passport')(passport);

const app = express();

const PORT = process.env.PORT || 5000;

//database connection
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('mongodb connected');
    app.listen(PORT, console.log(`server started on ${PORT}`));
}).catch(err => console.log(err));

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//body parser
app.use(express.urlencoded({ extended: false }));

//express session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());
//connect flash
app.use(flash());

//global vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})
app.use
//Routes
app.use('/', indexRoutes);
app.use('/users', userRoutes);


