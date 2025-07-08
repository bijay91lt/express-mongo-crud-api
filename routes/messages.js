const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorize');
const Message =  require('../models/Message');
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
router.delete('/:id', authMiddleware, authorize('admin'), async (req, res) => {
  try{
    await Message.findByIdAndDelete(req.params.id);
    res.json({message: 'Deleted successfully'});
  } catch (err) {
    res.status(500).json({error: 'Error deleting'});
  }
});

module.exports = router;
