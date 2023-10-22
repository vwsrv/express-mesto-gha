import { Router } from 'express';
import {
  deleteCard, createCard, getCards, addLikeCard, dislikeCard,
} from '../controllers/cards';
import {
  addCardValidationSchema, cardLinkValidationSchema, deleteCardValidationSchema,
} from '../validations/card';

const cardsRouter = Router();

cardsRouter.get('/cards', cardLinkValidationSchema, getCards);
cardsRouter.post('/cards', addCardValidationSchema, createCard);
cardsRouter.delete('/cards/:cardId', deleteCardValidationSchema, deleteCard);
cardsRouter.put('/cards/:cardId/likes', cardLinkValidationSchema, addLikeCard);
cardsRouter.delete('/cards/:cardId/likes', cardLinkValidationSchema, dislikeCard);

export default cardsRouter;
