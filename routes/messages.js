const express = require('express');
const router = express.Router();
const {
    createMessage,
    getMessagesBySender
} = require('../controllers/messageController');

// POST /messages
router.post('/', createMessage);

// GET /messages/:sender
router.get('/:sender', getMessagesBySender);

module.exports = router;
