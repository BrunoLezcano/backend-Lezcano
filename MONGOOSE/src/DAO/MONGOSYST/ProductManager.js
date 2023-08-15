export class ProductManager {
    constructor(theModel) {
        this.theModel = theModel;
    }

    checkLengthProducts = (arrayNeed) => {
        return arrayNeed.length >= 1;
    };

    checkCodeExist = (arrayNeed, codeCheck) => {
        const control = arrayNeed.some((product) => product.code === Number(codeCheck));
        return control;
    };

    checkExistId = (arrayNeed, theId) => {
        const theProduct = arrayNeed.some((product) => product._id == theId);
        return theProduct;
    };

    getProductById = (arrayNeed, theId) => {
        const theProduct = arrayNeed.find((product) => product._id == theId);
        return theProduct;
    };

    addProduct = async (newProduct) => {
        const listProducts = await this.getProducts();
        if (this.checkLengthProducts(listProducts)) {
            if (await this.checkCodeExist(listProducts, newProduct.code)) {
                return false; //EN CASO DE QUE EL CODIGO YA EXISTA Y PREVENIR EL INGRESO.PARA ENVIAR MSJ
            } else {
                await this.theModel.create(newProduct);
            }
        } else {
            await this.theModel.create(newProduct);
        }
    };

    updateProduct = async (idNeed, newValues) => {
        const listProducts = await this.getProducts();
        if (await this.checkExistId(listProducts, idNeed)) {
            await this.theModel.updateOne({ _id: idNeed }, { $set: newValues });
        } else {
            return false; // EN CASO DE NO EXISTIR EL ID.. PARA ENVIAR MSJ
        }
    };

    deleteProduct = async (idNeed) => {
        const listProducts = await this.getProducts();

        if (await this.checkExistId(listProducts, idNeed)) {
            await this.theModel.deleteOne({ _id: idNeed });
        } else {
            return false; // EN CASO DE NO EXISTIR EL ID.. PARA ENVIAR MSJ
        }
    };

    getProducts = async () => {
        try {
            const response = await this.theModel.find().lean();
            return response;
        } catch (error) {
            console.log(error);
        }
    };
}
