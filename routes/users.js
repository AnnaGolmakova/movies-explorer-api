const router = require('express').Router();

const {
  getMyUser,
  updateUserInfo,
} = require('../controllers/users');
const { validateUserUpdate } = require('../middlewares/validation');

router.get('/me', getMyUser);

router.patch('/me', validateUserUpdate, updateUserInfo);

module.exports = router;
