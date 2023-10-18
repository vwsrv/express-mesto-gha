// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from 'bcryptjs';
import User from '../models/user';
import { userValidation, userAvatarValidation } from '../validations/user';

export const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => {
      res.status(500).send({ message: 'Произошла ошибка на стороне сервера.' });
    });
};

export const createUser = (req, res) => {
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
    .catch(() => {
      if (error) {
        res.status(400).send({ message: error.details[0].message });
        return;
      } res.status(500).send({ message: 'Произошла ошибка на стороне сервера.' });
    });
};

export const getUserById = (req, res) => {
  User.findById(req.user._id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: 'Пользователя по указанному _id не существует.' });
        return;
      }
      res.send({ data });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные для получения профиля' });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка на стороне сервера' });
    });
};

export const updateUserInfo = (req, res) => {
  const { error } = userValidation(req.body);
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true, upsert: true },
  )
    .then((updatedUserInfo) => {
      if (!updatedUserInfo) {
        res.status(404).send({ message: 'Пользователь с таким ID не зарегистрирован' });
        return;
      }
      res.send({ data: updatedUserInfo });
    })
    .catch(() => {
      if (error) {
        res.status(400).send({ message: error.details[0].message });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка на стороне сервера.' });
    });
};

export const updateUserAvatar = (req, res) => {
  const { error } = userAvatarValidation(req.body);
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true, upsert: true })
    .then((updatedAvatar) => {
      if (!updatedAvatar) {
        res.status(404).send({ message: 'Пользователь с таким ID не зарегистрирован' });
        return;
      }
      res.send({ data: updatedAvatar });
    })
    .catch(() => {
      if (error) {
        res.status(400).send({ message: error.details[0].message });
        return;
      } res.status(500).send({ message: 'Произошла ошибка на стороне сервера.' });
    });
};
