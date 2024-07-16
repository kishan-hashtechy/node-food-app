const express = require('express');
const router = express.Router();
const { createOrder, getAllOrder, getCurrenrtOrder, deleteOrder } = require('../controllers/orderController');
const auth = require('../middleware/auth');

router.get('/get-current-order', auth, getCurrenrtOrder);
router.get('/get-all-order', auth, getAllOrder);
router.post('/create-order', auth, createOrder);
router.delete('/delete-order', auth, deleteOrder);

module.exports = router;
