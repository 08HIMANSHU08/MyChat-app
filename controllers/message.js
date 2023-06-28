
const Message = require('../models/messages');
const User = require('../models/user');
const sequelize = require('../util/database');
const jwt = require('jsonwebtoken');
const {Sequelize} = require('sequelize');

function generateAccessToken(id,name){
    // console.log(id,"wkefjrhkfwherifhuiywefiuh")
    return jwt.sign({userId:id,name:name},process.env.TOKEN_SECRET);
}

exports.getMessage = async(req,res,next)=>{
    try{
        // console.log(req.query.messageid)
        const msgId = req.query.messageid;
        // console.log("kjhdefwer",msgId)
        if(msgId==undefined || msgId==null){
            // console.log("kjhdefwer",msgId)
            const message = await Message.findAll();
            // console.log("qkjwehfhwqerhfiqheoiurh3iuo4ruewfuheou",message.length)
            // const user = await User.findByPk(req.user.id);
            res.status(200).json({allMessage:message,success:true});
        }
        else{
            // console.log(msgId)
            const message = await Message.findAll();
            // console.log("all message",message[0]);
            // console.log("new message",newmessage)
            // message.push(newmessage);
            // console.log("allmessage",message)
            // const user = await User.findByPk(req.user.id);
            const message10 = [];
            let msgcount=0;
            for(let i=message.length-1;i>=0;i--){
                if(msgcount==10)
                    break;
                message10.unshift(message[i]);
                msgcount++;
                // console.log(message[i])
            }
            // console.log('10 message',message10)
            res.status(200).json({allMessage:message10,success:true});
        }  
    }catch(err){
        console.log('get Msg is failed',JSON.stringify(err))
        res.status(500).json({error:err,success:false})
    }
}

exports.postMessage = async(req,res,next)=>{
    const t = await sequelize.transaction();
    try{
        // console.log(req.body);
        const {message,username} = req.body;
        const data = await Message.create({message:message,name:username,userId:req.user.id},{transaction:t});
        // console.log(data.userId);
        // const user = await User.findByPk(data.userId);
        // console.log(user);
        await t.commit();
        res.status(200).json({newMessage:[data],token:generateAccessToken(data.userId,data.name)});
        
    }catch(err){
        await t.rollback();
        res.status(500).json({success:false,error:"err"})
    }
}