const axios = require('axios');
const { BASE_URL } = require('./config');

async function deleteMessage(id) {
  if (!id) {
    return console.error('❌ Please provide a message ID to delete. Example:\nnode deleteMessage.js <message_id>');
  }

  try {
    const res = await axios.delete(`${BASE_URL}/messages/${id}`);
    console.log('🗑️ Deleted:', res.data);
  } catch (err) {
    console.error('❌ Error deleting message:', err.response?.data || err.message);
  }
}

const messageId = process.argv[2];
deleteMessage(messageId);
