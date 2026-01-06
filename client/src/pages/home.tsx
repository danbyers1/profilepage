import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useQuery } from "@tanstack/react-query";
import type { Category, Tutorial } from "@shared/schema";
import {
  Server,
  Terminal,
  GitBranch,
  Gauge,
  Users,
  Clock,
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
  ChevronRight,
  Cpu,
  Code2,
  Workflow,
  BarChart3,
  Container,
} from "lucide-react";
import { useState } from "react";

const iconMap: Record<string, typeof Cpu> = {
  Cpu: Cpu,
  Code2: Code2,
  Gauge: Gauge,
  Workflow: Workflow,
  Users: Users,
  Container: Container,
};

const colorMap: Record<string, string> = {
  "raspberry-pi": "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  "python": "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  "sre": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "cicd": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "agile": "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  "containers": "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
};

const navItems = [
  { name: "Raspberry Pi", slug: "raspberry-pi" },
  { name: "Python", slug: "python" },
  { name: "SRE", slug: "sre" },
  { name: "CI/CD", slug: "cicd" },
  { name: "Agile", slug: "agile" },
  { name: "Containers", slug: "containers" },
];

function CategorySkeleton() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <Skeleton className="h-12 w-12 rounded-lg" />
      </CardHeader>
      <CardContent className="pb-4">
        <Skeleton className="h-5 w-24 mb-2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4 mt-1" />
      </CardContent>
      <CardFooter className="pt-0">
        <Skeleton className="h-4 w-28" />
      </CardFooter>
    </Card>
  );
}

function TutorialSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-video w-full" />
      <CardContent className="pt-4">
        <Skeleton className="h-5 w-full mb-2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4 mt-1 mb-4" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data: categories = [], isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: tutorials = [], isLoading: tutorialsLoading } = useQuery<Tutorial[]>({
    queryKey: ["/api/tutorials"],
  });

  const getCategoryById = (id: string) => categories.find((c) => c.id === id);
  const getCategoryBySlug = (slug: string) => categories.find((c) => c.slug === slug);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
      case "intermediate":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400";
      case "advanced":
        return "bg-rose-500/10 text-rose-600 dark:text-rose-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getCategoryColor = (category: Category | undefined) => {
    if (!category) return "bg-muted text-muted-foreground";
    return colorMap[category.slug] || "bg-muted text-muted-foreground";
  };

  const getCategoryIcon = (iconName: string) => {
    return iconMap[iconName] || Server;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Terminal className="h-7 w-7 text-primary" />
              <span className="text-xl font-bold" data-testid="text-logo">danbyers.io</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Button
                  key={item.slug}
                  variant="ghost"
                  size="sm"
                  data-testid={`link-nav-${item.slug}`}
                >
                  {item.name}
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                data-testid="button-mobile-menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Button
                    key={item.slug}
                    variant="ghost"
                    className="justify-start"
                    data-testid={`link-nav-mobile-${item.slug}`}
                  >
                    {item.name}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5Qzk0OTQiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <div className="text-center">
            <Badge variant="secondary" className="mb-6" data-testid="badge-hero">
              <Server className="mr-1.5 h-3.5 w-3.5" />
              Technical Tutorials & Guides
            </Badge>
            
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl" data-testid="text-hero-title">
              Learn to Build
              <span className="block text-gradient mt-1">Infrastructure That Scales</span>
            </h1>
            
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl" data-testid="text-hero-description">
              Deep-dive tutorials on Raspberry Pi clusters, Python automation, Site Reliability Engineering, 
              CI/CD pipelines, and Agile project management. Learn by doing.
            </p>
            
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" data-testid="button-explore">
                Explore Tutorials
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                data-testid="button-github"
                onClick={() => window.open("https://github.com/danbyers1", "_blank")}
              >
                <Github className="mr-2 h-4 w-4" />
                View on GitHub
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 sm:py-20 lg:py-24" id="categories">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" data-testid="text-categories-title">
              Tutorial Categories
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Choose a topic and start learning with hands-on tutorials
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {categoriesLoading
              ? Array.from({ length: 5 }).map((_, i) => <CategorySkeleton key={i} />)
              : categories.map((category) => {
                  const Icon = getCategoryIcon(category.icon);
                  return (
                    <Card
                      key={category.id}
                      className="hover-elevate cursor-pointer transition-transform duration-200"
                      data-testid={`card-category-${category.slug}`}
                    >
                      <CardHeader className="pb-3">
                        <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${getCategoryColor(category)}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                      </CardHeader>
                      <CardContent className="pb-4">
                        <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {category.description}
                        </p>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button variant="ghost" size="sm" className="p-0 h-auto">
                          Browse tutorials
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
          </div>
        </div>
      </section>

      {/* Featured Tutorials Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" data-testid="text-tutorials-title">
                Featured Tutorials
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Start with these popular guides to level up your skills
              </p>
            </div>
            <Button variant="outline" data-testid="button-view-all">
              View all tutorials
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tutorialsLoading
              ? Array.from({ length: 6 }).map((_, i) => <TutorialSkeleton key={i} />)
              : tutorials.map((tutorial) => {
                  const category = getCategoryById(tutorial.categoryId);
                  return (
                    <Card
                      key={tutorial.id}
                      className="overflow-hidden hover-elevate cursor-pointer transition-transform duration-200"
                      data-testid={`card-tutorial-${tutorial.id}`}
                    >
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={tutorial.imageUrl || "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&auto=format&fit=crop&q=60"}
                          alt={tutorial.title}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <Badge
                          variant="secondary"
                          className="absolute top-3 left-3 bg-background/90 backdrop-blur"
                        >
                          {category?.name || "Tutorial"}
                        </Badge>
                      </div>
                      <CardContent className="pt-4">
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                          {tutorial.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {tutorial.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-3">
                          <Badge variant="outline" className={getDifficultyColor(tutorial.difficulty)}>
                            {tutorial.difficulty}
                          </Badge>
                          <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {tutorial.readTime} min read
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">
                <Users className="mr-1.5 h-3.5 w-3.5" />
                About Me
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6" data-testid="text-about-title">
                Hi, I'm Dan Byers
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  I'm passionate about infrastructure, automation, and helping others learn. 
                  With years of experience in Site Reliability Engineering and DevOps, I've built 
                  and maintained systems at scale.
                </p>
                <p>
                  This site is my way of sharing practical, hands-on tutorials that I wish 
                  I had when I was starting out. From building Raspberry Pi clusters in my 
                  home lab to implementing enterprise-grade CI/CD pipelines, I cover it all.
                </p>
                <p>
                  Whether you're a beginner looking to learn Python or an experienced engineer 
                  wanting to level up your SRE skills, you'll find something valuable here.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button 
                  variant="outline" 
                  data-testid="button-contact"
                  onClick={() => window.location.href = "mailto:info@danbyers.io"}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Get in Touch
                </Button>
                <Button 
                  variant="ghost" 
                  data-testid="button-linkedin"
                  onClick={() => window.open("https://linkedin.com", "_blank")}
                >
                  <Linkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                </Button>
                <Button 
                  variant="ghost" 
                  data-testid="button-github-profile"
                  onClick={() => window.open("https://github.com/danbyers1", "_blank")}
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-6">
                  <BarChart3 className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-semibold text-2xl">50+</h3>
                  <p className="text-sm text-muted-foreground">Tutorials Published</p>
                </Card>
                <Card className="p-6">
                  <GitBranch className="h-8 w-8 text-accent mb-3" />
                  <h3 className="font-semibold text-2xl">100+</h3>
                  <p className="text-sm text-muted-foreground">GitHub Repos</p>
                </Card>
                <Card className="p-6">
                  <Cpu className="h-8 w-8 text-rose-500 mb-3" />
                  <h3 className="font-semibold text-2xl">12</h3>
                  <p className="text-sm text-muted-foreground">Pi Nodes in Cluster</p>
                </Card>
                <Card className="p-6">
                  <Gauge className="h-8 w-8 text-amber-500 mb-3" />
                  <h3 className="font-semibold text-2xl">99.9%</h3>
                  <p className="text-sm text-muted-foreground">Uptime Target</p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card className="p-8 sm:p-12 text-center">
            <div className="mx-auto max-w-2xl">
              <Terminal className="mx-auto h-12 w-12 text-primary mb-6" />
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-4" data-testid="text-newsletter-title">
                Stay Updated
              </h2>
              <p className="text-muted-foreground mb-8">
                Get notified when I publish new tutorials on Raspberry Pi, Python, SRE, and more. 
                No spam, just valuable content.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  data-testid="input-email"
                />
                <Button data-testid="button-subscribe">
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">danbyers.io</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Practical tutorials on infrastructure, automation, and engineering best practices.
              </p>
              <div className="flex gap-2">
                <Button 
                  size="icon" 
                  variant="ghost" 
                  data-testid="button-footer-github"
                  onClick={() => window.open("https://github.com/danbyers1", "_blank")}
                >
                  <Github className="h-5 w-5" />
                </Button>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  data-testid="button-footer-linkedin"
                  onClick={() => window.open("https://linkedin.com", "_blank")}
                >
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  data-testid="button-footer-mail"
                  onClick={() => window.location.href = "mailto:info@danbyers.io"}
                >
                  <Mail className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-semibold mb-4">Categories</h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.id}>
                    <a
                      href={`#${category.slug}`}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      data-testid={`link-footer-${category.slug}`}
                    >
                      {category.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    All Tutorials
                  </a>
                </li>
                <li>
                  <a href="https://github.com/danbyers1" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    GitHub Repos
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Tools I Use
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Recommended Reading
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="mailto:info@danbyers.io"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-testid="link-footer-email"
                  >
                    info@danbyers.io
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/danbyers1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    github.com/danbyers1
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-center text-sm text-muted-foreground" data-testid="text-copyright">
              &copy; {new Date().getFullYear()} danbyers.io. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
