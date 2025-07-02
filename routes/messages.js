const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// POST /messages
router.post('/', async (req, res) => {
  try {
    const { sender, message } = req.body;

    if (!sender || !message) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const newMsg = new Message({ sender, message });
    const savedMsg = await newMsg.save(); // save to MongoDB

    res.status(201).json({ success: true, message: savedMsg });
  } catch (err) {
    console.error('❌ Error saving message:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /messages/:sender
router.get('/:sender', async (req, res) => {
  try {
    const messages = await Message.find({ sender: req.params.sender });
    res.json(messages);
  } catch (err) {
    console.error('❌ Error fetching messages:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
