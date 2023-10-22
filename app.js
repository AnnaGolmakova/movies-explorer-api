require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const router = require('./routes/index');

const { requestLogger, errorLogger } = require('./middlewares/logger');
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

app.use('/', router);

app.use((req, res, next) => {
  next(new NotFoundError('Неправильный запрос API'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Mesto backend app listening on port ${port}`);
});
