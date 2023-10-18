import { Router } from 'express';
import {
  deleteCard, createCard, getCards, addLikeCard, dislikeCard,
} from '../controllers/cards';
import auth from '../middleware/auth';

const cardsRouter = Router();

cardsRouter.get('/cards', auth, getCards);
cardsRouter.post('/cards', auth, createCard);
cardsRouter.delete('/cards/:cardId', auth, deleteCard);
cardsRouter.put('/cards/:cardId/likes', auth, addLikeCard);
cardsRouter.delete('/cards/:cardId/likes', auth, dislikeCard);

export default cardsRouter;
