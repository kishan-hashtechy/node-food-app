const Food = require("../models/food");
const yup = require("yup");
const paginate = require("../libs/common/paginate");

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
      name: yup.string().required("Food name is required"),
      description: yup.string().required("Description is required"),
      price: yup.string().required("Price is required"),
      foodImage: yup.string().required("Food image is required"),
      type: yup.string().required("Type is required"),
      category: yup.string().required("Category is required"),
      ratings: yup.string().optional(),
      status: yup.string().optional(),
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

    console.log(req.body);

    const { ...foodData } = req.body;

    const updateFoodSchema = yup.object({
      name: yup.string().optional(),
      description: yup.string().optional(),
      price: yup.string().optional(),
      foodImage: yup.string().optional(),
      type: yup.string().optional(),
      category: yup.string().optional(),
      rating: yup.string().optional(),
      status: yup.string().optional(),
    });

    await updateFoodSchema.validate(foodData)

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
    console.log(error);
    return res.status(500).send({ message: "Internal server error!!" });
  }
};

//GET ALL FOOD

const getAllFood = async (req, res) => {
  try {
    const foodCategory = req?.query?.category;
    const limit = parseInt(req.query.limit) || 5;
    const page = parseInt(req.query.page) || 1;
    const status = req?.query?.status;

    if (!foodCategory) {
      return res.status(400).send({ message: "User id not found" });
    }
    console.log(foodCategory);
    const getItems = await Food.findAndCountAll({
      where: {
        category: foodCategory,
        status,
      },
      limit,
      offset: (page - 1) * limit,
    });

    const response2 = paginate(page, getItems.count, limit, getItems.rows);

    if (getItems && getItems.rows.length >= 1) {
      return res.status(200).send({
        message: "Get food successfully",
        data: response2,
      });
    } else {
      return res.status(404).send({ message: "No data found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal server error!!" });
  }
};

//GET SINGLE FOOD

const getSingleFood = async (req, res) => {
  try {
    const foodId = req?.params?.id;

    if (!foodId) {
      return res.status(400).send({ message: "Successfull get", data: record });
    }

    const record = await Food.findOne({
      where: {
        id: foodId,
      },
    });

    if (record) {
      return res.status(200).send({ message: "Successful get", data: record });
    } else {
      return res.status(404).send({ message: "No data found" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal server error!!!" });
  }
};

//DELETE FOOD ITEM

const deleteFood = async (req, res) => {
  try {
    const foodId = req?.params?.id;

    //validation
    if (!foodId) {
      return res.status(400).send({ message: "Food id is not found" });
    }

    const response = await Food.destroy({
      where: {
        id: foodId,
      },
    });

    if (response) {
      return res.status(200).send({ message: "Food deleted" });
    } else {
      return res.status(404).send({ message: "Something went wrong" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal server error!!!" });
  }
};

module.exports = {
  addFood,
  updateFood,
  getAllFood,
  getSingleFood,
  deleteFood,
};
