require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose');
const path = require('path')

const app = express();

//connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log('MongoDB connection error:', err));         

//Built-in middleware
app.use(express.json());

//Custom logging middleware
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
})

//Serve static files from public/
app.use(express.static(path.join(__dirname, 'public')));

//Route modules
const userRoutes = require('./routes/users');
const messageRoutes = require('./routes/messages');

app.use('users', userRoutes);
app.use('/messages', messageRoutes);

//Start server
const PORT = process.env.Port ||3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});