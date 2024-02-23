let loginForm = document.querySelector(".form");
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Login successful!");
    window.location.href = "shoppie.html";
});