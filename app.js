require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const users = require('./routes/users');
const movies = require('./routes/movies');

const { login, createUser } = require('./controllers/users');

const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { validateLogin, validateRegister } = require('./middlewares/validation');
const errorHandler = require('./middlewares/error-handler');
const { cors } = require('./middlewares/cors');

const NotFoundError = require('./errors/not-found-err');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

app.use(cors);

app.use(requestLogger);
app.use(express.json());
app.use(cookieParser());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validateLogin, login);
app.post('/signup', validateRegister, createUser);

app.use(auth);
app.use('/users', users);
app.use('/movies', movies);

app.use((req, res, next) => {
  next(new NotFoundError('Неправильный запрос API'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Mesto backend app listening on port ${port}`);
});
