const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/lastproject')
.then(
    ()=>{
        console.log('connected th the db');
    }
)
.catch(
    (err)=>{
        console.log(err);
        
    }   
)