import express, { Request, Response } from 'express';
const router = express.Router();
import alertController from '../controllers/alertController';


router.post('/', alertController.getCriteria, alertController.calculate, alertController.sendEmail, (req: Request, res: Response) => {
  console.log('through all middleware');
  const { preference } = res.locals;
  return res.status(200).json(preference);
})

router.post('/update', alertController.update, (req: Request, res: Response) => {
  console.log('through all middleware');
  return res.status(200)
})


export default router