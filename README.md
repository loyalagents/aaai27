# Loyal Agents workshop at AAAI-27: website

Source for the workshop site, served by GitHub Pages from https://github.com/loyalagents/aaai27 at https://loyalagents.github.io/aaai27/.

## Files

- `index.html` holds all page content, in one file with a section per topic (about, topics, agenda, speakers, call for papers, organizers, attend).
- `styles.css` holds the design. Colors and fonts are set as variables at the top.
- `main.js` draws the hero animation of principals and their tethered agents. The page works without it.
- `favicon.svg` is the browser-tab icon.
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
