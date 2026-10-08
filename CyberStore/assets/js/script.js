// Hero Slider Functionality (MacBook & iPad - 2 Products)
(function() {
    let currentSlide = 0;
    let slides = [];
    let dots = [];
    let prevBtn = null;
    let nextBtn = null;
    let isTransitioning = false;

    function initHeroSlider() {
        const heroSliderSection = document.querySelector('.hero-slider-section');

        if (!heroSliderSection) {
            return;
        }

        slides = Array.from(heroSliderSection.querySelectorAll('.hero-slide'));
        dots = Array.from(heroSliderSection.querySelectorAll('.slider-dots .dot'));
        prevBtn = heroSliderSection.querySelector('.hero-slider-navigation .slider-prev');
        nextBtn = heroSliderSection.querySelector('.hero-slider-navigation .slider-next');

        if (slides.length === 0) {
            return;
        }

        console.log('✅ Hero Slider initialized:', {
            totalSlides: slides.length,
            hasPrevBtn: !!prevBtn,
            hasNextBtn: !!nextBtn,
            totalDots: dots.length
        });

        // Event listeners for navigation buttons
        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (!isTransitioning) {
                    goToNextSlide();
                }
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (!isTransitioning) {
                    goToPrevSlide();
                }
            });
        }

        // Event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function(e) {
                e.preventDefault();
                if (!isTransitioning) {
                    goToSlide(index);
                }
            });
        });

        // Show first slide
        goToSlide(0);
    }

    function goToSlide(index) {
        if (!slides || slides.length === 0 || isTransitioning) return;

        isTransitioning = true;

        // Remove active class from all
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) {
            dots[currentSlide].classList.add('active');
        }

        console.log('🎬 Hero Slider: Showing slide', currentSlide + 1, 'of', slides.length);

        // Reset transition flag after animation completes
        setTimeout(() => {
            isTransitioning = false;
        }, 600);
    }

    function goToNextSlide() {
        if (!slides || slides.length === 0) return;
        // Sonsuz döngü: son slide'dan sonra birinci slide'a keç
        const nextIndex = (currentSlide + 1) % slides.length;
        goToSlide(nextIndex);
    }

    function goToPrevSlide() {
        if (!slides || slides.length === 0) return;
        // Sonsuz döngü: birinci slide'dan əvvəl son slide'a keç
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(prevIndex);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeroSlider);
    } else {
        initHeroSlider();
    }
})();

// Blog Slider Functionality
(function() {
    let currentBlogSlide = 0;
    let blogSlides, blogPrevBtn, blogNextBtn;

    function initBlogSlider() {
        const blogBanner = document.querySelector('.blog-banner-card');

        if (!blogBanner) {
            return;
        }

        blogSlides = blogBanner.querySelectorAll('.blog-slide');
        blogPrevBtn = blogBanner.querySelector('.blog-prev');
        blogNextBtn = blogBanner.querySelector('.blog-next');

        if (blogSlides.length === 0) {
            return;
        }

        // Event listeners for buttons
        if (blogNextBtn) {
            blogNextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                goToNextBlogSlide();
            });
        }

        if (blogPrevBtn) {
            blogPrevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                goToPrevBlogSlide();
            });
        }

        // Show first slide
        goToBlogSlide(0);
    }

    function goToBlogSlide(index) {
        if (!blogSlides || blogSlides.length === 0) return;

        // Remove active class from all
        blogSlides.forEach(slide => slide.classList.remove('active'));

        // Add active class to current
        currentBlogSlide = index;
        blogSlides[currentBlogSlide].classList.add('active');
    }

    function goToNextBlogSlide() {
        if (!blogSlides) return;
        const nextIndex = (currentBlogSlide + 1) % blogSlides.length;
        goToBlogSlide(nextIndex);
    }

    function goToPrevBlogSlide() {
        if (!blogSlides) return;
        const prevIndex = (currentBlogSlide - 1 + blogSlides.length) % blogSlides.length;
        goToBlogSlide(prevIndex);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBlogSlider);
    } else {
        initBlogSlider();
    }
})();

// Tab Navigation Functionality
document.addEventListener('DOMContentLoaded', function() {
    // First tab section
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');

                // Remove active class from all buttons and contents
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                // Add active class to clicked button
                this.classList.add('active');

                // Show corresponding content
                const targetContent = document.getElementById(`tab-${targetTab}`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }

    // Second tab section
    const tabBtns2 = document.querySelectorAll('.tab-btn-2');
    const tabContents2 = document.querySelectorAll('.tab-content-2');

    if (tabBtns2.length > 0) {
        tabBtns2.forEach(btn => {
            btn.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');

                // Remove active class from all buttons and contents
                tabBtns2.forEach(b => b.classList.remove('active'));
                tabContents2.forEach(c => c.classList.remove('active'));

                // Add active class to clicked button
                this.classList.add('active');

                // Show corresponding content
                const targetContent = document.getElementById(`tab-2-${targetTab}`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }
});

// Product Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const sliderWrapper = document.querySelector('.product-slider');
    const sliderContainer = document.querySelector('.products-slider-section');

    if (!sliderContainer || !sliderWrapper) return;

    const prevBtn = sliderContainer.querySelector('.slider-prev');
    const nextBtn = sliderContainer.querySelector('.slider-next');

    if (sliderWrapper && prevBtn && nextBtn) {
        const sliderItems = document.querySelectorAll('.slider-product-item');
        const itemWidth = sliderItems[0].offsetWidth;
        const gap = 30; // gap between items
        const itemsVisible = 4; // number of items visible at once
        let currentIndex = 0;
        const maxIndex = Math.max(0, sliderItems.length - itemsVisible);

        // Update slider position
        function updateSlider() {
            const offset = currentIndex * (itemWidth + gap);
            sliderWrapper.style.transform = `translateX(-${offset}px)`;

            // Disable/enable buttons based on position
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex >= maxIndex;

            // Add visual feedback for disabled state
            if (currentIndex === 0) {
                prevBtn.style.opacity = '0.5';
                prevBtn.style.cursor = 'not-allowed';
            } else {
                prevBtn.style.opacity = '1';
                prevBtn.style.cursor = 'pointer';
            }

            if (currentIndex >= maxIndex) {
                nextBtn.style.opacity = '0.5';
                nextBtn.style.cursor = 'not-allowed';
            } else {
                nextBtn.style.opacity = '1';
                nextBtn.style.cursor = 'pointer';
            }
        }

        // Previous button click
        prevBtn.addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });

        // Next button click
        nextBtn.addEventListener('click', function() {
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateSlider();
            }
        });

        // Initialize slider
        updateSlider();

        // Handle window resize
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                currentIndex = 0;
                updateSlider();
            }, 250);
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

// Store Banner Slider Functionality
(function() {
    let currentStoreSlide = 0;
    let storeSlides = [];
    let storeDots = [];
    let storePrevBtn = null;
    let storeNextBtn = null;
    let isTransitioning = false;

    function initStoreBannerSlider() {
        const storeBannerSection = document.querySelector('.store-banner-section');

        if (!storeBannerSection) {
            return;
        }

        storeSlides = Array.from(storeBannerSection.querySelectorAll('.store-slide'));
        storeDots = Array.from(storeBannerSection.querySelectorAll('.store-dot'));
        storePrevBtn = storeBannerSection.querySelector('.store-prev');
        storeNextBtn = storeBannerSection.querySelector('.store-next');

        if (storeSlides.length === 0) {
            return;
        }

        console.log('✅ Store Banner Slider initialized:', {
            totalSlides: storeSlides.length,
            hasPrevBtn: !!storePrevBtn,
            hasNextBtn: !!storeNextBtn,
            totalDots: storeDots.length
        });

        // Event listeners for navigation buttons
        if (storeNextBtn) {
            storeNextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (!isTransitioning) {
                    goToNextStoreSlide();
                }
            });
        }

        if (storePrevBtn) {
            storePrevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (!isTransitioning) {
                    goToPrevStoreSlide();
                }
            });
        }

        // Event listeners for dots
        storeDots.forEach((dot, index) => {
            dot.addEventListener('click', function(e) {
                e.preventDefault();
                if (!isTransitioning) {
                    goToStoreSlide(index);
                }
            });
        });

        // Show first slide
        goToStoreSlide(0);
    }

    function goToStoreSlide(index) {
        if (storeSlides.length === 0 || isTransitioning) return;

        isTransitioning = true;

        // Remove active class from all
        storeSlides.forEach(slide => slide.classList.remove('active'));
        storeDots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current
        currentStoreSlide = index;
        storeSlides[currentStoreSlide].classList.add('active');
        if (storeDots[currentStoreSlide]) {
            storeDots[currentStoreSlide].classList.add('active');
        }

        console.log('🎬 Store Banner Slider: Showing slide', currentStoreSlide + 1, 'of', storeSlides.length);

        // Reset transition flag after animation completes
        setTimeout(() => {
            isTransitioning = false;
        }, 600);
    }

    function goToNextStoreSlide() {
        if (storeSlides.length === 0) return;
        const nextIndex = (currentStoreSlide + 1) % storeSlides.length;
        goToStoreSlide(nextIndex);
    }

    function goToPrevStoreSlide() {
        if (storeSlides.length === 0) return;
        const prevIndex = (currentStoreSlide - 1 + storeSlides.length) % storeSlides.length;
        goToStoreSlide(prevIndex);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initStoreBannerSlider);
    } else {
        initStoreBannerSlider();
    }
})();

// Enhanced Search Functionality
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
        const searchTerm = searchInput.value.trim().toLowerCase();

        if (searchTerm === '') {
            alert('⚠️ Please enter a search term');
            return;
        }

        // Get all products on the page
        const allProducts = document.querySelectorAll('.product-card-3, .tab-product-card, .slider-product-item, .product-item');
        let foundProducts = [];

        allProducts.forEach(product => {
            const titleElement = product.querySelector('.product-card-title a, .tab-product-title a, .slider-product-title a, .product-item-title a');
            const categoryElement = product.querySelector('.tab-product-category, .product-category');

            const title = titleElement ? titleElement.textContent.toLowerCase() : '';
            const category = categoryElement ? categoryElement.textContent.toLowerCase() : '';

            if (title.includes(searchTerm) || category.includes(searchTerm)) {
                const priceElement = product.querySelector('.product-card-price, .tab-product-price, .slider-price, .product-price');
                const price = priceElement ? priceElement.textContent : 'N/A';

                foundProducts.push({
                    title: titleElement ? titleElement.textContent.trim() : 'Unknown',
                    price: price,
                    category: category || 'General'
                });
            }
        });

        // Show results
        if (foundProducts.length > 0) {
            let resultsMessage = `🔍 Found ${foundProducts.length} product(s) matching "${searchTerm}":\n\n`;

            foundProducts.slice(0, 10).forEach((product, index) => {
                resultsMessage += `${index + 1}. ${product.title}\n   Price: ${product.price}\n   Category: ${product.category}\n\n`;
            });

            if (foundProducts.length > 10) {
                resultsMessage += `... and ${foundProducts.length - 10} more results`;
            }

            alert(resultsMessage);
        } else {
            alert(`😔 No products found matching "${searchTerm}"\n\nTry searching for:\n• iPhone\n• Samsung\n• Headphones\n• MacBook\n• Camera`);
        }

        // Log for analytics
        console.log('Search performed:', {
            term: searchTerm,
            resultsCount: foundProducts.length,
            results: foundProducts
        });
    }
});

// Wishlist Functionality
let wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];

document.addEventListener('DOMContentLoaded', function() {
    updateWishlistCount();

    // Handle wishlist button clicks (only for product wishlist buttons, not header)
    const wishlistBtns = document.querySelectorAll('.wishlist-btn-product');

    // Also handle tab-action-btn buttons with heart icon
    const tabWishlistBtns = document.querySelectorAll('.tab-action-btn');

    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            // Get product info from parent element
            const productCard = this.closest('.product-item, .product-card-3, .slider-product-item, .tab-product-card');

            if (productCard) {
                const productTitle = productCard.querySelector('.product-item-title a, .product-card-title a, .slider-product-title a, .tab-product-title a')?.textContent || 'Product';
                const productPrice = productCard.querySelector('.product-price, .product-card-price, .slider-price, .tab-product-price')?.textContent || '$0';
                const productImage = productCard.querySelector('img')?.src || '';

                const product = {
                    id: Date.now(),
                    title: productTitle.trim(),
                    price: productPrice.trim(),
                    image: productImage
                };

                addToWishlist(product);
            }
        });
    });

    // Handle tab-action-btn buttons (check if they have heart icon)
    tabWishlistBtns.forEach(btn => {
        const hasHeartIcon = btn.querySelector('.fa-heart');

        if (hasHeartIcon) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();

                // Get product info from parent element
                const productCard = this.closest('.tab-product-card');

                if (productCard) {
                    const productTitle = productCard.querySelector('.tab-product-title a')?.textContent || 'Product';
                    const productPrice = productCard.querySelector('.tab-product-price')?.textContent || '$0';
                    const productImage = productCard.querySelector('img')?.src || '';

                    const product = {
                        id: Date.now(),
                        title: productTitle.trim(),
                        price: productPrice.trim(),
                        image: productImage
                    };

                    addToWishlist(product);
                }
            });
        }
    });
});

function addToWishlist(product) {
    // Check if product already in wishlist
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

// Shopping Cart Functionality
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', function() {
    updateCartDisplay();

    // Handle add to cart button clicks
    const cartBtns = document.querySelectorAll('.add-to-cart-btn:not(.disabled), .slider-cart-btn, .tab-cart-btn');

    cartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            // Get product info from parent element
            const productCard = this.closest('.product-item, .product-card-3, .slider-product-item, .tab-product-card');

            if (productCard) {
                const productTitle = productCard.querySelector('.product-item-title a, .product-card-title a, .slider-product-title a, .tab-product-title a')?.textContent || 'Product';
                const productPriceElement = productCard.querySelector('.product-price, .product-card-price, .slider-price, .tab-product-price');
                const productPrice = productPriceElement?.textContent || '$0';
                const productImage = productCard.querySelector('img')?.src || '';

                const product = {
                    id: Date.now(),
                    title: productTitle.trim(),
                    price: productPrice.trim(),
                    image: productImage,
                    quantity: 1
                };

                addToCart(product);
            }
        });
    });
});

function addToCart(product) {
    // Check if product already in cart
    const existingItem = cartItems.find(item => item.title === product.title);

    if (existingItem) {
        existingItem.quantity += 1;
        alert(`${product.title} quantity updated in cart!`);
    } else {
        cartItems.push(product);
        alert(`${product.title} has been added to your cart!`);
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

// View Cart - Click on cart button to see items
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

// Clear Cart Function (can be called from anywhere)
function clearCart() {
    cartItems = [];
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartDisplay();
    alert('Cart has been cleared!');
}

// Clear Wishlist Function
function clearWishlist() {
    wishlistItems = [];
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    updateWishlistCount();
    alert('Wishlist has been cleared!');
}

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

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }

            // Success message
            alert(`Thank you for subscribing!\nYou will receive our newsletter at: ${email}`);

            // Clear input
            emailInput.value = '';

            // Here you can add logic to send email to backend
            console.log('Newsletter subscription:', email);
        });
    }
});

// Advanced Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Sample products database
    const allProducts = [
        // Smartphones
        { id: 1, name: 'Apple iPhone 15 Pro Max', category: 'smartphones', price: 1199, oldPrice: 1299, image: './assets/img/h1-masonry-product-2.jpg' },
        { id: 2, name: 'Samsung Galaxy S24 Ultra', category: 'smartphones', price: 1099, oldPrice: null, image: './assets/img/h1-masonry-product-4.jpg' },
        { id: 3, name: 'Google Pixel 8 Pro', category: 'smartphones', price: 899, oldPrice: null, image: './assets/img/h1-masonry-product-1.jpg' },
        { id: 4, name: 'OnePlus 12 Pro', category: 'smartphones', price: 799, oldPrice: 899, image: './assets/img/h1-masonry-product-3.jpg' },
        { id: 5, name: 'Xiaomi 14 Ultra', category: 'smartphones', price: 749, oldPrice: null, image: './assets/img/h1-masonry-product-5.jpg' },

        // Laptops
        { id: 6, name: 'MacBook Pro 16" M3', category: 'laptops', price: 2499, oldPrice: null, image: './assets/img/h1-product-1.jpg' },
        { id: 7, name: 'Dell XPS 15', category: 'laptops', price: 1899, oldPrice: 1999, image: './assets/img/h1-product-2-800x600.jpg' },
        { id: 8, name: 'HP Spectre x360', category: 'laptops', price: 1599, oldPrice: null, image: './assets/img/h1-product-3-800x600.jpg' },
        { id: 9, name: 'Lenovo ThinkPad X1', category: 'laptops', price: 1799, oldPrice: null, image: './assets/img/h1-product-5-800x600.jpg' },
        { id: 10, name: 'ASUS ROG Zephyrus', category: 'laptops', price: 2199, oldPrice: 2399, image: './assets/img/h1-product-6-800x600.jpg' },

        // Tablets
        { id: 11, name: 'iPad Pro 12.9"', category: 'tablets', price: 1099, oldPrice: null, image: './assets/img/h1-product-7-800x600.jpg' },
        { id: 12, name: 'Samsung Galaxy Tab S9', category: 'tablets', price: 899, oldPrice: 999, image: './assets/img/h1-product-8-800x600.jpg' },
        { id: 13, name: 'Microsoft Surface Pro 9', category: 'tablets', price: 1299, oldPrice: null, image: './assets/img/h1-product-9.jpg' },

        // Audio
        { id: 14, name: 'Sony WH-1000XM5', category: 'audio', price: 399, oldPrice: 449, image: './assets/img/h2-product-4-800x600.jpg' },
        { id: 15, name: 'AirPods Pro 2nd Gen', category: 'audio', price: 249, oldPrice: null, image: './assets/img/h2-product-6-800x600.jpg' },
        { id: 16, name: 'Bose QuietComfort Ultra', category: 'audio', price: 429, oldPrice: null, image: './assets/img/h2-product-8.jpg' },

        // Wearables
        { id: 17, name: 'Apple Watch Series 9', category: 'wearables', price: 399, oldPrice: null, image: './assets/img/h3-product-1-800x600.jpg' },
        { id: 18, name: 'Samsung Galaxy Watch 6', category: 'wearables', price: 299, oldPrice: 349, image: './assets/img/h3-product-2-800x600.jpg' },

        // Gaming
        { id: 19, name: 'PlayStation 5 Console', category: 'gaming', price: 499, oldPrice: null, image: './assets/img/h4-product-1-800x600.jpg' },
        { id: 20, name: 'Xbox Series X', category: 'gaming', price: 499, oldPrice: null, image: './assets/img/h1-masonry-product-6.jpg' },

        // Movies & Music
        { id: 21, name: 'Action Movie Collection', category: 'movies', price: 22, oldPrice: null, image: './assets/img/h1-masonry-product-7.jpg' },
        { id: 22, name: 'Children\'s Documentary', category: 'movies', price: 19, oldPrice: null, image: './assets/img/h1-masonry-product-6.jpg' },
        { id: 23, name: 'Futuristic Movie', category: 'movies', price: 20, oldPrice: 25, image: './assets/img/h1-masonry-product-9.jpg' },
        { id: 24, name: 'Animated Movie', category: 'movies', price: 14, oldPrice: null, image: './assets/img/h1-masonry-product-10.jpg' },

        // Accessories
        { id: 25, name: 'USB-C Cable 2m', category: 'accessories', price: 29, oldPrice: null, image: './assets/img/h1-masonry-product-8.jpg' },
        { id: 26, name: 'Wireless Charger', category: 'accessories', price: 49, oldPrice: 59, image: './assets/img/h4-img-1.jpg' },
        { id: 27, name: 'Phone Case Premium', category: 'accessories', price: 39, oldPrice: null, image: './assets/img/h4-img-2.jpg' },
        { id: 28, name: 'Screen Protector', category: 'accessories', price: 19, oldPrice: null, image: './assets/img/h4-img-3.jpg' },

        // Cameras
        { id: 29, name: 'Canon EOS R5', category: 'cameras', price: 3899, oldPrice: null, image: './assets/img/h4-img-4.jpg' },
        { id: 30, name: 'Sony A7 IV', category: 'cameras', price: 2499, oldPrice: 2699, image: './assets/img/h1-product-13-800x600.jpg' }
    ];

    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const searchResultsDropdown = document.getElementById('searchResultsDropdown');
    const searchResultsList = document.getElementById('searchResultsList');
    const resultsCount = document.querySelector('.results-count');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    const showMoreBtn = document.getElementById('showMoreBtn');
    const categoryDropdownBtn = document.getElementById('categoryDropdownBtn');
    const categoryDropdownMenu = document.getElementById('categoryDropdownMenu');
    const categoryItems = document.querySelectorAll('.category-item');
    const selectedCategorySpan = document.getElementById('selectedCategory');

    let currentCategory = 'all';
    let currentSearchResults = [];
    let displayedResultsCount = 5;
    const resultsPerPage = 5;

    // Category dropdown toggle
    if (categoryDropdownBtn && categoryDropdownMenu) {
        categoryDropdownBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            categoryDropdownMenu.classList.toggle('active');
            categoryDropdownBtn.classList.toggle('active');
        });

        // Category selection
        categoryItems.forEach(item => {
            item.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                currentCategory = category;

                // Update UI
                categoryItems.forEach(i => i.classList.remove('selected'));
                this.classList.add('selected');
                selectedCategorySpan.textContent = this.textContent;

                // Close dropdown
                categoryDropdownMenu.classList.remove('active');
                categoryDropdownBtn.classList.remove('active');

                // Trigger search if there's text
                if (searchInput.value.trim() !== '') {
                    performSearch();
                }

                console.log('Category selected:', category);
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!categoryDropdownBtn.contains(e.target) && !categoryDropdownMenu.contains(e.target)) {
                categoryDropdownMenu.classList.remove('active');
                categoryDropdownBtn.classList.remove('active');
            }
        });
    }

    // Search input event
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            if (this.value.trim() === '') {
                searchResultsDropdown.classList.remove('active');
            } else {
                performSearch();
            }
        });

        // Search on Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    // Search button click
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            performSearch();
        });
    }

    // Clear search
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', function() {
            searchInput.value = '';
            searchResultsDropdown.classList.remove('active');
            currentSearchResults = [];
            displayedResultsCount = resultsPerPage;
        });
    }

    // Show more button
    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', function() {
            displayedResultsCount += resultsPerPage;
            displaySearchResults();
        });
    }

    // Close search results when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) &&
            !searchResultsDropdown.contains(e.target) &&
            !searchBtn.contains(e.target)) {
            searchResultsDropdown.classList.remove('active');
        }
    });

    // Perform search function
    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();

        if (query === '') {
            searchResultsDropdown.classList.remove('active');
            return;
        }

        // Filter products
        currentSearchResults = allProducts.filter(product => {
            const matchesQuery = product.name.toLowerCase().includes(query);
            const matchesCategory = currentCategory === 'all' || product.category === currentCategory;
            return matchesQuery && matchesCategory;
        });

        // Reset displayed count
        displayedResultsCount = resultsPerPage;

        // Display results
        displaySearchResults();

        // Show dropdown
        searchResultsDropdown.classList.add('active');

        console.log('Search results:', currentSearchResults.length);
    }

    // Display search results
    function displaySearchResults() {
        if (currentSearchResults.length === 0) {
            searchResultsList.innerHTML = `
                <div class="no-results">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <p>No products found</p>
                </div>
            `;
            resultsCount.textContent = '0 results found';
            showMoreBtn.style.display = 'none';
            return;
        }

        // Update results count
        resultsCount.textContent = `${currentSearchResults.length} result${currentSearchResults.length > 1 ? 's' : ''} found`;

        // Get products to display
        const productsToDisplay = currentSearchResults.slice(0, displayedResultsCount);

        // Generate HTML
        searchResultsList.innerHTML = productsToDisplay.map(product => `
            <div class="search-result-item" data-product-id="${product.id}">
                <img src="${product.image}" alt="${product.name}" class="search-result-image">
                <div class="search-result-info">
                    <div class="search-result-title">${product.name}</div>
                    <div class="search-result-category">${getCategoryName(product.category)}</div>
                    <div>
                        <span class="search-result-price">$${product.price}</span>
                        ${product.oldPrice ? `<span class="search-result-old-price">$${product.oldPrice}</span>` : ''}
                    </div>
                </div>
            </div>
        `).join('');

        // Show/hide "Show More" button
        if (displayedResultsCount >= currentSearchResults.length) {
            showMoreBtn.style.display = 'none';
        } else {
            showMoreBtn.style.display = 'flex';
            showMoreBtn.innerHTML = `
                Show More Results (${Math.min(resultsPerPage, currentSearchResults.length - displayedResultsCount)} more)
                <i class="fa-solid fa-chevron-down"></i>
            `;
        }

        // Add click events to result items
        document.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', function() {
                const productId = this.getAttribute('data-product-id');
                console.log('Product clicked:', productId);

                // Show notification
                showNotification('Product selected!', 'success');

                // Close dropdown
                searchResultsDropdown.classList.remove('active');

                // Here you can add navigation to product page
                // window.location.href = `product.html?id=${productId}`;
            });
        });
    }

    // Get category display name
    function getCategoryName(category) {
        const categoryNames = {
            'smartphones': 'Smartphones',
            'laptops': 'Laptops',
            'tablets': 'Tablets',
            'accessories': 'Accessories',
            'audio': 'Audio & Headphones',
            'wearables': 'Wearables',
            'gaming': 'Gaming',
            'cameras': 'Cameras',
            'tv': 'TV & Home Cinema',
            'smart-home': 'Smart Home',
            'computer': 'Computers',
            'movies': 'Movies, Music & Games',
            'office': 'Office Supplies',
            'networking': 'Networking',
            'storage': 'Storage',
            'printers': 'Printers & Scanners',
            'software': 'Software'
        };
        return categoryNames[category] || category;
    }

    // Show notification helper
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            background-color: ${type === 'success' ? 'rgb(93, 118, 244)' : '#ef4444'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    console.log('✅ Advanced Search System initialized');
});

