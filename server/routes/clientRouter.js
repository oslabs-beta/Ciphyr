const express = require('express');
const router = express.Router();
const userController = require('../controllers/clientController');
const jwt = require('jsonwebtoken');
// import express from 'express';
// import userController from './controllers/clientController.js';

router.post('/signup', userController.signup, async (req, res) => {
  return res.status(200).json(res.locals.newClient);
});

router.post('/login', userController.login, async (req, res) => {
  if (!res.locals.result.verified) {
    return res.status(401).json(res.locals.result)
  } else {
    return res.status(200).header("auth-token", res.locals.result.token).json(res.locals.result);
  }
});

module.exports = router;
