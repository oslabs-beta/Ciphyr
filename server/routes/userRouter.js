const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const oauthController = require('../controllers/oauthController');

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

router.get('/oauth', oauthController.saveInfo, async(req, res) => {
  res.status(200).redirect(res.locals.request_get_auth_code_url);
})

router.get('/logout', userController.logout, (req, res) => {
  return res.status(202).clearCookie('token').clearCookie('username').send('Logged out successfully');
});

router.get('/getUserInfo', userController.getUserInfo, (req, res) => {
  return res.status(200).json(res.locals.userInfo); 
})

router.get('/getLastLogout', userController.getLastLogout, (req, res) => {
  return res.status(200).json(res.locals.lastLogout);
})

module.exports = router;
