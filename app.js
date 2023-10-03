import express from 'express';
import mongoose from 'mongoose';
import { Router } from 'express';
import usersRoutes from './routes/users';

const router = Router()
const app = express();
const { PORT = 3000 } = process.env;

router.use('/users', usersRoutes);

app.get('/', (req, res) => {
  res.send({message: 'Hello!'})
})

app.listen(PORT, () => {
  console.log('Server successfully started!');
})
