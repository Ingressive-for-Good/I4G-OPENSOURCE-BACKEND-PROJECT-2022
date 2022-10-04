import Product from "../models/productModel.js";
import APIFeatures from "../utils/apiFeatures.js"; //sort, search, filter, fields and pagination

export const getAllProducts = async (req, res, next) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(Product.find(), req.query)
      .filter()
      .search()
      .sort()
      .limitFields()
      .paginate();
    const products = await features.query; // await the query from Product.find()

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: products.length,
      data: {
        products,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const features = new APIFeatures(
      Product.findById(req.params.id),
      req.query
    ).limitFields(); // for now the following fields were exlcuded from the result: -__v, -createdAt, -updatedAt
    const product = await features.query;

    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        product: newProduct,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    next(err);
    //proper error handling has not yet been implemented
  }
};
