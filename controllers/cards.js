import Card from '../models/card';
import cardsValidation from '../validations/card';

export const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка на стороне сервера' }));
};

export const createCard = (req, res) => {
  const { error } = cardsValidation(req.body);
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch(() => {
      if (error) {
        res.status(400).send({ message: error.details[0].message });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка на стороне сервера' });
    });
};

export const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((cardToDelete) => {
      res.send({ data: cardToDelete });
    })
    .catch((err) => {
      if (err.message === 'CastError') {
        res.status(404).send({ message: 'Карточка с указанным _id не найдена.' });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка на стороне сервера' });
    });
};

export const addLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(400).send({ message: 'Передан несуществующий _id карточки.' });
        return;
      } res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError ') {
        res.status(400).send({ message: 'Переданы некорректные данные для постановки/снятии лайка.' });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка на стороне сервера' });
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
        res.status(404).send({ message: 'Передан несуществующий _id карточки.' });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные для постановки/снятии лайка.' });
      }
      return res.status(500).send({ message: 'Произошла ошибка на стороне сервера' });
    });
};
