const db = require('../db');
const passport = require('passport');
//const githubStrategy = require('passport-github2').Strategy;
const express = require('express');
require('dotenv').config();
const router = express.Router();

const clientID = process.env.GitHubClientID ?? "";
const clientSecret = process.env.GitHubClientSecret ?? "";

// passport.use(
//   new githubStrategy(
//     {
//       clientID: clientID,
//       clientSecret: clientSecret,
//       callbackURL: 'http://localhost:5173/home',
//     },
//     async (accessToken, refreshToken, profile, cb) => {
//       try {
//         const userQuery = `SELECT * FROM clients WHERE username = $1`;
//         const { rows } = await db.query(userQuery, [profile.username]);

//         if (rows.length === 0) {
//           const gitHubUser = `INSERT INTO clients (username, password, email) VALUES ($1, $2, $3)`;
//           const values = [profile.username, 'ghubpassword', 'ghub@ghub.com'];
//           const createdUser = await db.query(gitHubUser, values);
//         }

//         return cb(null, profile);
//       } catch (error) {
//         return cb(error);
//       }
//     }
//   )
// );


router.get('/', passport.authenticate('github', { scope: ['user:email'] }));

router.get(
  '/callback',
  passport.authenticate('github', { failureRedirect: '/error' }),
  (req, res, next) => {
    res.sendStatus(200);
  }
);

router.get('/success', async (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
