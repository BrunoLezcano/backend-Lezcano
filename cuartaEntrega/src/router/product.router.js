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
    //const ingresado = new Product();
    //{} = req.body;
    //!(ingresado instanceof Product) && res.json({ message: "no se permite ingresar ese producto" });
    try {
        const response = await newManager.addProduct(ingresado);
        res.json({ message: "cargado", data: response });
    } catch (error) {
        console.log(error);
    }
});

export default router;
