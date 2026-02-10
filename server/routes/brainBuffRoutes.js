const express = require('express');
const router = express.Router();
const { getCurrentBrainBuff, forceGenerateBrainBuff } = require('../controllers/brainBuffController');

router.get('/current', getCurrentBrainBuff);
router.post('/generate', forceGenerateBrainBuff); // Optional: protect this route

module.exports = router;
