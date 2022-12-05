const router = require('express').Router();
const multer = require('multer');
const multerConfig = require('../routes/middlewares/checklist');

const {
  createChecklist,
  getChecklistAll,
  deleteChecklist,
  imagesChecklist,
  getImages,
  deleteImagesChecklist,
} = require('../controllers/checklistController');

router.post('/checklist/add/:id', createChecklist);
router.get('/checklist/:id', getChecklistAll);
router.delete('/checklist/remove/:id', deleteChecklist);

router.post(
  '/checklist/images/add/:id',
  multer(multerConfig).single('file'),
  imagesChecklist,
);
router.get('/checklist/images/:id', getImages);
router.delete('/checklist/images/remove/:id', deleteImagesChecklist);

module.exports = router;
