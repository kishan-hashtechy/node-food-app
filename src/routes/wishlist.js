const express = require('express');
const router = express.Router();
const { createWishlist, deleteWishlist, getWishlist } = require('../controllers/wishlistController');
const auth = require('../middleware/auth');

router.post('/create-wishlist', auth,createWishlist);
router.get('/get-wishlist', auth, getWishlist);
router.delete('/delete-wishlist', auth,deleteWishlist);

module.exports = router;
