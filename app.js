const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

const authRoutes = require('../routes/auth');
app.use('/auth', authRoutes);

// Connect to MongoDB
const connectDB = require('./config/db');
connectDB();

//middleware
const logger = require('./middleware/logger');
app.use(logger);

// Use the message routes
const messageRoutes = require('./routes/messages');
app.use('/messages', messageRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


//Error handling middleare 
app.use((err, req, res, next) => {

  //Handle Joi validation errors
  if(err.isJoi){
    return res.status(400).json({error: err.details[0].message});
  }

  //Fallback for all other errors
  console.error('Uncaught Error:', err.stack);
  res.status(500).json({error: "Internal Server Error"});
})

const morgan = require('morgan');
app.use(morgan('dev'));