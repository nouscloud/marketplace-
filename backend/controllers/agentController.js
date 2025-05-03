const Agent = require('../models/Agent');

exports.createAgent = async (req, res) => {
  try {
    const agent = await Agent.create({ ...req.body, uploaded_by: req.user.id });
    res.status(201).json(agent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAgents = async (req, res) => {
  console.log('✅ GET /api/agents called'); // Add this
  try {
    const agents = await Agent.find().populate('uploaded_by');
    res.status(200).json({ agents });
  } catch (err) {
    console.error('❌ Error:', err.message);
    res.status(500).json({ message: err.message });
  }
};


exports.searchAgents = async (req, res) => {
  const { name } = req.query;
  const agents = await Agent.find({ name: new RegExp(name, 'i') });
  res.json({ agents });
};

exports.userDashboard = async (req, res) => {
  const userId = req.user.id;
  const agents = await Agent.find({ uploaded_by: userId });
  res.json({ agents });
};

exports.updateAgent = async (req, res) => {
    try {
      const agent = await Agent.findById(req.params.id);
  
      if (!agent) return res.status(404).json({ error: 'Agent not found' });
      if (agent.uploaded_by.toString() !== req.user.id)
        return res.status(403).json({ error: 'Not authorized to update this agent' });
  
      const updated = await Agent.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json({ updated })
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  exports.deleteAgent = async (req, res) => {
    try {
      const agent = await Agent.findById(req.params.id);
  
      if (!agent) return res.status(404).json({ error: 'Agent not found' });
      if (agent.uploaded_by.toString() !== req.user.id)
        return res.status(403).json({ error: 'Not authorized to delete this agent' });
  
      await Agent.findByIdAndDelete(req.params.id);
      res.json({ message: 'Agent deleted successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  