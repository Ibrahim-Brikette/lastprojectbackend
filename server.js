require('./config/connect');
require('dotenv').config();


const express = require('express');
const cors = require('cors')


app = express();
app.use(express.json());
app.use(cors());




//the requirement of the routes nedded
const userRoute = require('./routes/user.route');
const clientRoute = require('./routes/client.route');
const projectRoute = require('./routes/project.route');
const boardRoute = require('./routes/board.route');
const { createAdmin } = require('./controlers/user.controler');


// the route associate to the url
app.get('/', (req, res) => {
  res.json({ message: 'Backend is working perfectly!' });
});
app.use('/user',userRoute);
app.use('/client',clientRoute);
app.use('/project',projectRoute);
app.use('/board', boardRoute);
app.use('/images/users',express.static('./uploads/users'));
app.use('/images/clients',express.static('./uploads/clients'));
app.use('/docs/files',express.static('./uploads/files'));
 


app.listen(3000,()=>{
    console.log('the back is working my bro');
    createAdmin();
 

    
})