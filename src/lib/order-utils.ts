
import { MenuItem } from "./demo-data";

export interface OrderItem extends MenuItem {
  quantity: number;
}

export type OrderStatus = "Pending" | "Confirmed" | "Preparing" | "Ready" | "Completed" | "Cancelled";

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  branch: string;
  items: OrderItem[];
  total: number;
  orderType: "Dine-in" | "Takeaway" | "Delivery";
  paymentStatus: "Pay on pickup/delivery" | "Transfer pending";
  status: OrderStatus;
  createdAt: string;
}

const STORAGE_KEY = "chikini_monie_orders";

export const getOrders = (): Order[] => {
  if (typeof window === "undefined") return [];
  const orders = localStorage.getItem(STORAGE_KEY);
  return orders ? JSON.parse(orders) : [];
};

export const saveOrder = (order: Order) => {
  const orders = getOrders();
  const newOrders = [order, ...orders];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newOrders));
};

export const updateOrderStatus = (orderId: string, status: OrderStatus) => {
  const orders = getOrders();
  const updatedOrders = orders.map((order) =>
    order.id === orderId ? { ...order, status } : order
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedOrders));
};

export const resetOrders = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const loadSampleOrders = () => {
  const sampleOrders: Order[] = [
    {
      id: "ORD-001",
      customerName: "John Doe",
      phone: "08012345678",
      branch: "FUTA South Gate",
      items: [
        {
          id: "r1",
          name: "Jollof Rice & Grilled Chicken",
          description: "Smoky party jollof served with spicy grilled chicken and coleslaw.",
          price: 3500,
          category: "Rice Meals",
          image: "https://images.unsplash.com/photo-1594998893017-36147cbcae05?auto=format&fit=crop&q=80&w=800",
          quantity: 2,
        },
      ],
      total: 7000,
      orderType: "Delivery",
      paymentStatus: "Pay on pickup/delivery",
      status: "Preparing",
      createdAt: new Date().toISOString(),
    },
    {
      id: "ORD-002",
      customerName: "Jane Smith",
      phone: "08123456789",
      branch: "Agape Junction",
      items: [
        {
          id: "sh1",
          name: "Classic Chicken Shawarma",
          description: "Double wrap shawarma with spicy chicken, cabbage, and special cream.",
          price: 2500,
          category: "Shawarma",
          image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&q=80&w=800",
          quantity: 1,
        },
      ],
      total: 2500,
      orderType: "Takeaway",
      paymentStatus: "Transfer pending",
      status: "Ready",
      createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    },
  ];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleOrders));
};
