const mongoose = require('mongoose');
const Client = mongoose.model('Client',{
    fullname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        unique : true,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    image : {
        type : String,
        
    },
    date : {
        type : String,
        required : true
    }

});

module.exports = Client ;