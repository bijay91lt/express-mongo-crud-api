const express = require('express');
const router = express.Router();
const User = require('../models/User')

router.get('/', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

router.post('/', async (req, res) => {
    const {name} = req.body;
    if(!name) return res.status(400).json({error: 'Name is required'});
    
    const newUser = new User({ name});
    await newUser.save();

    res.status(201).json({success: true, user: newUser});
});

module.exports = router;