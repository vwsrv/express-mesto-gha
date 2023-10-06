import express, { json } from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';

const { PORT = 3000,
  MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb'
} = process.env;

const app = express();

app.use(json());

app.use((req, res, next) => {
  req.user = {
    _id: '651ddc563928613a987fef63'
  };
  next();
});

app.use(usersRouter);
app.use(cardsRouter);

async function initServer() {
  await mongoose.connect(MONGO_URL);
  console.log('DataBase is connected...')
  await app.listen(PORT)
  console.log('Server successfully started!')
}

initServer();
