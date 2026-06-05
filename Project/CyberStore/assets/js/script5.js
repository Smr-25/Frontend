// Shopping Cart Page JavaScript

// Load and Display Cart Items
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', function() {
    displayCartItems();
    updateCartDisplay();
    updateWishlistCount();
});

function displayCartItems() {
    const cartContainer = document.querySelector('.cart-items-container');
    const cartSummary = document.querySelector('.cart-summary');

    if (!cartContainer) return;

    if (cartItems.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fa-solid fa-cart-shopping" style="font-size: 80px; color: #d1d5db; margin-bottom: 20px;"></i>
                <h2>Your Cart is Empty</h2>
                <p>Add products to your cart and they will appear here.</p>
                <a href="index.html" class="browse-products-btn">Browse Products</a>
            </div>
        `;

        if (cartSummary) {
            cartSummary.style.display = 'none';
        }
        return;
    }

    let html = '<div class="cart-items-list">';

    cartItems.forEach((item, index) => {
        const itemTotal = parseFloat(item.price.replace(/[^0-9.]/g, '')) * item.quantity;

        html += `
            <div class="cart-item" data-index="${index}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                
                <div class="cart-item-details">
                    <h3 class="cart-item-title">${item.title}</h3>
                    <div class="cart-item-price">${item.price}</div>
                </div>
                
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease" onclick="updateQuantity(${index}, -1)">
                        <i class="fa-solid fa-minus"></i>
                    </button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" readonly>
                    <button class="quantity-btn increase" onclick="updateQuantity(${index}, 1)">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
                
                <div class="cart-item-total">
                    $${itemTotal.toFixed(2)}
                </div>
                
                <button class="remove-from-cart" onclick="removeFromCart(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
    });

    html += '</div>';

    cartContainer.innerHTML = html;

    // Update cart summary
    updateCartSummary();
}

function updateQuantity(index, change) {
    cartItems[index].quantity += change;

    if (cartItems[index].quantity < 1) {
        cartItems[index].quantity = 1;
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));
    displayCartItems();
    updateCartDisplay();
}

function removeFromCart(index) {
    if (confirm('Are you sure you want to remove this item from your cart?')) {
        cartItems.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cartItems));
        displayCartItems();
        updateCartDisplay();

        showNotification('Item removed from cart');
    }
}

function clearCart() {
    if (cartItems.length === 0) {
        alert('Your cart is already empty!');
        return;
    }

    if (confirm('Are you sure you want to clear your entire cart?')) {
        cartItems = [];
        localStorage.setItem('cart', JSON.stringify(cartItems));
        displayCartItems();
        updateCartDisplay();

        showNotification('Cart cleared');
    }
}

function updateCartSummary() {
    const subtotal = cartItems.reduce((sum, item) => {
        const price = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
        return sum + (price * item.quantity);
    }, 0);

    const shipping = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + shipping + tax;

    const summaryContainer = document.querySelector('.cart-summary');

    if (summaryContainer) {
        summaryContainer.style.display = 'block';
        summaryContainer.innerHTML = `
            <h2>Order Summary</h2>
            
            <div class="summary-row">
                <span>Subtotal:</span>
                <span>$${subtotal.toFixed(2)}</span>
            </div>
            
            <div class="summary-row">
                <span>Shipping:</span>
                <span>${shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2)}</span>
            </div>
            
            <div class="summary-row">
                <span>Tax (10%):</span>
                <span>$${tax.toFixed(2)}</span>
            </div>
            
            <div class="summary-divider"></div>
            
            <div class="summary-row total">
                <span>Total:</span>
                <span>$${total.toFixed(2)}</span>
            </div>
            
            ${shipping !== 0 ? '<p class="free-shipping-notice">Add $' + (100 - subtotal).toFixed(2) + ' more for FREE shipping!</p>' : ''}
            
            <button class="checkout-btn" onclick="proceedToCheckout()">
                <i class="fa-solid fa-lock"></i> Proceed to Checkout
            </button>
            
            <button class="clear-cart-btn" onclick="clearCart()">
                Clear Cart
            </button>
        `;
    }
}

function proceedToCheckout() {
    if (cartItems.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    alert('Proceeding to checkout...\n\nThis would redirect to checkout page in a real application.');

    // In real application, redirect to checkout page
    // window.location.href = 'checkout.html';
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification-popup';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: rgb(93, 118, 244);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Update Cart Display in Header
function updateCartDisplay() {
    const cartBtn = document.querySelector('.cart-btn');
    const cartCount = cartBtn?.querySelector('.cart-count');
    const cartTotal = cartBtn?.querySelector('.cart-total');

    if (cartCount) {
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    if (cartTotal) {
        const total = cartItems.reduce((sum, item) => {
            const price = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
            return sum + (price * item.quantity);
        }, 0);

        cartTotal.textContent = `($${total.toFixed(2)})`;
    }
}

// Update Wishlist Count in Header
function updateWishlistCount() {
    const wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
    const wishlistBtn = document.querySelector('.wishlist-btn');

    if (wishlistBtn) {
        let countBadge = wishlistBtn.querySelector('.wishlist-count');

        if (!countBadge && wishlistItems.length > 0) {
            countBadge = document.createElement('span');
            countBadge.className = 'wishlist-count';
            wishlistBtn.appendChild(countBadge);
        }

        if (countBadge) {
            countBadge.textContent = wishlistItems.length;
            countBadge.style.cssText = 'position: absolute; top: -5px; right: -5px; background-color: rgb(93, 118, 244); color: white; border-radius: 50%; width: 18px; height: 18px; font-size: 11px; display: flex; align-items: center; justify-content: center; font-weight: bold;';
        }
    }
}

// Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-bar input[type="text"]');
    const searchBtn = document.querySelector('.search-btn');

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            performSearch();
        });

        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });
    }

    function performSearch() {
        const searchTerm = searchInput.value.trim();

        if (searchTerm === '') {
            alert('Please enter a search term');
            return;
        }

        window.location.href = `index.html?search=${encodeURIComponent(searchTerm)}`;
    }
});

// Sticky Navigation Bar
window.addEventListener('scroll', function() {
    const navigationBar = document.querySelector('.navigation-bar');
    if (navigationBar) {
        if (window.scrollY > 50) {
            navigationBar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navigationBar.style.boxShadow = 'none';
        }
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Newsletter Subscription
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            if (email === '') {
                alert('Please enter your email address');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }

            alert(`Thank you for subscribing!\nYou will receive our newsletter at: ${email}`);
            emailInput.value = '';
            console.log('Newsletter subscription:', email);
        });
    }
});
