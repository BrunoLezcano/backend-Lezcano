import { Router } from "express";
import ProductModel from "../DAO/models/products.model.js";
import CartProductModel from "../DAO/models/carts.model.js";

const routerManager = Router();

routerManager.get("/", async (req, res) => {
    try {
        const result = await ProductModel.find();
        const cartProducts = await CartProductModel.find();

        res.json({
            data: result,
            message: result.length ? "listade usuarios" : "no hay usuarios",
        });
    } catch (error) {
        console.log(error);
    }
});

routerManager.post("/ingreso", async (req, res) => {
    const { title, description, price, thumbnail, code, stock } = req.body;
    try {
        const newProduct = { title, description, price, thumbnail, code, stock };
        const aditionProduct = await ProductModel.create(newProduct);
        res.json({
            data: aditionProduct,
            message: "producto cargado",
        });
    } catch (error) {
        console.log(error);
    }
});

export default routerManager;
