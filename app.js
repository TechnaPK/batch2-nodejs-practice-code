var express = require('express');
var bodyParser = require('body-parser')
var server = express()

server.use( bodyParser.urlencoded( {extended: true} ) )
server.use( bodyParser.json() )

server.use( express.static('./frontend') )

server.get('/user/:name/:lname', (req, res)=>{
    res.send('My name is ' + req.params.name + " " + req.params.lname)
})

server.get('/hello', (req, res)=>{
    res.send('Hello World')
})

server.get('/search', (req, res)=>{
    res.send( req.query )
})

server.post('/login', (req, res)=>{
    res.send( req.body.username + ' ' + req.body.password  )
})






var users = [{username: "umar", email: 'hello@abc.com'}];

server.get('/users', (req, res)=>{

    res.json( users )

})





server.post('/addusers', (req, res)=>{

    let newUser = { username: req.body.username, email: req.body.email }
    users.push( newUser )
    res.send( "User have been successfully added." )

})

server.delete('/users', (req, res)=>{

    users = users.filter( (user) => {
        return user.username != req.body.username
    } )

    res.send( "User have been deleted successfully." )

})

// server.put('/users', (req, res)=>{
//     res.send( req.body.username + ' ' + req.body.password  )
// })


server.listen(8000, () => { console.log("Server successfully started.") } )