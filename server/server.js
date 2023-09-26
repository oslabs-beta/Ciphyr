const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const userRouter = require('./routes/userRouter');
const instanceRouter = require('./routes/instanceRouter');
const logRouter = require('./routes/logRouter');
//const oauthRouter = require('./routes/oauthRouter')
const cookieParser = require('cookie-parser');
const cors = require('cors');
const githubRouter = require('./routes/githubRouter');
const passportSetup = require('./passport');
const passport = require('passport');
const cookieSession = require('cookie-session');
require('dotenv').config();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

//use cookiesession to persist passport authentication for 24hours
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['testtesttesttest'],
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', githubRouter);
app.use('/api/user', userRouter);
app.use('/api/instance', instanceRouter);
app.use('/api/log', logRouter);

app.use('*', (req, res) => res.status(404).send('Not Found'));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}...`);
});
