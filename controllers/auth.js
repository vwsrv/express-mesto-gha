/* eslint-disable import/prefer-default-export */
import bcrypt from 'bcryptjs';
import User from '../models/user';
import generateToken from '../utils/jwt';

export const loginUser = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new Error('AuthFailed');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Error('AuthFailed');
          }
          const token = generateToken({ _id: user._id, email: user.email });
          res.cookie('mestoToken', token, { maxAge: '604800000', httpOnly: true, sameSite: true });
          return res.status(200).send({ message: 'Авторизация прошла успешно!', _id: user._id });
        });
    })
    .catch((err) => {
      if (err.message === 'AuthFailed') {
        return res.status(401).send({ message: 'Неправильные имя пользователя или пароль' });
      }
      return res.status(500).send({ message: 'Произошла ошибка на стороне сервера' });
    });
};
