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
    try {
        const { thisId } = req.params;
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

export default router;
