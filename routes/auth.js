import { Router } from 'express';
import { loginUser, createUser } from '../controllers/auth';
import { UserValidationSchema } from '../validations/user';

const authRouter = Router();
authRouter.post('/signin', UserValidationSchema, loginUser);
authRouter.post('/signup', UserValidationSchema, createUser);

export default authRouter;
