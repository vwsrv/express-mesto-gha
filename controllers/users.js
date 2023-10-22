// eslint-disable-next-line import/no-extraneous-dependencies
import User from '../models/user';
import AuthError from '../validations/AuthError';
import NotFoundError from '../validations/NotFoundError';
import { STATUS } from '../utils/constants';

export const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(STATUS.OK).send({ data: users }))
    .catch(next);
};

export const getUserById = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError('Пользователя с таким _id не существует');
    })
    .then((data) => {
      res.status(STATUS.OK).send({ data });
    })
    .catch(next);
};

export const updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true, upsert: true },
  )
    .orFail(() => {
      throw new NotFoundError('Пользователя с таким _id не существует');
    })
    .then((updatedUserInfo) => {
      res.status(STATUS.CREATED).send({ data: updatedUserInfo });
    })
    .catch(next);
};

export const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true, upsert: true })
    .orFail(() => {
      throw new AuthError('Пользователь с таким ID не зарегистрирован');
    })
    .then((updatedAvatar) => {
      res.status(STATUS.CREATED).send({ data: updatedAvatar });
    })
    .catch(next);
};
