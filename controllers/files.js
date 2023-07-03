
const S3Service = require('../services/S3services');
const GroupFiles = require("../models/groupfiles");
const Message = require('../models/message');

exports.downloadFiles = async (req,res,next)=>{
    try{
        // console.log('file********',req.file)
        // console.log('file********',req.user)
        // console.log('file********',req.params)
        const file = req.file.buffer;
        // console.log(req.user.dataValues.name)
        const id = req.user.dataValues.id;
        const name = req.user.dataValues.name;
        const groupId = req.params.groupId;
    // console.log(groupId,name,id)
    //    const userId = req.user.id;
        const fileName = `${req.file.originalname}`; 
    
        // console.log(fileName,'****************************');
        const fileUrl = await S3Service.uploadToS3(file, fileName);    
        
        console.log("fileUrl",fileUrl);
        const abc=await GroupFiles.create({url:fileUrl, groupId:groupId});
        const msg = await Message.create({message:fileUrl, from:name, userId:id, groupId:groupId});
        res.status(200);
      }
      catch(err){
        console.log(err);
        res.status(500).json({fileUrl:'',success:false,err:err});
      }   
    }