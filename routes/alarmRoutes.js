const pop = require('../routes/middlewares/pop');
const router = require('express').Router();
const {
  getAlarm,
  getAllAlarm,
  createAlarm,
  updateAlarm,
  deleteAlarm,
} = require('../controllers/alarmsController');

router.get('/', getAllAlarm);
router.get('/:id', getAlarm);
router.post('/add', createAlarm);
router.put('/update/:id', updateAlarm);
router.delete('/delete/:id', deleteAlarm);

module.exports = router;
