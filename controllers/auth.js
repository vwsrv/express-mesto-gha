import bcrypt from 'bcryptjs';
import User from '../models/user';
import generateToken from '../utils/jwt';
import AuthError from '../validations/AuthError';

export const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError('Неправильные имя пользователя или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError('Неправильные имя пользователя или пароль');
          }
          const token = generateToken({ _id: user._id, email: user.email });
          res.cookie('mestoToken', token, { maxAge: '604800000', httpOnly: true, sameSite: true });
          return res.status(200).send({ message: 'Авторизация прошла успешно!', _id: user._id });
        });
    })
    .catch(next);
};

export const createUser = (req, res, next) => {
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
    .catch(next);
};
