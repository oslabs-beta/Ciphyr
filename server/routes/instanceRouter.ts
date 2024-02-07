import express, { Request, Response} from 'express';
const router = express.Router();
const instanceController = require('../controllers/instanceController');

router.get('/', instanceController.getInstances, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.showInstance);
})

router.post('/newInstance', instanceController.verifyToken, instanceController.createInstance, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.instance);
});

router.post('/deleteInstance', instanceController.deleteInstance, (req: Request, res: Response) => {
  return res.status(200)
})

export default router

