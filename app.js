
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const multer = require('multer');
const upload = multer();
const sequelize = require('./util/database');
const CronJob = require('cron').CronJob;
const http = require('http');
const socketio = require('socket.io');

const User = require('./models/user');
const Message = require('./models/message');
const Group = require('./models/group');
const GroupUser = require('./models/groupUser');
const Files = require('./models/groupfiles');
const Archieve = require('./models/archieve-chat');

const app = express();
const server = http.createServer(app);
const io = socketio(server);  


app.use(cors({
    origin : '*',
}));

app.use(bodyParser.json());


User.hasMany(Message);
Message.belongsTo(User);

Group.belongsToMany(User, {through: GroupUser});
User.belongsToMany(Group, {through: GroupUser});

Group.hasMany(Message);
Message.belongsTo(Group);

Group.hasMany(Files);


const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');
const chatRoutes = require('./routes/chat');
const adminRoutes = require('./routes/admin');
const fileRoutes = require('./routes/group-files');

app.use('/user', userRoutes);
app.use('/message', messageRoutes);
app.use('/chat', chatRoutes);
app.use('/admin', adminRoutes);
app.use('/file', upload.single('myfile'),fileRoutes);

app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, `${req.url}`));
});

sequelize.sync()
    .then(() => {
        server.listen(process.env.PORT,()=>{
            console.log('server is listening');
        })
    
        io.on('connection',(socket) => {
            console.log('user connected');

            socket.on('send-message', (msg,id) => {
                console.log('groupId :',id);
                console.log('Received message:',msg);
                io.emit('receivedMsg', id);
            });
            
            socket.on('disconnect',()=>{
                console.log('user disconnected');
            });
        })
        
        new CronJob('0 0 * * *', async function() {
            const chats = await Message.findAll();
            console.log('daily chat',chats);
        
            for (const chat of chats) {
                await Archieve.create({ groupId: chat.groupId, userId: chat.userId, message: chat.message });
                console.log('id',chat.id)
                await Message.destroy({where:{id:chat.id}})
            }
            },
            null,
            true,
        );
    })
    .catch(error => console.log("error in appjs file"));

   