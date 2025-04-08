document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.getElementById("navbar-toggle");
    const navbarLinks = document.getElementById("navbar-links");
    //const heroContainer = document.querySelector(".hero-container");
    const mainContent = document.querySelector("main");

    // @ts-ignore
    toggleButton.addEventListener("click", function() {
        // @ts-ignore
        navbarLinks.classList.toggle("active");
        // @ts-ignore
        //heroContainer.classList.toggle("dropdown-active");
        // @ts-ignore
        mainContent.classList.toggle("dropdown-active");
    });

    // Close the dropdown when clicking outside of it
    document.addEventListener("click", function(event) {
        // @ts-ignore
        if (!navbarLinks.contains(event.target) && !toggleButton.contains(event.target)) {
            // @ts-ignore
            navbarLinks.classList.remove("active");
            // @ts-ignore
            //heroContainer.classList.remove("dropdown-active");
            // @ts-ignore
            mainContent.classList.remove("dropdown-active");
        }
    });

     // Close the dropdown when pressing the Esc key
     document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            // @ts-ignore
            navbarLinks.classList.remove("active");
            // @ts-ignore
           // heroContainer.classList.remove("dropdown-active");
            // @ts-ignore
            mainContent.classList.remove("dropdown-active");
        }
    });

    // Highlight the current page link
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('.navbar-links ul li a');
    links.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
// Prevent space key from scrolling the page
document.addEventListener('keydown', function(event) {
    // Check if the key pressed is the space key
    if (event.code === 'Space') {
        // Allow the space key to work in input or textarea elements
        const activeElement = document.activeElement;
        if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') {
            return; // Do not prevent default behavior
        }

        // Prevent default action (scrolling) for other elements
        event.preventDefault();
    }
});

