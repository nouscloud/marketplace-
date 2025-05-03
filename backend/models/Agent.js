const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  uploaded_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  monetized: { type: Boolean, default: false }
});

module.exports = mongoose.model('Agent', agentSchema);
