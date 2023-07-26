import { Router } from "express";
import { ProductManager } from "../../productManager.js";

const routerRealTime = Router();

const productManager = new ProductManager("./productos.json");

let listOfProducts = await productManager.getProducts();
routerRealTime.get("/", async (req, res) => {
    res.render("realTimeProducts", { products: listOfProducts, encabezado: "Listado de Productos" });
});
routerRealTime.post("/", (req, res) => {
    res.render("realTimeProducts", { products: listOfProducts, encabezado: "Listado de Productos" });
});

export default routerRealTime;
