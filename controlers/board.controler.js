const Board = require('../models/board.model');
const createBoard= async (id)=>{
 
  try{
    
    let board = new Board();
    board.date = new Date();
    board.projectId = id;
    let result = await board.save();
    return result ;
  }
  catch(err){
    throw err ;
  }
  
} ;
 
const byId= (req,res)=>{
  Board.findOne( {projectId : req.params.id} ).populate({
    path : 'projectId',
    model : 'Project'
  }).exec()
  .then (
    (found)=>{
      res.send(found);
    }
  )
  .catch(
    (err)=>{
      res.send(err);
      console.log(err);
      
    }
  )


} ;
const deleteB= (req,res)=>{
  Board.findByIdAndDelete({ _id : req.params.id })
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
const updateB= (req,res)=>{
  let data = req.body;
  let id = req.params.id
  Board.findByIdAndUpdate( { _id : id  },data )
  .then (
    (beupdated)=>{
      res.send(beupdated);
    }
  )
  .catch(
    (err)=>{
      res.send(err);
    }
  )

} ;
const deleteProjectBoards= async (projectId)=>{
  try{
    let result = await Board.findOneAndDelete( { projectId : projectId } );
    return result ;
  }
  catch(err){
    throw err ;
  } 
 } ;
module.exports  = {createBoard,byId, deleteB, updateB, deleteProjectBoards} ;
