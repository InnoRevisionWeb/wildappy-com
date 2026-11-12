# WildAppy — Coming Soon

A responsive, single-page landing site for **WildAppy**, an independent game studio creating games for iPhone and iPad. This release is the polished source-code edition of the approved design.

## Site contents

| File | Purpose |
| --- | --- |
| `index.html` | Page structure, SEO/social metadata, semantic content, accessible interactive controls, and footer |
| `styles.css` | Brand colors, responsive layout, typography, animations, and game styling |
| `script.js` | Automatic copyright year, Boomer's reactions, and the carrot-catching mini-game |
| `assets/wildappy-logo-transparent.png` | Transparency-corrected Boomer logo used on the page |
| `assets/wildappy-logo.webp` | Optimized transparent WebP backup asset |
| `assets/wildappy-logo-original.png` | Original unedited logo artwork retained for reference |
| `assets/favicon.svg` | Browser tab icon |
| `CNAME` | GitHub Pages custom domain: `wildappy.com` |

## Preview

Open `index.html` directly, or start a local server in this folder:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish to GitHub Pages

1. Create or update a repository under the `innorevisionweb` GitHub account.
2. Upload **the files inside this folder**, not the outer folder, to the repository root.
3. In **Settings > Pages**, deploy from the `main` branch and `/ (root)` folder.
4. Set the custom domain to `wildappy.com` and point DNS to GitHub Pages according to GitHub's current documentation.
5. Enable **Enforce HTTPS** after the certificate is issued.

## Boomer and the Secret Carrot Club

Click or tap Boomer five times to unlock the mini-game. Catch ten carrots in 25 seconds. The game works with touch, mouse, and keyboard and can be dismissed with Escape or the close button.

## Maintenance notes

- The copyright year in the footer updates automatically.
- Brand colors are centralized as CSS custom properties in `:root`.
- Display typography uses **Fredoka**; body text uses **DM Sans**. If web fonts are unavailable, local fallbacks are used.
- There are no analytics, advertising scripts, accounts, contact forms, or backend dependencies.
- No release date, shipped game titles, or studio corporate suffix has been invented.
- Update the copyright/legal entity wording if WildAppy is registered under a different legal name.

© 2026 WildAppy. All rights reserved.
