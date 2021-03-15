/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createProductList": () => (/* binding */ createProductList),
/* harmony export */   "createCartBody": () => (/* binding */ createCartBody),
/* harmony export */   "bindAddToCartClick": () => (/* binding */ bindAddToCartClick)
/* harmony export */ });
/* harmony import */ var _Item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Item */ "./src/Item.js");
/* harmony import */ var _Cart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Cart */ "./src/Cart.js");



var getItems = function getItems() {
  return fetch('https://api.jsonbin.io/b/604b59ae7ffeba41c0770569', {
    method: 'GET',
    headers: {
      'secret-key': '$2b$10$X5VpA2EtQtuQwkQnepGe2ehXNLtB40e.O5yrZ3rXK7heQHyin.QZG'
    }
  }).then(function (response) {
    return response.json();
  });
};

var createProductListTemplate = function createProductListTemplate(productDetails) {
  var discount = productDetails.discount,
      image = productDetails.image,
      name = productDetails.name,
      price = productDetails.price;
  var stringObj = JSON.stringify(productDetails);
  var template = "\n    <div class= \"card\" \"data-attr\" = \"".concat(stringObj, "\">\n        <div class=\"discount-badge\">").concat(discount, "% off</div>\n        <img class=\"product-image\" src = '").concat(image, "'>\n            <div class=\"card-details-section\">\n                <div class=\"product-name-container\" style=\"display:flex\"><p>").concat(name, "</p></div>\n                    <div class=\"item-prices-container\">\n                        <p class=\"display-price\">$").concat(price.display, "</p>\n                        <p class=\"actual-price\"> $").concat(price.actual, "</p>\n                        <button class=\"addToCartBtn\" onClick=\"").concat(productDetails.addToCart, "\">\n                            Add to Cart\n                        </button>\n                    </div>\n       \n            </div>\n    </div> ");
  return template;
};

var createProductList = function createProductList() {
  getItems().then(function (_ref) {
    var items = _ref.items;
    var template = "";
    items.forEach(function (item) {
      template += createProductListTemplate(item);
    });
    document.getElementById('primary-card-container').insertAdjacentHTML('beforeend', template);
  }).then(function () {
    bindAddToCartClick();
  });
};

var createNewItemInCart = function createNewItemInCart(item) {
  var itemPrice = item.itemPrice,
      imageUrl = item.imageUrl,
      name = item.name,
      quantity = item.quantity;
  var template = " <div id= \"cart-body\"class=\"cart-body\">\n    <div class=\"cart-item-holder\">\n        <div class=\"cart-item\">\n            <div class=\"cart-item-name-img-holder\">\n                <img class=\"cart-item-image\"\n                    src=\"".concat(imageUrl, "\" />\n                <p>").concat(name, "</p>\n            </div>\n            <div class=\"item-quantity-holder\">\n                <button class=\"increaseItemCountBtn\">+</button>\n                <p>").concat(quantity, "</p>\n                <button class=\"decreaseItemCountBtn\">-</button>\n            </div>\n            \n            <p>$").concat(itemPrice, "</p>\n        </div>\n    </div>\n</div>");
  return template;
};

var createdCart = null;
var createCartBody = function createCartBody() {
  removePreviousCartBody();
  var template = "";
  var allItems = createdCart.getAllItems();
  allItems.forEach(function (i) {
    template += createNewItemInCart(i);
  });
  document.getElementById('cart').insertAdjacentHTML('beforeend', template);
};

var handleAddToCartClick = function handleAddToCartClick(event) {
  console.log('add', event);
  var price = event.target.parentElement.children[1].innerText;
  var displayPrice = event.target.parentElement.children[0].innerText;
  var name = event.target.parentElement.parentElement.children[0].children[0].innerText;
  var img = event.target.parentElement.parentElement.parentElement.children[1].src;
  var discount = Number(event.target.parentElement.parentElement.parentElement.children[0].innerText.replace('% off', ''));
  var quantity = 1;
  var newCartItem = new _Item__WEBPACK_IMPORTED_MODULE_0__.default(name, img, displayPrice, price, discount, quantity);
  addItemToCart(newCartItem);
  createCartBody(newCartItem);
  bindIncreaseAndDecreaseItemCount();
  document.getElementById('empty-card-banner').style.display = "none";
};

var createNewCart = function createNewCart(item) {
  var newCart = new _Cart__WEBPACK_IMPORTED_MODULE_1__.default([], 0);
  createdCart = newCart;
};

var addItemInCart = function addItemInCart(item) {
  createdCart.addItem(item);
};

var addItemToCart = function addItemToCart(item) {
  if (!!createdCart) {
    var selectedItem = createdCart.items.find(function (i) {
      return i.name.toLowerCase() === item.name.toLowerCase();
    });

    if (!!selectedItem) {
      createdCart.updateItemQuantity(item.name, 'increment');
    } else {
      addItemInCart(item);
    }

    ;
  } else {
    createNewCart(item);
    addItemInCart(item);
  }

  var billDetails = createdCart.getCartPriceDetails();
  createBillSection(billDetails);
};

var bindAddToCartClick = function bindAddToCartClick() {
  Array.from(document.getElementsByClassName('addToCartBtn')).forEach(function (el) {
    el.addEventListener('click', handleAddToCartClick, false);
  });
};

var increaseItemCount = function increaseItemCount(event) {
  var productName = event.target.parentElement.parentElement.children[0].children[1].innerText;
  createdCart.updateItemQuantity(productName, 'increment');
  console.log('increase item count');
  console.log('cart total', createdCart.getCartPriceDetails());
  removePreviousCartBody();
  createCartBody();
  bindIncreaseAndDecreaseItemCount();
  var billDetails = createdCart.getCartPriceDetails();
  createBillSection(billDetails);
};

var decreaseItemCount = function decreaseItemCount(event) {
  var productName = event.target.parentElement.parentElement.children[0].children[1].innerText;

  if (Number(event.target.parentElement.children[1].innerText) === 1) {
    createdCart.removeItemFromCart(productName);
    document.getElementById('empty-card-banner').style.display = "block";
  } else {
    createdCart.updateItemQuantity(productName, 'decrement');
  }

  console.log('increase item count');
  console.log('cart total', createdCart.getTotal());
  removePreviousCartBody();
  createCartBody();
  var billDetails = createdCart.getCartPriceDetails();
  createBillSection(billDetails);
  bindIncreaseAndDecreaseItemCount();
};

var bindIncreaseAndDecreaseItemCount = function bindIncreaseAndDecreaseItemCount() {
  Array.from(document.getElementsByClassName('increaseItemCountBtn')).forEach(function (el) {
    el.addEventListener('click', increaseItemCount, false);
  });
  Array.from(document.getElementsByClassName('decreaseItemCountBtn')).forEach(function (el) {
    el.addEventListener('click', decreaseItemCount, false);
  });
};

var removePreviousCartBody = function removePreviousCartBody() {
  !!document.getElementById('cart-body') ? Array.from(document.getElementsByClassName('cart-body')).forEach(function (el) {
    el.remove();
  }) : '';
};

var createBillSection = function createBillSection(billDetails) {
  !!document.getElementById('bill-section-container').children.length > 0 ? document.getElementById('bill-section').remove() : '';
  var template = " <div class=\"bill-section\" id=\"bill-section\">\n    Total\n    <div class= \"bill-section-card\">\n        <div>\n            <p>Items(".concat(billDetails.totalNumberOfItems, ")</p>\n            <p>Discount</p>\n            <p>Type Discount</p>\n        </div>\n        <div>\n            <p>$").concat(billDetails.totalPrice, "</p>\n            <p>-$").concat(billDetails.totalDiscount, "</p>\n            <p>-$0</p>\n        </div>\n        \n    </div>\n    <div class=\"order-total\">\n        <div>\n            Order Total \n        </div>\n        <div>\n            951$\n        </div>\n    </div>\n</div>");
  document.getElementById('bill-section-container').insertAdjacentHTML('beforeend', template);
};

/***/ }),

/***/ "./src/Cart.js":
/*!*********************!*\
  !*** ./src/Cart.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cart)
/* harmony export */ });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Cart = /*#__PURE__*/function () {
  function Cart() {
    _classCallCheck(this, Cart);

    this.items = [];
    this.total = 0;
  }

  _createClass(Cart, [{
    key: "addItem",
    value: function addItem(item) {
      this.items.push(item);
      this.total += Number(item.actualPrice.replace('$', ''));
    }
  }, {
    key: "updateItemQuantity",
    value: function updateItemQuantity(itemName, action) {
      var selectedItem = this.items.find(function (i) {
        return i.name.toLowerCase() === itemName.toLowerCase();
      });

      if (!!selectedItem) {
        this.items = this.items.map(function (i) {
          if (selectedItem.name.toLowerCase() === i.name.toLowerCase()) {
            return _objectSpread(_objectSpread({}, i), {}, {
              quantity: action === 'increment' ? i.quantity += 1 : i.quantity -= 1,
              itemPrice: Number(i.actualPrice.replace('$', '')) * i.quantity
            });
          } else {
            return _objectSpread({}, i);
          }
        });
      }
    }
  }, {
    key: "getTotal",
    value: function getTotal() {
      return this.items.reduce(function (acc, obj) {
        return acc + Number(obj.actualPrice.replace('$', '')) * Number(obj.quantity);
      }, 0);
    }
  }, {
    key: "getAllItems",
    value: function getAllItems() {
      return this.items.slice();
    }
  }, {
    key: "removeItemFromCart",
    value: function removeItemFromCart(productName) {
      this.items = this.items.filter(function (i) {
        return i.name.toLowerCase() !== productName.toLowerCase();
      });
    }
  }, {
    key: "getCartPriceDetails",
    value: function getCartPriceDetails() {
      var totalNumberOfItems = this.items.reduce(function (acc, obj) {
        return acc + Number(obj.quantity);
      }, 0);
      var totalPrice = this.items.reduce(function (acc, obj) {
        return acc + Number(obj.actualPrice.replace('$', '')) * Number(obj.quantity);
      }, 0);
      var totalDiscount = this.items.reduce(function (acc, obj) {
        return acc + Number(obj.displayPrice.replace('$', '')) * Number(obj.quantity);
      }, 0) - totalPrice;
      return {
        totalNumberOfItems: totalNumberOfItems,
        totalPrice: totalPrice,
        totalDiscount: totalDiscount
      };
    }
  }]);

  return Cart;
}();



/***/ }),

/***/ "./src/Item.js":
/*!*********************!*\
  !*** ./src/Item.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Item)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Item = function Item(name, imageUrl) {
  var displayPrice = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var actualPrice = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var discount = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var quantity = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

  _classCallCheck(this, Item);

  this.name = name;
  this.imageUrl = imageUrl;
  this.displayPrice = displayPrice;
  this.actualPrice = actualPrice;
  this.discount = discount;
  this.quantity = quantity;
  this.itemPrice = Number(actualPrice.replace('$', '')) * quantity;
};



/***/ }),

/***/ "./src/cart.scss":
/*!***********************!*\
  !*** ./src/cart.scss ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/styles.scss":
/*!*************************!*\
  !*** ./src/styles.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App */ "./src/App.js");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles.scss */ "./src/styles.scss");
/* harmony import */ var _cart_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cart.scss */ "./src/cart.scss");



(0,_App__WEBPACK_IMPORTED_MODULE_0__.createProductList)();
})();

/******/ })()
;
//# sourceMappingURL=main.js.map