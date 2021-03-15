import Item from './Item';
import Cart from './Cart';

const getItems = () => {

    return fetch('https://api.jsonbin.io/b/604b59ae7ffeba41c0770569', {
        method: 'GET',

        headers: {
            'secret-key': '$2b$10$X5VpA2EtQtuQwkQnepGe2ehXNLtB40e.O5yrZ3rXK7heQHyin.QZG'
        }
    })
        .then(response => { return response.json() })

}

const createProductListTemplate = (productDetails) => {
    const { discount, image, name, price } = productDetails
    const stringObj = JSON.stringify(productDetails)
    const template = `
    <div class= "card" "data-attr" = "${stringObj}">
        <div class="discount-badge">${discount}% off</div>
        <img class="product-image" src = '${image}'>
            <div class="card-details-section">
                <div class="product-name-container" style="display:flex"><p>${name}</p></div>
                    <div class="item-prices-container">
                        <p class="display-price">$${price.display}</p>
                        <p class="actual-price"> $${price.actual}</p>
                        <button class="addToCartBtn" onClick="${productDetails.addToCart}">
                            Add to Cart
                        </button>
                    </div>
       
            </div>
    </div> `
    return template;
}
export const createProductList = () => {
    getItems().then(({ items }) => {
        let template = ``
        items.forEach((item) => {

            template += createProductListTemplate(item);
        });
        document.getElementById('primary-card-container').insertAdjacentHTML('beforeend', template)
    }).then(() => {
        bindAddToCartClick();
    })
}

const createNewItemInCart = (item) => {
    const { itemPrice, imageUrl, name, quantity } = item
    const template = ` <div id= "cart-body"class="cart-body">
    <div class="cart-item-holder">
        <div class="cart-item">
            <div class="cart-item-name-img-holder">
                <img class="cart-item-image"
                    src="${imageUrl}" />
                <p>${name}</p>
            </div>
            <div class="item-quantity-holder">
                <button class="increaseItemCountBtn">+</button>
                <p>${quantity}</p>
                <button class="decreaseItemCountBtn">-</button>
            </div>
            
            <p>$${itemPrice}</p>
        </div>
    </div>
</div>`;
    return template
}
let createdCart = null;
export const createCartBody = () => {
    removePreviousCartBody();
    let template = ``;
    const allItems = createdCart.getAllItems();
    allItems.forEach((i) => {
        template += createNewItemInCart(i);
    })
        ;



    document.getElementById('cart').insertAdjacentHTML('beforeend', template);
}
const handleAddToCartClick = (event) => {
    console.log('add', event);
    const price = event.target.parentElement.children[1].innerText;
    const displayPrice = event.target.parentElement.children[0].innerText;
    const name = event.target.parentElement.parentElement.children[0].children[0].innerText;
    const img = event.target.parentElement.parentElement.parentElement.children[1].src;
    const discount = Number(event.target.parentElement.parentElement.parentElement.children[0].innerText.replace('% off', ''))
    const quantity = 1;
    const newCartItem = new Item(name, img, displayPrice, price, discount, quantity);

    addItemToCart(newCartItem);
    createCartBody(newCartItem);
    bindIncreaseAndDecreaseItemCount();
    document.getElementById('empty-card-banner').style.display = "none";
}
const createNewCart = (item) => {
    const newCart = new Cart([], 0);
    createdCart = newCart;
};

const addItemInCart = (item) => {
    createdCart.addItem(item);
};
const addItemToCart = (item) => {
    if (!!createdCart) {
        const selectedItem = createdCart.items.find(i => i.name.toLowerCase() === item.name.toLowerCase());
        if (!!selectedItem) {
            createdCart.updateItemQuantity(item.name, 'increment');
        } else {
            addItemInCart(item);
        };
    } else {
        createNewCart(item);
        addItemInCart(item)
    }
    const billDetails = createdCart.getCartPriceDetails()

    createBillSection(billDetails);
}
export const bindAddToCartClick = () => {
    Array.from(document.getElementsByClassName('addToCartBtn')).forEach((el) => {
        el.addEventListener('click', handleAddToCartClick, false)
    });
}
const increaseItemCount = (event) => {
    const productName = event.target.parentElement.parentElement.children[0].children[1].innerText;
    createdCart.updateItemQuantity(productName, 'increment')
    console.log('increase item count');
    console.log('cart total', createdCart.getCartPriceDetails());
    removePreviousCartBody();
    createCartBody();
    bindIncreaseAndDecreaseItemCount();
    const billDetails = createdCart.getCartPriceDetails()
    createBillSection(billDetails);

}
const decreaseItemCount = (event) => {
    const productName = event.target.parentElement.parentElement.children[0].children[1].innerText;
    if (Number(event.target.parentElement.children[1].innerText) === 1) {
        createdCart.removeItemFromCart(productName);
        document.getElementById('empty-card-banner').style.display = "block";
    } else {
        createdCart.updateItemQuantity(productName, 'decrement')
    }

    console.log('increase item count');
    console.log('cart total', createdCart.getTotal());
    removePreviousCartBody();
    createCartBody();
    const billDetails = createdCart.getCartPriceDetails()

    createBillSection(billDetails);
    bindIncreaseAndDecreaseItemCount();
}
const bindIncreaseAndDecreaseItemCount = () => {
    Array.from(document.getElementsByClassName('increaseItemCountBtn')).forEach((el) => {
        el.addEventListener('click', increaseItemCount, false)
    });

    Array.from(document.getElementsByClassName('decreaseItemCountBtn')).forEach((el) => {
        el.addEventListener('click', decreaseItemCount, false)
    });
}

const removePreviousCartBody = () => {
    !!document.getElementById('cart-body') ? Array.from(document.getElementsByClassName('cart-body')).forEach((el) => {
        el.remove()
    }) : '';

}

const createBillSection = (billDetails) => {
    !!document.getElementById('bill-section-container').children.length > 0 ? document.getElementById('bill-section').remove() : '';
    const template = ` <div class="bill-section" id="bill-section">
    Total
    <div class= "bill-section-card">
        <div>
            <p>Items(${billDetails.totalNumberOfItems})</p>
            <p>Discount</p>
            <p>Type Discount</p>
        </div>
        <div>
            <p>$${billDetails.totalPrice}</p>
            <p>-$${billDetails.totalDiscount}</p>
            <p>-$0</p>
        </div>
        
    </div>
    <div class="order-total">
        <div>
            Order Total 
        </div>
        <div>
            951$
        </div>
    </div>
</div>`;


document.getElementById('bill-section-container').insertAdjacentHTML('beforeend', template);
}


