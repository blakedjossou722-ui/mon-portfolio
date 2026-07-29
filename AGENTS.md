## Project Overview

**Portfolio Personnel** — A professional showcase for a student of Computer Science & Graphic Design. This project demonstrates both technical prowess and creative sensibility through a cohesive, modern web presence.

**Goal:** Present services in web development and graphic design (posters, branding, visual communication) with an elegant, dark-mode aesthetic.

**Key Sections:**
- **Hero:** Strong opening statement and value proposition
- **About:** Personal introduction and dual skill set
- **Services:** Three core offerings (Web Dev, Graphic Design, Branding)
- **Projects:** Showcase of completed work
- **Contact:** Call-to-action to start conversations

## Environment & Security

### API Keys & Secrets

This project uses **environment variables** to manage sensitive credentials securely:

- **`.env.local`** — Local configuration with real API keys (never committed)
- **`.env.example`** — Template showing which variables are needed (committed for reference)
- **`.gitignore`** — Prevents `.env.local` from being committed

**Setup:**
1. Copy `.env.example` to `.env.local`
2. Replace placeholder values with your actual API keys
3. Access via `import.meta.env.VARIABLE_NAME` in Astro components

**Important:**
- ⚠️ Never commit `.env.local` or real credentials
- ⚠️ Never hardcode API keys in components
- Use `VITE_` prefix for client-side variables (exposed to browser)
- Variables without prefix are server-only

See [src/utils/api-config.ts](src/utils/api-config.ts) for usage examples.

## Tech Stack

- **Framework:** Astro 7.x (static-first, component-based)
- **Styling:** Tailwind CSS 4.3 with custom design tokens
- **Design System:** Binary Creative (dark mode, editorial minimalism, technical edge)
- **Target:** Modern browsers, responsive (desktop-first)

## Brand: Binary Creative

This is a "Dual Identity" design — two creative personas in one portfolio:

1. **The Designer (Playfair Display):** Serif, editorial, expressive
   - Used for large headlines and storytelling
   - Signals creativity and visual sensibility

2. **The Coder (Inter + JetBrains Mono):** Clean, technical, logical
   - Inter for body copy and UI
   - JetBrains Mono for metadata and code labels
   - Signals technical precision and systematic thinking

**Visual Signature:** Dark background (`#131313`), cyan accent (`#8dd1e0`), high contrast.

See [DESIGN.md](DESIGN.md) for the complete system.

## Development Workflow

### Starting the Dev Server

Use **background mode** to avoid blocking your terminal:

```sh
astro dev --background
```

Manage the server with:
- `astro dev status` — Check if running
- `astro dev logs` — View recent output
- `astro dev stop` — Stop the server
- `npm run build` — Production build (outputs to `dist/`)

### Common Tasks

| Task | Command |
|------|---------|
| **Start dev** | `astro dev --background` |
| **View site** | Open `http://localhost:4321` |
| **Build prod** | `npm run build` |
| **Preview build** | `npm run preview` |

### Code Style

- Use **semantic HTML** (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- Component files: **PascalCase** (e.g., `Hero.astro`)
- CSS classes: **kebab-case** (e.g., `hero-content`)
- Keep styles **scoped to components** when possible
- Reference the design system for colors, spacing, and typography

### Customization Points

1. **Name & Contact Info:** Update placeholders in components (search for "Prénom Nom" and email)
2. **Projects:** Edit the Projects component to link real work
3. **Colors & Fonts:** See `Layout.astro` for global styles; customize via DESIGN.md variables
4. **Copy & Headlines:** All text in components — edit as needed

## Documentation

- **Design System:** [DESIGN.md](DESIGN.md) — Colors, typography, layout, components
- **Agent Instructions:** [AGENTS.md](AGENTS.md) — For AI coding agents
- **Astro Docs:** https://docs.astro.build
- **Tailwind Docs:** https://tailwindcss.com

### Key Astro Guides

- [Routing & Pages](https://docs.astro.build/en/guides/routing/)
- [Components](https://docs.astro.build/en/basics/astro-components/)
- [Styling](https://docs.astro.build/en/guides/styling/)
- [Images & Assets](https://docs.astro.build/en/guides/images/)

## Next Steps

1. ✅ **Structure is complete** — 7 main components + layout ready
2. **Personalize content** — Add your name, projects, and contact info
3. **Refine designs** — Iterate on colors, spacing, and typography
4. **Add real projects** — Link to actual portfolios or GitHub repos
5. **Deploy** — Choose hosting (Netlify, Vercel, GitHub Pages, etc.)

---

**Your Portfolio. Your Story. Your Rules.**
