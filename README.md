# Durga Puja Utsav — The Light Within

A responsive, animated cultural-awareness website about Durga Puja, built with React, TypeScript, Vite, Framer Motion and custom CSS. It is designed to be pushed to GitHub and deployed on Vercel.

## Highlights

- Cinematic devotional hero with custom artwork
- Responsive mobile navigation
- Scroll reveal and hover animations, floating petals, glowing diyas and ambient effects
- Story of Maa Durga and Mahishasura
- Why Durga Puja is celebrated
- Five days of Puja and commonly observed rituals
- Navadurga learning cards
- Regional celebration cards and culture gallery
- Interactive knowledge quiz with score feedback
- Accessibility-minded reduced-motion support
- SEO metadata and Vercel SPA rewrite

## Run locally

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Build

```bash
npm run build
npm run preview
```

## Deploy on GitHub + Vercel

1. Create a new GitHub repository, for example `durga-puja-utsav`.
2. Extract this ZIP and upload the **contents** of the folder (not the ZIP file itself) to the repository.
3. In Vercel, choose **Add New → Project**, import the repository, and keep the detected Vite settings:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`
4. Click **Deploy**. No API keys or environment variables are required.

## Content note

The site is an educational introduction, not a definitive account of every regional tradition. Dates, customs, rituals and interpretations can vary by community and calendar. Please review and adapt the copy with local cultural knowledge before publishing. The included hero artwork is an AI-generated devotional illustration, not a documentary photograph or a live animation of a physical idol.

## Project structure

```text
durga-puja-utsav/
├── public/
│   └── durga-puja-hero.png
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   └── styles.css
├── index.html
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── vercel.json
└── README.md
```
