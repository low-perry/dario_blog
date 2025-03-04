document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.getElementById("navbar-toggle");
    const navbarLinks = document.getElementById("navbar-links");

    toggleButton.addEventListener("click", function() {
        navbarLinks.classList.toggle("active");
    });

    // Close the dropdown when clicking outside of it
    document.addEventListener("click", function(event) {
        if (!navbarLinks.contains(event.target) && !toggleButton.contains(event.target)) {
            navbarLinks.classList.remove("active");
        }
    });

     // Close the dropdown when pressing the Esc key
     document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            navbarLinks.classList.remove("active");
        }
    });


});

