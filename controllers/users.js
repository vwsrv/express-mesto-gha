// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from 'bcryptjs';
import User from '../models/user';
import { userValidation, userAvatarValidation } from '../validations/user';
import AuthError from '../validations/AuthError';
import NotFoundError from '../validations/NotFoundError';
import CastError from '../validations/CastError';

export const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

export const createUser = (req, res, next) => {
  const { error } = userValidation(req.body);
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      console.log(err);
      if (error) {
        return res.status(400).send({ message: error.details[0].message });
      }
      return next();
    });
};

export const getUserById = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new CastError('Переданы некорректные данные для получения профиля');
    })
    .then((data) => {
      res.status(200).send({ data });
    })
    .catch(next);
};

export const updateUserInfo = (req, res, next) => {
  const { error } = userValidation(req.body);
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true, upsert: true },
  )
    .orFail(() => {
      throw new NotFoundError('Пользователь с таким ID не зарегистрирован');
    })
    .then((updatedUserInfo) => {
      res.send({ data: updatedUserInfo });
    })
    .catch(() => {
      if (error) {
        res.status(400).send({ message: error.details[0].message });
      }
      return next();
    });
};

export const updateUserAvatar = (req, res, next) => {
  const { error } = userAvatarValidation(req.body);
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true, upsert: true })
    .orFail(() => {
      throw new AuthError('Пользователь с таким ID не зарегистрирован');
    })
    .then((updatedAvatar) => {
      res.send({ data: updatedAvatar });
    })
    .catch(() => {
      if (error) {
        res.status(400).send({ message: error.details[0].message });
      }
      return next();
    });
};
