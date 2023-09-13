const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');

<<<<<<< HEAD

=======
>>>>>>> e994e4c5d5fc741363dbda67598f07582f006fca
router.post('/', logController.getAllLog, async (req, res) => {
  return res.status(200).json(res.locals.allLog);
  // .writeHead(200, { 'Content-Type': 'application/javascript' })
  // .end(`window.__APP_VARIABLES__ = ${JSON.stringify(res.locals.allLog)}`);
});

module.exports = router;