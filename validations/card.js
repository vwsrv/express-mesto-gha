/* eslint-disable no-useless-escape */
import { celebrate, Joi } from 'celebrate';

export const cardsValidation = (data) => {
  const cardsSchema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(/^https?:\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)
      .messages({ 'string.pattern.base': 'Введите корректную ссылку на изображение' }),
  });
  return cardsSchema.validate(data);
};

export const likeStatusValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required()
  })
});
