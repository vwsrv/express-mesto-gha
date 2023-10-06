import Card from '../models/card';
import cardsValidation from '../validations/card';

export const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка на стороне сервера' }));
};

export const createCard = (req, res) => {
  const { errors } = cardsValidation(req.body);
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch(() => {
      if (errors) {
        res.status(400).send({ message: errors.details[0].message });
      }
      res.status(500).send({ message: 'Произошла ошибка на стороне сервера' });
    });
};

export const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((cardToDelete) => {
      if (!cardToDelete) {
        res.status(404).send({ message: 'Карточка с указанным _id не найдена.' });
        return;
      }
      res.send({ data: cardToDelete });
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка на стороне сервера' }));
};

export const addLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Передан несуществующий _id карточки.' });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные для постановки/снятии лайка.' });
      }
      return res.status(500).send({ message: 'Произошла ошибка на стороне сервера' });
    });
};

export const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Передан несуществующий _id карточки.' });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные для постановки/снятии лайка.' });
      }
      return res.status(500).send({ message: 'Произошла ошибка на стороне сервера' });
    });
};
