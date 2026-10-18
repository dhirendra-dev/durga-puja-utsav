# Durga Puja Utsav

A responsive, bilingual cultural experience celebrating Durga Puja and the many traditions of the festive season. Built with React, TypeScript, Vite, Framer Motion, and custom CSS.

The site pairs cultural storytelling with practical, interactive tools—including a community contribution form and a locally managed gallery review panel.

## What’s inside

- A devotional landing page with custom illustrative artwork and responsive navigation
- Stories, rituals, regional traditions, and Navadurga learning cards
- Animated devotional artwork, a light-gathering story experience, and the timed Diya Quest mini-game
- A bilingual Utsav Arcade with a festival-symbol memory match and six cultural quiz questions
- An interactive knowledge quiz
- A cultural gallery with category filters
- Festival planning tools, an events explorer, and a pandal map
- A Puja journal for saving personal memories
- A community contribution form with image attachments and a local review workflow
- English and Bengali language options, light/dark appearance, responsive layouts, and reduced-motion support

## Requirements

- Node.js 18 or newer
- npm (included with Node.js)

## Run the site locally

1. Clone the repository and enter the project directory:

   ```bash
   git clone https://github.com/dhirendra-dev/durga-puja-utsav.git
   cd durga-puja-utsav
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the Vite development server:

   ```bash
   npm run dev
   ```

4. Open the local address printed in the terminal—usually <http://localhost:5173>—in your browser.

Vite supports hot reload, so changes to the source files appear as you work. To access the development server from another device on the same network, use the network address Vite prints in the terminal.

## View and use the Community Gallery

1. Open the site in your browser.
2. Choose **Community Gallery** from the navigation, or scroll to the Community Gallery section.
3. Submit a story, artwork, poem, photograph, tradition, or community initiative using the contribution form. A name and title are required; an image is optional and must be under 600 KB.
4. New submissions appear in the local review panel as pending. Approve a contribution there to display it in the gallery; you can also feature or remove submissions from the review panel.
5. Use the gallery search and category filter to find approved entries.

### Important: local-only data

This project currently has no server, database, account system, or shared moderation service. Contributions, approvals, favorites, journal entries, and other saved preferences are stored in the browser’s local storage on the device where they were created. They are not automatically uploaded or shared with other visitors, and clearing browser data may remove them. The gallery is therefore a local demonstration of a submission and review workflow—not a live, cross-user community feed.

## Production build

Create and locally preview an optimized production build:

```bash
npm run build
npm run preview
```

The build output is written to `dist/`. The `npm run build` command also runs the TypeScript project checks before building the site.

## Deploy

The project is configured for Vercel. Import the GitHub repository into Vercel and use these settings (normally detected automatically):

| Setting | Value |
| --- | --- |
| Install command | `npm install` |
| Build command | `npm run build` |
| Output directory | `dist` |

No API keys or environment variables are required. The Vercel rewrite configuration supports client-side routes.

### GitHub Pages

GitHub Pages is deployed from the `dist/` artifact by [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml). In the repository’s **Settings → Pages**, set the build and deployment source to **GitHub Actions**. The workflow builds with Vite’s `github-pages` mode so scripts, styles, and public images resolve beneath `/durga-puja-utsav/`. The standard `npm run build` remains rooted at `/` for Vercel and local preview.

## Project structure

```text
.
├── public/
│   ├── gallery/           # Optimized original Durga Puja artwork
│   ├── durga-ma-hero.webp # Cinematic, responsive hero illustration
│   └── durga-mark.svg     # Custom mandala favicon
├── src/
│   ├── App.tsx          # Page content and interactive features
│   ├── main.tsx         # React application entry point
│   └── styles.css       # Responsive styles and visual design
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── vercel.json
└── README.md
```

## Content and cultural care

This site is an educational introduction, not a definitive account of every regional tradition. Practices and interpretations vary across communities and families. Please review and adapt the content with local cultural knowledge before publishing. Ask permission before sharing someone else’s story or image, and before photographing worshippers or sacred moments. The new hero and gallery visuals are AI-created interpretive artwork, not documentary photographs of a specific pandal, person, or ritual.

## Original festival artwork

All fixed site illustrations were created for this project and optimized as WebP assets for faster loading. The in-page disclosure identifies them as interpretive artwork rather than photographs of a real festival location. Community-submitted images remain local to the visitor's browser unless the product is extended with a reviewed publishing backend.
