import { Router } from "express";
import ProductModel from "../DAO/models/products.model.js";

const routerManager = Router();

routerManager.get("/", async (req, res) => {
    try {
        const result = await ProductModel.paginate({}, { limit: 10, page: 1 });
        //const result = await ProductModel.find();////ACA TRAIA TODO POR DEFECTO
        console.log(result);
        res.send("ok");

        //res.render("home", { listado: "Listado de Productos", productos: result, title: "productos" });
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
