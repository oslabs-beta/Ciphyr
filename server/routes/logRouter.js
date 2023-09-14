const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');

router.post('/', logController.getAllLog, async (req, res) => {
  return res.status(200).json(res.locals.allLog);
  // .writeHead(200, { 'Content-Type': 'application/javascript' })
  // .end(`window.__APP_VARIABLES__ = ${JSON.stringify(res.locals.allLog)}`);
});

// router.post('/sQuery', logController.getSuspiciousLog, async (req, res) => {
//   return res.status(200).json(res.locals.suspiciousLog);
// });

module.exports = router;