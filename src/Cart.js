export default class Cart {
    constructor() {
        this.items = [];
        this.total = 0;
    }

    addItem(item) {

        this.items.push(item);
        this.total += Number(item.actualPrice.replace('$', ''));



    }

    updateItemQuantity(itemName, action) {
        const selectedItem = this.items.find(i => i.name.toLowerCase() === itemName.toLowerCase());
        if (!!selectedItem) {
            this.items = this.items.map((i) => {
                if (selectedItem.name.toLowerCase() === i.name.toLowerCase()) {
                    return {
                        ...i, quantity: action==='increment' ? i.quantity += 1 : i.quantity -= 1 ,itemPrice : Number(i.actualPrice.replace('$','')) * i.quantity
                    }
                } else {
                    return {
                        ...i
                    }
                }
            });

        }
        
    }



    getTotal() {
        return this.items.reduce(function (acc, obj) { return acc + (Number(obj.actualPrice.replace('$','')) * Number(obj.quantity))}, 0);
    }

    getAllItems(){
        return this.items.slice();
    }

    removeItemFromCart(productName){
        this.items =  this.items.filter(i => i.name.toLowerCase() !== productName.toLowerCase());
    }

    getCartPriceDetails(){
        const totalNumberOfItems = this.items.reduce(function (acc, obj) { return acc + (Number(obj.quantity))}, 0);
        const totalPrice = this.items.reduce(function (acc, obj) { return acc + (Number(obj.actualPrice.replace('$','')) * Number(obj.quantity))}, 0);
        const totalDiscount =  this.items.reduce(function (acc, obj) { return acc + (Number(obj.displayPrice.replace('$','')) * Number(obj.quantity))}, 0) - totalPrice ;
        return {
            totalNumberOfItems,
            totalPrice,
            totalDiscount
        }
    }

}
