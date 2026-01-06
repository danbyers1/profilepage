# Design Guidelines: Technical Tutorial & Blog Platform

## Design Approach

**Reference-Based Hybrid**: Drawing from leading technical content platforms (Dev.to, Medium, Digital Ocean) combined with GitHub's Primer design system for technical authenticity.

**Core Principles**:
- Content-first readability with generous whitespace
- Technical credibility through clean, structured layouts
- Easy navigation between tutorial categories
- Code-friendly typography and syntax highlighting considerations

---

## Typography

**Font Stack**:
- Headings: Inter (Google Fonts) - weights 600, 700
- Body: Inter - weights 400, 500
- Code: JetBrains Mono (Google Fonts) - weight 400

**Hierarchy**:
- H1: text-5xl md:text-6xl font-bold (page titles, hero)
- H2: text-3xl md:text-4xl font-semibold (article titles, section headers)
- H3: text-2xl font-semibold (subsections, category headers)
- H4: text-xl font-semibold (card titles, tutorial steps)
- Body: text-base leading-relaxed (paragraphs, descriptions)
- Small: text-sm (metadata, tags, timestamps)
- Code inline: text-sm font-mono (within text)
- Code blocks: text-sm md:text-base font-mono leading-relaxed

---

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16, 20 consistently
- Component padding: p-4 to p-8
- Section spacing: py-12 md:py-20
- Card gaps: gap-6 md:gap-8
- Container max-width: max-w-7xl

**Grid Structure**:
- Article grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
- Sidebar layout: 2/3 content + 1/3 sidebar on desktop
- Full-width content: max-w-3xl for optimal reading

---

## Component Library

**Navigation**:
- Sticky header with logo, category navigation (Raspberry Pi | Python | SRE | CI/CD | Agile), search icon
- Hamburger menu for mobile
- Breadcrumb navigation on article pages

**Hero Section**:
- Full-width background image showcasing Raspberry Pi cluster or server setup
- Overlay gradient for text readability
- Centered content: Main headline, subheadline describing focus areas
- Primary CTA button with blurred background ("Explore Tutorials")
- Height: 60vh md:70vh

**Article Cards**:
- Featured image thumbnail (16:9 ratio)
- Category tag badge
- Article title (H3)
- Excerpt/description (2-3 lines)
- Metadata footer: Author info, read time, date
- Hover state: subtle lift effect

**Category Sections**:
- Icon + category name header
- 3-column grid of related articles
- "View All" link for each category

**Sidebar Components** (for article pages):
- Table of contents (auto-generated from headings)
- Related articles widget
- Newsletter signup card
- Author bio card

**Footer**:
- 3-column layout: About/bio, Quick links to categories, Social/contact
- Newsletter signup form
- Copyright and attribution

**Content Components**:
- Code block containers with syntax highlighting support
- Step-by-step tutorial cards with numbered steps
- Info/warning/tip callout boxes
- Image galleries for project photos

---

## Images

**Required Images**:

1. **Hero Image**: Full-width, high-quality photo of Raspberry Pi cluster setup with LEDs/cables visible. Warm technical aesthetic. Gradient overlay applied.

2. **Category Headers**: One representative image per category:
   - Raspberry Pi: Close-up of Pi board with components
   - Python: Screen showing code editor
   - SRE: Dashboard/monitoring screens
   - CI/CD: Pipeline visualization
   - Agile: Kanban board or sprint planning

3. **Article Thumbnails**: Each article card requires 16:9 thumbnail relevant to content (Pi projects, code screenshots, infrastructure diagrams)

4. **Tutorial Step Images**: Inline photos showing physical setups, terminal outputs, configuration screenshots

**Image Treatment**: All images use rounded corners (rounded-lg), maintain 16:9 or 4:3 ratios, optimize for web performance

---

## Icons

Use **Heroicons** (outline style) via CDN for:
- Navigation menu items
- Category icons (Server, Code, Cog, GitBranch, Users)
- Search, menu toggle
- External links, social media

---

## Interactions

**Minimal Animations**:
- Card hover: translateY(-2px) with subtle shadow increase
- Button hover: slight opacity change
- Page transitions: none (instant load for speed)
- Smooth scroll for anchor links

**Focus**: Priority on fast load times and content accessibility over decorative animations