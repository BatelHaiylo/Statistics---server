const router = require('express').Router();
const { getInvoices, getInvoiceById, addInvoice, deleteInvoice } = require('../controllers/invoice');

router.get('/',getInvoices)
router.get('/:id',getInvoiceById)
router.post('/add',addInvoice)
router.delete('/delete/:id',deleteInvoice)

module.exports = router;