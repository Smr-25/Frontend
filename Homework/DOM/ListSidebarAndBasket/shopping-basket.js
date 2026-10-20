let buttons = document.querySelectorAll(".btn-primary");
buttons.forEach(button => {
    button.addEventListener('click', function(ev) {
        ev.preventDefault();

        let basket = localStorage.getItem('basket');
        let array = basket ? JSON.parse(basket) : [];

        let card = this.closest('.card');
        let name = card.querySelector('.card-title').innerText;
        let price = card.querySelector('.price').innerText;
        let img = card.querySelector('img').src;

        let exists = array.find(p => p.name === name);
        if (exists) {
            exists.count++;
        } else {
            let product = { name, price, img, count: 1 };
            array.push(product);
        }

        localStorage.setItem('basket', JSON.stringify(array));
        setCount();
    });
});

function setCount() {
    let productCount = document.getElementById("item-count");
    let basket = localStorage.getItem("basket");
    if (basket) {
        let array = JSON.parse(basket);
        let totalCount = array.reduce((sum, p) => sum + p.count, 0);
        productCount.textContent = totalCount;
    } else {
        productCount.textContent = 0;
    }
}

function renderBasketTable() {
    let basketItems = document.getElementById("basket-items");
    basketItems.innerHTML = '';

    let basket = localStorage.getItem("basket");
    if (!basket) {
        basketItems.innerHTML = '<p>Your basket is empty.</p>';
        return;
    }

    let array = JSON.parse(basket);

    let table = document.createElement('table');
    table.className = 'table table-bordered';

    table.innerHTML = '<thead><tr><th>Image</th><th>Name</th><th>Price</th><th>Count</th></tr></thead>';
    const body = table.createTBody();
    for (const item of array) {
        const row = body.insertRow();
        const image = document.createElement('img');
        image.width = 80;
        image.alt = item.name;
        try {
            const url = new URL(item.img, document.baseURI);
            if (url.protocol === 'https:' || url.protocol === 'http:') image.src = url.href;
        } catch { /* Invalid stored URLs remain unset. */ }
        row.insertCell().appendChild(image);
        for (const value of [item.name, item.price, item.count]) row.insertCell().textContent = value;
    }

    basketItems.appendChild(table);
}

let basketModal = document.getElementById('basketModal');
basketModal.addEventListener('show.bs.modal', renderBasketTable);

setCount();
