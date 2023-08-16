export class CartManager {
    constructor(theModel) {
        this.theModel = theModel;
    }

    checkLengthProducts = (arrayNeed) => {
        return arrayNeed.length >= 1;
    };

    checkIdCartExist = async (idNeed) => {
        const findIdCart = await this.theModel.find({ _id: idNeed }); // SINO LO  ENCUENTRA DEVUELVE ARRAY  VACIO
        return findIdCart;
    };

    updateProductCart = async () => {};

    addProductCart = async (quantity, idNew) => {
        await this.theModel.create({ quantity: quantity, idProduct: idNew });
    };

    getProductsCart = async () => {
        await this.theModel.find().lean();
    };
}
