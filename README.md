# monnte.cc

Personal portfolio website built with Next.js, featuring a minimalist x.ai-inspired design.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 + Custom CSS
- **Fonts**: Inter, Geist Mono
- **Deployment**: Static Export

## Features

- Minimalist black/white design inspired by x.ai
- Scroll-triggered animations using Intersection Observer
- Dynamic experience data loaded from JSON
- Responsive layout for all devices
- Skeleton loading states
- SEO optimized with meta tags

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
├── public/
│   └── data/
│       └── experiences.json    # Work experience data
├── src/
│   ├── app/
│   │   ├── globals.css         # Global styles & animations
│   │   ├── layout.tsx          # Root layout with fonts
│   │   └── page.tsx            # Home page
│   ├── components/
│   │   ├── AnimateOnScroll.tsx # Scroll animation wrapper
│   │   ├── BackgroundCanvas.tsx# Subtle grid background
│   │   ├── Contact.tsx         # Contact links section
│   │   ├── Experience.tsx      # Work experience timeline
│   │   ├── Footer.tsx          # Footer component
│   │   ├── Hero.tsx            # Hero section with profile
│   │   ├── Stats.tsx           # Statistics section
│   │   └── TechStack.tsx       # Skills/technologies grid
│   └── types/
│       └── experience.ts       # TypeScript types
└── next.config.ts              # Next.js configuration
```

## Customization

### Update Experience Data

Edit `public/data/experiences.json` to update your work history:

```json
{
  "experiences": [
    {
      "id": 1,
      "title": "Job Title",
      "company": "Company Name",
      "employmentType": "Full-time",
      "location": "Location",
      "period": {
        "start": "Month Year",
        "end": null
      },
      "current": true,
      "responsibilities": ["Task 1", "Task 2"],
      "technologies": ["Tech 1", "Tech 2"]
    }
  ]
}
```

### Update Personal Info

- **Hero**: Edit `src/components/Hero.tsx`
- **Stats**: Edit `src/components/Stats.tsx`
- **Tech Stack**: Edit `src/components/TechStack.tsx`
- **Contact Links**: Edit `src/components/Contact.tsx`
- **Metadata**: Edit `src/app/layout.tsx`

### Update Styling

- **Colors**: CSS variables in `src/app/globals.css` (`:root` section)
- **Animations**: Keyframes in `src/app/globals.css`

## Deployment

The project is configured for static export. Build output is in the `out/` directory.

```bash
npm run build
```

Deploy to any static hosting:
- **Vercel**: Connect repo for automatic deployments
- **Netlify**: Drag & drop `out/` folder or connect repo
- **GitHub Pages**: Push `out/` contents to `gh-pages` branch

## License

MIT
