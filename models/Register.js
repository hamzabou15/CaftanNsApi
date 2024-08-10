const mongoose = require('mongoose');

const RegisterSchema = new mongoose.Schema({

    FName : {type:String , required:true},
    LName : {type:String , required:true},
    Email : {type:String , required:true},
    Password  : {type:String , required:true},
    Adress : {type:String , required:true},
    isAdmin: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }

)

module.exports = mongoose.model('RegisterSchema' , RegisterSchema);
