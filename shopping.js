// For this task we have 2 classes: Product and Basket.
// Add as many products as you want: each product should have a name, price and quantity.
// 1.   Display the available products in the html - include at least the name and the quantity.
// 2.   When the user clicks on one product, you should add the product to the basked (Hint: create a method in the
//      Basket class that pushes the product into the products array).
// 3.   When a user adds a product to the basket, the total quantity of this product should decrease (should this
//      be a method of the Basket or of the Product class?)
// 4.   Everytime a user adds something in its basket, show the content of the basket in the html and show the
//      decreased amount of the product.
// 5.   If a product goes to 0, show that is sold out and don't let anyone clicking on it.
// 6.   Show the total price of the basket (when a user adds something in the basket, the total should be updated).
// 7.   Apply some discount: if a user buys 4 products of the same kind, one is free.
// 8.   Add as many features as you want

class Product {
  constructor(name, oneItemPrice, price, quantity, imageUrl) {
    this.name = name;
    this.oneItemPrice = oneItemPrice;
    this.price = price;
    this.quantity = quantity;
    this.imageUrl = imageUrl;
    this.inBasket = 0;
  }
}

class Basket {
  constructor(totalPrice) {
    this.products = [];
    this.totalPrice = totalPrice;
  }

  addProduct(product) {
    const productNoStock = this.products.find((p) => p.quantity <= 0);
    if (productNoStock) {
      console.log("product out of stock :>> ");
    } else {
      product.quantity--;
    }

    const existingProduct = this.products.find((p) => p.name === product.name);
    if (existingProduct) {
      product.inBasket++;
      existingProduct.price =
        existingProduct.price + existingProduct.oneItemPrice;
      console.log("product quantity increased: ", existingProduct);
    } else {
      product.inBasket = 1;
      this.products.push(product);
      console.log("added new product: ", product);
    }

    // update the quantity of other products in the basket
    this.products.forEach((p) => {
      if (p !== existingProduct) {
        p.quantity = p.quantity + p.inBasket - 1;
      }
    });
  }

  emptyBasket() {
    this.products = [];
    this.totalPrice = "";
  }
}

const myProducts = [
  new Product("apples", 40, 40, 2, "apples.png"),
  new Product("lemons", 32, 32, 18, "lemons.png"),
  new Product("mangos", 44, 44, 27, "mangos.png"),
  new Product("pineapples", 32, 32, 9, "pineapples.png"),
];

window.onload = () => {
  const basket = new Basket("", "$0");
  addEvents(myProducts, basket);
  displayBasket(basket);
};

const addEvents = (products, basket) => {
  products.forEach((product, index) => {
    const addToBasketButton = document.getElementById(
      `add-to-cart-button-${index}`
    );
    addToBasketButton.addEventListener("click", () => {
      addProductToBasket(product, basket);
      if (product.quantity <= 0) {
        addToBasketButton.setAttribute("disabled", "true");
        const outOfStockText = document.getElementById(`out-of-stock-${index}`);
        outOfStockText.innerHTML = "Out of stock!";
      } else {
        addToBasketButton.removeAttribute("disabled");
      }
      const quantityText = document.getElementById(`quantity-${index}`);
      quantityText.innerText = `Quantity: ${product.quantity}`;
    });
  });
  const resetButton = document.getElementById("reset-button");
  resetButton.addEventListener("click", () => resetBasket(basket));
};

const addProductToBasket = (product, basket) => {
  basket.addProduct(product);
  displayBasket(basket);
  console.log("basket.products", basket.products);
};

const resetBasket = (basket) => {
  basket.emptyBasket();
  displayBasket(basket);
};

const displayBasket = (basket) => {
  const basketProductsText = document.getElementById("products-in-cart");
  const productHtmlStrings = basket.products.map(
    (product) => `<div>${product.name} (${product.inBasket})</div>`
  );
  basketProductsText.innerHTML = productHtmlStrings.join("<br>");

  const totalPriceText = document.getElementById("total-price");
  const totalPrice = basket.products.reduce((acc, curr) => acc + curr.price, 0);
  totalPriceText.innerHTML = `<div>$${totalPrice}</div>`;
  const resetButton = document.getElementById("reset-button");
  if (basket.products.length <= 0) {
    resetButton.setAttribute("disabled", "true");
  } else {
    resetButton.removeAttribute("disabled");
  }
};

class ProductMap {
  constructor(products) {
    this.products = products;
  }

  render() {
    console.log("basket.products", basket);
    const productsContainer = document.getElementById("products");
    this.products.forEach((product, index) => {
      const oneProduct = document.createElement("div");
      oneProduct.innerHTML = `
      <div id="product-div"> 
        <img src="${product.imageUrl}" alt="${product.name}" />
        <h2>${product.name}</h2>
        <p>Price: ${product.price}</p>
        <p id="quantity-${index}">Quantity: ${product.quantity}</p>
        <span id="button-and-text">
          <button class="add-to-cart-button" id="add-to-cart-button-${index}">Add To Cart</button>
          <p class="out-of-stock" id="out-of-stock-${index}"></p>
        </span>
        </div>
      `;
      productsContainer.appendChild(oneProduct);
    });
  }
}

const productMap = new ProductMap(myProducts);
productMap.render();
