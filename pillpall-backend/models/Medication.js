const mongoose = require('mongoose');

const MedicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  dose: { type: String, required: true },
  frequency: { type: String, required: true },
  reminderTime: { type: Date }
});

module.exports = mongoose.model('Medication', MedicationSchema);
