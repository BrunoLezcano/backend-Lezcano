import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import routerManager from "./routes/products.routes.js";

dotenv.config();

const app = express();
const MONGO_URI = process.env.MONGO_DB_URL;
const THEPORT = process.env.PORT;

//CONEXION A BASE DE DATOS
app.use(express.json());

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use("/", routerManager);

app.listen(THEPORT, () => {
    console.log("holacomo vaaaaaaaaaaaa");
});
