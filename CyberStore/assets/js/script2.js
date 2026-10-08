// Contact Us Page JavaScript

// ============================================
// MOBILE NAVIGATION & HAMBURGER MENU
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Hamburger Menu Toggle
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mainNavigation = document.querySelector('.main-navigation');
    const body = document.body;

    // Create mobile overlay if doesn't exist
    let mobileOverlay = document.querySelector('.mobile-nav-overlay');
    if (!mobileOverlay && hamburgerMenu) {
        mobileOverlay = document.createElement('div');
        mobileOverlay.className = 'mobile-nav-overlay';
        body.appendChild(mobileOverlay);
    }

    // Toggle mobile menu
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMobileMenu();
        });
    }

    // Close menu when clicking overlay
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', function() {
            closeMobileMenu();
        });
    }

    // Close menu when clicking navigation link
    if (mainNavigation) {
        const navLinks = mainNavigation.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu();
            });
        });
    }

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });

    function toggleMobileMenu() {
        if (mainNavigation && mobileOverlay) {
            const isActive = mainNavigation.classList.contains('active');

            if (isActive) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        }
    }

    function openMobileMenu() {
        mainNavigation.classList.add('active');
        mobileOverlay.classList.add('active');
        body.classList.add('menu-open');
        hamburgerMenu.innerHTML = '<i class="fas fa-times"></i>';
    }

    function closeMobileMenu() {
        mainNavigation.classList.remove('active');
        mobileOverlay.classList.remove('active');
        body.classList.remove('menu-open');
        hamburgerMenu.innerHTML = '<i class="fas fa-bars"></i>';
    }

    // Handle window resize - close menu if resized to desktop
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        }, 250);
    });
});

// ============================================
// STICKY HEADER ON SCROLL
// ============================================

window.addEventListener('scroll', function() {
    const mainHeader = document.querySelector('.main-header');
    if (mainHeader) {
        if (window.scrollY > 100) {
            mainHeader.classList.add('scrolled');
        } else {
            mainHeader.classList.remove('scrolled');
        }
    }
});

// ============================================
// ENHANCED FORM VALIDATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form fields by ID for better accuracy
            const nameField = document.getElementById('name');
            const emailField = document.getElementById('email');
            const subjectField = document.getElementById('subject');
            const messageField = document.getElementById('message');

            // Collect data
            const formData = {
                name: nameField ? nameField.value.trim() : '',
                email: emailField ? emailField.value.trim() : '',
                subject: subjectField ? subjectField.value.trim() : '',
                message: messageField ? messageField.value.trim() : ''
            };

            // Validation
            let isValid = true;
            let errorMessage = '';

            // Name validation
            if (formData.name === '') {
                isValid = false;
                errorMessage += '• Name is required.\n';
                nameField.style.borderColor = '#ef4444';
            } else {
                nameField.style.borderColor = '';
            }

            // Email validation
            if (formData.email === '') {
                isValid = false;
                errorMessage += '• Email is required.\n';
                emailField.style.borderColor = '#ef4444';
            } else if (!isValidEmail(formData.email)) {
                isValid = false;
                errorMessage += '• Please enter a valid email address.\n';
                emailField.style.borderColor = '#ef4444';
            } else {
                emailField.style.borderColor = '';
            }

            // Subject validation (optional but good to have)
            if (formData.subject === '') {
                subjectField.style.borderColor = '#fbbf24';
            } else {
                subjectField.style.borderColor = '';
            }

            // Message validation
            if (formData.message === '') {
                isValid = false;
                errorMessage += '• Message is required.\n';
                messageField.style.borderColor = '#ef4444';
            } else if (formData.message.length < 10) {
                isValid = false;
                errorMessage += '• Message should be at least 10 characters long.\n';
                messageField.style.borderColor = '#ef4444';
            } else {
                messageField.style.borderColor = '';
            }

            if (!isValid) {
                alert('Please correct the following errors:\n\n' + errorMessage);
                return false;
            }

            // Success notification with form data
            const successMessage = `Thank you for contacting us, ${formData.name}!\n\nWe have received your message and will respond to ${formData.email} as soon as possible.\n\nSubject: ${formData.subject || 'Not specified'}\n\nYour message:\n"${formData.message.substring(0, 100)}${formData.message.length > 100 ? '...' : ''}"`;

            alert(successMessage);

            // Log form data for backend integration
            console.log('Contact Form Submission:', formData);
            console.log('Timestamp:', new Date().toISOString());

            // Reset form
            contactForm.reset();

            // Reset border colors
            [nameField, emailField, subjectField, messageField].forEach(field => {
                if (field) field.style.borderColor = '';
            });

            // Here you can add AJAX call to send data to backend
            // Example:
            // fetch('/api/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(formData)
            // })
        });

        // Real-time validation on blur
        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const messageField = document.getElementById('message');

        if (nameField) {
            nameField.addEventListener('blur', function() {
                if (this.value.trim() === '') {
                    this.style.borderColor = '#ef4444';
                } else {
                    this.style.borderColor = '#10b981';
                }
            });
        }

        if (emailField) {
            emailField.addEventListener('blur', function() {
                if (this.value.trim() === '') {
                    this.style.borderColor = '#ef4444';
                } else if (!isValidEmail(this.value)) {
                    this.style.borderColor = '#ef4444';
                } else {
                    this.style.borderColor = '#10b981';
                }
            });
        }

        if (messageField) {
            messageField.addEventListener('blur', function() {
                if (this.value.trim() === '') {
                    this.style.borderColor = '#ef4444';
                } else if (this.value.trim().length < 10) {
                    this.style.borderColor = '#fbbf24';
                } else {
                    this.style.borderColor = '#10b981';
                }
            });
        }
    }
});

// Email validation helper function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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

        alert(`Searching for: "${searchTerm}"\n\nRedirecting to search results...`);
        console.log('Searching for:', searchTerm);

        // Redirect to index page with search parameter
        // window.location.href = `index.html?search=${encodeURIComponent(searchTerm)}`;
    }
});

// Wishlist Functionality
let wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];

document.addEventListener('DOMContentLoaded', function() {
    updateWishlistCount();
});

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

// Shopping Cart Functionality
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', function() {
    updateCartDisplay();
});

function updateCartDisplay() {
    const cartBtn = document.querySelector('.cart-btn');
    const cartCount = cartBtn?.querySelector('.cart-count');
    const cartTotal = cartBtn?.querySelector('.cart-total');

    if (cartCount) {
        cartCount.textContent = cartItems.reduce((sum, item) => sum + item.quantity, 0);
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
        cartBtn.addEventListener('click', function() {
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
