const User = require("../models/user");
const Order = require('../models/order');
const yup = require("yup");

const createOrder = async (req, res) => {
  try {
    const userId = req?.userId;

    const { toatal_price, payment_status } = req?.body;

    if(!userId){
        return res.status(400).status({ messsage: 'user id not found' });
    }

    const createOrderSchema = yup.object({
        toatal_price: yup.string().required('total price is required'),
        payment_method: yup.string().required('payment method is required'),
    });

    await createOrderSchema.validate({ toatal_price, payment_status });

    const response = await User.findOne({ where: { id: userId, attribute: [cart_code] } })

    const orderData = {
        userId,
        toatal_price,
        cart_code:response?.cart_code,
        payment_status,
    };

    if(response){
        const response2 = await Order.create(orderData);

        if(response2){
            return res.status(200).send({ messsage: 'Order added successfully' });
        }else{
            return res.status(400).send({ messsage: 'Something occured while creating order' });
        }
    }else{
        return res.status(404).send({ messsage: 'No data found' });
    }
  } catch (err) {
    return res
      .status(500)
      .send({ messsage: err.messsage || "Internal Server Error" });
  }
};

const getAllOrder = async (req, res) => {
    try{
        const userId = req?.userId;

        if(!userId){
            return res.status(404).send({ messsage: 'user id not found' });
        }

        const response = Order.findAll({ where: { id: userId } });

        if(response?.length){
            return res.status(200).send({ messsage: 'successfully get' , data: response });
        }else{
            return res.status(400).send({ messsage: 'Something went wrong while fetching the data' });
        }
    }catch(err){
        return res.status(500).send({ messsage: err.messsage || 'Internal Server Error' });
    }
}

const getCurrenrtOrder = async (req, res) => {
    try{
        const userId = req?.userId;

        if(!userId){
            return res.status(400).send({ messsage: 'user id not found' });
        }

        const response = await User.findOne({ where: { id: userId , attribute: [cart_code] } })

        if(response){
            const response2 = await Order.findOne({ where: { cart_code: response?.cart_code } })

            if(response2){
                return res.status(200).send({ messsage: 'Successfully get', data: response2 });
            }else{
                return res.status(404).send({ messsage: 'No order data found' });
            }
        }else{
            return res.status(404).send({ messsage: 'No User Found' });
        }
    }catch(err){
        return res.status(500).send({ messsage: err.messsage || 'Internal Server Error' });
    }
}

const deleteOrder = async (req, res) => {
    try{
        const orderId = req?.query?.orderId;

        if( !orderId ){
            return res.status(400).send({ messsage: 'order id not found' });
        }

        const response = await Order.destroy({ where: { id: orderId } });

        if(response){
            return res.status(200).send({ messsage: 'Updated Order status' });
        }else{
            return res.status(400).send({ messsage: 'Failed to update' });
        }
    }catch(err){
        return res.status(500).send({ messsage: 'Internal Server Error' });
    }
}

module.exports = { createOrder, getAllOrder, getCurrenrtOrder, deleteOrder }
