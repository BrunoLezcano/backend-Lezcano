import mongoose from "mongoose";
import mongoosepaginate from "mongoose-paginate-v2";

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

productsSchema.plugin(mongoosepaginate);

const ProductModel = mongoose.model(productsCollection, productsSchema);

export default ProductModel;
