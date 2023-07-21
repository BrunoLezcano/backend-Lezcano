import { Router } from "express";
import { ProductManager } from "../../productManager.js";

const routerHome = Router();

const productManager = new ProductManager("./productos.json");

routerHome.get("/", async (req, res) => {
    const listOfProducts = await productManager.getProducts();
    res.render("home", { title: "Home", tituloProductos: "Listado de productos", productos: listOfProducts });
});

export default routerHome;
