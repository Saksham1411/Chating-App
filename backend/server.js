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
    origin: "http://localhost:5173",
}));
app.use(express.urlencoded());

app.use('/', userRoutes);
app.use('/', messageRoutes);

mongoose.connect(process.env.MONGO_URI).then(console.log('conected'))
server.listen(PORT, () => console.log('working'));