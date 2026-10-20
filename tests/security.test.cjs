const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const { JSDOM } = require('jsdom');
const root = join(__dirname, '..');
const payload = '<img src=x onerror="window.attacked=true">';

function page(markup, storage, script) {
    const dom = new JSDOM(markup, { url: 'https://shop.example/', runScripts: 'outside-only' });
    for (const [key, value] of Object.entries(storage)) dom.window.localStorage.setItem(key, JSON.stringify(value));
    dom.window.confirm = () => true;
    dom.window.eval(readFileSync(join(root, script), 'utf8'));
    return dom;
}

test('wishlist displays stored markup as text and rejects executable image URLs', () => {
    const dom = page('<div class="wishlist-items-container"></div>', {
        wishlist: [{ title: payload, price: payload, image: 'javascript:alert(1)' }]
    }, 'Project/CyberStore/assets/js/script4.js');
    try {
        dom.window.displayWishlistItems();
        const doc = dom.window.document;
        assert.equal(doc.querySelector('.wishlist-product-title').textContent, payload);
        assert.equal(doc.querySelector('.wishlist-product-price').textContent, payload);
        assert.equal(doc.querySelector('img').getAttribute('src'), null);
        assert.equal(doc.querySelectorAll('[onerror], script').length, 0);
        doc.querySelector('.remove-from-wishlist').click();
        assert.deepEqual(JSON.parse(dom.window.localStorage.getItem('wishlist')), []);
    } finally { dom.window.close(); }
});

test('cart keeps markup inert, normalizes quantities, and quantity buttons still work', () => {
    const dom = page('<div class="cart-items-container"></div><div class="cart-summary"></div>', {
        cart: [{ title: payload, price: '$10.00', image: 'data:image/svg+xml,<svg onload=alert(1)>', quantity: payload }]
    }, 'Project/CyberStore/assets/js/script5.js');
    try {
        dom.window.displayCartItems();
        const doc = dom.window.document;
        assert.equal(doc.querySelector('.cart-item-title').textContent, payload);
        assert.equal(doc.querySelector('img').getAttribute('src'), null);
        assert.equal(doc.querySelector('.quantity-input').value, '1');
        assert.equal(doc.querySelectorAll('[onerror], svg, script').length, 0);
        doc.querySelector('.increase').click();
        assert.equal(doc.querySelector('.quantity-input').value, '2');
        assert.equal(doc.querySelector('.cart-item-total').textContent, '$20.00');
        doc.querySelector('.remove-from-cart').click();
        assert.deepEqual(JSON.parse(dom.window.localStorage.getItem('cart')), []);
    } finally { dom.window.close(); }
});

test('basket cells and count render stored HTML as text, with normal image URLs preserved', () => {
    const dom = page('<span id="item-count"></span><div id="basket-items"></div><div id="basketModal"></div>', {
        basket: [{ name: payload, price: payload, count: payload, img: '/product.png' }]
    }, 'Homework/DOM/ListSidebarAndBasket/shopping-basket.js');
    try {
        dom.window.renderBasketTable();
        const doc = dom.window.document;
        assert.equal(doc.querySelectorAll('[onerror], script').length, 0);
        assert.equal(doc.querySelector('tbody td:nth-child(2)').textContent, payload);
        assert.equal(doc.querySelector('img').src, 'https://shop.example/product.png');
        assert.equal(doc.querySelector('#item-count').children.length, 0);
    } finally { dom.window.close(); }
});

test('HTTP examples pin external scripts with integrity and anonymous CORS', () => {
    const dom = new JSDOM(readFileSync(join(root, 'Homework/JavaScript/HttpRequestExamples/index.html'), 'utf8'));
    try {
        const scripts = [...dom.window.document.querySelectorAll('script[src^="https:"]')];
        assert.equal(scripts.length, 2);
        for (const script of scripts) {
            assert.match(script.getAttribute('integrity'), /^sha384-[A-Za-z0-9+/=]+$/);
            assert.equal(script.crossOrigin, 'anonymous');
        }
    } finally { dom.window.close(); }
});
