# Loyal Agents workshop at AAAI-27: website

Source for the workshop site, served by GitHub Pages from https://github.com/loyalagents/aaai27 at https://loyalagents.github.io/aaai27/.

## Files

- `index.html` holds all page content, in one file with a section per topic (about, topics, agenda, speakers, call for papers, organizers, attend).
- `styles.css` holds the design. Colors and fonts are set as variables at the top.
- `main.js` draws the hero animation of principals and their tethered agents. The page works without it.
- `favicon.svg` is the browser-tab icon. `apple-touch-icon.png` is the same mark for iOS home screens and link previews.
- `share-card.png` is the 1200×630 image shown when the link is shared (LinkedIn, Slack, X, iMessage). Its source is `share/card.html`. Rebuild it with `share/render.sh`, which uses headless Chrome.
- `sitemap.xml` lists the page for search engines. Update its `lastmod` date after big content changes.
- The `<head>` of `index.html` holds the search and sharing tags (title, description, Open Graph, Twitter card) and the schema.org `Event` data. Keep the title, `og:title` and `twitter:title` identical.
- `.nojekyll` tells GitHub Pages to serve the files as they are.

## Preview locally

Open `index.html` in a browser. No build step.

## Publish

This directory is its own git repository with `origin` set to the GitHub repo. After the first push, turn on Pages in the repo settings: Settings, Pages, deploy from branch `main`, folder `/ (root)`.

## What to fill in as details land

- Call for papers: replace the "coming soon" card in the `#cfp` section with the full call and the OpenReview link.
- Speakers: replace the three "To be announced" cards in `#speakers`.
- Agenda: times in `#agenda` are placeholders until AAAI assigns the day and room.
- Program committee: add under `#organizers`.
- Registration: add the AAAI-27 registration link in `#attend`.
- Share card: the current card invites submissions. After November 20, edit `share/card.html` (swap the call-for-papers strip for the date and a "join us" line), rebuild the PNG, and update the matching `og:description`, `twitter:description` and image alt text. Sites cache cards, so re-scrape with LinkedIn's Post Inspector after a change.
- Event date: once AAAI assigns the day, set `startDate` and `endDate` in the `Event` data to that one date.
