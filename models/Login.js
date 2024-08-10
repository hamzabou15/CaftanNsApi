const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({

    Email : {type:String , required:true},
    Password  : {type:String , required:true}

})

module.exports = mongoose.model('LoginSchema' , LoginSchema);
