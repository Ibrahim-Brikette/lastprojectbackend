const Client = require('../models/client.model');
const create= (req,res,fileName)=>{

    let client = new Client(req.body);
    client.image =  fileName;

    //saving the date
    client.date = new Date();
    client.save()
    .then(
        (saved)=>{
            res.send(saved);
        }
    )
    .catch (
        (err)=>{
            res.send(err);
        }
    )

} ;

const list= (req,res)=>{
    Client.find()
    .then (
        (list)=>{
            res.send(list);
        }
    )
    .catch(
        (err)=>{
            res.send(err);
        }
    )


} ;
const byId= (req,res)=>{
    Client.findById({ _id : req.params.id })
    .then (
        (found)=>{
        res.send(found);
        }
    )
  .catch(
        (err)=>{
        res.send(err);
        }
    )

} ;
const deleteC= (req,res)=>{
    Client.findByIdAndDelete({ _id : req.params.id })
    .then (
        (bedeleted)=>{
        res.send(bedeleted);
        }
    )
  .catch(
        (err)=>{
        res.send(err);
        }
    )

} ;


const updateC= (req,res,fileName)=>{
    let data = req.body;
    
    if(fileName.length > 0){    
        data.image = fileName;
    }
    Client.findByIdAndUpdate({ _id : req.params.id },data)
    .then(
        (toupdate)=>{
            res.send(toupdate);
        }
    )
    .catch (
        (err)=>{
            res.send(err);
        }
    )



} ;
 
module.exports  = {create , list , byId, deleteC, updateC};