const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createAgent,
  getAgents,
  searchAgents,
  userDashboard,
  updateAgent, 
  deleteAgent
} = require('../controllers/agentController');

router.post('/', auth, createAgent);
router.get('/', getAgents);
router.get('/search', searchAgents);
router.get('/my-agents', auth, userDashboard);
router.put('/:id', auth, updateAgent);
router.delete('/:id', auth, deleteAgent);


module.exports = router;
