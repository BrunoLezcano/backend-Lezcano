import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import routerManager from "./src/routes/products.routes.js";
import { engine } from "express-handlebars";
//import { __dirname } from "./public/UTILS/utils.js";

dotenv.config();

const app = express();
const MONGO_URI = process.env.MONGO_DB_URL;
const THEPORT = process.env.PORT;

app.use(express.json());
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use(express.static("public"));

//CONEXION A BASE DE DATOS MONGO-ATLAS
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use("/", routerManager);

app.listen(THEPORT, () => {
    console.log(`corriendo en el puerto ${THEPORT}`);
});
