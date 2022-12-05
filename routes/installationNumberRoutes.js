const { createInstallationNumber, getAllInstallationNumbers, getOneInstallationNumbers, editOneInstallationNumbers, deleteOneInstallationNumber } = require('../controllers/installationNumberController');
const InstallationNumbers = require('../models/InstallationNumber');
const router = require('express').Router()

router.get('/', getAllInstallationNumbers);
router.get('/:id', getOneInstallationNumbers);
router.post('/add', createInstallationNumber);
router.put('/:id/edit', editOneInstallationNumbers);
router.delete('/:id/delete', deleteOneInstallationNumber);

module.exports = router