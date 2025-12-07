const mongoose = require('mongoose');
const Project = mongoose.model('Project',{
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    startDate : {
        type : Date,
        required : true
    },
    endDate : {
        type : Date,
        required : true
    },
    date : {
        type : Date,
         
    },
    status : {
        type : String ,
        required : true
    },
    
    client  : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Client'
    },
    team : {
        type : [{
            type :mongoose.Schema.Types.ObjectId,
            ref : 'User' 
        }],
        required : true
    },
    files : {
        type : Array,
        default : [],
    },
    budget : {
        type : Number,
      
    },
 
});

module.exports = Project;