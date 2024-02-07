import express, { Request, Response, NextFunction } from 'express';
const port = process.env.PORT || 3000;
const app = express();
import userRouter from './routes/userRouter';
import instanceRouter from './routes/instanceRouter';
import logRouter from './routes/logRouter';
//const oauthRouter = require('./routes/oauthRouter')
import oauthController from './controllers/oauthController';
import alertRouter from './routes/alertRouter';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https' && process.env.NODE_ENV === 'production') {
    res.redirect(`https://${req.header('host')}${req.url}`);
  } else {
    next();
  }
});

// app.use('/api/auth', oauthRouter);
app.use('/api/user', userRouter);
app.use('/api/instance', instanceRouter);
app.use('/api/log', logRouter);
app.use('/api/alert', alertRouter);
//process.env.REDIRECT_URI
app.get(process.env.REDIRECT_URI as string, oauthController.getAccessToken, oauthController.getUserProfile,
  oauthController.saveOauthUser, async (req, res) => {
    res.redirect('/home');
});

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../dist')));

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
});

app.use('*', (req, res) => res.status(404).send('Not Found'));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}...`);
});
