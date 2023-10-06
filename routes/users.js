import { Router } from "express";
import { getUserById, getUsers, createUser, updateUserInfo, updateUserAvatar } from "../controllers/users";

const usersRouter = Router();
usersRouter.get('/users', getUsers);
usersRouter.get('/users/:userId', getUserById);
usersRouter.post('/users/', createUser);
usersRouter.patch('/users/me', updateUserInfo);
usersRouter.patch('/users/me/avatar', updateUserAvatar);

export default usersRouter