import express from "express";
import routerHome from "./src/router/home.routes.js";
import routerRealTime from "./src/router/realTimeProducts.routes.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
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
app.use("/realTimeProducts/", routerRealTime);

const server = app.listen(PORT, () => {
    console.log(`corriendo en el puerto ${PORT}`);
});

//LEVANTANDO EL SERVIDOR
server.on("error", (err) => console.error(err));

const ioServer = new Server(server);

ioServer.on("connection", (socket) => {
    console.log("nuevo conectado");

    socket.on("mensaje", (data) => {
        console.log("recibido ", data);
    });

    socket.on("agregarProducto", () => {
        console.log("lalalala");
    });
});
