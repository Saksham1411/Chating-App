const express = require('express');
const { login, logout, signup,getUsersForSidebar } = require("../controllers/user.js");
const authorization = require('../middleware/authorization.js');

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.get("/users",authorization,getUsersForSidebar);


module.exports =  router;