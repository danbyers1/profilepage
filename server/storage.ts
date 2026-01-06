import { type User, type InsertUser, type Category, type InsertCategory, type Tutorial, type InsertTutorial } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  getTutorials(): Promise<Tutorial[]>;
  getTutorialBySlug(slug: string): Promise<Tutorial | undefined>;
  getTutorialsByCategory(categoryId: string): Promise<Tutorial[]>;
  createTutorial(tutorial: InsertTutorial): Promise<Tutorial>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private categories: Map<string, Category>;
  private tutorials: Map<string, Tutorial>;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.tutorials = new Map();
    
    this.seedData();
  }

  private seedData() {
    const categoriesData: InsertCategory[] = [
      {
        name: "Raspberry Pi",
        slug: "raspberry-pi",
        description: "Build clusters, home servers, and IoT projects with Raspberry Pi",
        icon: "Cpu",
      },
      {
        name: "Python",
        slug: "python",
        description: "Learn Python programming from basics to advanced automation",
        icon: "Code2",
      },
      {
        name: "Site Reliability",
        slug: "sre",
        description: "Master SRE practices, monitoring, and infrastructure management",
        icon: "Gauge",
      },
      {
        name: "CI/CD Pipelines",
        slug: "cicd",
        description: "Automate deployments with GitHub Actions, Jenkins, and more",
        icon: "Workflow",
      },
      {
        name: "Agile & DevOps",
        slug: "agile",
        description: "Project management, Scrum, Kanban, and DevOps culture",
        icon: "Users",
      },
      {
        name: "Containers & Docker",
        slug: "containers",
        description: "Master containerization with Docker, Kubernetes, and container orchestration",
        icon: "Container",
      },
    ];

    categoriesData.forEach((cat) => {
      const id = randomUUID();
      this.categories.set(id, { ...cat, id });
    });

    const categoryIds = Array.from(this.categories.values());

    const tutorialsData: Omit<InsertTutorial, "categoryId">[] = [
      {
        title: "Building a Kubernetes Cluster with Raspberry Pi 4",
        slug: "kubernetes-cluster-raspberry-pi-4",
        description: "Learn how to set up a fully functional K3s Kubernetes cluster using multiple Raspberry Pi 4 boards for home lab experimentation.",
        content: "Full tutorial content here...",
        readTime: 25,
        difficulty: "Intermediate",
        imageUrl: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&auto=format&fit=crop&q=60",
      },
      {
        title: "Python Automation Scripts for DevOps",
        slug: "python-automation-scripts-devops",
        description: "Create powerful automation scripts using Python to streamline your DevOps workflows and reduce manual tasks.",
        content: "Full tutorial content here...",
        readTime: 18,
        difficulty: "Beginner",
        imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60",
      },
      {
        title: "Setting Up Prometheus and Grafana for Monitoring",
        slug: "prometheus-grafana-monitoring",
        description: "Implement comprehensive monitoring for your infrastructure using Prometheus metrics and Grafana dashboards.",
        content: "Full tutorial content here...",
        readTime: 30,
        difficulty: "Intermediate",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
      },
      {
        title: "GitHub Actions: Complete CI/CD Pipeline Tutorial",
        slug: "github-actions-cicd-pipeline",
        description: "Build end-to-end CI/CD pipelines with GitHub Actions including testing, building, and deploying applications.",
        content: "Full tutorial content here...",
        readTime: 22,
        difficulty: "Beginner",
        imageUrl: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&auto=format&fit=crop&q=60",
      },
      {
        title: "Implementing Scrum in Your Engineering Team",
        slug: "implementing-scrum-engineering-team",
        description: "A practical guide to adopting Scrum methodology with sprint planning, daily standups, and retrospectives.",
        content: "Full tutorial content here...",
        readTime: 15,
        difficulty: "Beginner",
        imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=60",
      },
      {
        title: "Pi Cluster: Distributed Computing at Home",
        slug: "pi-cluster-distributed-computing",
        description: "Connect multiple Raspberry Pi units to create a powerful distributed computing cluster for parallel processing.",
        content: "Full tutorial content here...",
        readTime: 35,
        difficulty: "Advanced",
        imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=60",
      },
      {
        title: "Docker Fundamentals: From Zero to Container Hero",
        slug: "docker-fundamentals-container-hero",
        description: "Learn Docker from scratch including images, containers, volumes, networks, and Docker Compose for multi-container applications.",
        content: "Full tutorial content here...",
        readTime: 28,
        difficulty: "Beginner",
        imageUrl: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&auto=format&fit=crop&q=60",
      },
    ];

    const categoryMapping = ["raspberry-pi", "python", "sre", "cicd", "agile", "raspberry-pi", "containers"];
    
    tutorialsData.forEach((tutorial, index) => {
      const id = randomUUID();
      const category = categoryIds.find(c => c.slug === categoryMapping[index]);
      if (category) {
        this.tutorials.set(id, { ...tutorial, id, categoryId: category.id });
      }
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find((cat) => cat.slug === slug);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = randomUUID();
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }

  async getTutorials(): Promise<Tutorial[]> {
    return Array.from(this.tutorials.values());
  }

  async getTutorialBySlug(slug: string): Promise<Tutorial | undefined> {
    return Array.from(this.tutorials.values()).find((t) => t.slug === slug);
  }

  async getTutorialsByCategory(categoryId: string): Promise<Tutorial[]> {
    return Array.from(this.tutorials.values()).filter(
      (t) => t.categoryId === categoryId,
    );
  }

  async createTutorial(insertTutorial: InsertTutorial): Promise<Tutorial> {
    const id = randomUUID();
    const tutorial: Tutorial = { ...insertTutorial, id };
    this.tutorials.set(id, tutorial);
    return tutorial;
  }
}

export const storage = new MemStorage();
