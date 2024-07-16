const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const { getCart, updateCart, deleteCartItem, addCart } = require('../controllers/cartController');

router.get('/get-cart', auth, getCart);
router.post('/add-cart', auth, addCart);
router.patch('/update-cart', auth, updateCart);
router.delete('/delete-cart', auth, deleteCartItem);

module.exports = router;
