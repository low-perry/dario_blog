document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.getElementById("navbar-toggle");
    const navbarLinks = document.getElementById("navbar-links");
    const heroContainer = document.querySelector(".hero-container");

    // @ts-ignore
    toggleButton.addEventListener("click", function() {
        // @ts-ignore
        navbarLinks.classList.toggle("active");
        // @ts-ignore
        heroContainer.classList.toggle("dropdown-active");
    });

    // Close the dropdown when clicking outside of it
    document.addEventListener("click", function(event) {
        // @ts-ignore
        if (!navbarLinks.contains(event.target) && !toggleButton.contains(event.target)) {
            // @ts-ignore
            navbarLinks.classList.remove("active");
            // @ts-ignore
            heroContainer.classList.remove("dropdown-active");
        }
    });

     // Close the dropdown when pressing the Esc key
     document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            // @ts-ignore
            navbarLinks.classList.remove("active");
            // @ts-ignore
            heroContainer.classList.remove("dropdown-active");
        }
    });


});

