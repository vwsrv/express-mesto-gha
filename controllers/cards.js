import Card from '../models/card';
import NotFoundError from '../validations/NotFoundError';
import ForbiddenError from '../validations/ForbiddenError';
import { STATUS } from '../utils/constants';

export const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

export const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(STATUS.CREATED).send({ data: card }))
    .catch(next);
};

export const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(() => {
      throw new NotFoundError('Передана карточка с несуществующим _id');
    })
    .then((cardToDelete) => {
      if (req.user._id !== cardToDelete.owner.toString()) {
        throw new ForbiddenError('Недостаточно прав для удаления карточки');
      }
      Card.deleteOne(cardToDelete)
        .then(() => res.status(STATUS.OK).send({ message: 'Карточка удалена успешно!', data: cardToDelete }));
    })
    .catch(next);
};

export const addLikeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Передана карточка с несуществующим _id');
    })
    .then((card) => {
      res.status(STATUS.OK).send({ data: card });
    })
    .catch(next);
};

export const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Передана карточка с несуществующим _id');
    })
    .then((card) => {
      res.status(STATUS.OK).send({ data: card });
    })
    .catch(next);
};
