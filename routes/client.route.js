const express = require('express');
const router = express.Router();
const multer = require('multer');

const {create , list , byId, deleteC, updateC} = require('../controlers/client.controler');
let fileName = "";
let myStorage = multer.diskStorage({
    destination : ('./uploads/clients'),
    filename : (req,file,redirect)=>{
        fileName = Date.now()+ '.' + file.mimetype.split('/')[1];
        redirect(null,fileName);
    } 
})
const upload = multer({ storage : myStorage });

router.post('/create',upload.single('image'),(req,res)=>{
    create(req,res,fileName);
    fileName = "";
});

router.get('/list',list);
router.get('/byid/:id',byId);

router.delete('/deleteclient/:id',deleteC);
router.put('/updateclient/:id',upload.single('image'),(req,res)=>{
    updateC(req,res,fileName);
    fileName = "";
});


module.exports = router;