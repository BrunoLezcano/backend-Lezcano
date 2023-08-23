import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import routerManager from "./src/routes/products.routes.js";
import { engine } from "express-handlebars";
import routerMessages from "./src/routes/chats.routes.js";
import routerControl from "./src/routes/control.routes.js";
import routerCart from "./src/routes/cart.routes.js";
import cookieParser from "cookie-parser";
///import FileStore from "session-file-store";

import MongoStore from "connect-mongo";
import session from "express-session";

dotenv.config();

const app = express();
const MONGO_URI = process.env.MONGO_DB_URL;
const THEPORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser()); // PARA COOKIES

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use(express.static("public"));

//const fileStore = FileStore(session);

app.use(
    session({
        store: MongoStore.create({
            mongoUrl: MONGO_URI,
            mongoOptions: {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
            ttl: 30,
        }),
        secret: "codersecret",
        resave: true,
        saveUninitialized: true,
    })
);

//CONEXION A BASE DE DATOS MONGO-ATLAS
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use("/", routerManager);
app.use("/messages", routerMessages);
app.use("/control", routerControl);
app.use("/carts", routerCart);

app.listen(THEPORT, () => {
    console.log(`corriendo en el puerto ${THEPORT}`);
});
