(function () {
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

            // @ts-ignore
            searchResults.innerHTML = appendString;
        } else {
            // @ts-ignore
            searchResults.innerHTML = '<li>No results found</li>';
        }
    }

    function doSearch(searchTerm) {
        if (!searchTerm) return;
        // Initialize lunr.js with the fields to search
        // @ts-ignore
        const idx = lunr(function () {
            this.field('id');
            this.field('title', { boost: 10 });
            this.field('author');
            this.field('category');
            this.field('content');

            // @ts-ignore
            for (var key in window.store) { // Add the JSON generated from site content to Lunr.js
                this.add({
                    'id': key,
                    // @ts-ignore
                    'title': window.store[key].title,
                    // @ts-ignore
                    'author': window.store[key].author,
                    // @ts-ignore
                    'category': window.store[key].category,
                    // @ts-ignore
                    'content': decodeURI(window.store[key].content)
                });
            }
        });

        const results = idx.search(searchTerm); // Perform search with Lunr.js
        // @ts-ignore
        console.log(results);
        for (let i = 0; i < results.length; i++) {
            // @ts-ignore
            console.log(window.store[results[i].ref]);
        }
        showResults(results, window.store);
    }

    const modal = document.getElementById('search-modal');
    const searchBox = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    // @ts-ignore
    const searchTerm = searchBox.value;


    // @ts-ignore
    if (window.store != null)
        doSearch(searchTerm);

    // Use MutationObserver to watch for changes in the modal's display style
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.attributeName === 'style') {
                if (isModalShown(modal)) {
                    // @ts-ignore
                    searchBox.addEventListener('keyup', onKeyUp);
                } else {
                    // @ts-ignore
                    searchBox.removeEventListener('keyup', onKeyUp);
                    // @ts-ignore
                    searchBox.value = ''; // Clear the search box when the modal is hidden
                    // @ts-ignore
                    searchResults.innerHTML = ''; // Clear the search results when the modal is hidden
                }
            }
        });
    });

    // @ts-ignore
    observer.observe(modal, { attributes: true });

    // @ts-ignore
    function onKeyUp(event) {
        if (this.value.trim() === '') {
            // @ts-ignore
            searchResults.innerHTML = ''; // Clear the search results if the search box is empty
        } else {
            doSearch(this.value);
        }
    }
})();