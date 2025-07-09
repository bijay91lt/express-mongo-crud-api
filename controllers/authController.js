const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs')

exports.register = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    console.log("🔁 Registering:", email, role);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Already exists");
      return res.status(400).json({ error: 'Email already exists' });
    }

    const newUser = new User({ email, password, role });
    const savedUser = await newUser.save();

    console.log("User saved:", savedUser);
    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if(!email || !password){
      return res.status(401).json({error: 'Email and password are required'});
    }
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