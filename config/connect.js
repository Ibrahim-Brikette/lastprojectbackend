const mongoose = require('mongoose');


    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)
.then(
    ()=>{
        console.log('connected to the hosted mongo db');
    }
)
.catch(
    (err)=>{
           console.log(process.env.MONGO_URI);
        console.error('error connecting to the hosted mongo db', err);
     
        
        
    }   
)