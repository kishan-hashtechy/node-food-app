const Cart = require("../models/cart");
const Food = require("../models/food");
const User = require("../models/user");
const yup = require("yup");

const addCart = async (req, res) => {
 try{
   const userId = req?.userId;
   const foodId = req?.query?.foodId;

  if(!userId || !foodId){
    return res.status(400).send({ message: "user id or food Id not found" });
  }

  const findFood = await Food.findOne({ where: { id: foodId } });

  if(!findFood){
    return res.status(404).send({ message: 'no food exists' });
  }

  const response = await User.findOne({
    where:{
      id: userId,
    },
    attributes:['cart_code']
  });

  const cartData = {
    userId,
    foodId,
    cart_code:response?.cart_code,
  };

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
      return res.status(400).send({ message: "Cart Id not found"});
    }

    const updateCartSchema = yup.object({
      no_of_item: yup.number().required('No of itesm is requires'),
    })
    
    await updateCartSchema.validate(data);

    const response = await Cart.update(data, {where: { id: cartId }})

    if(response){
      return res.status(200).send({message: "cart updated successfully!!"});
    }else{
      return res.status(400).send({ message: "Something occured while updating cart" });
    }
  }catch(err){
    console.log(err)
    return res.status(500).status({ message: err.message || "Internal Server Error" }) ;
  }
}

const getCart = async (req, res) => {
  try{
    const userId = req?.userId;

    if(!userId){
      return res.status(400).send({ message: "user id not found" })
    }

    const response = await User.findOne({ where: { id: userId }, attributes: [`cart_code`] });

    if(response){
      const response2 = await Cart.findAll({ where: { cart_code: response?.cart_code } , include: [Food] });
      
      if(response2?.length){
        return res.status(200).send({ message: "Successfully fetched data", data: response2 });
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
    const cartId = req?.query?.cartId;
    const userId = req?.userId; 

    if(!foodId || !cartId || !userId){
      return res.status(400).send({ message: "cart id or food id or user id not found" });
    }

    const response = await Cart.destroy({ where: { foodId, userId, id: cartId } });

    if(response){
      return res.status(200).send({ message: "Successfully item removed" });
    }else{
      return res.status(400).send({ message: "Something Occured while deleting cart" });
    }
  }catch(err){
    return res.status(500).send({ message: err.message || "Internal Server Error" });
  }
}

module.exports = { addCart, updateCart, getCart, deleteCartItem }
