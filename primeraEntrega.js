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

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    checkCodeExist = (checkProduct) => {
        const view = this.products.some((finded) => {
            return finded.code === checkProduct.code;
        });
        view
            ? console.log("no se puede ingresar, codigo repetido")
            : this.products.push({ ...checkProduct, id: `${this.products[this.products.length - 1].id + 1}` });
    };

    checkIdExist = (searchId) => {
        const search = this.products.some((finded) => {
            return finded.id === searchId;
        });
        return search;
    };

    addProduct = (newProduct) => {
        if (newProduct instanceof Product) {
            this.products.length == 0 ? this.products.push({ ...newProduct, id: 1 }) : this.checkCodeExist(newProduct);
        } else {
            console.log("no se pueden agregar elementos que no sean de tipo Product");
        }
    };

    getProducts = () => console.log(this.products);

    getProductById = (idNeed) => {
        const lookId = this.checkIdExist(idNeed);
        lookId ? console.log(this.products[idNeed]) : console.log("Not Found");
    };
}

const nuevoManager = new ProductManager();

nuevoManager.addProduct(new Product("pure de tomate", "pure de tomate en pulpa", 90, "https=image....", 10, 200));
//EN LA SIGUIENTE LINEA COMENTADA DEMUESTRO QUE SI EL CODE ESTA REPETIDO DA UN AVISO Y NO LO INGRESA. EN ESTE CASO SE REPITE EL CODE 10.
//nuevoManager.addProduct(new Product("duraznos", "duraznos en mitades en almibar", 160, "https=image....", 10, 150));

nuevoManager.addProduct(new Product("lata atun", "atun trozado en aceite", 300, "https=image....", 25, 50));

nuevoManager.getProducts();

console.log("------------------------");

// EN EL SIGUIENTE CASO VA A DAR NOT FOUND, YA QUE EL ID 3 NO EXISTE, SI USA EL 1 O EL 2 SI LE VA A DEVOLVER EL ELEMENTO.
nuevoManager.getProductById(3);

console.log("------------------------");
// EN EL SIGUIENTE CASO VA A DAR NO SE PUEDEN AGREGAR PRODUCTOS QUE NO SEAN DEL TIPO "Product".
nuevoManager.addProduct("hola");
