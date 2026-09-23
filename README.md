# Aditya Abhyankar: Professional Portfolio

A five-page static portfolio built to showcase technical project management, engineering delivery, and CAPEX/industrial project experience in a recruiter-friendly format. Live at [aditya-abhyankar-portfolio-c3d9.vercel.app](https://aditya-abhyankar-portfolio-c3d9.vercel.app).

## Features

- **Dark / light mode**: manual toggle, persisted via `localStorage`, defaults to the visitor's OS preference on first visit.
- **Command palette (Ctrl/Cmd+K)**: fuzzy-searchable quick nav to any page plus actions (download CV, toggle theme, email, call, LinkedIn).
- **Scroll-reveal animations**: IntersectionObserver-driven fade/slide-in for sections and cards, with staggered delays.
- **Animated counters**: hero and "Portfolio at a Glance" stats count up when scrolled into view.
- **Interactive dashboards**: Chart.js metric rings and charts on project cards, plus a custom Chart.js-based Gantt chart for the career timeline.
- **Project sector filter**: filter the Projects page by Industrial / Digital Transformation / IT & Healthcare / Academic.
- **Testimonials**: real LinkedIn recommendations, with a collapsible "read more" for longer quotes.
- **Accessible modals**: 20+ detail popups across Experience, Projects, and Education, with focus trapping, keyboard activation (Enter/Space to open, Escape to close), and focus restore on close.
- **Contact form**: Web3Forms-powered, no backend required.
- **SEO/sharing**: JSON-LD `Person` structured data, Open Graph/Twitter meta tags, canonical URLs, `robots.txt`, `sitemap.xml`, and favicons.
- **Analytics**: Vercel Web Analytics.
- **Print stylesheet**: a clean, ink-friendly layout when printed or saved as PDF.
- **Downloadable CV**: a PDF resume kept in sync with the site's content.

## Site Pages

1. **Home** (`index.html`): introduction, hero stats, core competencies, key achievements, testimonials.
2. **Experience** (`experience.html`): career Gantt chart plus a detailed timeline with click-to-expand modals.
3. **Projects** (`projects.html`): filterable project dashboards with metrics, tags, and cumulative impact stats.
4. **Competencies** (`skills.html`): categorized skills with animated progress bars.
5. **Contact** (`contact.html`): contact form, direct contact details, and CV download.

## File Structure

```text
Aditya-Abhyankar-Portfolio/
├── index.html                 # Home page
├── experience.html            # Career timeline, Gantt chart
├── projects.html              # Project dashboards, sector filter
├── skills.html                # Competencies page
├── contact.html               # Contact form and details
├── Aditya_Abhyankar_CV.pdf    # Resume download (kept in sync with site content)
├── css/
│   └── style.css              # Theme variables, layout, dark mode, animations, print styles
├── js/
│   └── main.js                # Theme toggle, modals, charts, command palette, all interactions
├── images/                    # Photos and logos
├── favicon-16.png, favicon-32.png, apple-touch-icon.png
├── robots.txt, sitemap.xml    # SEO basics
├── LICENSE
└── README.md
```

## Technologies

- HTML5
- CSS3 (custom properties, dark mode, responsive layout, print styles)
- Vanilla JavaScript (no framework, no build step)
- [Chart.js](https://www.chartjs.org/) (CDN) for dashboards and the Gantt chart
- [Font Awesome](https://fontawesome.com/) (CDN) for iconography
- [Google Fonts](https://fonts.google.com/) (Inter)
- [Web3Forms](https://web3forms.com/) for contact form submissions
- [Vercel Web Analytics](https://vercel.com/analytics)

## Deployment

Static site, ready to deploy on Vercel, Netlify, GitHub Pages, or any static host.

### Vercel

1. Push the repository to GitHub.
2. Connect the repository to Vercel.
3. Vercel detects the static site and deploys automatically; no build command needed.

## Local Development

No build step required. Serve the folder with any static file server, for example:

```bash
python3 -m http.server 8123
```

Then open `http://localhost:8123/index.html`.

## Customization Notes

- Update photos in `images/` and their `src` references in the HTML.
- Edit contact details directly in `contact.html` (and the JSON-LD block near the top of each page, if changed).
- Update theme colors and spacing via the CSS custom properties in `css/style.css` (`:root` and the `[data-theme="dark"]` override block).
- The command palette's command list lives in `initCommandPalette()` in `js/main.js`.

---

© 2026 Aditya Abhyankar
