import { Router } from "express";

import { ProductManager, Product } from "../productManager.js";

const newManager = new ProductManager("./src/productos.json");

const router = Router();

router.get("/", async (req, res) => {
    const { limit } = req.query;
    try {
        let response = await newManager.getProducts();
        if (limit) {
            const arrayWithLimit = response.slice(0, limit);
            res.send(arrayWithLimit);
        } else {
            res.send(response);
        }
    } catch (error) {
        res.status(500).send("Error en el servidor");
        console.log(error);
    }
});

router.get("/:thisId", async (req, res) => {
    const { thisId } = req.params;
    try {
        const answer = await newManager.getProductById(thisId);
        res.send(answer);
    } catch (error) {
        res.status(500).send("Error en el servidor");
        console.log(error);
    }
});

router.post("/", async (req, res) => {
    const { title, description, price, thumbnail, code, stock, status } = req.body;

    let product = new Product(title, description, price, thumbnail, code, stock, status);
    const resp = await newManager.addProduct(product);
    try {
        res.json({ message: "cargado", data: resp });
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
        console.log(error);
    }
});

router.put("/:thisId", async (req, res) => {
    const { thisId } = req.params;
    const objeto = req.body;

    const totalProducts = await newManager.getProducts();
    const newObject = { ...objeto };
    try {
        if (newManager.checkIdExist(thisId, totalProducts)) {
            const productModified = await newManager.updateProductById(thisId, newObject);
            res.json({ message: "cargado", data: productModified });
        } else {
            res.send(`No se encuentra el id ${thisId} en el listadode productos.`);
        }
    } catch (error) {}
});

export default router;
