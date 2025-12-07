const express = require('express');
const router = express.Router();
const multer = require('multer');
const {createUser, signIn, listUser, byId, deleteU, updateU} = require('../controlers/user.controler');

let fileName ='';
let myStorage = multer.diskStorage({
    destination : ('./uploads/users'),
    filename : (req,file,redirect)=>{
        fileName = Date.now() + '.' + file.mimetype.split('/')[1];
        redirect (null,fileName);
    }
});
let upload = multer({ storage : myStorage });
router.post('/createuser', upload.single('image'),(req,res)=>{
    createUser(req,res,fileName);
    fileName = "";
});


router.post('/signin', signIn);
router.get('/listUser',listUser);
router.get('/byid/:id',byId);
router.delete('/deleteuser/:id',deleteU);

router.put('/updateuser/:id',upload.single('image'),(req,res)=>{
    updateU(req,res,fileName);
    fileName = "";

})

module.exports = router;