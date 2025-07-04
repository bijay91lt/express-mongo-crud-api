const express = require('express');
const router = express.Router();
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
router.delete('/:id', deleteMessage);

module.exports = router;
