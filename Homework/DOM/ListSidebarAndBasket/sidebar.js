let icon = document.querySelector(".icon");
let openSidebar = document.querySelector(".openSidebar");
let sideBar = document.querySelector(".sidebar");
icon.onclick = function () {
    let sideBar = document.querySelector(".sidebar");
    sideBar.classList.add("close")
    openSidebar.style.display = "inline";
}
openSidebar.onclick = function () {
    sideBar.classList.remove("close")
    this.style.display = "none";
}
