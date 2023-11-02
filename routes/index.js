const router = require('express').Router();

const auth = require('../middlewares/auth');
const { validateLogin, validateRegister } = require('../middlewares/validation');
const { login, logout, createUser } = require('../controllers/users');
const NotFoundError = require('../errors/not-found-err');

const users = require('./users');
const movies = require('./movies');

router.post('/signin', validateLogin, login);
router.post('/signup', validateRegister, createUser);
router.get('/signout', logout);

router.use(auth);
router.use('/users', users);
router.use('/movies', movies);

router.use((req, res, next) => {
  next(new NotFoundError('Неправильный запрос API'));
});

module.exports = router;
