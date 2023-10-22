import { Router } from 'express';
import {
  getUserById, getUsers, updateUserInfo, updateUserAvatar,
} from '../controllers/users';
import auth from '../middleware/auth';
import { UserValidationSchema, userLinkValidationSchema } from '../validations/user';

const usersRouter = Router();
usersRouter.get('/users', auth, getUsers);
usersRouter.get('/users/:userId', auth, userLinkValidationSchema, getUserById);
usersRouter.patch('/users/me', UserValidationSchema, auth, updateUserInfo);
usersRouter.patch('/users/me/avatar', UserValidationSchema, auth, updateUserAvatar);

export default usersRouter;
