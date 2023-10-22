import { Router } from 'express';
import {
  deleteCard, createCard, getCards, addLikeCard, dislikeCard,
} from '../controllers/cards';
import { likeStatusValidation } from '../validations/card';

const cardsRouter = Router();

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', createCard);
cardsRouter.delete('/cards/:cardId', deleteCard);
cardsRouter.put('/cards/:cardId/likes', likeStatusValidation, addLikeCard);
cardsRouter.delete('/cards/:cardId/likes', likeStatusValidation, dislikeCard);

export default cardsRouter;
