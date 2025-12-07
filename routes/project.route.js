const express = require('express');
const router = express.Router();
const multer = require('multer');
const {create , list , byId, deleteP, updateP,preview} = require('../controlers/project.controler');

fileNames = [];

const myStorage = multer.diskStorage({
    destination : './uploads/files',
    filename : (req,file,redirect)=>{
        fl = Date.now() +'.'+file.mimetype.split('/')[1];
        fileNames.push(fl);
        redirect(null,fl);
    }

})

const upload = multer({ storage : myStorage});

router.post('/create', upload.any('files'), async (req, res) => {
  try {
    // Call your create function, passing file names and the request
    await create(req, res, fileNames);

    // Reset the fileNames array for the next request
    req.fileNames = [];

  } catch (err) {
    console.error(err);
    res.status(500).send('Error while creating the project.');
  }
});

router.put('/updateproject/:id',upload.any('files'),(req,res)=>{
    updateP(req,res,fileNames);
    fileNames = [];
});


router.get('/list',list);
router.get('/byid/:id',byId);

router.delete('/deleteproject/:id',deleteP);


router.get('/preview/:id',preview);


module.exports = router ;