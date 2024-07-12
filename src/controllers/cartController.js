const Cart = require("../models/cart");
const User = require("../models/user");
const yup = require("yup");

const addCart = async (req, res) => {
 try{
   const userId = req?.query?.userId;
   const foodId = req?.query?.foodId;
   
  const { no_of_item ,cartStaus } = req?.body;

  if(!userId || !foodId){
    return res.status(400).send({ message: "user id or food Id not found" });
  }

  const addCartSchema = yup.object({
    no_of_item: yup.number().required('no. of items are required'),
    cartStaus: yup.string().required('cart status is required'),
   })

  await addCartSchema.validate({ no_of_item, cartStaus });

  const response = await User.findOne({
    where:{
      id: userId,
      attribute:[cart_code]
    }
  })

  const cartData = {
    userId,
    foodId,
    no_of_item,
    cartStaus,
    cart_code:response,
  }

  if(response){
    const response2 = await Cart.create(cartData);

    if(response2){
      return res.status(200).send({ message: "Successfully Created" });
    }else{
      return res.status(400).send({ message: "Something Occured while creating the data" });
    }
  }else{
    return res.status(400).status({ message: "No user Found" });
  }
 }catch(err){
    return res.status(500).send({ message: err.message || "Internal Server Error" });
 }
}

const updateCart = async (req, res) => {
  try{
    const cartId = req?.query?.cartId;
    const { ...data } = req?.body;

    if(!cartId){
      return res.status(400).send({ message: "Cart Id not found"})
    }

    const updateCartSchema = yup.object({
      no_of_item: yup.number().required('No of itesm is requires'),
    })

    await updateCartSchema.validate({ data })

    const response = await Cart.update(data, {id: cartId})

    if(response){
      return res.status(200).send({message: "cart updated successfully!!"});
    }else{
      return res.status(400).send({ message: "Something occured while updating cart" });
    }
  }catch(err){
    return res.status(500).status({ message: err.message || "Internal Server Error" }) ;
  }
}

const getCart = async (req, res) => {
  try{
    const userId = req?.query?.userId;

    if(!userId){
      return res.status(400).send({ message: "user id not found" })
    }

    const response = await User.findOne({ where: { id: userId , attribute: [cart_code] } });

    if(response){
      const response2 = await Cart.findAll({ where: { cart_code: response.cart_code } });

      if(response2){
        return res.status(200).send({ message: "Successfully fetched data", data: response2 });
      }else{
        return res.status(400).status({ message: 'No Cart Data Found' });
      }
    }else{
      return res.status(400).send({ message: "No User Data Found" });
    }
  }catch(err){
    return res.status(500).send({ message: err.message || "Internal Server Error" });
  }
}

const deleteCartItem = async (req, res) => {
  try{
    const foodId = req?.query?.foodId;

    if(!foodId){
      return res.status(400).send({ message: "cart id not found" });
    }

    const response = await Cart.destroy({ where: { foodId } });

    if(response){
      return res.status(200).send({ message: "Successfully delted cart item" });
    }else{
      return res.status(400).send({ message: "Something Occured while deleting cart" });
    }
  }catch(err){
    return res.status(500).send({ message: err.message || "Internal Server Error" });
  }
}

module.exports = { addCart, updateCart, getCart, deleteCartItem }
