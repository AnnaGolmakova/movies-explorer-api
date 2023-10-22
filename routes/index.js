const router = require('express').Router();

const auth = require('../middlewares/auth');
const users = require('./users');
const movies = require('./movies');

const { login, logout, createUser } = require('../controllers/users');

const { validateLogin, validateRegister } = require('../middlewares/validation');

router.post('/signin', validateLogin, login);
router.post('/signup', validateRegister, createUser);
router.get('/signout', logout);

router.use(auth);
router.use('/users', users);
router.use('/movies', movies);

module.exports = router;
