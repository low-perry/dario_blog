document.addEventListener('keydown', function(event) {
    const modal = document.getElementById('search-modal');
    const searchInput = document.getElementById('search-input');
    if (event.ctrlKey && event.key === 'k') {
        event.preventDefault();
        // @ts-ignore
        if (modal.style.display === 'block') {
            // @ts-ignore
            modal.style.display = 'none';
        } else {
            // @ts-ignore
            modal.style.display = 'block';
            // @ts-ignore
            searchInput.focus(); // Focus on the input field
        }
    } else if (event.key === 'Escape') {
        // @ts-ignore
        modal.style.display = 'none';
    }
});

// @ts-ignore
document.querySelector('.close').addEventListener('click', function() {
    // @ts-ignore
    document.getElementById('search-modal').style.display = 'none';
});

// Close the modal when clicking outside of it
window.addEventListener('click', function(event) {
    if (event.target == document.getElementById('search-modal')) {
        // @ts-ignore
        document.getElementById('search-modal').style.display = 'none';
    }
});
// @ts-ignore
document.getElementById('search-icon').addEventListener('click', function() {
    const modal = document.getElementById('search-modal');
    // @ts-ignore
    modal.style.display = 'block';
    // @ts-ignore
    document.getElementById('search-input').focus(); // Focus on the input field
});