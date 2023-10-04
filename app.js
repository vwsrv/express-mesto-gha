import express, { json } from 'express';
import mongoose from 'mongoose';
import router from './routes/users';
import cardsRouter from './routes/cards';

const { PORT = 3000,
  MONGO_URL = 'mongodb://127.0.0.1:27017/mesto-project'
} = process.env;

const app = express();

app.use(json());

app.use((req, res, next) => {
  req.user = {
    _id: '651d8c57327080bc7144072e' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});

app.use(router);
app.use(cardsRouter);

async function initServer() {
  await mongoose.connect(MONGO_URL);
  console.log('DataBase is connected...')
  await app.listen(PORT)
  console.log('Server successfully started!')
}

initServer();
