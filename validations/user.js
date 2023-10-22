/* eslint-disable no-useless-escape */
import Joi from 'joi';
import { celebrate } from 'celebrate';

export const userValidation = (data) => {
  const userSchema = Joi.object({
    name: Joi.string().min(2).max(40).default('Жак-Ив Кусто'),
    about: Joi.string().min(2).max(30).default('Исследователь океана'),
    email: Joi.string().email(),
    password: Joi.string().min(8),
  });
  return userSchema.validate(data);
};

export const userAvatarValidation = (data) => {
  const avatarSchema = Joi.object({
    avatar: Joi.string().pattern(/^https?:\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)
      .messages({ 'string.pattern.base': 'Введите корректную ссылку на изображение' }),
  });
  return avatarSchema.validate(data);
};
