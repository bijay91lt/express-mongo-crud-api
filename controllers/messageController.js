const Message = require('../models/Message');
const messageSchema = require('../validators/messageValidator');

// POST /messages
exports.createMessage = async (req, res, next) => {
    try {
        //validate input
        const {error, value} = messageSchema.validate(req.body);

        if(error){
            return res.status(400).json({error: error.details[0].message});
        }

        //use validated date
        const {sender, message} = value;
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
