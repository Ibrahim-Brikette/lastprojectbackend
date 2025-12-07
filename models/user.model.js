const mongoose = require('mongoose');
const User = mongoose.model('User',{
    fullname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    image : {
        type : String
    },
    tools : {
        type : Array,
        default : []
    },
    date : {
        type : Date
    },
    phone : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true
    }
}); 

module.exports = User