document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.getElementById("navbar-toggle");
    const navbarLinks = document.getElementById("navbar-links");

    toggleButton.addEventListener("click", function() {
        navbarLinks.classList.toggle("active");
    });
});