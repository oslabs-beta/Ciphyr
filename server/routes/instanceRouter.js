const express = require('express');
const router = express.Router();
const instanceController = require('../controllers/instanceController');

router.post('/newInstance', instanceController.verifyToken, instanceController.createInstance, (req, res) => {
  return res.status(200).json(res.locals.instance)
});

module.exports = router;

