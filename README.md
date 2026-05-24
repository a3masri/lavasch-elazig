# LAVASCH Elazığ

Premium döner restaurant website — static HTML/CSS/JS, ready for [Netlify](https://www.netlify.com/).

## Deploy on Netlify

### Option A — GitHub (recommended)

1. Push this repo to GitHub (see below).
2. In [Netlify](https://app.netlify.com/): **Add new site** → **Import from Git**.
3. Select the repository.
4. Build settings (auto-detected from `netlify.toml`):
   - **Publish directory:** `.` (root)
   - **Build command:** *(leave empty)*
5. Deploy.

### Option B — Drag & drop

1. Zip the project folder (all files except `node_modules` and `.git`).
2. Netlify → **Sites** → **Add site** → **Deploy manually** → drop the zip.

### Custom domain

Netlify → **Site settings** → **Domain management** → add your domain.

## Run locally

```bash
npx serve .
```

Open http://localhost:3000 (or the port shown).

## Project structure

```
lavasch/
├── index.html      # Main page
├── styles.css      # Styles + themes
├── fonts.css       # League Gothic
├── script.js       # UI logic
├── netlify.toml    # Netlify config
├── images/
│   ├── menu/       # Food photos (optional)
│   ├── drinks/     # Drink photos (optional)
│   └── instagram/  # Instagram previews (optional)
└── README.md
```

## Customize

- **Map:** [Google Maps link](https://maps.app.goo.gl/nqshfbbxAozY7Xqu7) in `index.html` → `#konum`
- **Phone:** search `+90 424 200 00 00` in `index.html`
- **Menu photos:** add JPGs under `images/menu/` and update `src` in HTML (or keep Unsplash demo URLs)
- **Instagram:** [@lavasch_elazig](https://www.instagram.com/lavasch_elazig/)

## Push to GitHub

```bash
cd lavasch
git init
git add .
git commit -m "Initial commit: LAVASCH website ready for Netlify"
gh repo create lavasch-elazig --public --source=. --remote=origin --push
```

If `gh` is not installed or not logged in:

```bash
git remote add origin https://github.com/YOUR_USERNAME/lavasch-elazig.git
git branch -M main
git push -u origin main
```
