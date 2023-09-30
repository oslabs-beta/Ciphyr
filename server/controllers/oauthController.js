const query_string = require('querystring');
const jwt = require('jsonwebtoken');
const db = require('../db');
const oauthController = {};

const google_auth_token_endpoint =
  'https://accounts.google.com/o/oauth2/v2/auth';
const google_access_token_endpoint = 'https://oauth2.googleapis.com/token';

const query_params = {
  client_id: process.env.CLIENT_APP_ID,
  redirect_uri: `http://localhost:5173${process.env.REDIRECT_URI}`,
};

oauthController.saveInfo = async (req, res, next) => {
  try {
    // this objects contains information that will be passed as query params to the auth // token endpoint
    const auth_token_params = {
      ...query_params,
      response_type: 'code',
    };
    // the scopes (portion of user's data) we want to access
    const scopes = ['profile', 'email', 'openid'];
    // a url formed with the auth token endpoint and the
    res.locals.request_get_auth_code_url = `${google_auth_token_endpoint}?${query_string.stringify(
      auth_token_params
    )}&scope=${scopes.join(' ')}`;
    return next();
  } catch (err) {
    return next(err);
  }
};

oauthController.getAccessToken = async (req, res, next) => {
  try {
    const auth_code = req.query.code;
    const access_token_params = {
      ...query_params,
      client_secret: process.env.CLIENT_APP_SECRET,
      code: auth_code,
      grant_type: 'authorization_code',
    };
    const response = await fetch(
      `${google_access_token_endpoint}?${query_string.stringify(
        access_token_params
      )}`,
      {
        method: 'post',
      }
    );

    const data = await response.json();

    res.locals.accessToken = data.access_token;

    return next();
  } catch (err) {
    return next(err);
  }
};

oauthController.getUserProfile = async (req, res, next) => {
  try {
    const token = res.locals.accessToken;
    const url = `https://www.googleapis.com/oauth2/v3/userinfo?alt=json&access_token=${token}`;
    const response = await fetch(url, { method: 'post' });
    const profile = await response.json();

    res.locals.profile = profile;

    return next();
  } catch (err) {
    return next(err);
  }
};

oauthController.saveOauthUser = async (req, res, next) => {
  try {
    const username = res.locals.profile.name;
    const email = res.locals.profile.email;
    const emailQuery = `SELECT * FROM clients WHERE email = '${email}';`;
    const emailResult = await db.query(emailQuery);

    // save google user in db is email does not exist
    if (emailResult.rows.length === 0) {
      const createQuery = `INSERT INTO clients ( username, email) VALUES ('${username}', '${email}');`;
      const create = await db.query(createQuery);
    }

    const getUserQuery = `SELECT client_id FROM clients WHERE email = '${email}'`;
    const userResult = await db.query(getUserQuery);
    const clientID = userResult.rows[0].client_id;

    // same cookie actions as the login process. how to optimize this?
    const jwtToken = jwt.sign(
      { client_id: clientID },
      process.env.TOKEN_SECRET
    );
    //res.cookie("token", jwtToken, { httpOnly: true, secure: true });
    res.cookie('token', jwtToken);
    // username is less sensitive (public info)? So it's saved directly in cookie for verification
    //res.cookie("username", username, { httpOnly: true, secure: true });
    res.cookie('token', jwtToken);
    // res.locals.result = { verified: verified, message: "login successfully" };

    // update last_login time
    const loginQuery = `UPDATE clients SET last_login = NOW()
      WHERE client_id = '${clientID}';`;
    const loginUpdate = await db.query(loginQuery);

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = oauthController;
