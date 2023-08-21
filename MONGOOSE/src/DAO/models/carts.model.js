import mongoose from "mongoose";
//import mongoosepaginate from "mongoose-paginate-v2";

const cartProductsCollection = "cartProducts";

const cartProductSchema = new mongoose.Schema({
    quantity: Number,
    idProduct: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
});

//cartProductSchema.plugin(mongoosepaginate);

const CartProductModel = mongoose.model(cartProductsCollection, cartProductSchema);

export default CartProductModel;
