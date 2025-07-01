const express = require('express');
const router = express.Router();
const Message = require('../models/Message')

router.post('/', async(req, res) => {
    const {sender, message} = req.body;
    if(!sender || !message) return res.status(400).json({error:"Missing fields"});

    const newMSg = new Message({sender, message});
    await newMsg.save();

    res.status(201).json({success: true, message: newMsg});
});

router.get('/:sender', async (res, req) => {
    const sender = req.params.sender;
    const messages = await Message.find({sender});

    res.json(messages);
})

module.exports = router;
