const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');

router.post('/', logController.getAllLog, async (req, res) => {
  return res.status(200).json(res.locals.allLog);
});

router.get('/getLogCount', logController.newLogInfo, async (req, res) => {
  return res.status(200).json(res.locals.logCount);
})




module.exports = router;