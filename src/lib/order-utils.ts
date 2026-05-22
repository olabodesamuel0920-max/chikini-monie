
import { MenuItem } from "./demo-data";
import { isSupabaseConfigured } from "./supabase-client";
import { saveSupabaseOrder, updateSupabaseOrderStatus } from "./supabase-orders";

export interface OrderItem extends MenuItem {
  quantity: number;
}

export type OrderStatus =
  // Legacy keys (for backward compatibility)
  | "Pending" | "Confirmed" | "Preparing" | "Ready" | "Completed" | "Cancelled"
  // Production-staging lifecycle states
  | "order_received"
  | "awaiting_payment"
  | "payment_previewed"
  | "payment_confirmed"
  | "staff_confirmed"
  | "preparing_or_packing"
  | "ready_for_pickup"
  | "assigned_to_rider"
  | "out_for_delivery"
  | "delivered"
  | "completed"
  | "cancelled"
  | "refunded_review";

export type FulfillmentType = "pickup" | "delivery" | "counter_order" | "showcase_order";

export type PaymentMethodStatus =
  | "pay_on_delivery"
  | "bank_transfer_confirmation"
  | "pos_counter"
  | "paystack_test"
  | "paystack_live_future"
  | "whatsapp_payment_confirmation";

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  branch: string;
  items: OrderItem[];
  total: number;
  orderType: "Dine-in" | "Takeaway" | "Delivery";
  paymentStatus: string;
  status: OrderStatus;
  createdAt: string;

  // Staging foundation fields
  fulfillmentType?: FulfillmentType;
  paymentMethodStatus?: PaymentMethodStatus;
  
  // Rider & Order-tracking foundation fields
  riderName?: string;
  riderPhone?: string;
  riderStatus?: string;
  estimatedDeliveryTime?: string;
  deliveryNote?: string;
  customerTrackingCode?: string;
  lastStatusUpdate?: string;
}

const STORAGE_KEY = "chikini_monie_orders";

export const getDemoMode = () => {
  return isSupabaseConfigured ? "Cloud Demo Active" : "Local Demo Mode";
};

// Mapping utilities for staging backward compatibility
export const mapLegacyStatusToGranular = (status: string): OrderStatus => {
  switch (status) {
    case "Pending": return "order_received";
    case "Confirmed": return "staff_confirmed";
    case "Preparing": return "preparing_or_packing";
    case "Ready": return "ready_for_pickup";
    case "Completed": return "completed";
    case "Cancelled": return "cancelled";
    default: return status as OrderStatus;
  }
};

export const mapLegacyTypeToFulfillment = (type: string): FulfillmentType => {
  switch (type) {
    case "Delivery": return "delivery";
    case "Takeaway": return "pickup";
    case "Dine-in": return "pickup";
    default: return "pickup";
  }
};

export const mapLegacyPaymentToMethod = (payment: string): PaymentMethodStatus => {
  if (payment.includes("Delivery")) return "pay_on_delivery";
  if (payment.includes("Transfer")) return "bank_transfer_confirmation";
  if (payment.includes("POS") || payment.includes("Counter")) return "pos_counter";
  if (payment.includes("Online") || payment.includes("Test")) return "paystack_test";
  if (payment.includes("WhatsApp")) return "whatsapp_payment_confirmation";
  return "pay_on_delivery";
};

export const getOrderStatusLabel = (status: OrderStatus): string => {
  switch (status) {
    case "Pending": return "Pending Approval";
    case "Confirmed": return "Confirmed";
    case "Preparing": return "Preparing";
    case "Ready": return "Ready for Pickup";
    case "Completed": return "Completed";
    case "Cancelled": return "Cancelled";
    case "order_received": return "Order Received";
    case "awaiting_payment": return "Awaiting Payment";
    case "payment_previewed": return "Payment Previewed";
    case "payment_confirmed": return "Payment Confirmed";
    case "staff_confirmed": return "Staff Confirmed";
    case "preparing_or_packing": return "Preparing / Packing";
    case "ready_for_pickup": return "Ready for Pickup";
    case "assigned_to_rider": return "Assigned to Rider";
    case "out_for_delivery": return "Out for Delivery";
    case "delivered": return "Delivered";
    case "completed": return "Completed";
    case "refunded_review": return "Refunded Review";
    default: return status;
  }
};

export const isPendingStatus = (status: OrderStatus): boolean => {
  return ["Pending", "order_received", "awaiting_payment", "payment_previewed", "payment_confirmed"].includes(status);
};

export const isConfirmedStatus = (status: OrderStatus): boolean => {
  return ["Confirmed", "staff_confirmed"].includes(status);
};

export const isPreparingStatus = (status: OrderStatus): boolean => {
  return ["Preparing", "preparing_or_packing"].includes(status);
};

export const isReadyStatus = (status: OrderStatus): boolean => {
  return ["Ready", "ready_for_pickup", "assigned_to_rider", "out_for_delivery", "delivered"].includes(status);
};

export const isCompletedStatus = (status: OrderStatus): boolean => {
  return ["Completed", "completed"].includes(status);
};

export const isCancelledStatus = (status: OrderStatus): boolean => {
  return ["Cancelled", "cancelled", "refunded_review"].includes(status);
};

export const getFulfillmentTypeLabel = (type: FulfillmentType): string => {
  switch (type) {
    case "pickup": return "Customer Pickup";
    case "delivery": return "Home Delivery";
    case "counter_order": return "Counter Order";
    case "showcase_order": return "Showcase Order";
    default: return type;
  }
};

export const getPaymentMethodStatusLabel = (status: PaymentMethodStatus): string => {
  switch (status) {
    case "pay_on_delivery": return "Pay on Delivery (Preview)";
    case "bank_transfer_confirmation": return "Bank Transfer Confirmation (Preview)";
    case "pos_counter": return "POS / Counter (Preview)";
    case "paystack_test": return "Paystack Test Mode";
    case "paystack_live_future": return "Future Live Paystack";
    case "whatsapp_payment_confirmation": return "WhatsApp Confirmation (Preview)";
    default: return status;
  }
};

export const enrichOrder = (order: Order): Order => {
  const enriched = { ...order };
  if (!enriched.fulfillmentType) {
    enriched.fulfillmentType = mapLegacyTypeToFulfillment(order.orderType);
  }
  if (!enriched.paymentMethodStatus) {
    enriched.paymentMethodStatus = mapLegacyPaymentToMethod(order.paymentStatus);
  }
  if (!enriched.customerTrackingCode) {
    enriched.customerTrackingCode = `TRK-${order.id.replace("ORD-", "") || Math.floor(Math.random() * 90000) + 10000}`;
  }
  if (!enriched.lastStatusUpdate) {
    enriched.lastStatusUpdate = order.createdAt;
  }
  
  if (enriched.fulfillmentType === "delivery" && !enriched.riderName) {
    enriched.riderName = "Pending Assignment";
    enriched.riderPhone = "Pending Assignment";
    enriched.riderStatus = "idle";
    enriched.estimatedDeliveryTime = "25-35 mins";
    enriched.deliveryNote = enriched.deliveryNote || "Leave at security gate";
  }
  return enriched;
};

export const getOrders = (): Order[] => {
  if (typeof window === "undefined") return [];
  const orders = localStorage.getItem(STORAGE_KEY);
  if (!orders) return [];
  try {
    const parsed = JSON.parse(orders) as Order[];
    return parsed.map(enrichOrder);
  } catch (e) {
    console.error("Error loading cached orders:", e);
    return [];
  }
};

export const saveOrder = async (order: Order) => {
  const enriched = enrichOrder(order);
  const orders = getOrders();
  const newOrders = [enriched, ...orders];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newOrders));

  if (isSupabaseConfigured) {
    try {
      await saveSupabaseOrder(enriched);
    } catch (e) {
      console.error("Supabase save failed, relying on localStorage", e);
    }
  }
};

export const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
  const orders = getOrders();
  const updatedOrders = orders.map((order) =>
    order.id === orderId ? { ...order, status, lastStatusUpdate: new Date().toISOString() } : order
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedOrders));

  if (isSupabaseConfigured) {
    try {
      await updateSupabaseOrderStatus(orderId, status);
    } catch (e) {
      console.error("Supabase update failed, relying on localStorage", e);
    }
  }
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
          availabilityStatus: "available_today",
        },
      ],
      total: 7000,
      orderType: "Delivery",
      paymentStatus: "Pay on Delivery Preview",
      status: "Preparing",
      createdAt: new Date().toISOString(),
      fulfillmentType: "delivery",
      paymentMethodStatus: "pay_on_delivery",
      riderName: "Sola Bakare",
      riderPhone: "08098765432",
      riderStatus: "assigned",
      estimatedDeliveryTime: "20 mins",
      deliveryNote: "Ring doorbell twice upon arrival",
      customerTrackingCode: "TRK-001",
      lastStatusUpdate: new Date().toISOString(),
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
          availabilityStatus: "available_today",
        },
      ],
      total: 2500,
      orderType: "Takeaway",
      paymentStatus: "Bank Transfer Confirmation Preview",
      status: "Ready",
      createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      fulfillmentType: "pickup",
      paymentMethodStatus: "bank_transfer_confirmation",
      customerTrackingCode: "TRK-002",
      lastStatusUpdate: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    },
  ];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleOrders));
};
