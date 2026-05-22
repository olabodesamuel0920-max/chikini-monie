
import { Presentation, LayoutDashboard, ChefHat, BarChart3, Cloud, Bike } from "lucide-react";

export const publicLinks = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "Branches", href: "/branches" },
  { name: "Track Order", href: "/track" },
  { name: "About", href: "/about" },
];

export const demoTools = [
  { name: "Demo Command Center", href: "/demo", icon: Presentation },
  { name: "Staff Dashboard", href: "/staff", icon: LayoutDashboard },
  { name: "Kitchen Display", href: "/kitchen", icon: ChefHat },
  { name: "Rider Delivery Preview", href: "/rider", icon: Bike },
  { name: "Manager Analytics", href: "/manager", icon: BarChart3 },
  { name: "Sync Test Center", href: "/sync-test", icon: Cloud },
  { name: "Pitch Deck", href: "/pitch", icon: Presentation },
];
