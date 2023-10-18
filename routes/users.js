import { Router } from 'express';
import {
  getUserById, getUsers, createUser, updateUserInfo, updateUserAvatar,
} from '../controllers/users';
import auth from '../middleware/auth';

const usersRouter = Router();
usersRouter.get('/users', auth, getUsers);
usersRouter.get('/users/me', auth, getUserById);
usersRouter.post('/signup', createUser);
usersRouter.patch('/users/me', auth, updateUserInfo);
usersRouter.patch('/users/me/avatar', auth, updateUserAvatar);

export default usersRouter;
