## AI Content Repurposer

Minimal, narrative-driven landing page and product shell for an AI content repurposing platform. The UI is built around a black-and-white design system with vector motifs, 3D depth cues, and physics-inspired motion to tell a clear brand story.

### Highlights
- Story-first landing experience with multiple sections and strong visual rhythm
- Monochrome UI and iconography; no gradients
- Motion built with physics-based springs, orbiting vectors, and subtle 3D tilt
- Authentication-ready with Clerk
- App Router architecture using Next.js 14

## Tech Stack
- Next.js (App Router)
- React 18
- TypeScript
- Tailwind CSS (v4)
- Framer Motion (physics-style animations)
- Clerk (auth)
- Lucide icons

## Project Structure
```
src/
  app/
    layout.tsx        # Global layout, providers, fonts
    page.tsx          # Entry route (renders HomePage)
    globals.css       # Global styles and animation utilities
  components/
    pages/
      HomePage.tsx    # Landing page composition and sections
```

## Getting Started

Install dependencies:
```bash
npm install
```

Run the dev server:
```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Environment Variables
This project uses Clerk. Create a `.env.local` file in the project root:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key_here
CLERK_SECRET_KEY=your_key_here
```

If you are not using Clerk locally, you can keep these unset and remove Clerk usage in `src/app/layout.tsx` and `src/components/pages/HomePage.tsx`.

## Scripts
```bash
npm run dev     # Start dev server
npm run build   # Build for production
npm run start   # Start production server
npm run lint    # Run linting
```

## Design Notes
- Color system is strictly black/white with neutral grays for hierarchy.
- Vector rings and node fields reinforce the physics system narrative.
- 3D depth is achieved with perspective utilities and motion tilt.
- Motion is subtle by default, with spring-based interactions to keep it premium.

## Deployment
Deploy on Vercel or any Node.js host that supports Next.js.

Vercel quick deploy:
1. Push this repo to GitHub.
2. Import the project in Vercel.
3. Set environment variables from `.env.local`.
4. Deploy.

## License
MIT
