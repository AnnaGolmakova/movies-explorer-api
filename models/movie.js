const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^(https?:\/{2})([\w-]+\.)+\w(\/?[\w\-.~:/?#[\]@!$&'()*+,;=]*)#?/.test(v);
      },
      message: (props) => `${props.value} не подходит по формату URL`,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^(https?:\/{2})([\w-]+\.)+\w(\/?[\w\-.~:/?#[\]@!$&'()*+,;=]*)#?/.test(v);
      },
      message: (props) => `${props.value} не подходит по формату URL`,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^(https?:\/{2})([\w-]+\.)+\w(\/?[\w\-.~:/?#[\]@!$&'()*+,;=]*)#?/.test(v);
      },
      message: (props) => `${props.value} не подходит по формату URL`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);