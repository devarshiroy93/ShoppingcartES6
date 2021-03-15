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
    const { actualPrice, imageUrl, name } = item
    const template = ` <div class="cart-body">
    <div class="cart-item-holder">
        <div class="cart-item">
            <div class="cart-item-name-img-holder">
                <img class="cart-item-image"
                    src="${imageUrl}" />
                <p>${name}</p>
            </div>
            <div class="item-quantity-holder">
                <button class="increaseItemCountBtn">+</button>
                <p>1</p>
                <button class="decreaseItemCountBtn">-</button>
            </div>
            
            <p>${actualPrice}</p>
        </div>
    </div>
</div>`;
    return template
}
let createdCart = null;
export const createCartBody = (item) => {
    const template = createNewItemInCart(item);
    document.getElementById('cart').insertAdjacentHTML('beforeend', template);
}
const handleAddToCartClick = (event) => {
    console.log('add', event);
    const price = event.target.parentElement.children[1].innerText;
    const name = event.target.parentElement.parentElement.children[0].children[0].innerText;
    const img = event.target.parentElement.parentElement.parentElement.children[1].src;
    const quantity = 1;
    const newCartItem = new Item(name, img, 0, price, 0, quantity);

    createCartBody(newCartItem);
    addItemToCart(newCartItem);
    bindIncreaseAndDecreaseItemCount();
}
const createNewCart= (item)=>{
    const newCart = new Cart([], 0);
    newCart.addItem(item);
    createdCart = newCart;
} ;
const addItemToCart = (item) => {
    if(!!createdCart){
        const selectedItem = createdCart.items.find(i => i.name.toLowerCase() === item.name.toLowerCase());
        if(!!selectedItem){
            createdCart.updateItemQuantity(item.name)
        }else{
            createNewCart(item)
        };
    }else{
        createNewCart(item)
    }
    



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
    console.log('cart total' , createdCart.getTotal())
}
const decreaseItemCount = () => {
    console.log('decrease item count');
}
const bindIncreaseAndDecreaseItemCount = () => {
    Array.from(document.getElementsByClassName('increaseItemCountBtn')).forEach((el) => {
        el.addEventListener('click', increaseItemCount, false)
    });

    Array.from(document.getElementsByClassName('increaseItemCountBtn')).forEach((el) => {
        el.addEventListener('click', decreaseItemCount, false)
    });
}


