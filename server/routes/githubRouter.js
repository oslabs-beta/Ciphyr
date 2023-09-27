const express = require('express');
const router = express.Router();
const passport = require('passport');
//auth login
// router.get('/login', (req, res) => {
//   res.render('login');
// });

// router.get('/logout', (req, res) => {
//   res.send('logging out');
// });

//auth with github

//send to github authentication page
router.get(
  '/github',
  passport.authenticate('github', {
    scope: ['user:email'],
  })
);

router.get('/github/callback', passport.authenticate('github'), (req, res) => {
  //take code from github URI to grab github user data
  res.redirect('/home');
});

module.exports = router;
