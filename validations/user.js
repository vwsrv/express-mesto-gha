import Joi from 'joi';

export const userValidation = (data) => {
  const userSchema = Joi.object({
    name: Joi.string().min(2).max(40).default('Жак-Ив Кусто'),
    about: Joi.string().min(2).max(30).default('Исследователь океана'),
    email: Joi.string().email(),
    password: Joi.string(),
  });
  return userSchema.validate(data);
};

export const userAvatarValidation = (data) => {
  const avatarSchema = Joi.object({
    avatar: Joi.string().default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'),
  });
  return avatarSchema.validate(data);
};
