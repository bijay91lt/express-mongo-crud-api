const Message = require('../models/Message');

// POST /messages
exports.createMessage = async (req, res, next) => {
    try {
        const { sender, message } = req.body;
        if (!sender || !message) {
            return res.status(400).json({ error: 'Missing fields' });
        }

        const newMsg = new Message({ sender, message });
        await newMsg.save();

        res.status(201).json({ success: true, message: newMsg });
    } catch (err) {
        console.error("Error saving message:", err);
        next(err);
    }
};

// GET /messages/:sender
exports.getMessagesBySender = async (req, res, next) => {
    try {
        const sender = req.params.sender;
        const messages = await Message.find({ sender });
        res.json(messages);
    } catch (err) {
        console.error(" Error fetching messages:", err);
        next(err);
    }
};
