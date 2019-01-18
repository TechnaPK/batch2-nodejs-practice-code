var express = require('express');
var bodyParser = require("body-parser");

var users = [
    { id: 1, username: "umar", password: 'abcd1234' },
    { id: 2, username: "test", password: '1234' },
]

var server = express()

server.use(express.static('./frontend'))
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

require('./server/config/db-config');
require('./server/config/passport-config')(server, users);
require('./server/routes/all-routes')(server, users);

var Users = require('./server/models/model-users')
server.get('/test', (req, res) => {
    
    Users.
        find({
            name: { $in: ['Umar', 'Test'] },
            balance: { $gt: 50, $lt: 1000000 },
        }).
        limit(10).
        exec(function (err, users) {
            if (err) return res.send(err)
            res.send(users)
        });

})

server.use((err, req, res, next) => {
    console.warn(err)
    res.status(500).send("Error Catched by error handler.")
})

server.listen(8000, () => console.log("server is running"))