const db = require('../db');

const oauthController = {};

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

oauthController.getAccessToken = async (req, res, next) => {
  const { code } = req.query;
  try {
    const response = await fetch(
      `https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      }
    );
    const accessToken = await response.json();
    console.log('access token', accessToken);
    res.locals.accessToken = accessToken;
    res.cookie('github', res.locals.accessToken.access_token);
    return next();
  } catch (err) {
    return next(err);
  }
};

oauthController.getUserData = async (req, res, next) => {
  const accessToken = res.locals.accessToken.access_token;
  console.log('in oauthController.getUserData')
  try {
    console.log('entered getUserData try block')
    const response = await fetch('https://api.github.com/user', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    console.log('github data', data);
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = oauthController;
