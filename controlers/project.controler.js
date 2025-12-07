const Project = require('../models/project.model');
const { createBoard, deleteProjectBoards } = require('../controlers/board.controler');
 

const create= async (req,res,fileNames)=>{
    // try{
       
    //     let data = req.body;
    //     let project = new Project(data);
    //     project.date = new Date();
    //     project.files = fileNames;
    //     const teamKey = Object.keys(data).find(k => k.trim() === 'team');
    //     if (teamKey && data[teamKey]) {
    //         project.team = JSON.parse(data[teamKey]);
    //     }
    //     let result = await project.save()
    //     await createBoard(result.id) ;
    //     res.send(result);
    //     console.log(result.files);
    //     console.log(fileNames);
        
    // }
    // catch(err){

    //     console.error('❌ Error in create:', err);
    //     res.status(500).json({
    //         message: err.message,
    //         stack: err.stack,
    //     });
    // }
    try {
        
        let data = req.body;
        let project = new Project(data);
        project.files = fileNames;
        project.date = new Date();
        
        project.team = JSON.parse(data.team);

        let result = await project.save();

        createBoard(result._id);

        res.send(result);

    } catch (error) {
        res.send(error);
    }

} ;


const updateP= async (req,res,fileNames)=>{
    try{
        
        let data = req.body ; 
        let id = req.params.id ;
        data.team = JSON.parse(data.team);
        
        
        if(fileNames.length > 0)
            data.files = fileNames ;
        let toUpdated = await  Project.findByIdAndUpdate({ _id : id}, data );
        res.send( toUpdated );

    }
    catch(err){
        res.send(err);
    }

} ;





 
const byId= async (req,res)=>{
    try{
        let id = req.params.id ;
        let project = await Project.findById({ _id : id})
        res.send(project);
    }
    catch(err){
        res.send(err);
    }

} ;



const deleteP= async (req,res)=>{
    try{
        let id = req.params.id;
        let beDeleted = await Project.findByIdAndDelete({ _id : id});
        await deleteProjectBoards(id);
        res.send(beDeleted);
    }
    catch(err){
        res.send(err);
        console.log(err);
        
    }

} ;





const list= async (req,res)=>{
    try{
        let list = await Project.find().populate({
            path : 'client',
            model : 'Client'
        }).populate({
            path : 'team',
            model : 'User'
        })
        .exec();

        res.send(list);
        console.log(list);
        
    }
    catch(err){
        res.send(err);
    }

} ;




const preview= async (req,res)=>{
    try{
        let id = req.params.id;

        let project = await Project.findById({ _id : id})
        .populate({ 
            path : 'client',
            model : 'Client'
        })
        .populate({
            path : 'team',
            model : 'User'
        })
        .exec();
        res.send(project);
    }
    catch(err){
        res.send(err);
    }

} ;
module.exports  = {create , list , byId, deleteP, updateP,preview};