// Wishlist Page JavaScript

// Load and Display Wishlist Items
let wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];

document.addEventListener('DOMContentLoaded', function() {
    displayWishlistItems();
    updateWishlistCount();
    updateCartDisplay();
});

function displayWishlistItems() {
    const wishlistContainer = document.querySelector('.wishlist-items-container');

    if (!wishlistContainer) return;

    if (wishlistItems.length === 0) {
        wishlistContainer.innerHTML = `
            <div class="empty-wishlist">
                <i class="fa-regular fa-heart" style="font-size: 80px; color: #d1d5db; margin-bottom: 20px;"></i>
                <h2>Your Wishlist is Empty</h2>
                <p>Add products you love to your wishlist and they will appear here.</p>
                <a href="index.html" class="browse-products-btn">Browse Products</a>
            </div>
        `;
        return;
    }

    let html = '<div class="wishlist-products-grid">';

    wishlistItems.forEach((item, index) => {
        html += `
            <div class="wishlist-product-card" data-index="${index}">
                <button class="remove-from-wishlist" onclick="removeFromWishlist(${index})">
                    <i class="fa-solid fa-xmark"></i>
                </button>
                
                <div class="wishlist-product-image">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                
                <div class="wishlist-product-info">
                    <h3 class="wishlist-product-title">${item.title}</h3>
                    <div class="wishlist-product-price">${item.price}</div>
                    
                    <button class="wishlist-add-to-cart-btn" onclick="moveToCart(${index})">
                        <i class="fa-solid fa-cart-shopping"></i> Add to Cart
                    </button>
                </div>
            </div>
        `;
    });

    html += '</div>';

    wishlistContainer.innerHTML = html;
}

function removeFromWishlist(index) {
    if (confirm('Are you sure you want to remove this item from your wishlist?')) {
        wishlistItems.splice(index, 1);
        localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
        displayWishlistItems();
        updateWishlistCount();

        // Show notification
        showNotification('Item removed from wishlist');
    }
}

function moveToCart(index) {
    const item = wishlistItems[index];

    // Add to cart
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    const existingItem = cartItems.find(cartItem => cartItem.title === item.title);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({
            ...item,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));

    // Remove from wishlist
    wishlistItems.splice(index, 1);
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));

    displayWishlistItems();
    updateWishlistCount();
    updateCartDisplay();

    showNotification(`${item.title} moved to cart!`);
}

function clearWishlist() {
    if (wishlistItems.length === 0) {
        alert('Your wishlist is already empty!');
        return;
    }

    if (confirm('Are you sure you want to clear your entire wishlist?')) {
        wishlistItems = [];
        localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
        displayWishlistItems();
        updateWishlistCount();

        showNotification('Wishlist cleared');
    }
}

function showNotification(message) {
    // Create notification element
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

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Update Wishlist Count in Header
function updateWishlistCount() {
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

    // Update wishlist count text if exists
    const wishlistCountText = document.querySelector('.wishlist-count-text');
    if (wishlistCountText) {
        wishlistCountText.textContent = `${wishlistItems.length} items in wishlist`;
    }
}

// Update Cart Display in Header
function updateCartDisplay() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
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
