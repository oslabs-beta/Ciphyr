const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alertController')

router.post('/', alertController.getCriteria, alertController.calculate, alertController.sendEmail, (req, res) => {
  console.log('through all middleware');
  const { preference } = res.locals;
  return res.status(200).json(preference);
})

router.post('/update', alertController.update, (req, res) => {
  console.log('through all middleware');
  return res.status(200)
})


module.exports = router;