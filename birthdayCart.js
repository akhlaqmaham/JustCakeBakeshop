var carts = document.getElementsByClassName('update-cart')

let products = [
    {
        name: "But First Makeup Cake",
        tag: "butfirstmakeupcake",
        price: 5000,
        inCart: 0

    },
    {
        name: "Simpering Minnie Cake",
        tag: "simperingminniecake",
        price: 4000,
        inCart: 0

    },
    {
        name: "Slice Of Disneyland Cake",
        tag: "sliceofdisneylandcake",
        price: 2500,
        inCart: 0

    },
    {
        name: "The Pink Abode Cake",
        tag: "thepinkabodecake",
        price: 4000,
        inCart: 0

    },
    {
        name: "McQueen Racer Cake",
        tag: "mcqueenracercake",
        price: 5500,
        inCart: 0

    },
    {
        name: "PUBG Craze Cake",
        tag: "pubgcrazecake",
        price: 4500,
        inCart: 0

    },
    {
        name: "Spiderman Theme Cake",
        tag: "spidermanthemecake",
        price: 4000,
        inCart: 0

    },
    {
        name: "Batman delight Cake",
        tag: "batmandelightcake",
        price: 4000,
        inCart: 0

    }
];
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
}

function onLoadCartNumber() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('#cartNum sup').textContent = productNumbers;
    }
}

function cartNumbers(product, action) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (action) {
        localStorage.setItem("cartNumbers", productNumbers - 1);
        document.querySelector('#cartNum sup').textContent = productNumbers - 1;
        console.log("action running");
    } else if (productNumbers) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector('#cartNum sup').textContent = productNumbers + 1;
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector('#cartNum sup').textContent = 1;
    }

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        let currentProduct = product.tag;

        if (cartItems[currentProduct] == undefined) {
            cartItems = {
                ...cartItems,
                [currentProduct]: product
            }
        }
        cartItems[currentProduct].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}
function totalCost(product, action) {
    let cart = localStorage.getItem("totalCost");

    if (action) {
        cart = parseInt(cart);

        localStorage.setItem("totalCost", cart - product.price);
    } else if (cart != null) {

        cart = parseInt(cart);
        localStorage.setItem("totalCost", cart + product.price);

    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

function removeItems(product) {
    let productContainer = document.querySelector(".products");
    localStorage.removeItem("productsInCart");
    localStorage.removeItem("totalCost");
    localStorage.removeItem("cartNumbers");
    productContainer.remove();
    displayCart();
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    let cart = localStorage.getItem("totalCost");
    cart = parseInt(cart);

    let productContainer = document.querySelector(".products");


    if (cartItems && productContainer) {
        productContainer.innerHTML = "";
        Object.values(cartItems).map((item, index) => {
            productContainer.innerHTML += `
            <div class="product-header">
            <div class="product"> 
              <i class="fas fa-times-circle"></i>
              <img src="${item.tag}.jpg">
              <span class="sm-hide">${item.name}</span>
            </div>
            <div class="price sm-hide">${item.price}</div>
            <div class="quantity">
              <i class="fas fa-caret-square-left" id="decrease"></i>
                 <span>${item.inCart}</span>
              <i class="fas fa-caret-square-right" id="increase"></i>
           </div>
           <div class="total">${item.inCart * item.price}
           </div>
           </div>
           `


        });

        productContainer.innerHTML += `
        <div class="basketTotalContainer">
        <button onClick="removeItems()" class="removeAll">Remove All Items</button>
        <ul></ul>
        <ul></ul>
        <ul></ul>
        <ul></ul>
        <ul></ul>
        <h5 class="basketTotalTitle">Basket Total</h5>
        <h5 class="basketTotal">${cart}</h5>
        </div>
        `
        deleteButtons();
        manageQuantity();
        onLoadCartNumber();
    }
}

function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('#decrease');
    let increaseButtons = document.querySelectorAll('#increase');
    let currentQuantity = 0;
    let currentProduct = '';
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    for (let i = 0; i < increaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g, '').trim();
            console.log(currentProduct);

            if (cartItems[currentProduct].inCart > 1) {
                cartItems[currentProduct].inCart -= 1;
                cartNumbers(cartItems[currentProduct], "decrease");
                totalCost(cartItems[currentProduct], "decrease");
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            }
        });

        increaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g, '').trim();
            console.log(currentProduct);

            cartItems[currentProduct].inCart += 1;
            cartNumbers(cartItems[currentProduct]);
            totalCost(cartItems[currentProduct]);
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
        });
    }
}

function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.product i');
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem("totalCost");
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productName;
    console.log(cartItems);

    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g, '').trim();

            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
            localStorage.setItem('totalCost', cartCost - (cartItems[productName].price * cartItems[productName].inCart));

            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumber();
        })
    }
}
displayCart(); 

function onLoadCheckout() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    let cart = localStorage.getItem("totalCost");
    cart = parseInt(cart);

    document.getElementById('carttotal').innerHTML = cart;
    document.getElementById('display').innerHTML = cart;
}


onLoadCheckout();
onLoadCartNumber();
displayCart();