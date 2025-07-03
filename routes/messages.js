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
    console.error('Error saving message:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Get all messages
router.get('/', async(req, res) => {
  try{
    const messages = await Message.find().sort({createdAt: -1});
    res.json(messages);
  } catch(err){
    res.status(500).json({error: "Failed to fetch messages"});
  }
})
// GET /messages/:sender
router.get('/:sender', async (req, res) => {
  try {
    const messages = await Message.find({ sender: req.params.sender });
    res.json(messages);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Update a message by ID
router.put('/:id', async (req, res) => {
  try{
    const { message } = req.body;
    const updated = await Message.findByIdAndUpdate(
      req.params.id,
      {message}, 
      {new: true}
    );
    if(!updated) return res.status(404),json({error: "Message not found"});
    res.json(updated);
  } catch (err){
    res.status(500).json({error: "Failed to update message"});
  }
})

router.delete('/:id', async(req, res) => {
  try{
    const deleted = await Message.findByIdAndDelete(req.params.id);
    if(!deleted) return res.status(404)/json({error: "Message not found"});
    res.json({success: true});
  } catch (err) {
    res.status(500).json({error: "Failed to delete message"});
  }
})

module.exports = router;
