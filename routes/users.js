import { Router } from "express";
import { getUserById, getUsers, createUser, updateUserInfo, updateUserAvatar } from "../controllers/users";

const router = Router();
router.get('/users', getUsers);
router.get('/users/:userId', getUserById);
router.post('/users/', createUser);
router.patch('/users/me', updateUserInfo);
router.patch('/users/me/avatar', updateUserAvatar);

export default router