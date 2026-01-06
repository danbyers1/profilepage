# danbyers.io - Technical Tutorial & Blog Platform

## Overview

A technical tutorial and blog platform focused on Raspberry Pi, Python, Site Reliability Engineering (SRE), CI/CD, and Agile methodologies. The platform delivers hands-on learning content with a content-first design approach optimized for code readability and technical documentation.

The application follows a monorepo structure with a React frontend, Express backend, and PostgreSQL database, designed for deployment on Replit.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with shadcn/ui component library (New York style variant)
- **Build Tool**: Vite with custom plugins for Replit integration
- **Typography**: Inter for headings/body, JetBrains Mono for code blocks

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Pattern**: RESTful endpoints under `/api/*` prefix
- **Build Process**: esbuild for production bundling with selective dependency bundling
- **Development**: tsx for TypeScript execution, Vite dev server with HMR

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` (shared between frontend and backend)
- **Validation**: Zod schemas generated via drizzle-zod
- **Storage Abstraction**: `IStorage` interface in `server/storage.ts` with in-memory implementation for development

### Project Structure
```
├── client/           # React frontend
│   └── src/
│       ├── components/ui/  # shadcn/ui components
│       ├── pages/          # Route components
│       ├── hooks/          # Custom React hooks
│       └── lib/            # Utilities and query client
├── server/           # Express backend
│   ├── index.ts      # Server entry point
│   ├── routes.ts     # API route definitions
│   ├── storage.ts    # Data access layer
│   └── vite.ts       # Vite dev server integration
├── shared/           # Shared types and schemas
│   └── schema.ts     # Drizzle schema definitions
└── migrations/       # Database migrations (drizzle-kit)
```

### Key Design Decisions
1. **Monorepo with shared types**: TypeScript schemas in `shared/` are used by both frontend and backend, ensuring type safety across the stack
2. **In-memory storage fallback**: `MemStorage` class provides seeded data for development without database dependency
3. **Content-focused design**: Design guidelines emphasize readability with generous whitespace and code-friendly typography
4. **Dark mode support**: CSS variables with `.dark` class toggle for theme switching

## External Dependencies

### Database
- **PostgreSQL**: Primary database via `DATABASE_URL` environment variable
- **Drizzle Kit**: Schema migrations with `npm run db:push`

### UI Component Libraries
- **Radix UI**: Accessible component primitives (dialog, dropdown, tabs, etc.)
- **shadcn/ui**: Pre-styled component collection built on Radix
- **Embla Carousel**: Carousel/slider functionality
- **Recharts**: Chart components for data visualization

### Development Tools
- **Replit Plugins**: `@replit/vite-plugin-runtime-error-modal`, `@replit/vite-plugin-cartographer`, `@replit/vite-plugin-dev-banner`
- **PostCSS/Autoprefixer**: CSS processing pipeline

### External Fonts
- Google Fonts: Inter, JetBrains Mono, Fira Code, DM Sans, Geist Mono, Architects Daughter