const mongoose = require('mongoose');


const Newsletter = new mongoose.Schema({
    
    Email : {type:String , required:true},


})

module.exports = mongoose.model('Newsletter' , Newsletter);
