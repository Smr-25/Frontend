const topics = [
    "Semantic HTML",
    "HTML forms",
    "CSS selectors",
    "Flexbox layout",
    "CSS Grid",
    "Responsive design",
    "Bootstrap components",
    "JavaScript fundamentals",
    "DOM events",
    "Local storage",
    "Asynchronous JavaScript",
    "HTTP requests"
];

const searchInput = document.getElementById("search");
const results = document.getElementById("results");
const resultCount = document.getElementById("result-count");

function renderTopics(query = "") {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    const filteredTopics = topics.filter(function (topic) {
        return topic.toLocaleLowerCase().includes(normalizedQuery);
    });

    results.innerHTML = "";
    resultCount.textContent = `${filteredTopics.length} result(s)`;

    filteredTopics.forEach(function (topic) {
        const item = document.createElement("li");

        if (!normalizedQuery) {
            item.textContent = topic;
        } else {
            const start = topic.toLocaleLowerCase().indexOf(normalizedQuery);
            item.append(topic.slice(0, start));

            const highlightedText = document.createElement("mark");
            highlightedText.textContent = topic.slice(start, start + normalizedQuery.length);
            item.append(highlightedText, topic.slice(start + normalizedQuery.length));
        }

        results.appendChild(item);
    });
}

searchInput.addEventListener("input", function () {
    renderTopics(searchInput.value);
});

renderTopics();
