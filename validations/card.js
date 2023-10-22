/* eslint-disable no-useless-escape */
import Joi from 'joi';

const cardsValidation = (data) => {
  const cardsSchema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(/^https?:\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)
      .messages({ 'string.pattern.base': 'Введите корректную ссылку на изображение' }),
  });
  return cardsSchema.validate(data);
};

export default cardsValidation;
