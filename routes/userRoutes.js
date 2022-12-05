const router = require('express').Router({ mergeParams: true });
const {
  editOneUser,
  getUsers,
  deleteUser,
  getUser,
} = require('../controllers/userController');
const User = require('../models/User');

router.get('/', getUsers);
router.put('/:id/edit', editOneUser);
router.delete('/:id/delete', deleteUser);
router.get('/:id', getUser);

module.exports = router;
