import mongoose from "mongoose";

const cartProductsCollection = "cartProducts";

const cartProductSchema = new mongoose.Schema({
    quantity: Number,
    idProduct: String,
});

const CartProductModel = mongoose.model(cartProductsCollection, cartProductSchema);

export default CartProductModel;
