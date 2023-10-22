import jwt from 'jsonwebtoken';
import AuthError from '../validations/AuthError';

const { JWT_SECRET, NODE_ENV } = process.env;

export default function auth(req, res, next) {
  let payload;

  try {
    const authorization = req.cookies.mestoToken;

    if (!authorization) {
      throw new AuthError('Неправильные имя пользователя или пароль.');
    }
    const token = authorization.replace('Bearer ', '');
    payload = jwt.verify(token, NODE_ENV ? JWT_SECRET : 'dev_secret');
  } catch (err) {
    if (err.message === 'JsonWebTokenError') {
      throw new AuthError('С токеном что-то не так.');
    }
    return next(err);
  }

  req.user = payload;
  return next();
}
