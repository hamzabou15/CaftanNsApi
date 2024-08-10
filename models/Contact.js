const mongoose = require('mongoose');


const ContactSchema = new mongoose.Schema({
    
    Name : {type:String },
    Email : {type:String , required:true},
    Message : {type:String },


})

module.exports = mongoose.model('ContactSchema' , ContactSchema);
