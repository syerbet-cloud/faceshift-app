const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password) return res.status(400).json({error:'email and password required'});
  const existing = await User.findOne({email});
  if(existing) return res.status(400).json({error:'user exists'});
  const hash = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hash, credits: 5, plan: 'free' });
  await user.save();
  res.json({status:'registered'});
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if(!user) return res.status(401).json({error:'invalid credentials'});
  const ok = await bcrypt.compare(password, user.password);
  if(!ok) return res.status(401).json({error:'invalid credentials'});
  const token = jwt.sign({ email }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '24h' });
  res.json({ token, email });
});

module.exports = router;
