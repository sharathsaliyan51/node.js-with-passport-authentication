const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = function (passport) {
    passport.use(
        new localStrategy({ usernameField: 'email' }, (email, password, done) => {
            //match user
            User.findOne({ email: email })
                .then(usr => {
                    if (!user) {
                        return done(null, false, { message: 'that email is not registered' });
                    }

                    //match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return (null, false, { message: 'password incorrect' })
                        }
                    });
                })
                .catch(err => console.log(err));
        })
    )
}