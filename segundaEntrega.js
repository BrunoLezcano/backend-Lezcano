import fs from "fs";

class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        (this.title = title),
            (this.description = description),
            (this.price = price),
            (this.thumbnail = thumbnail),
            (this.code = code),
            (this.stock = stock);
    }
}

export class ProductManager {
    constructor(path) {
        this.path = path;
        this.allProducts = this.getProductsPath();
    }

    // FUNCION PARA TRAER LOS PRODUCTOS YA TRANSFORMADOS A JSON
    async getProductsPath() {
        try {
            let List = await fs.promises.readFile(this.path, "utf-8");
            let listParsed = JSON.parse(List);
            return listParsed;
        } catch (error) {
            console.log(`el error es ${error}`);
        }
    }

    // CONFIRMAR EXISTENCIA DE PRODUCTOS
    checkLengthProducts(theArray) {
        let large = theArray;
        return large.length == 0;
    }

    checkCodeExist(arrayCheck, productCheck) {
        let result = arrayCheck.some((looked) => {
            return looked.code === productCheck.code;
        });
        return result;
    }

    checkIdExist(searchId, arrayNeed) {
        const search = arrayNeed.some((finded) => {
            return finded.id == searchId;
        });
        return search;
    }

    addIdNumber(product, productsArray) {
        let maxId = Math.max(...productsArray.map((theProduct) => theProduct.id));
        const productModify = { ...product, id: maxId + 1 };
        return productModify;
    }

    findTheProduct(Id, array) {
        const answer = array.find((product) => {
            return product.id == Id;
        });
        return answer;
    }

    async updateInfoPath(newProduct, newArray) {
        newArray.push(newProduct);
        await fs.promises.writeFile(this.path, JSON.stringify(newArray), "utf-8");
    }

    async addProduct(productAdd) {
        if (productAdd instanceof Product) {
            let listParsed = await this.allProducts;
            if (this.checkLengthProducts(listParsed)) {
                const newProduct = { ...productAdd, id: 1 };
                this.updateInfoPath(newProduct, listParsed);
            } else {
                const thisCode = this.checkCodeExist(listParsed, productAdd);
                if (!thisCode) {
                    const newProduct = this.addIdNumber(productAdd, listParsed);
                    this.updateInfoPath(newProduct, listParsed);
                } else {
                    console.log("codigo existente, imposible ingresar");
                }
            }
        } else {
            console.log("imposible ingresar un producto que no sea del tipo producto");
        }
    }

    getProductById = async (findProductId) => {
        const listadoProductos = await this.allProducts;
        if (this.checkIdExist(findProductId, listadoProductos)) {
            const theProduct = this.findTheProduct(findProductId, listadoProductos);
            return theProduct;
        } else {
            console.log(`Lo siento epro el ID # ${findProductId} # no está en la lista de productos`);
        }
    };

    deleteProduct = async (idNeed) => {
        const listadoProductos = await this.allProducts;
        if (this.checkIdExist(idNeed, listadoProductos)) {
            const newArray = listadoProductos.filter((product) => product.id !== idNeed);
            await fs.promises.writeFile(this.path, JSON.stringify(newArray));
            console.log("ID eliminado correctamente.");
        } else {
            console.log(`Diculpas, hay errores en el dato, chequea ID o ingresa un objeto Product`);
        }
    };

    updateProductById = async (idNeed, changesProduct) => {
        const listadoProductos = await this.allProducts;
        if (this.checkIdExist(idNeed, listadoProductos) && changesProduct instanceof Product) {
            const updatedArray = listadoProductos.map((product) => {
                if (product.id === idNeed) {
                    return { ...product, ...changesProduct };
                } else {
                    return product;
                }
            });
            await fs.promises.writeFile(this.path, JSON.stringify(updatedArray), "utf-8");
            console.log("Producto modificado con exito.");
        } else {
            console.log(`Disculpas, ese ${idNeed} no se encuentra en la base de datos`);
        }
    };

    getProducts = async () => {
        const listadoProductos = await this.allProducts;
        return listadoProductos.length == 0 ? console.log("no hay productos listados") : this.allProducts;
    };
}

const nuevoManager = new ProductManager("./productos.json");

//nuevoManager.addProduct(new Product("coca", "bebida cola", 500, "http/askdjklfds", 10, 25)); // INGRESA PRODUCTO

//nuevoManager.addProduct("hola"); // AQUI COMPROBAMOS QUE HAY QUE AGREGAR UN TIPO DE PRODUCTO DEL TIPO PRODUCT
//nuevoManager.addProduct(new Product("pepsi", "bebida de hierbas", 500, "http/askdjklfds", 11, 25)); // INGRESA PRODUCTO
//nuevoManager.addProduct(new Product("mate cocido", "bebida de hierbas", 500, "http/askdjklfds", 11, 25)); // FALLA POR CODE
//nuevoManager.addProduct(new Product("caramelo", "caramelos sabores varios", 10, "http/askdjklfds", 35, 1500)); // INGRESA PRODUCTO
//nuevoManager.getProductById(2);
//nuevoManager.getProducts();

//nuevoManager.updateProductById(1, new Product("caramelo", "caramelos varios", 12, "http/askdjklfds", 35, 2000));
//nuevoManager.deleteProduct(1);
nuevoManager.getProducts();
