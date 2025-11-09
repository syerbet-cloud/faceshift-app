require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const aiRoutes = require('./routes/aiRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', authRoutes);
app.use('/api', aiRoutes);
app.use('/payment', paymentRoutes);
app.use(express.static('frontend/dist'));

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/faceshift';

mongoose.connect(MONGODB_URI, {useNewUrlParser:true, useUnifiedTopology:true})
  .then(()=> {
    console.log('MongoDB connected');
    app.listen(PORT, ()=> console.log('Server running on port', PORT));
  })
  .catch(err=> {
    console.error('MongoDB connection error:', err);
    app.listen(PORT, ()=> console.log('Server running (no DB) on port', PORT));
  });
