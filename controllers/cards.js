import Card from '../models/card';
import { cardsValidation } from '../validations/card';
import AuthError from '../validations/AuthError';
import NotFoundError from '../validations/NotFoundError';

export const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка на стороне сервера' }));
};

export const createCard = (req, res, next) => {
  const { error } = cardsValidation(req.body);
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch(() => {
      if (error) {
        res.status(400).send({ message: error.details[0].message });
      }
      return next();
    });
};

export const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(() => {
      throw new NotFoundError('Передана карточка с несуществующим _id');
    })
    .then((cardToDelete) => {
      if (!req.user._id !== cardToDelete.owner.toString()) {
        throw new AuthError('Недостаточно прав для удаления карточки');
      }
      Card.findByIdAndDelete(cardToDelete._id)
        .then(() => res.status(200).send({ message: 'Карточка удалена успешно!', data: cardToDelete }));
    })
    .catch(next);
};

export const addLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Передана карточка с несуществующим _id');
    })
    .then((card) => {
      res.send({ data: card });
    })
    .catch(next);
};

export const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Передана карточка с несуществующим _id');
    })
    .then((card) => {
      res.send({ data: card });
    })
    .catch(next);
};
