
export type Category = 
  | "Rice Meals"
  | "Swallow & Soups"
  | "Shawarma"
  | "Breakfast"
  | "Pastries"
  | "Smoothies & Milkshakes"
  | "Coffee & Drinks"
  | "Combos";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  popular?: boolean;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  status: string;
  phone: string;
  is247: boolean;
}

export const categories: Category[] = [
  "Rice Meals",
  "Swallow & Soups",
  "Shawarma",
  "Breakfast",
  "Pastries",
  "Smoothies & Milkshakes",
  "Coffee & Drinks",
  "Combos",
];

export const menuItems: MenuItem[] = [
  {
    id: "r1",
    name: "Jollof Rice & Grilled Chicken",
    description: "Smoky party jollof served with spicy grilled chicken and coleslaw.",
    price: 3500,
    category: "Rice Meals",
    image: "https://images.unsplash.com/photo-1594998893017-36147cbcae05?auto=format&fit=crop&q=80&w=800",
    popular: true,
  },
  {
    id: "r2",
    name: "Special Fried Rice",
    description: "Stir-fry rice with veggies, eggs, and shredded beef.",
    price: 3800,
    category: "Rice Meals",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "s1",
    name: "Pounded Yam & Egusi Soup",
    description: "Smooth pounded yam served with rich egusi soup and assorted meat.",
    price: 4500,
    category: "Swallow & Soups",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800",
    popular: true,
  },
  {
    id: "sh1",
    name: "Classic Chicken Shawarma",
    description: "Double wrap shawarma with spicy chicken, cabbage, and special cream.",
    price: 2500,
    category: "Shawarma",
    image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&q=80&w=800",
    popular: true,
  },
  {
    id: "b1",
    name: "Chikini Breakfast Platter",
    description: "Toast bread, fried eggs, sausages, and baked beans.",
    price: 3000,
    category: "Breakfast",
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "p1",
    name: "Golden Meat Pie",
    description: "Flaky crust with rich minced meat filling.",
    price: 800,
    category: "Pastries",
    image: "https://images.unsplash.com/photo-1601205741712-b261aff33a7d?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "sm1",
    name: "Creamy Strawberry Shake",
    description: "Thick and creamy strawberry goodness.",
    price: 2200,
    category: "Smoothies & Milkshakes",
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28be0?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "c1",
    name: "Iced Caramel Macchiato",
    description: "Premium coffee with sweet caramel and cold milk.",
    price: 1800,
    category: "Coffee & Drinks",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "combo1",
    name: "Student Mega Combo",
    description: "Jollof rice, chicken, and a soft drink.",
    price: 4500,
    category: "Combos",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800",
    popular: true,
  },
];

export const branches: Branch[] = [
  {
    id: "futa-south",
    name: "FUTA South Gate",
    address: "Opposite FUTA South Gate, Akure",
    status: "24/7 Service",
    phone: "Phone pending management confirmation",
    is247: true,
  },
  {
    id: "agape-junction",
    name: "Agape Junction",
    address: "Agape Junction, Akure",
    status: "24/7 Service",
    phone: "Phone pending management confirmation",
    is247: true,
  },
  {
    id: "future-branch",
    name: "Branch 3 (Coming Soon)",
    address: "Details pending confirmation",
    status: "Opening Soon",
    phone: "Phone pending management confirmation",
    is247: false,
  },
];

export const testimonials = [
  {
    name: "Tobi Adeyemi",
    role: "FUTA Student",
    content: "The best jollof rice in Akure. Fast delivery even at 2 AM!",
  },
  {
    name: "Sarah Johnson",
    role: "Digital Marketer",
    content: "Chikini Monie is my go-to for healthy swallow and soups. Premium quality!",
  },
  {
    name: "David Okafor",
    role: "Tech Lead",
    content: "The digital management suite looks impressive. It's exactly the digital engine a growing restaurant needs.",
  },
];
