const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs')

exports.register = async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.create({ email, password});
        res.status(201).json({message: 'User created', user: user.email});
    } catch (err){
        res.status(400).json({ error: 'email already exists '});
    }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    // Create token with role
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful', token });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};