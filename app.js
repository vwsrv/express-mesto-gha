import express, { json } from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import helmet from 'helmet';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';
import authRouter from './routes/auth';
import errorHandler from './middleware/ErrorHandler';
import auth from './middleware/auth';

const {
  PORT = 3000,
  MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb',
} = process.env;

const app = express();

app.use(json());
app.use(cookieParser());
app.use(helmet());
app.use(authRouter);
app.use(usersRouter);
app.use(auth, cardsRouter);

async function initServer() {
  await mongoose.connect(MONGO_URL);
  await app.listen(PORT);
}

app.use(errors());
app.use(errorHandler);

initServer();
