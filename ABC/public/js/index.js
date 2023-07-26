import { Product } from "../../productManager";

const socket = io();

document.getElementById("productForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const thumbnail = document.getElementById("thumbnail").value;
    const code = document.getElementById("code").value;
    const stock = document.getElementById("stock").value;

    const theProduct = new Product(title, description, price, thumbnail, code, stock);
    socket.emit("agregarProducto", theProduct);
});

socket.on("saludar", () => {
    alert("como  vaaaaa");
});
