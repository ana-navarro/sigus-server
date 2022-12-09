const router = require('express').Router();
const multer = require('multer');
const multerConfig = require('../routes/middlewares/checklist');

const {
  createChecklist,
  updateChecklist,
  getChecklist,
  getChecklistAll,
  deleteChecklist,
} = require('../controllers/checklistController');

router.post('/checklist/add/:id', createChecklist);
router.put('/checklist/update/:idChecklist', updateChecklist);
router.get('/checklist/:idChecklist', getChecklist);
router.get('/checklist/all/:id', getChecklistAll);
router.delete('/checklist/remove/:id', deleteChecklist);

module.exports = router;
