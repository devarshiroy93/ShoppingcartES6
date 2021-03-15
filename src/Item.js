export default class Item{
    constructor(name , imageUrl , displayPrice = 0 ,actualPrice = 0,discount = 0 ,quantity = 0 ){
        this.name = name;
        this.imageUrl = imageUrl;
        this.displayPrice = displayPrice;
        this.actualPrice = actualPrice;
        this.discount = discount;
        this.quantity = quantity;
        this.itemPrice =  Number(actualPrice.replace('$','')) * quantity;
    }
}