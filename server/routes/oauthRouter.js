const express = require('express');
const router = express.Router();
const oauthController = require('../controllers/oauthController');

router.get('/auth', oauthController.saveInfo, async(req, res) => {
    res.status(200).redirect(res.locals.request_get_auth_code_url);
})

module.exports = router;