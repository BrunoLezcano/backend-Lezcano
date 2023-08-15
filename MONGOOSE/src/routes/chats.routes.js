import { Router } from "express";
import MessageModel from "../DAO/models/messages.model.js";

const routerMessages = Router();

routerMessages.get("/", async (req, res) => {
    try {
        const listaDeMensajes = await MessageModel.find().lean();
        res.render("chats", { totalChat: listaDeMensajes });
    } catch (error) {
        console.log(error);
    }
});

routerMessages.post("/", async (req, res) => {
    const { user, message } = req.body;

    try {
        const newMessage = await MessageModel.create({ user, message });
        res.json({
            data: newMessage,
            message: "hay mensaje",
        });
    } catch (error) {
        console.log("halgo salio mal  con el mensaje");
    }
});

export default routerMessages;
