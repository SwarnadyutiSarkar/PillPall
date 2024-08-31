const express = require('express');
const Medication = require('../models/Medication');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Middleware to authenticate user
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Unauthorized' });
    req.userId = decoded.userId;
    next();
  });
};

router.post('/add', authenticate, async (req, res) => {
  const { name, dose, frequency, reminderTime } = req.body;
  try {
    const newMedication = new Medication({ userId: req.userId, name, dose, frequency, reminderTime });
    await newMedication.save();
    res.status(201).json(newMedication);
  } catch (error) {
    res.status(500).json({ error: 'Error adding medication' });
  }
});

router.get('/', authenticate, async (req, res) => {
  try {
    const medications = await Medication.find({ userId: req.userId });
    res.json(medications);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching medications' });
  }
});

module.exports = router;
