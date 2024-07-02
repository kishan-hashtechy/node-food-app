const Food = require("../models/food");
const yup = require("yup");
const { Op, where } = require("sequelize");
const paginate = require("../libs/common/paginate");

const addFood = async (req, res) => {
  try {
    const { name, description, price, type, category, foodImage } = req.body;

    const foodSchema = yup.object({
      name: yup.string().required("Food name is required"),
      description: yup.string().required("Food description is required"),
      price: yup.number().required("Price is required"),
      type: yup.string().required("Food type is required"),
      category: yup.string().required("Food category is required"),
      foodImage: yup.string().required("Food Image is required"),
    });

    await foodSchema.validate(req.body);

    const foddData = {
      name,
      description,
      price,
      type,
      category,
      foodImage,
      status: "Active",
    };

    const response = await Food.create(foddData);

    if (response) {
      return res.status(200).send({ message: "Successfuly added" });
    } else {
      const error = new error();
      error.status = 400;
      error.message = "Smoething occured"
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }
};

const getAllFood = async (req, res) => {
  try {
    const foodCatagory = req?.query?.category;
    const search = req?.query?.search || "";
    const page = req?.query?.page || 1;
    const limit = req?.query?.limit || 5;

    if (!foodCatagory) {
      return res.status(400).send({ message: "catagory id not found" });
    }

    let query = {};

    if (!search) {
      query = {
        category: foodCatagory,
        status: "Active",
      };
    } else {
      query = {
        name: {
          [Op.iLike]: `%${search}%`,
        },
        category: foodCatagory,
        status: "Active",
      };
    }

    const response = await Food.findAndCountAll({
      where: query,
      limit,
      offset: (page - 1) * limit,
    });

    const response2 = paginate(page, response?.count, limit, response?.rows);

    if (response && response?.rows?.length >= 1) {
      return res
        .status(200)
        .send({ message: "Sucessfuly get", data: response2 });
    } else {
      const error = new error();
      error.status = 400;
      error.message = "No data found"
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
};

const getSingleFood = async (req, res) => {
  try {
    const foodId = req.params.id;

    if (!foodId) {
      return res.status(400).send({ message: "food id not found" });
    }

    const response = await Food.findOne({
      where: {
        id: foodId,
      },
    });

    if (response) {
      return res
        .status(200)
        .send({ message: "Successfully get", data: response });
    } else {
      const error = new error()
      error.status = 400;
      error.message = "No data found"
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const updateFood = async (req, res) => {
  try {
    const foodId = req?.params?.id;

    const { ...foodData } = req.body;

    const foodSchema = yup.object({
      name: yup.string().optional(),
      description: yup.string().optional(),
      price: yup.number().optional(),
      type: yup.string().optional(),
      category: yup.string().optional(),
      foodImage: yup.string().optional(),
    });

    await foodSchema.validate(foodData);

    const findItems = await Food.findOne({
      where: {
        id: foodId,
      },
    });

    if (findItems) {
      const response = await Food.update(foodData, {
        where: {
          id: findItems?.id,
        },
      });

      if (response) {
        return res.status(200).send({ message: "Successfully Updated!!" });
      } else {
        const error = new error();
        error.status = 404;
        error.message = "Error in processing query"
      }
    } else {
      const error = new error();
      error.status = 404;
      error.message = "Items not found"
    }
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const deleteFood = async (req, res) => {
  try {
    const foodId = req?.parmas?.id;

    if (!foodId) {
      return res.status(400).send({ message: "Food Id not found" });
    }

    const response = await Food.destroy({
      where: {
        id: foodId,
      },
    });

    if (response) {
      return res.status(200).send({ message: "Successfully Deleted" });
    }else{
      const error = new error()
      error.status = 401; 
      error.message = "Something went wrong"
    }
  } catch {
    return res.status(500).message({ message: "Internal Server Error" });
  }
};

module.exports = { addFood, getAllFood, getSingleFood, updateFood, deleteFood };
