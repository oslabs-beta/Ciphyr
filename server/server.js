const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const userRouter = require('./routes/userRouter');
const instanceRouter = require('./routes/instanceRouter');
const logRouter = require('./routes/logRouter');
//const oauthRouter = require('./routes/oauthRouter')
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// const oauthController = require("./controllers/oauthController.js");

// app.use(
//   "/api/getAccessToken",
//   oauthController.getAccessToken,
//   oauthController.getUserData,
//   (req, res) => {
//     return res.status(200).redirect("/");
//   }
// );

app.use('/api/auth', oauthRouter);
app.use('/api/user', userRouter);
app.use('/api/instance', instanceRouter);
app.use('/api/log', logRouter);
//app.use('/api/github', oauthRouter)

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
