const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');


router.get('/', logController.getAllLog, async (req, res) => {
  return res.status(200).json(res.locals.allLog);
});

module.exports = router;