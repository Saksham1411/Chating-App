require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');
const cors = require('cors');
const {app,server} = require('./socket/socket')

const PORT = process.env.PORT || 4000;

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    credentials: true,
    origin:process.env.FRONTEND
}));
console.log(process.env.FRONTEND);
app.use(express.urlencoded());

app.use('/api', userRoutes);
app.use('/api', messageRoutes);

app.get('/',(req,res)=>{
    res.send('<h1>hello</h1>');
})

// app.use(express.static(path.resolve("./frontend/dist")));
// app.get("*",(req,res)=>{
//     res.send(path.resolve("./frontend/dist/index.html"));
// })


mongoose.connect(process.env.MONGO_URI).then(console.log('conected'))
server.listen(PORT, () => console.log('working'));