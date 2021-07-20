import express from 'express';
import { loginController } from '../../../useCases/loginUser';

const userRouter = express.Router();

userRouter.post('/login', loginController.execute);

export { userRouter };
