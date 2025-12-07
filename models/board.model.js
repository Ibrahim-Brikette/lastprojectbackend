const mongoose = require('mongoose');
const Board = mongoose.model('Board',{
    projectId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Project',
        required : true
    },
    date : {
        type : Date,
        required : true
    },
    backlog : {
        type : Array,
        default : [],
        required : true
    },
    inprogress : {
        type : Array,
        default : [],
    },
    done : {
        type : Array,
        default : [],
    },
    inhold : {
        type : Array,
        default : [],
    }
});

module.exports = Board ; 