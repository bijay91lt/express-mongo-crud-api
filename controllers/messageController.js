const Message = require('../models/Message');
const messageSchema = require('../validators/messageValidator');
const asyncHandler = require('../utils/asyncHandler')

// POST /messages
exports.createMessage = asyncHandler(async (req, res, next) => {
    const{ sender, message } = req.body;
    if(!sender || !message){
        return res.status(400).json({error: 'Missing fields'});
    }

    try{
        const newMsg = await Message.create({ sender, message});
        res.status(201).json({success: true, message: newMsg});
    } catch (err) {
        console.error('Error saving message: ', err.message);
        res.status(500).json({error: 'Failed to save message'});
    }
});

// GET /messages/:sender
exports.getMessagesBySender = asyncHandler (async (req, res, next) => {
    const sender = req.params.sender;
    const messages = await Message.find({ sender});

    if(!messages.length){
        return res.status(404).json({ error: `No messages found for ${sender}`});
    }

    res.json(messages);
});


//GET /messages
exports.getAllMessages = asyncHandler(async(req, res) => {
    const messages = await Message.find().sort({_id: -1});
    res.json(messages);
});

//GET /messages/:id
exports.getMessageById = asyncHandler(async (req, res) => {
    const message = await Message.findById(req.params.id);
    if(!message){
        return res.status(404).json({error: 'Message not found'});
    }
    res.json(message);
});

//PUT /messages/:id
exports.updateMessage = asyncHandler(async (req, res) => {
    const value = await messageSchema.validateAsync(req.body);
    const message = await Message.findByIdAndUpdate(req.params.id, value, {new: true});

    if(!message){
        return res.status(404).json({error: 'Message not found'});
    }
    res.json({success: true, message});
});

//DELETE /messages/:id
exports.deleteMessage = asyncHandler(async (req, res) => {
    const message = await Message.findByIdAndDelete(req.params.id);

    if(!message){
        return res.status(404).json({error: 'Message not found'});
    }
    res.json({ success: true, message: 'Message deleted successfully'});
});