import { Router } from 'express';
import {
  getUserById, getUsers, updateUserInfo, updateUserAvatar,
} from '../controllers/users';
import { userLinkValidationSchema, updateUserValidationSchema } from '../validations/users';

const usersRouter = Router();
usersRouter.get('/users', getUsers);
usersRouter.get('/users/:userId', userLinkValidationSchema, getUserById);
usersRouter.patch('/users/me', updateUserValidationSchema, updateUserInfo);
usersRouter.patch('/users/me/avatar', updateUserValidationSchema, updateUserAvatar);

export default usersRouter;
