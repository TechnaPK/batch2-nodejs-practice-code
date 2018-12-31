var express = require('express');
var bodyParser = require("body-parser");
var fs = require('fs')
var multer = require('multer')

var customConfig = multer.diskStorage({
    destination: function (req, file, next) {
        next(null, './uploads')
    },
    filename: function (req, file, next) {
        next(null, Math.random() + '-' +file.originalname)
    }
  })

var upload = multer({ storage: customConfig })

var server = express()

server.use(bodyParser.urlencoded())
server.use(bodyParser.json())
server.use(express.static('./frontend'))


server.post('/profile', upload.array('profilePicture', 10), function (req, res, next) {
    console.log(req.files)
    res.send("File successfully uploaded.")
})


var users = [{ username: "umar", password: 'abcd1234' }]

server.get('/getAllUsers', (req, res) => {
    res.send(users)
})

server.post('/addUser', (req, res) => {
    let user = { username: req.body.username, password: req.body.password }
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
        if(err){
            next(err)
        }else{
            res.send(data)
        }
    });

})

server.delete('/deleteFile', (req, res, next) => {

    fs.unlink('myfiles/mynewfile.txt', function (err) {
        if(err){
            next(err)
        }else{
            res.send("File successfully deleted.")
        }
    });

})

server.use((err,req,res, next) => {
    console.log(err)
    res.status(500).send("my name is Umar")
})

server.listen(8000, () => console.log("server is running"))