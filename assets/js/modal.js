document.addEventListener('keydown', function(event) {
    const modal = document.getElementById('search-modal');
    const searchInput = document.getElementById('search-input');
    if (event.ctrlKey && event.key === 'k') {
        event.preventDefault();
        if (modal.style.display === 'block') {
            modal.style.display = 'none';
        } else {
            modal.style.display = 'block';
            searchInput.focus(); // Focus on the input field
        }
    } else if (event.key === 'Escape') {
        modal.style.display = 'none';
    }
});

document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('search-modal').style.display = 'none';
});

// Close the modal when clicking outside of it
window.addEventListener('click', function(event) {
    if (event.target == document.getElementById('search-modal')) {
        document.getElementById('search-modal').style.display = 'none';
    }
});
document.getElementById('search-icon').addEventListener('click', function() {
    const modal = document.getElementById('search-modal');
    modal.style.display = 'block';
    document.getElementById('search-input').focus(); // Focus on the input field
});