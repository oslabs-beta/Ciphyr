import express, { Request, Response } from 'express';
const router = express.Router();
const logController = require('../controllers/logController');

router.post('/', logController.getAllLog, async (req: Request, res: Response) => {
  return res.status(200).json(res.locals.allLog);
});

router.get('/getLogCount', logController.newLogInfo, async (req: Request, res: Response) => {
  return res.status(200).json(res.locals.logCount);
})


export default router;