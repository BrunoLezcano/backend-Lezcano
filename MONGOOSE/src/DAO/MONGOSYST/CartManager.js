export class CartManager {
    constructor(theModel) {
        this.theModel = theModel;
    }

    checkLengthProducts = (arrayNeed) => {
        return arrayNeed.length >= 1;
    };

    thisProductsList = async () => {
        const list = await this.theModel.find().populate("idProduct");
        return list;
    };

    checkIdCartExist = async (idNeed) => {
        const wanted = await this.theModel.find().populate("idProduct", "_id stock");
        const checkID = wanted.some((producto) => producto.idProduct._id == idNeed);

        return checkID;
    };

    findproduct = async (idNeed) => {
        const wanted = await this.theModel.find().populate("idProduct", "_id stock");
        const theProduct = wanted.find((producto) => producto.idProduct._id == idNeed);

        return theProduct;
    };

    updateProductCart = async (idNeed, newQuantity) => {
        const checkId = await this.checkIdCartExist(idNeed);

        if (checkId) {
            const finded = await this.findproduct(idNeed);

            const newQuantityProduct = finded.quantity + Number(newQuantity);
            await this.theModel.updateOne(finded, { $set: { quantity: newQuantityProduct } });

            console.log("si esta aca es porque se modifico");
        } else {
            return false;
        }
    };

    deleteProductCart = async (idNeed) => {
        await this.theModel.deleteOne({ _id: idNeed });
    };

    deleteAllProductsCart = async () => {
        await this.theModel.deleteMany({});
    };

    addProductCart = async (quantity, idNew) => {
        await this.theModel.create({ quantity: quantity, idProduct: idNew });
    };

    getProductsCart = async () => {
        const list = await this.theModel.find().populate("idProduct").lean();
        return list;
    };
}
