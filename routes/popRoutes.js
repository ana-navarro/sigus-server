const pop = require('../routes/middlewares/pop');
const multer = require('multer');
const router = require('express').Router();

const {
  getPop,
  getAllPop,
  createPop,
  deletePop,
} = require('../controllers/popController');

router.get('/', getAllPop);
router.get('/:id', getPop);
router.post('/add', multer(pop).single('file'), createPop);
router.delete('/delete/:id', deletePop);

module.exports = router;
