const { getClient, getAllClient, createClient, editClient, deleteClient } = require("../controllers/clientController");
const router = require('express').Router();
const { Address } = require('../models/Address');

router.get('/:id', getClient);
router.get('/', getAllClient);
router.post('/add', createClient);
router.put('/:id/edit', editClient);
router.delete('/:id/delete', deleteClient);

module.exports = router;