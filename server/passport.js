const passport = require('passport');
const GitHubStrategy = require('passport-github2');
require('dotenv').config();
const db = require('./db');
const bcrypt = require('bcrypt');
const salt = 10;

CLIENT_SECRET = process.env.CLIENT_SECRET;
CLIENT_ID = process.env.CLIENT_ID;

passport.serializeUser((user, done) => {
  //we're going to use the username to set a cookie for authentication
  done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
  //find the user based off the username from the cookie
  const userQuery = `SELECT * FROM clients WHERE username = $1`;
  const { rows } = await db.query(userQuery, [username]);
  done(null, rows[0]);
});

passport.use(
  new GitHubStrategy(
    {
      //options for the strategy
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: 'http://localhost:5173/api/auth/github/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      //passport callback function after authenthicating the code in the URI
      const userQuery = `SELECT * FROM clients WHERE username = $1`;
      const { rows } = await db.query(userQuery, [profile.username]);
      const hashedPassword = await bcrypt.hash(profile.username, salt);
      
      if (rows[0]) {
        console.log('user is: ', rows[0]);
        //pass user to serializeUser method
        done(null, rows[0]);
      } else {
        //if user isnt in our database, store it
        const gitHubUser = `INSERT INTO clients (username, password, email) VALUES ($1, $2, $3)`;
        const values = [profile.username, hashedPassword, 'ghub@ghub.com'];
        const createdUser = await db.query(gitHubUser, values);
        console.log('createdUser', createdUser);
        //pass user to serializeUser method
        done(null, createdUser);
      }
    }
  )
);
