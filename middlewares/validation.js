const { celebrate, Joi } = require('celebrate');

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
});

module.exports.validateRegister = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

module.exports.validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
});

module.exports.validateMovieCreate = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string()
      .pattern(/^(https?:\/{2})([\w-]+\.)+\w(\/?[\w\-.~:/?#[\]@!$&'()*+,;=]*)#?/)
      .required(),
    trailerLink: Joi.string()
      .pattern(/^(https?:\/{2})([\w-]+\.)+\w(\/?[\w\-.~:/?#[\]@!$&'()*+,;=]*)#?/)
      .required(),
    thumbnail: Joi.string()
      .pattern(/^(https?:\/{2})([\w-]+\.)+\w(\/?[\w\-.~:/?#[\]@!$&'()*+,;=]*)#?/)
      .required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.validateMovieDelete = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});
