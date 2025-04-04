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
                appendString += '<li><a href="'+ BASEURL + item.url + '" style="display: block; text-decoration: none; color: inherit;">';
                appendString += '<span class="post-meta">' + item.date + '</span><h2>' + item.title + '</h2>';
                appendString += '<p class="small">' + item.content.substring(0, 100) + '...</p>';
                appendString += '</a></li>';
            }

            searchResults.innerHTML = appendString;
        } else {
            searchResults.innerHTML = '<li>No results found</li>';
        }
    }

    function createIndex() {
        // Initialize lunr.js with the fields to search
        const index = lunr(function () {
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
                    'content': window.store[key].content
                });
            }
        });
        // Save the index to session storage
        sessionStorage.setItem('lunrIndex', JSON.stringify(index));
        return index;
    }

    function loadIndex() {
        const savedIndex = sessionStorage.getItem('lunrIndex');
        if (savedIndex) {
            return lunr.Index.load(JSON.parse(savedIndex));
        }
        return null;
    }

    function doSearch(searchTerm) {
        if (!searchTerm) return;

        // Check if the index has already been created
        if (!idx) {
            idx = loadIndex() || createIndex();
        }

        const results = idx.search(searchTerm); // Perform search with Lunr.js
        for (let i = 0; i < results.length; i++) {
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