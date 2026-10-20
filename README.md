# McCue Travel & Cruise — Website

Static HTML/CSS/JS site (no build step). Open `index.html` locally, or drop the folder on Netlify, Cloudflare Pages, GitHub Pages or any host.

## Pages
`index` · `services` · `ocean-cruises` · `river-expedition` · `weddings-honeymoons` · `groups-corporate` · `destinations` · `pricing` (with trip estimator) · `about` · `faq` · `contact` · `logos` (6 logo options, live preview) · `privacy` · `terms` · `404`

## Before launch — checklist
1. **Business details & form:** edit the `SITE` block at the top of `assets/js/main.js` (phone, email, location, hours, social links, `formEndpoint`). Create a free Formspree (or Netlify Forms) endpoint and paste it in; until then forms open the visitor's email app.
2. **Pricing:** planning fees, tier names, the sample price table and estimator base rates (`pricing.html`, `#c-type` options) are *example numbers* — replace with your real policy.
3. **Logo:** open `logos.html`, preview each option, then have a designer finalize (outline type, one-color/reversed versions) after a trademark search. Swap files in `assets/logos/`.
4. **Content:** replace the sample testimonials (home), team bios/story/credentials (`about.html`), and legal text (`privacy.html`, `terms.html`, seller-of-travel numbers) with real content.
5. **Domain:** update `sitemap.xml`, `robots.txt` and the JSON-LD block in `index.html` with the real domain.
6. **Photos:** pages use illustrated SVG scenes (`data-scene` in `main.js`) so no images are required; swap in licensed photography when ready.

## Editing the look
Colors and fonts are CSS variables at the top of `assets/css/styles.css`. Header, footer and navigation are injected from `assets/js/main.js`, so you edit them once.
