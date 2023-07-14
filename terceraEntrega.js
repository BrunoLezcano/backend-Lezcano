import express from "express";
import ProductManager from "./segundaEntrega.js";

const app = express();

const newManager = new ProductManager("productos.json");

app.get("/", (req, res) => {
    res.send('<h1 style="color:red" >aca vamos con express <h1>');
});

app.get("/productos", async (req, res) => {
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

app.get("/productos/:thisId", async (req, res) => {
    try {
        const { thisId } = req.params;
        const answer = await newManager.getProductById(thisId);
        res.send(answer);
    } catch (error) {
        res.status(500).send("Error en el servidor");
        console.log(error);
    }
});

app.listen(8080, () => {
    console.log("servidor corriendo en express");
});
