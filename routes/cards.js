import { Router } from 'express';
import {
  deleteCard, createCard, getCards, addLikeCard, dislikeCard,
} from '../controllers/cards';

const cardsRouter = Router();

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', createCard);
cardsRouter.delete('/cards/:cardId', deleteCard);
cardsRouter.put('/cards/:cardId/likes', addLikeCard);
cardsRouter.delete('/cards/:cardId/likes', dislikeCard);

export default cardsRouter;
