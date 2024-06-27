const Food = require("../models/food");
const yup = require("yup");

const addFood = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      foodImage,
      type,
      category,
      ratings,
      status,
    } = req.body;

    const addFoodSchema = yup.object({
      name: yup.object().string("Food name is required"),
      description: yup.string().required("Description is required"),
      price: yup.object().string("Price is required"),
      foodImage: yup.string().required("Food image is required"),
      type: yup.string.required("Type is required"),
      category: yup.string.required("Category is required"),
      ratings: yup.string.required("Ratings is required"),
      status: yup.string.required("Status is required"),
    });

    await addFoodSchema.validate(req.body);

    const foodData = {
      name,
      description,
      price,
      foodImage,
      type,
      category,
      ratings,
      status,
    };

    const response = await Food.create(foodData);

    if (response) {
      return res
        .status(200)
        .send({ message: "Food add successfully", response });
    } else {
      return res.status(400).send({ message: "Something went wrong" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message || "Internal server error" });
  }
};

//UPDATE FOOD

const updateFood = async (req, res) => {
  try {
    const foodId = req.params.id;

    const {
      name,
      description,
      price,
      foodImage,
      type,
      category,
      rating,
      status,
    } = req.body;

    const data = req.body;

    const record = await Food.findOne({
      where: {
        id: foodId,
      },
    });

    if (record) {
      const response = await Food.update(data, { where: { id: foodId } });

      if (response) {
        return res.status(200).send({ message: "Food update", response });
      }
    } else {
      return res.staus(404).send({ message: "No record found !!" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal server error!!" });
  }
};

//GET FOOD

const getAllFood = async (req, res) => {
  try {
    const foodId = req.foodId;
    if (!foodId) {
      return res.status(400).send({ message: "User id not found" });
    }

    const record = await Food.findAll({
      where: {
        foodId,
      },
    });

    if (record.length) {
      return res
        .status(200)
        .send({ message: "Get food successfully", data: record });
    } else {
      return res.status(404).send({ message: "No data found" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal server error!!" });
  }
};

module.exports = {
  addFood,
};
