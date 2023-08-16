import { Router } from "express";
import CartProductModel from "../DAO/models/carts.model.js";
import { CartManager } from "../DAO/MONGOSYST/CartManager.js";

const routerCart = Router();
const managerProduct = new CartManager(CartProductModel);

routerCart.get("/", async (req, res) => {
    const products = await managerProduct.getProductsCart();

    console.log(products);
    res.render("carts");
});

routerCart.post("/:cid/:cQuantity", async (req, res) => {
    const { cid, cQuantity } = req.params;

    const newProduct = await managerProduct.addProductCart(cQuantity, cid);
    console.log(newProduct);
});

export default routerCart;
