import http from "http";

const servidor = http.createServer((solicitud, respuesta) => {
    respuesta.end("hola");
});
servidor.listen(8080, () => {
    console.log("hola esto esta en el 8080");
});
