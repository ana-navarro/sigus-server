const { getPayments, createPayment, updatePayment, deletePayment, getOnePayments } = require("../controllers/paymentController");

const router = require("express").Router();

router.get('/', getPayments);
router.get('/:id', getOnePayments);
router.post('/add', createPayment);
router.put('/:id/edit', updatePayment);
router.delete('/:id/delete', deletePayment);

module.exports = router