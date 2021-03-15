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
                        ...i, quantity: i.quantity += 1
                    }
                } else {
                    return {
                        ...i
                    }
                }
            });

        }
    }

    removeItem() {
        //TBD method logic
    }

    getItem() {
        //TBD method logic
    }

    getTotal() {
        return this.items.reduce(function (acc, obj) { return acc + (Number(obj.actualPrice.replace('$','')) * Number(obj.quantity))}, 0);
    }
}
