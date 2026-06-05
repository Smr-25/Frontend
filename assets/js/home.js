const projectCards = Array.from(document.querySelectorAll("[data-project]"));
const projectSections = Array.from(document.querySelectorAll("[data-project-section]"));
const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));
const searchInput = document.getElementById("project-search");
const visibleCount = document.getElementById("visible-count");
const emptyState = document.getElementById("empty-state");

let activeFilter = "all";

function updateCatalog() {
    const query = searchInput.value.trim().toLocaleLowerCase();
    let count = 0;

    projectCards.forEach(function (card) {
        const categories = card.dataset.category.split(" ");
        const searchableText = `${card.dataset.search} ${card.textContent}`.toLocaleLowerCase();
        const matchesFilter = activeFilter === "all" || categories.includes(activeFilter);
        const matchesSearch = searchableText.includes(query);
        const isVisible = matchesFilter && matchesSearch;

        card.hidden = !isVisible;
        count += Number(isVisible);
    });

    projectSections.forEach(function (section) {
        section.hidden = !section.querySelector("[data-project]:not([hidden])");
    });

    visibleCount.textContent = `${count} collection${count === 1 ? "" : "s"} shown`;
    emptyState.hidden = count !== 0;
}

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        activeFilter = button.dataset.filter;
        filterButtons.forEach(function (item) {
            item.classList.toggle("active", item === button);
        });
        updateCatalog();
    });
});

searchInput.addEventListener("input", updateCatalog);
