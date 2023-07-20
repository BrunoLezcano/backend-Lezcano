import { Router } from "express";

const routerHome = Router();

routerHome.get("/", (req, res) => {
    res.render("home", { title: "Home", tituloProductos: "Listado de productos" });
});

export default routerHome;
