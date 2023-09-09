const express = require('express');
const router = express.Router();
const userController = require('../controllers/clientController');
// import express from 'express';
// import userController from './controllers/clientController.js';

router.post('/signup', userController.signup, async (req, res) => {
  return res.status(200).json(res.locals.newClient);
});

router.post('/login', userController.login, async (req, res) => {
  return res.status(200).json(res.locals.verified);
});

module.exports = router;
