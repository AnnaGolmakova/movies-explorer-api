const router = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');

const { validateMovieCreate, validateMovieDelete } = require('../middlewares/validation');

router.get('/', getMovies);

router.post('/', validateMovieCreate, createMovie);

router.delete('/:id', validateMovieDelete, deleteMovieById);

module.exports = router;
