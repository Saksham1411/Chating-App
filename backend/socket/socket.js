const express = require('express');
const {Server} = require('socket.io');
const http = require('http');

const app = express();

const PORT = process.env.PORT || 4000;
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: [`http://localhost:${PORT}`],
		methods: ["GET", "POST"],
	},
    credentials:true
});


const userSocketMap = {};

const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

io.on('connection',(socket)=>{
    console.log("userConnected",socket.id);

    const userId = socket.handshake.auth.userId;
    if(userId){
        userSocketMap[userId] = socket.id;
    }
    io.emit("getOnlineUsers",Object.keys(userSocketMap));


    socket.on("disconnect",()=>{
        console.log("user disconnected",socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
    })
})

module.exports = { app, io, server,getReceiverSocketId };