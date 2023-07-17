import { Router } from "express";

import { cartManager } from "../productManager.js";

const newCartView = new cartManager("./src/cart.json");

const routerCart = Router();

routerCart.get("/", async (req, res) => {
    try {
        let listOfCart = await newCartView.getCartProducts();
        res.send(listOfCart);
    } catch (error) {
        console.log(error);
    }
});

routerCart.get("/:cid", async (req, res) => {
    const { cid } = req.params;

    const listCart = await newCartView.getCartProducts();
    try {
        if (newCartView.checkExistProduct(cid, listCart)) {
            const filtered = await newCartView.getCartProductById(cid);
            res.send(filtered);
        } else {
            res.send(`no existe el id ${cid} dentro de la lista del carrito`);
        }
    } catch (error) {
        console.log(error);
    }
});

routerCart.post("/", async (req, res) => {
    const { id, quantity } = req.body;
    const newProduct = await newCartView.addProductCart(id, quantity);
    try {
        res.send({ message: "cargado", data: newProduct });
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
        console.log(error);
    }
});

export default routerCart;
