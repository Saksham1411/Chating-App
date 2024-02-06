const express = require('express');
const { sendMessage,getMessage } = require('../controllers/message')
const authorization = require('../middleware/authorization');
const router = express.Router();

router.get("/:id", authorization, getMessage);
router.post("/send/:id", authorization, sendMessage);

module.exports = router;