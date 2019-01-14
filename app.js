var express = require('express');
var bodyParser = require("body-parser");
var fs = require('fs')
var multer = require('multer')

var session = require("express-session")
var passport = require("passport")
var LocalStrategy = require('passport-local').Strategy

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/database-name', { useNewUrlParser: true });
mongoose.connection.once('open', function () { console.log('Successfully connected to DB') });

const User = mongoose.model('User', { name: String, email: String, balance: Number });

var server = express()


server.get('/test', (req, res) => {

    // const user = new User({ name: 'Umar', email: 'umar@yahoo.com', balance: 100 });
    // user.save(() => { res.send("user successfully saved into database.") });

    // User.findByIdAndUpdate('5c38949272cfde3a8c5a0b95', {balance: 200000}, function(err, user){
    //     if(err) return res.send( err )
    //     res.send(user)
    // })

    // With a JSON doc
    User.
        find({
            name: { $in: ['Umar', 'Test'] },
            balance: { $gt: 50, $lt: 1000000 },
        }).
        limit(10).
        skip(30).
        select({ name: 1 }).
        sort({ balance: -1 }).
        exec(function (err, users) {
            if (err) return res.send(err)
            res.send(users)
        });
})

server.use(express.static('./frontend'))
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())


server.use(session({ secret: "secret-word" }));
server.use(passport.initialize());
server.use(passport.session());


var users = [
    { id: 1, username: "umar", password: 'abcd1234' },
    { id: 2, username: "test", password: '1234' },
]

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

server.post('/login', passport.authenticate('local'), function (req, res) {
    res.redirect('/dashboard');
});



server.get('/dashboard', function (req, res) {

    if (!req.isAuthenticated()) {
        res.send("Login Required to visit this page")
    } else {
        res.send("Yes you're logged in, and your data is available here: " + req.user.username)
    }

});



var customConfig = multer.diskStorage({
    destination: function (req, file, next) {
        next(null, './uploads')
    },
    filename: function (req, file, next) {
        next(null, Math.random() + '-' + file.originalname)
    }
})

var upload = multer({ storage: customConfig })

server.post('/profile', upload.array('profilePicture', 10), function (req, res, next) {
    console.log(req.files)
    res.send("File successfully uploaded.")
})



server.get('/getAllUsers', (req, res) => {
    res.status(404).send(users)
})

server.post('/addUser', (req, res) => {
    let user = { id: Math.random(), username: req.body.username, password: req.body.password }
    users.push(user)
    res.end("User is added")
})


server.post('/createFile', (req, res) => {

    fs.appendFile('myfiles/mynewfile.txt', "Hello Everyone " + "\r\n", function (err) {
        if (err) throw err;

        res.send("File successfully created.")
    });

})

server.get('/getData', (req, res, next) => {

    fs.readFile('myfiles/mynewfile.txt', 'utf8', function (err, data) {
        if (err) {
            next(err)
        } else {
            res.send(data)
        }
    });

})

server.delete('/deleteFile', (req, res, next) => {

    fs.unlink('myfiles/mynewfile.txt', function (err) {
        if (err) {
            next(err)
        } else {
            res.send("File successfully deleted.")
        }
    });

})

server.use((err, req, res, next) => {
    console.warn(err)
    res.status(500).send("Error Catched by error handler.")
})

server.listen(8000, () => console.log("server is running"))



// var morgan = require('morgan')
// var path = require('path')
// // create a write stream (in append mode)
// var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
// server.use(morgan('combined', { stream: accessLogStream }))