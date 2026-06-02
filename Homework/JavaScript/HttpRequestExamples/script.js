//fetch data from a public API and log it to the console

fetch("https://jsonplaceholder.typicode.com/posts").then(response => response.json()).then(data => {
    console.log(data);
});

// Alternatively, using axios library

axios.get("https://jsonplaceholder.typicode.com/posts").then(response => {
    console.log(response.data)
});

// Alternatively, using jQuery AJAX

$.ajax({
    url: "https://jsonplaceholder.typicode.com/posts",
    method: "GET",
    success: function (response) {
        console.log(response);
    },
    error: function (xhr, status, error) {
        console.log("Xəta:", error);
    }
});
