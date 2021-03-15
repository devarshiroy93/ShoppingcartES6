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
  var actualPrice = item.actualPrice,
      imageUrl = item.imageUrl,
      name = item.name;
  var template = " <div class=\"cart-body\">\n    <div class=\"cart-item-holder\">\n        <div class=\"cart-item\">\n            <div class=\"cart-item-name-img-holder\">\n                <img class=\"cart-item-image\"\n                    src=\"".concat(imageUrl, "\" />\n                <p>").concat(name, "</p>\n            </div>\n            <div class=\"item-quantity-holder\">\n                <button>+</button>\n                <p>1</p>\n                <button>-</button>\n            </div>\n            \n            <p>").concat(actualPrice, "</p>\n        </div>\n    </div>\n</div>");
  return template;
};

var createCartBody = function createCartBody(item) {
  var template = createNewItemInCart(item);
  document.getElementById('cart').insertAdjacentHTML('beforeend', template);
};

var handleAddToCartClick = function handleAddToCartClick(event) {
  console.log('add', event);
  var price = event.target.parentElement.children[1].innerText;
  var name = event.target.parentElement.parentElement.children[0].children[0].innerText;
  var img = event.target.parentElement.parentElement.parentElement.children[1].src;
  var quantity = 1;
  var newCartItem = new _Item__WEBPACK_IMPORTED_MODULE_0__.default(name, img, 0, price, 0);
  createCartBody(newCartItem);
};

var bindAddToCartClick = function bindAddToCartClick() {
  Array.from(document.getElementsByClassName('addToCartBtn')).forEach(function (el) {
    el.addEventListener('click', handleAddToCartClick, false);
  });
};

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

  _classCallCheck(this, Item);

  this.name = name;
  this.imageUrl = imageUrl;
  this.displayPrice = displayPrice;
  this.actualPrice = actualPrice;
  this.discount = discount;
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

 //import {bindAddToCartClick} from './App';



console.log('ES6 schopping cart');
(0,_App__WEBPACK_IMPORTED_MODULE_0__.createProductList)(); //createCartBody();
//bindAddToCartClick();
})();

/******/ })()
;
//# sourceMappingURL=main.js.map