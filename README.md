# Aditya Abhyankar - Professional Portfolio v2

A modern, interactive 5-page portfolio website with dark mode, pop-up modals, Chart.js dashboards, and professional teal/navy color scheme.

## What's New in v2

- **Dark Mode Toggle** – Moon/sun icon in navbar, persists via localStorage
- **Click-to-Expand Modals** – Every card opens a detailed popup with full information
- **Chart.js Graphs** – Bar, line, and doughnut charts in project dashboards
- **Bigger Experience Cards** – Wider timeline cards with better visual hierarchy
- **Contact Dropdown** – Standard options for recruiter contact reasons
- **Professional Color Scheme** – Teal (#0d9488) instead of purple, light backgrounds

## Pages

1. **Home** (`index.html`) – Hero, prominent competencies with click-to-expand modals, achievements, education
2. **Experience** (`experience.html`) – Bigger timeline cards with photos, click for full job details
3. **Projects** (`projects.html`) – Interactive dashboards with SVG rings + Chart.js graphs + detail modals
4. **Competencies** (`skills.html`) – Animated skill bars, languages, certifications
5. **Contact** (`contact.html`) – Web3Forms with dropdown, contact cards, availability status

## Features

- **OxygenOS 16 Fluid Animations** – Spring physics, scroll reveals, parallax, magnetic buttons
- **Dark Mode** – Full theme switch with CSS variables and localStorage persistence
- **Interactive Modals** – Click any card to open a detailed popup (ESC to close)
- **Chart.js Integration** – Real bar, line, and doughnut charts in project dashboards
- **SVG Circular Progress** – Animated ring charts with gradient strokes
- **Mobile Responsive** – Hamburger menu, adaptive layouts
- **Page Transitions** – Smooth fade between pages
- **Confetti Animation** – On successful form submission

## Deployment

### GitHub + Vercel

1. Create a new repository on GitHub
2. Upload all files from this folder
3. Go to vercel.com and sign in with GitHub
4. Click "Add New Project" and import your repository
5. Vercel auto-detects static site and deploys

### No Terminal Required

Since you cannot use `cd` or `npm`, simply:
1. Zip this folder
2. Upload to GitHub via web interface (drag & drop)
3. Connect to Vercel as described above

## Customization

### Replace Images

Add your photos to the `images/` folder, then update `src` attributes:
- **Profile Photo**: `index.html` – replace the ui-avatars URL
- **Experience Photos**: `experience.html` – replace Unsplash URLs

### Update Web3Forms

Contact form uses access key: `e556db48-9042-4daa-9ee9-b294963e883f`
Messages sent to: **Aditya.abhyankar22@gmail.com**

## File Structure

```
portfolio/
├── index.html
├── experience.html
├── projects.html
├── skills.html
├── contact.html
├── Aditya_Abhyankar_CV.pdf
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/
└── README.md
```

## Tech Stack

- Pure HTML5 (semantic markup)
- CSS3 (custom properties, flexbox, grid, animations, dark mode)
- Vanilla JavaScript (no frameworks)
- Chart.js 4.4.1 (charts and graphs)
- Font Awesome 6 (icons)
- Google Fonts (Inter)
- Web3Forms API (contact form backend)

## Browser Support

- Chrome / Edge / Firefox / Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

---

Built with precision by Aditya Abhyankar | 2026
