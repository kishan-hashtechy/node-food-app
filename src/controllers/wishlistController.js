const Cart = require('../models/cart');
const Food = require('../models/food');
const Wishlist = require('../models/wishlist');

const createWishlist = async (req, res) => {
    try{
       const food_id = req?.query?.food_id;
       const user_id = req?.userId; 

        if(!food_id){
           return res.status(400).send({ message: 'foodId not found' });
        }

        let wishlistData = {
            user_id,
            food_id,
        }

        const isInCart = await Cart.findOne({ where: { user_id, food_id } })

        if(isInCart){
            return res.status(400).send({ message: 'Item is already in your cart!' })
        }

        const response = await Wishlist.create(wishlistData)

        if(response){
            return res.status(200).send({ message: 'Added to wishlist!', food_id:response.food_id});
        }else{
            return res.status(400).send({ message: 'Something Went Wrong' });
        }

    }catch(err){
        return res.status(500).send({ message: err.message ||'Internal Server Error' });
    }
}

const getWishlist = async (req, res) => {
    try{
        const food_id = JSON.parse(req?.query?.food_id);

        if(!food_id){
            return res.status(400).send({ message: 'foodId not found' });
        }

        const fetchWishlist = await Food.findAll({
            where:{
                id: food_id,
            }
        });

        if(fetchWishlist){
            return res.status(200).send({ message: 'Successfully Get', data:fetchWishlist });
        }else{
            return res.status(400).send({ message: 'Something Went Wrong' });
        }

    }catch(err){
        return res.status(500).send({ message: err.message ||'Internal Server Error' });
    }
}

const deleteWishlist = async (req, res) => {
    try{
        const user_id = req.userId;
        const food_id = req.query.food_id;

        if(!food_id){
            return res.status(400).send({ message: 'food_id not found' })
        }

        const deleteData = await Wishlist.destroy({ where: { user_id, food_id } });

        if(deleteData){
            return res.status(200).send({ message: 'Removed from wishlist!', food_id });
        }

    }catch(err){
        return res.status(500).send({ message: err.message || 'Internal Server Error' })
    }
}

module.exports = { createWishlist, getWishlist, deleteWishlist }
