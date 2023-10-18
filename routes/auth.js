import { Router } from 'express';
import { loginUser } from '../controllers/auth';

const authRouter = Router();
authRouter.post('/signin', loginUser);

export default authRouter;
