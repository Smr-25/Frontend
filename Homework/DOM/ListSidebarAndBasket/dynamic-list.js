document.querySelector(".btn").onclick = function () {
    let list = document.querySelector(".list");
    list.innerHTML = "";
    let inputValue = document.querySelector(".input");
    if (inputValue.value.trim()) {
        for (let i = 1; i <= inputValue.value; i++) {
            let li = document.createElement("li");
            li.innerHTML = i;
// li.className="list-group-item";
            li.classList.add("list-group-item");
            let icon = document.createElement("i");
            icon.classList.add("fa-solid", "fa-xmark", "float-end", "text-danger");
            icon.style.cursor = "pointer";
            li.appendChild(icon);
            icon.onclick = function () {
                li.remove();
            }
            list.appendChild(li);

        }
        inputValue.value = "";

    }

}
