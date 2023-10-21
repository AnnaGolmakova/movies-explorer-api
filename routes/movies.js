const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');

router.get('/', getMovies);

router.post('/', celebrate({
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
}), createMovie);

router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
}), deleteMovieById);

module.exports = router;
