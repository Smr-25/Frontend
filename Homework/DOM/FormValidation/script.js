const form = document.getElementById("registration-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const messages = document.getElementById("messages");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const errors = [];
    const password = passwordInput.value;

    if (!emailInput.value.trim() || !emailInput.validity.valid) {
        errors.push("Enter a valid email address.");
    }

    if (password.length < 8) {
        errors.push("Password must contain at least 8 characters.");
    }

    if (!password.includes("!")) {
        errors.push("Password must contain an exclamation mark (!).");
    }

    if (password !== confirmPasswordInput.value) {
        errors.push("Passwords do not match.");
    }

    messages.innerHTML = "";
    messages.classList.toggle("success", errors.length === 0);

    if (errors.length === 0) {
        messages.innerHTML = "<li>Form is valid.</li>";
        return;
    }

    errors.forEach(function (error) {
        const item = document.createElement("li");
        item.textContent = error;
        messages.appendChild(item);
    });
});
