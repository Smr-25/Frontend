// Product Page JavaScript

// Product Image Gallery / Thumbnail Selector
document.addEventListener('DOMContentLoaded', function() {
    const thumbnails = document.querySelectorAll('.product-thumbnail');
    const mainImage = document.querySelector('.product-main-image img');

    if (thumbnails.length > 0 && mainImage) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                // Remove active class from all thumbnails
                thumbnails.forEach(t => t.classList.remove('active'));

                // Add active class to clicked thumbnail
                this.classList.add('active');

                // Change main image
                mainImage.src = this.querySelector('img').src;
            });
        });
    }
});

// Product Quantity Selector
document.addEventListener('DOMContentLoaded', function() {
    const quantityInput = document.querySelector('.quantity-input');
    const increaseBtn = document.querySelector('.quantity-increase');
    const decreaseBtn = document.querySelector('.quantity-decrease');

    if (increaseBtn && quantityInput) {
        increaseBtn.addEventListener('click', function() {
            let currentValue = parseInt(quantityInput.value) || 1;
            quantityInput.value = currentValue + 1;
        });
    }

    if (decreaseBtn && quantityInput) {
        decreaseBtn.addEventListener('click', function() {
            let currentValue = parseInt(quantityInput.value) || 1;
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });
    }
});

// Product Tabs (Description, Reviews, Additional Info)
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.product-tab-btn');
    const tabContents = document.querySelectorAll('.product-tab-content');

    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');

                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                // Add active class to clicked button
                this.classList.add('active');

                // Show corresponding content
                const targetContent = document.getElementById(targetTab);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }
});

// Add to Cart Button
document.addEventListener('DOMContentLoaded', function() {
    const addToCartBtn = document.querySelector('.add-to-cart-btn');

    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const productName = document.querySelector('.product-title')?.textContent || 'Product';
            const quantity = document.querySelector('.quantity-input')?.value || 1;

            // Show success message
            alert(`${productName} (Qty: ${quantity}) has been added to your cart!`);

            // Here you can add logic to actually add the product to cart
            // For example, save to localStorage or send to server
        });
    }
});

// Product Image Zoom (optional enhancement)
document.addEventListener('DOMContentLoaded', function() {
    const mainImage = document.querySelector('.product-main-image img');

    if (mainImage) {
        mainImage.addEventListener('click', function() {
            // Toggle zoom class or open lightbox
            this.classList.toggle('zoomed');
        });
    }
});

// Related Products Slider (if exists on product page)
document.addEventListener('DOMContentLoaded', function() {
    const relatedSlider = document.querySelector('.related-products-slider');

    if (relatedSlider) {
        const prevBtn = relatedSlider.querySelector('.slider-prev');
        const nextBtn = relatedSlider.querySelector('.slider-next');
        const sliderTrack = relatedSlider.querySelector('.slider-track');

        if (prevBtn && nextBtn && sliderTrack) {
            let currentPosition = 0;
            const slideWidth = 300; // Adjust based on your design

            nextBtn.addEventListener('click', function() {
                currentPosition -= slideWidth;
                sliderTrack.style.transform = `translateX(${currentPosition}px)`;
            });

            prevBtn.addEventListener('click', function() {
                currentPosition += slideWidth;
                sliderTrack.style.transform = `translateX(${currentPosition}px)`;
            });
        }
    }
});

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

        alert(`Searching for: "${searchTerm}"\n\nRedirecting to search results...`);
        console.log('Searching for:', searchTerm);

        // Redirect to index page with search parameter
        // window.location.href = `index.html?search=${encodeURIComponent(searchTerm)}`;
    }
});

// Wishlist Functionality for Product Page
let wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];

document.addEventListener('DOMContentLoaded', function() {
    updateWishlistCount();

    // Add to Wishlist from product detail page
    const wishlistBtn = document.querySelector('.product-wishlist-btn, .wishlist-btn-product');

    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', function(e) {
            e.preventDefault();

            const productTitle = document.querySelector('.product-title')?.textContent || 'Product';
            const productPrice = document.querySelector('.product-price')?.textContent || '$0';
            const productImage = document.querySelector('.product-main-image img')?.src || '';

            const product = {
                id: Date.now(),
                title: productTitle.trim(),
                price: productPrice.trim(),
                image: productImage
            };

            addToWishlist(product);
        });
    }
});

function addToWishlist(product) {
    const exists = wishlistItems.some(item => item.title === product.title);

    if (exists) {
        alert('This product is already in your wishlist!');
        return;
    }

    wishlistItems.push(product);
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    updateWishlistCount();

    alert(`${product.title} has been added to your wishlist!`);
}

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
}

// View Wishlist
document.addEventListener('DOMContentLoaded', function() {
    const wishlistBtn = document.querySelector('.wishlist-btn');

    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', function(e) {
            if (e.target.classList.contains('wishlist-count')) {
                return;
            }

            e.preventDefault();

            if (wishlistItems.length === 0) {
                alert('Your wishlist is empty!');
                return;
            }

            let wishlistMessage = 'Your Wishlist:\n\n';
            wishlistItems.forEach((item, index) => {
                wishlistMessage += `${index + 1}. ${item.title}\n   Price: ${item.price}\n\n`;
            });

            alert(wishlistMessage);
        });
    }
});

// Shopping Cart Functionality for Product Page
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', function() {
    updateCartDisplay();

    // Enhanced Add to Cart from product detail page
    const addToCartBtn = document.querySelector('.product-add-to-cart-btn, .add-to-cart-btn:not(.disabled)');

    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function(e) {
            e.preventDefault();

            const productTitle = document.querySelector('.product-title')?.textContent || 'Product';
            const productPrice = document.querySelector('.product-price')?.textContent || '$0';
            const productImage = document.querySelector('.product-main-image img')?.src || '';
            const quantity = parseInt(document.querySelector('.quantity-input')?.value) || 1;

            const product = {
                id: Date.now(),
                title: productTitle.trim(),
                price: productPrice.trim(),
                image: productImage,
                quantity: quantity
            };

            addToCart(product);
        });
    }
});

function addToCart(product) {
    const existingItem = cartItems.find(item => item.title === product.title);

    if (existingItem) {
        existingItem.quantity += product.quantity;
        alert(`${product.title} quantity updated in cart! (Total: ${existingItem.quantity})`);
    } else {
        cartItems.push(product);
        alert(`${product.title} (Qty: ${product.quantity}) has been added to your cart!`);
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartDisplay();
}

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

// View Cart
document.addEventListener('DOMContentLoaded', function() {
    const cartBtn = document.querySelector('.cart-btn');

    if (cartBtn) {
        cartBtn.addEventListener('click', function(e) {
            if (cartItems.length === 0) {
                alert('Your cart is empty!');
                return;
            }

            let cartMessage = 'Shopping Cart:\n\n';
            cartItems.forEach((item, index) => {
                cartMessage += `${index + 1}. ${item.title}\n   Price: ${item.price} x ${item.quantity}\n\n`;
            });

            const total = cartItems.reduce((sum, item) => {
                const price = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
                return sum + (price * item.quantity);
            }, 0);

            cartMessage += `Total: $${total.toFixed(2)}`;
            alert(cartMessage);
        });
    }
});

// Sticky Navigation Bar with Shadow on Scroll
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
