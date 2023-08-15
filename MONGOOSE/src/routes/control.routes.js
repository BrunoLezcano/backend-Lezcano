import { Router } from "express";
import ProductModel from "../DAO/models/products.model.js";
import { ProductManager } from "../DAO/MONGOSYST/ProductManager.js";

const routerControl = Router();

const managerProduct = new ProductManager(ProductModel);

routerControl.get("/", async (req, res) => {
    try {
        const list = await managerProduct.getProducts();
        res.render("control");
    } catch (error) {
        res.status(404).send("no se pudieron cargar los productos solicitados");
    }
});

routerControl.get("/:thisId", async (req, res) => {
    const { thisId } = req.params;

    try {
        const list = await managerProduct.getProducts();
        const buscado = await managerProduct.getProductById(list, thisId);
        if (buscado) {
            console.log(buscado);
        } else {
            console.log("el producto con ese ID NO existe ");
        }
        res.send("ok");
    } catch (error) {
        console.log("algo salio mal");
    }
});

routerControl.put("/:thisId", async (req, res) => {
    const { thisId } = req.params;
    const theBody = req.body;
    try {
        await managerProduct.updateProduct(thisId, theBody);
        res.send("modificado");
    } catch (error) {
        res.status(404).send("no se pudo modificar el producto");
    }
});

routerControl.post("/", async (req, res) => {
    const theBody = req.body;
    try {
        await managerProduct.addProduct(theBody);
        res.send("cargado el nuevo producto");
    } catch (error) {
        res.status(404).send("error en la carga del producto");
    }
});

routerControl.delete("/:thisId", async (req, res) => {
    const { thisId } = req.params;

    try {
        await managerProduct.deleteProduct(thisId);
        res.send("productoeliminado");
    } catch (error) {
        console.log("no se pudo eliminar");
    }
});

export default routerControl;
