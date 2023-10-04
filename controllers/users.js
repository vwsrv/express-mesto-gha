import { User } from "../models/user";

export const getUsers = (req, res) => {
  User.find({})
  .then(users => res.send({data: users}))
  .catch(err => res.status(500).send({message: 'Произошла ошибка на стороне сервера'}))
}

export const createUser = (req, res) => {
  const {name, about, avatar} = req.body;
  User.create({name, about, avatar})
  .then(user => res.send({data: user}))
  .catch(err => res.status(500).send({message: 'Произошла ошибка на стороне сервера'}))
}

export const getUserById = (req, res) => {
  User.findById(req.params.userId)
  .then(data => res.send({data}))
  .catch(err => res.status(500).send({message: 'Произошла ошибка на стороне сервера'}))
}

export const updateUserInfo = (req, res) => {
  const {name, about} = req.body;
  User.findByIdAndUpdate(req.user._id, {name, about}, {new: true})
  .then(updatedUserInfo => res.send({data: updatedUserInfo}))
  .catch(err => res.status(500).send({message: 'Произошла ошибка на стороне сервера'}))
}

export const updateUserAvatar = (req, res) => {
  const {avatar} = req.body;
  User.findByIdAndUpdate(req.user._id, {avatar})
  .then(updatedAvatar => res.send({data: updatedAvatar}, {new: true}))
  .catch(err => res.status(500).send({message: 'Произошла ошибка на стороне сервера'}))
}