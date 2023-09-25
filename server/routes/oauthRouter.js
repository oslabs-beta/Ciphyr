const db = require('../db');
const passport = require('passport');
const githubStrategy = require('passport-github2').Strategy;
const express = require('express');
require('dotenv').config();
const router = express.Router();
const bcrypt = require('bcrypt');
const salt = 10;
// const jwt = require('jsonwebtoken');

const GITHUB_CLIENT_ID = process.env.CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.CLIENT_SECRET;

//persist user
passport.serializeUser((user, done) => {
  done(null, user);
});
//depersist user
passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new githubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:5173:/api/auth/github/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      // try{
      const userQuery = `SELECT * FROM clients WHERE username = $1`;
      const { rows } = await db.query(userQuery, [profile.username]);
      let hashedPassword = await bcrypt.hash('ghubpassword', salt);
      if (rows.length === 0) {
        const gitHubUser = `INSERT INTO clients (username, password, email) VALUES ($1, $2, $3)`;
        const values = [profile.username, hashedPassword, 'ghub@ghub.com'];
        const createdUser = await db.query(gitHubUser, values);
        console.log('github profile', profile);
      }
      //   res.cookie('token', accessToken, { httpOnly: true });
      return done(null, profile);
      //   } catch (error) {
      //     return cb(error, profile);
      //   }
    }
  )
);

router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get(
  '/github/callback',
  passport.authenticate('github', {
    successRedirect: 'http://localhost:5173/home',
    failureRedirect: 'http://localhost:5173/',
  })
);

// router.get('/success', async (req, res) => {
//   res.sendStatus(200);
// });

// passport.serializeUser((user, cb) => {
//   cb(null, user);
// });

// passport.deserializeUser((user, cb) => {
//   cb(null, user);
// });
module.exports = router;
