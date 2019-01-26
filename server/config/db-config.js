var mongoose = require('mongoose')

var db_url = 'mongodb://umar:asdf123@ds113495.mlab.com:13495/database-name'
mongoose.connect(db_url, { useNewUrlParser: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', function () { console.log('Successfully connected to DB') });