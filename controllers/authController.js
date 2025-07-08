const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
    const {username, password} req.body;
    try{
        const user = await User.create({ username, password});
        res.status(201).json({message: 'User created', user: user.username});
    } catch (err){
        res.status(400).json({ error: 'Username already exists '});
    }
};

exports.login = async (req, res) => {
    const {username, password} = req.body;
    try{
        const user = await User.findOne({username});
        if(!user || !(await user.comparePassword(password)))
            return res.status(401).json({ error: 'Invalid credentials'});

        const token = jwt.sign({ userId:  user._id}, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.json({ message: 'Login successful', token});
    } catch(err){
        res.status(500).json({error: 'Server error'});
    }
}