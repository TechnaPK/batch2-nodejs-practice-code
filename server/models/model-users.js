var mongoose = require( 'mongoose' )

const userSchema = { name: String, email: String, balance: Number }

const Users = mongoose.model( 'User', userSchema );

module.exports = Users