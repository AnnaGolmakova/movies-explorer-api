require('dotenv').config();

const { DB_URL = 'mongodb://localhost:27017/bitfilmsdb', PORT = 3000 } = process.env;

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error-handler');
const { cors } = require('./middlewares/cors');

const router = require('./routes/index');

const app = express();

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.use(cors);
app.use(requestLogger);
app.use(express.json());
app.use(cookieParser());

app.use('/', router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Mesto backend app listening on port ${PORT}`);
});
