const mongoose = require('mongoose');


    mongoose.connect(process.env.MONGO_URL, {
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
        console.error('error connecting to the hosted mongo db', err);
        
    }   
)