var passport = require('passport');
var fs = require('fs')

var Users = require('../models/model-users')
var upload = require('../config/multer-config')

module.exports = function (server, users) {

    server.get('/test', (req, res) => {

        // With a JSON doc
        Users.
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

}