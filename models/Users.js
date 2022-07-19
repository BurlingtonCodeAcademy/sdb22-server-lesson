// 5. Import mongoose to use its built-in schema creating properties
const mongoose = require("mongoose")

// 6. creating a Users schema
const Users = new mongoose.Schema({
    // key value pairs of object property to its data type value.
    name: String,
    surname: String,
    email: { type: String, unique: true},
    password: String
})

// 7. export your schema to be used elsewhere
module.exports = Users