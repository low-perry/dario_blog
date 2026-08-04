# Social cards

The generator creates the 1200×630 PNG images in `assets/images/social`. Page cards are configured in `generate.mjs`; post cards are discovered automatically from `_posts` and use their title, excerpt, categories, date, and filename slug.

From this directory, run:

```sh
npm install
npm run generate
```

Commit regenerated PNG files when adding or editing a post. The website deploy does not run this generator or require Node.js.
