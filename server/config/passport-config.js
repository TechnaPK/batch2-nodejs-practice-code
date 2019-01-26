var session = require("express-session")
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// var MongoStore = require('connect-mongo')(session)
// var mongoose = require('mongoose')

module.exports = function (server, users) {

    server.use(session({ secret: "secret-word" }));
    //  server.use(session({
    //     store: new MongoStore({ mongooseConnection: mongoose.connection }),
    //     secret: "secret-word" 
    // }));
    server.use(passport.initialize());
    server.use(passport.session());

    passport.use(new LocalStrategy(
        function (username, password, next) {
    
            var user = users.find((user) => {
                return user.username === username && user.password === password;
            })
    
            if (user) {
                next(null, user);
            } else {
                next(null, false);
            }
    
        }
    ));
    
    passport.serializeUser(function (user, next) {
        next(null, user.id);
    });
    
    passport.deserializeUser(function (id, next) {
        var user = users.find((user) => {
            return user.id === id;
        })
    
        next(null, user);
    });

}