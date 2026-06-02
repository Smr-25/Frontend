// let buttons = document.querySelectorAll(".btn-primary")
// buttons.forEach(button => {
//     button.onclick = function (ev) {
//         ev.preventDefault();
//         let array = [];
//         let existing = localStorage.getItem('basket');
//         if (existing) {
//             array = JSON.parse(existing);
//         }else{
//             localStorage.setItem('basket', JSON.stringify(array));
//         }
//         let id = this.parentElement.parentElement.querySelector('input').value;
//         let exists = array.find(p => p.id === id);
//         if (exists) {
//             exists.count++;
//         }else{
//             let product = {
//                 name: this.parentElement.parentElement.querySelector('input').value,
//                 id: id,
//                 img: this.parentElement.parentElement.querySelector('img').src,
//                 price: this.parentElement.parentElement.querySelector('span').innerText,
//                 count: 1
//             }
//         }
//
//         array.push(product);
//         localStorage.setItem('products', JSON.stringify(array));
//     }
// });
//
// function setCount(){
//     let productCount = document.querySelector("span")
//     let basket = localStorage.getItem("basket");
//     if(basket) {
//         let array = JSON.parse(basket);
//         productCount.innerHTML = array.length;
//     }
// }

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
        productCount.innerHTML = totalCount;
    } else {
        productCount.innerHTML = 0;
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

    table.innerHTML = `
        <thead>
            <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Count</th>
            </tr>
        </thead>
        <tbody>
            ${array.map(item => `
                <tr>
                    <td><img src="${item.img}" width="80" alt="${item.name}"></td>
                    <td>${item.name}</td>
                    <td>${item.price}</td>
                    <td>${item.count}</td>
                </tr>
            `).join('')}
        </tbody>
    `;

    basketItems.appendChild(table);
}

let basketModal = document.getElementById('basketModal');
basketModal.addEventListener('show.bs.modal', renderBasketTable);

setCount();
