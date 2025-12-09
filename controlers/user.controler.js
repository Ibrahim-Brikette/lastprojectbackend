const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
 



const createAdmin= async (fileName)=>{
    //no req no res
    try{
    //         Comparaison entre exitAdmin.length == 0 et exitAdmin == null
    // ✅ exitAdmin.length == 0
    // - Cela signifie que la requête a renvoyé un tableau vide.
    // - User.find(...) retourne toujours un tableau, même si aucun document ne correspond.
    // - Donc exitAdmin.length == 0 est la bonne façon de vérifier qu’il n’y a aucun admin dans la base.
    // ❌ exitAdmin == null
    // - Cela vérifierait si exitAdmin est null, ce qui n’arrive jamais avec User.find(...).
    // - User.find(...) retourne un tableau, jamais null — sauf en cas d’erreur, mais là tu aurais une exception ou un catch.
    // 🧠 En résumé
    // let exitAdmin = await User.find({ role: 'admin' });

    // if (exitAdmin.length === 0) {
    //   // Aucun admin trouvé
    // }


    // Et non, exitAdmin == null ne serait pas équivalent — ça raterait le cas du tableau vide.
    // Tu veux aller plus loin sur les différences entre findOne, find, et les cas où null peut apparaître ?

        let exitAdmin = await User.find({ role : 'admin' });
        if (exitAdmin.length == 0){
            let data = {
                fullname : 'ADMIN',
                email : process.env.EMAIL,
                password : process.env.PASSW,
                image : ('admin.png'),//./uplaods/users/admin.png
                date : new Date(),
                phone : process.env.PHONE,
                role : 'admin'
            }
            let admin = new User(data);
            admin.password = bcrypt.hashSync(data.password,10);
            await admin.save() ;
            lognsole.log('admin created');
             
            
        }
        else{
            console.log('admin already exists');
        }
          
        
    }
    catch(err){
        console.log(err);

    }

} ;
const createUser= async (req,res,fileName)=>{
    
    try{
        let { fullname,email, password, phone, tools } = req.body;
        tools = JSON.parse(tools);
        let user = new User({ fullname,email, password, phone, tools } );
        user.date = new Date();
        user.role = 'user';
        user.password = bcrypt.hashSync(password,10);
        user.image = fileName;
        res.status(200,201).send( await user.save() );
    }
    catch(err){
        res.status(400).send(err)
 
        
    }

};
const signIn= async (req,res)=>{
    try{
        let {email,password} = req.body;
        console.log(email);
        console.log(password);
        
        
        let user = await User.findOne({ email : email});
         
        
        if(!user){
            return res.send('email or password invalid');
        }
         
        else{
            if(!bcrypt.compareSync(password , user.password)){
                return res.send('email or password invalid');
            }
            
                let payload = {
                    fullname : user.fullname,
                    email : user.email,
                    phone : user.phone,
                    image : user.image,
                    role : user.role,
                    tags : user.tags,
                    date: user.date
                }
                let token = jwt.sign( ); //jwt.sign(payload,processs.env.SECRET_KEY);
                
                res.send({myToken : token})
                }
                    
         

    }
    catch(err){
        console.log(err);
        res.send(err);
        
    }

};
const listUser= async (req,res)=>{
    try{
        res.send( await User.find( {role : 'user'},{password:0} ) )
    }
    catch(err){
        res.send(err);
    }
     

};


const byId= async (req,res)=>{
    try{
        let user = await User.findById({ _id : req.params.id } , {password:0})
     
        res.send(user);
        
    }
    
    catch(err){
        res.send(err);
    }
    

} ;
const deleteU= async (req,res)=>{
    try{
        let todelete = await User.findByIdAndDelete({ _id : req.params.id } , {password:0})
     
        res.send(todelete);
        
    }
    
    catch(err){
        res.send(err);
    }

} ;
const updateU= async (req,res,fileName)=>{
    
    try{
        
        let data = req.body;
        let id =  req.params.id ;
        if (fileName && fileName.length > 0) {
          data.image = fileName;
        }
        data.tools = JSON.parse(data.tools);
        if (data.password && data.password.trim().length > 0) {
            data.password = await bcrypt.hash(data.password, 10);
        } else {
            delete data.password;
        } 
        let updatedUser = await User.findByIdAndUpdate({ _id : id},data );
        let payload = {
            fullname : updatedUser.fullname,
            email : updatedUser.email,
            phone : updatedUser.phone,
            image : updatedUser.image,
            role : updatedUser.role,
            tags : updatedUser.tags,
            date: updatedUser.date
        }
        let token = jwt.sign(payload,process.env.SECRET_KEY);
        res.send({myToken : token})
 

    }
    catch(err){
        console.log(err);
        res.send(err);
        

    }

} ;
 
module.exports  = {createAdmin, createUser, signIn, listUser, byId, deleteU, updateU};