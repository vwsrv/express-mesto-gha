import { Router } from 'express';
import {
  getCurrentUserInfo, getUsers, updateUserInfo, updateUserAvatar, getUserById,
} from '../controllers/users.js';
import { userLinkValidationSchema, updateUserValidationSchema } from '../validations/users.js';

const usersRouter = Router();
usersRouter.get('/users', getUsers);
usersRouter.get('/users/me', getCurrentUserInfo);
usersRouter.get('/users/:userId',  getUserById);
usersRouter.patch('/users/me',  updateUserInfo);
usersRouter.patch('/users/me/avatar',  updateUserAvatar);

export default usersRouter;
