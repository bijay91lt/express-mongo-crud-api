const axios = require('axios')

const BASE_URL = 'http://127.0.0.1:3000';


async function sendMessage(sender, message){
    try{
        const res = await axios.post(`${BASE_URL}/messages`, {
            sender, 
            message,
        });
        console.log('Sent: ', res.data);
    } catch (err){
        console.log('Error sending: ', err.response?.data || err.message);
    }
}

sendMessage('Bijay', 'Hello from Axios!');