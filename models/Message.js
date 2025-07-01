const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    sender: {type: String, require: true},
    message: { type: String, require: true},
});

module.exports = mongoose.model('Message', messageSchema);