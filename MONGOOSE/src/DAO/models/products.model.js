import mongoose from "mongoose";

const productsCollection = "products";

const productsSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    code: Number,
    stock: Number,
    status: { type: Boolean, default: true },
});

const ProductModel = mongoose.model(productsCollection, productsSchema);

export default ProductModel;
