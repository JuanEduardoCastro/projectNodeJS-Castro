const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/user');

module.exports = passport.use(new LocalStrategy({
    user: 'eMail',
    password: 'password'
}, async (eMail, password, done) => {
    try {
        let user = await User.findOne({ eMail })
        if (!user) {
            return done(null, false)
        } else {
            if (password === user.password) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        } 
    } catch (error) {
        console.log(error)
    }

}))