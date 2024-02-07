const Message = require('../models/message')
const Conversation = require('../models/Conversation');
const { getReceiverSocketId ,io } = require('../socket/socket');

const sendMessage = async(req,res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants:{ $all:[senderId,receiverId]}
        })
        
        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId,receiverId],
            })
        }

        const newMessage = await Message.create({
            senderId: senderId,
            receiverId: receiverId,
            message:message,
        })

        if(newMessage){
            conversation.messages.push(newMessage._id);
            conversation.save();
        }

        //socket.io

        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage);
        }

        res.status(201).json(newMessage);

    } catch (err) {
        console.log("error in sendMessage ", err.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

const getMessage = async(req,res) => {
    try {
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;

        const convo = await Conversation.findOne({
            participants:{ $all:[senderId,userToChatId]}
        }).populate("messages");

        if(!convo){
            return res.status(200).send([]);
        }

        res.status(200).json(convo);

    } catch (error) {
        console.log("error in sendMessage ", err.message);
        res.status(500).json({ error: "Internal server error" });
    }
}
module.exports = { sendMessage,getMessage };