const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorize');
const Message =  require('../models/Message');
const requireAdmin = require('../middleware/role')
const {
  createMessage,
  getMessagesBySender,
  getAllMessages,
  getMessageById,
  updateMessage,
  deleteMessage
} = require('../controllers/messageController');

router.get('/', getAllMessages);
router.get('/:sender', getMessagesBySender); // Consider moving this route down
router.get('/id/:id', getMessageById);
router.post('/', createMessage);
router.put('/:id', updateMessage);

//only admin can delete message
router.delete('/:id', authMiddleware, requireAdmin, deleteMessage);

module.exports = router;
