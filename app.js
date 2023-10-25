/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import express, { json } from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import helmet from 'helmet';
import usersRouter from './routes/users.js';
import cardsRouter from './routes/cards.js';
import authRouter from './routes/auth.js';
import errorHandler from './middleware/ErrorHandler.js';
import NotFoundError from './validations/NotFoundError.js';
import auth from './middleware/auth.js';
import { ALLOWRDCORS, DEFAULT_ALLOWED_METHODS } from './utils/constants.js';

const {
  PORT = 80,
  MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb',
} = process.env;

const app = express();

app.use(json());
app.use(cookieParser());
app.use(helmet());
app.use((req, res, next) => {
  const { origin } = req.headers;
  if (ALLOWRDCORS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  next();
});
app.use((req, res, next) => {
  const { method } = req;
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
  }
  next();
});
app.use(authRouter);
app.use(auth);
app.use(cardsRouter);
app.use(usersRouter);
app.use('*', (req, res, next) => {
  next(new NotFoundError('Такой страницы не существует.'));
});
app.use(errors());
app.use(errorHandler);

async function initServer() {
  await mongoose.connect(MONGO_URL);
  console.log('Data Base is connected');
  await app.listen(PORT);
  console.log(`Server started at PORT: ${PORT}`);
}

initServer();
