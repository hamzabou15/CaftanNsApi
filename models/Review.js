const mongoose = require('mongoose');


const ReviewSchema = new mongoose.Schema({
    
    ReviewName : {type:String , required:true},
    Email : {type:String , required:true},
    Title : {type:String , required:true},
    Content  : {type:String , required:true}



})

module.exports = mongoose.model('ReviewSchema' , ReviewSchema);
