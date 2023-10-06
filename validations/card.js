import Joi from 'joi';

const cardsValidation = (data) => {
  const cardsSchema = Joi.object({
    name: Joi.string().min(2).max(40).required(),
    link: Joi.string().min(2).max(30).required(),
  });
  return cardsSchema.validate(data);
};

export default cardsValidation;
