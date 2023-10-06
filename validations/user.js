import Joi from 'joi';

export const userValidation = (data) => {
  const userSchema = Joi.object({
    name: Joi.string().min(2).max(40).required(),
    about: Joi.string().min(2).max(30).required(),
  });
  return userSchema.validate(data);
};

export const userAvatarValidation = (data) => {
  const avatarSchema = Joi.object({
    avatar: Joi.string().required(),
  });
  return avatarSchema.validate(data);
};
