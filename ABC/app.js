import express from "express";
import routerHome from "./src/router/home.routes.js";
import { engine } from "express-handlebars";
import { __dirname } from "./utils.js";
import { join } from "path";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", join(__dirname, "./src/views"));

app.use(express.static("public"));
app.use("/", routerHome);

app.listen(PORT, () => {
    console.log(`corriendo en el puerto ${PORT}`);
});
