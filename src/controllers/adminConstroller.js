const Food = require("../models/food");
const yup = require("yup");

const addFood = async (req, res) => {
  try {
    const { name, description, price, type, category, foodImage } = req.body;

    const foodSchema = yup.object({
      name: yup.string().required("Food name is required"),
      description: yup.string().required("Food description is required"),
      price: yup.number().required("Price is required"),
      type: yup.string().required("Food type is required"),
      category: yup.string().required("Food category is required"),
      //foodImage: yup.required("Food Image is required"),
    });

    await foodSchema.validate(req.body);

    const foddData = {
      name,
      description,
      price,
      type,
      category,
      foodImage,
      status:"Active",
    };

    const response = await Food.create(foddData);

    if (response) {
      return res.status(200).send({ message: "Food successfuly added" });
    } else {
      return res.status(200).send({ message: "something occured", code: 400 });
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send({ message: "Internal server error" });
  }
};

const getAllFood = async (req, res) => {
  try {
    const response = await Food.findAll({});
    if (response) {
      return res
        .status(200)
        .send({ message: "Sucessfuly get food", data: response, code: 200 });
    } else {
      return res.send({ message: "no food found", code: 400 });
    }
  } catch (err) {
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = { addFood, getAllFood };
