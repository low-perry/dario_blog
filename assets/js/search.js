(function () {
    let idx; // Declare a global variable to store the Lunr.js index

    function isModalShown(modal) {
        return modal.style.display === 'block';
    }

    function showResults(results, store) {
        const searchResults = document.getElementById('search-results');

        if (results.length) { // If there are results...
            let appendString = '';

            for (let i = 0; i < results.length; i++) {  // Iterate over them and generate html
                const item = store[results[i].ref];
                appendString += '<li><a href="' + item.url + '" style="display: block; text-decoration: none; color: inherit;">';
                appendString += '<span class="post-meta">' + item.date + '</span><h2>' + item.title + '</h2>';
                appendString += '<p class="small">' + decodeURI(item.content).substring(0, 100) + '...</p>';
                appendString += '</a></li>';
            }

            searchResults.innerHTML = appendString;
        } else {
            searchResults.innerHTML = '<li>No results found</li>';
        }
    }

    function createIndex() {
        // Initialize lunr.js with the fields to search
        return lunr(function () {
            this.field('id');
            this.field('title', { boost: 10 });
            this.field('author');
            this.field('category');
            this.field('content');

            for (var key in window.store) { // Add the JSON generated from site content to Lunr.js
                this.add({
                    'id': key,
                    'title': window.store[key].title,
                    'author': window.store[key].author,
                    'category': window.store[key].category,
                    'content': decodeURI(window.store[key].content)
                });
            }
            console.log('idx created');
        });
    }

    function doSearch(searchTerm) {
        if (!searchTerm) return;

        // Check if the index has already been created
        if (!idx) {
            idx = createIndex(); // Create the index if it doesn't exist
        }

        const results = idx.search(searchTerm); // Perform search with Lunr.js
        console.log(results);
        for (let i = 0; i < results.length; i++) {
            console.log(window.store[results[i].ref]);
        }
        showResults(results, window.store);
    }

    const modal = document.getElementById('search-modal');
    const searchBox = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const searchTerm = searchBox.value;

    if (window.store != null) {
        doSearch(searchTerm);
    }

    // Use MutationObserver to watch for changes in the modal's display style
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.attributeName === 'style') {
                if (isModalShown(modal)) {
                    searchBox.addEventListener('keyup', onKeyUp);
                } else {
                    searchBox.removeEventListener('keyup', onKeyUp);
                    searchBox.value = ''; // Clear the search box when the modal is hidden
                    searchResults.innerHTML = ''; // Clear the search results when the modal is hidden
                }
            }
        });
    });

    observer.observe(modal, { attributes: true });

    function onKeyUp(event) {
        if (this.value.trim() === '') {
            searchResults.innerHTML = ''; // Clear the search results if the search box is empty
        } else {
            doSearch(this.value);
        }
    }
})();