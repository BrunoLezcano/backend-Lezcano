import { Router } from "express";
import ProductModel from "../DAO/models/products.model.js";

const routerManager = Router();

routerManager.get("/", async (req, res) => {
    try {
        const result = await ProductModel.paginate({}, { limit: 10, page: 1 });
        const theProducts = await ProductModel.find().lean();
        console.log(result); // resultado de lapaginacion
        res.cookie("la cookie", "este es el contenido de la cookie", { maxAge: 20000 }).render("home", {
            listado: "Listado de Productos",
            productos: theProducts,
            title: "productos",
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
