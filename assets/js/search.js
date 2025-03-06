(function () {
    function showResults(results, store) {
        const searchResults = document.getElementById('search-results');

        if (results.length) { // If there are results...
            let appendString = '';

            for (let i = 0; i < results.length; i++) {  // Iterate over them and generate html
                const item = store[results[i].ref];
                appendString += '<li><span class="post-meta">' + item.date + '</span><a href="' +
                    item.url + '"><h2>' + item.title + '</h2></a>';
                appendString += '<p class="small">' + decodeURI(item.content).substring(0, 100)
                    + '...</p></li>';
            }

            searchResults.innerHTML = appendString;
        } else {
            searchResults.innerHTML = '<li>No results found</li>';
        }
    }

    function getQuery(variable) {
        const query = window.location.search.substring(1);
        const vars = query.split('&');

        for (let i = 0; i < vars.length; i++) {
            const pair = vars[i].split('=');

            if (pair[0] === variable) {
                return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
            }
        }
    }

    function doSearch(searchTerm) {
        if (!searchTerm) return;
        // Initialize lunr.js with the fields to search
        const idx = lunr(function () {
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
        });

        const results = idx.search(searchTerm); // Perform search with Lunr.js
        showResults(results, window.store);
    }

    const searchBox = document.getElementById('search-box');
    const searchTerm = getQuery('query');
    if (!searchBox.value)
        searchBox.value = searchTerm;

    if (window.store != null)
        doSearch(searchTerm);

    if (window.store != null && window.location.href.indexOf('/search.html'))
        searchBox.addEventListener('keyup', function (event) {
            doSearch(this.value);
        });
})();

document.addEventListener("DOMContentLoaded", function () {
    const searchIcon = document.getElementById("search-icon");
    const searchForm = document.querySelector(".header-search-form");

    searchIcon.addEventListener("click", function () {
        if (searchForm.style.display === "none" || searchForm.style.display === "") {
            searchForm.style.display = "flex";
            document.getElementById("search-box").focus();
        } else {
            searchForm.style.display = "none";
        }
    });
});