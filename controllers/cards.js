import { Card } from "../models/card";

export const getCards = (req, res) => {
  Card.find({})
  .then(cards => res.send({data: cards}))
  .catch(err => res.status(500).send({message: 'Произошла ошибка на стороне сервера'}))
}

export const createCard = (req, res) => {
  const {name, link} = req.body;
  Card.create({name, link, owner:req.user._id })
  .then(card => res.send({data: card}))
  .catch(err => res.status(500).send({message: 'Произошла ошибка на стороне сервера'}))
}

export const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
  .then(deleteCard => res.send({data: deleteCard}))
  .catch(err => res.status(500).send({message: 'Произошла ошибка на стороне сервера'}))
}

export const addLikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId,
    {$addToSet: {likes: req.user._id}},
    {new: true})
  .then(user => res.send({data: user}))
  .catch(err => res.status(500).send({message: 'Произошла ошибка на стороне сервера'}))
}

export const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId,
    {$pull: {likes: req.user._id}},
    {new: true})
    .then(userId => res.send({data:userId}))
    .catch(err => res.status(500).send({message: 'Произошла ошибка на стороне сервера'}))
}