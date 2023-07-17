import express from "express";
import router from "./router/product.router.js";
import routerCart from "./router/cart.router.js";

const app = express();
const PORT = 8080;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("hola como va");
});

app.use("/api/productos/", router);

app.use("/api/cart/", routerCart);

app.listen(PORT, () => {
    console.log(`servidor corriendo en puerto ${PORT}`);
});
