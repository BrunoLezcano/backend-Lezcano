import { Router } from "express";

const routerRealTime = Router();

routerRealTime.get("/", (req, res) => {
    res.render("realTimeProduct", { title: 22 });
});

export default routerRealTime;
