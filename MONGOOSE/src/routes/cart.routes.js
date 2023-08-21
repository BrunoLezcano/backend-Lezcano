import { Router } from "express";
import CartProductModel from "../DAO/models/carts.model.js";
import { CartManager } from "../DAO/MONGOSYST/CartManager.js";

const routerCart = Router();
const managerProduct = new CartManager(CartProductModel);

routerCart.get("/", async (req, res) => {
    try {
        const products = await managerProduct.getProductsCart();
        const title = "Tu Carrito";
        console.log(products);
        res.render("carts", { listCart: products, title: title });
    } catch (error) {
        res.json({
            message: "hubo un error",
            status: 404,
        });
    }

    //res.render("carts");
});

routerCart.put("/:cid/:newQuantity", async (req, res) => {
    const { cid, newQuantity } = req.params;

    try {
        await managerProduct.updateProductCart(cid, newQuantity);
        res.send("paso");
    } catch (error) {
        res.status(500).send("algo fallo en el proceso dela solicitud");
    }
});

routerCart.post("/:cid/:cQuantity", async (req, res) => {
    const { cid, cQuantity } = req.params;

    const newProduct = await managerProduct.addProductCart(cQuantity, cid);
    res.send("ok");
});

routerCart.delete("/:cid", async (req, res) => {
    const { cid } = req.params;

    try {
        await managerProduct.deleteProductCart(cid);
    } catch (error) {
        res.status(500).send("algo fallo en el proceso dela solicitud");
    }
});

routerCart.delete("/", async (req, res) => {
    try {
        await managerProduct.deleteAllProductsCart();
        res.send("carrito eliminado");
    } catch (error) {
        res.status(500).send("algo fallo en el proceso de eliminacion");
    }
});

export default routerCart;
