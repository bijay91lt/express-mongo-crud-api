const axios = require('axios');
const { BASE_URL } = require('./config');

async function getAllMessages() {
  try {
    const res = await axios.get(`${BASE_URL}/messages`);
    console.log('📥 All Messages:');
    res.data.forEach((msg, index) => {
      console.log(`${index + 1}. [${msg._id}] ${msg.sender}: ${msg.message}`);
    });
  } catch (err) {
    console.error('❌ Error fetching messages:', err.response?.data || err.message);
  }
}

getAllMessages();
