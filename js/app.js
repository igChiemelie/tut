M.AutoInit();

$(function () {
    $('.slider').slider({
        interval: 6000,
        height: 500,
        indicators: false,
        transition: 500
    });

    const ac = $('.autocomplete');
    M.Autocomplete.init(ac, {
        data: {
            "Aruba": null,
            "Hawaii": null,
            "Europe": null,
            "Lagos": null,
            "Florida": null,
            "California": null,
            "Jamacia": null
        }
    })

    $('input#icon_prefix, input#password').characterCounter();
  
    $('select').formSelect();
    
   

});

document.getElementById('logout').onclick = function (e) {
    e.preventDefault();
    
    const confirmation = confirm("Are you sure you want to log out?");
    if (confirmation) {
        // Proceed with logout
        // window.location.href = "google.com"; // Redirect to the logout URL
        localStorage.removeItem("user");
        location.reload();


    } else {
        // Cancel logout
        console.log("Logout canceled.");
    }

    
}
// Cart array to hold cart items
let cart = [];

// Product data
// First we make sure that this product below appies in the local storage before we comment it on
// const products = [
//     { id: 1, name: 'Cancun Mexico', price: 10, url:'boat-house.jpg', desc:'Nice environment'},
//     { id: 2, name: 'Chicago', price: 20, url: 'bare-tree-birds-dawn-2138922.jpg', desc:'Cloudy' },
//     { id: 3, name: 'Florida', price: 15, url: 'img_fjords.jpg', desc:'Winter' }
// ];

// localStorage.setItem('products', JSON.stringify(products));


function populateData() {
    // is this data container a method or a madeup word
    let dataContainer = document.querySelector('#popularItem');
    dataContainer.innerHTML = '';
    itemsHTML = '';
    // this "itemHTML" is potientially for what?....



    products.forEach((item) => {
        // where is this "((item)) =>" from?....
        // console.log({item});


        // don't umderstand this part a lil
        itemData = `
              <div class="col s4">
                    <div class="card product" data-id="${item.id}">
                        <div class="card-image">
                            <img src="./img/${item.url}" alt="">
                            <span class="card-title">${item.name}</span>
                        </div>
                        <div class="card-content">
                            ${item.desc}!
                        </div>

                        <div class="flex">
                            <div>
                            
                                <h6>price:$ ${item.price}</h6>
                            </div>

                            <div>
                                <button class="cart-btn add-to-cart-btn" data-id="${item.id}">
                                    <i class="material-icons orange-text">shopping_cart</i>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
        `;

        // Concatenate each product's HTML to the `itemsHTML` string
        itemsHTML += itemData;

        // dataContainer.innerHTML = itemData;

        document.querySelector('#popularItem').innerHTML = itemsHTML;



    });

  

    if (user.name) {
        document.getElementById('logout').innerHTML = 'logout'

        document.querySelector('.email').textContent = user.email;
        document.querySelector('.email').href = `mailto:${user.email}`;
    
        document.getElementById('name').innerHTML = user.name;
        document.getElementById('email').innerHTML = user.email;
    }else{
        document.getElementById('logout').innerHTML = '';
        document.getElementById('name').innerHTML = '';
        document.getElementById('email').innerHTML = '';

        document.querySelector('.email').textContent = '';
        document.querySelector('.email').href = '';
    }

}

// Load cart from local storage
document.addEventListener('DOMContentLoaded', () => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    products = JSON.parse(localStorage.getItem('products')) || [];
    user = JSON.parse(localStorage.getItem('user')) || [];
    cart = savedCart;
    updateCart();
    populateData();


    // Add products to cart when button is clicked
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    // console.log(addToCartBtns);

    addToCartBtns.forEach(btn => {
        // const btnId = btn.dataset.id;  
        const btnId = parseInt(btn.dataset.id);
        const inCartId = cart.find(p => p.id === btnId);

        console.log(btnId);
        // console.log(inCartId, 'here');

        if (inCartId) {
            btn.innerHTML = "In Cart";
            btn.disabled = true;
        }

        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.closest('.product').dataset.id);
            addToCart(productId);
            btn.innerHTML = "In Cart";
            btn.disabled = true;
            console.log(btn);

        });
    });


});
// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);

    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }


    saveCart();
    updateCart();
}

// Remove product from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCart();


}

// Update cart display
function updateCart() {
    const cartItemsContainer = document.querySelector('.cart-items'); //ul
    cartItemsContainer.innerHTML = '';

    let total = 0;
    let cartNo = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            ${item.name} - $${item.price} x ${item.quantity}
            <button class="increase-qty">+</button>
            <button class="decrease-qty">-</button>
            <button class="remove-item">Remove</button>
        `;

        cartItemsContainer.appendChild(cartItem);

        // Increase quantity button
        cartItem.querySelector('.increase-qty').addEventListener('click', () => {
            item.quantity++;
            saveCart();
            updateCart();
        });

        // Decrease quantity button
        cartItem.querySelector('.decrease-qty').addEventListener('click', () => {
            if (item.quantity > 1) {
                item.quantity--;
            } else {
                removeFromCart(item.id);

                document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
                    // const btnId = btn.dataset.id;  
                    const btnId = parseInt(btn.dataset.id);

                    console.log(btnId);


                    if (item.id === btnId) {
                        btn.disabled = false;
                        btn.innerHTML = '<i class="material-icons orange-text">shopping_cart</i>';
                    }


                });
            }
            saveCart();
            updateCart();
        });

        // Remove item button
        cartItem.querySelector('.remove-item').addEventListener('click', () => {
            removeFromCart(item.id);



            document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
                // const btnId = btn.dataset.id;  
                const btnId = parseInt(btn.dataset.id);
                const inCartId = cart.find(p => p.id === btnId);

                console.log(btnId);


                if (item.id === btnId) {
                    btn.disabled = false;
                    btn.innerHTML = '<i class="material-icons orange-text">shopping_cart</i>';
                }


            });

        });

        total += item.price * item.quantity;

        cartNo += item.quantity;

    });
    document.querySelector('.cart-no').textContent = cartNo;

    document.querySelector('.cart-total').textContent = `Total: $${total}`;
}


document.querySelector('.clear-cart').addEventListener('click', () => {
    let cartItem = cart.map(item => item.id); //filter 
    cartItem.forEach(id => this.removeFromCart(id));

    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {

        btn.disabled = false;
        btn.innerHTML = '<i class="material-icons orange-text">shopping_cart</i>';
    });


});
document.querySelector('.checkOut').addEventListener('click', () => {
    window.location.href ="/login.html"

});

// Save cart to local storage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}