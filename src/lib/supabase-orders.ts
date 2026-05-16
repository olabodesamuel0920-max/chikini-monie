
import { supabase, isSupabaseConfigured } from './supabase-client';
import { Order } from './order-utils';

export const fetchSupabaseOrders = async (): Promise<Order[]> => {
  if (!isSupabaseConfigured) return [];

  const { data, error } = await supabase
    .from('demo_orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching Supabase orders:', error);
    return [];
  }

  return (data || []).map(mapSupabaseToOrder);
};

export const saveSupabaseOrder = async (order: Order): Promise<boolean> => {
  if (!isSupabaseConfigured) return false;

  const { error } = await supabase
    .from('demo_orders')
    .insert([mapOrderToSupabase(order)]);

  if (error) {
    console.error('Error saving order to Supabase:', error);
    return false;
  }

  return true;
};

export const updateSupabaseOrderStatus = async (orderId: string, status: string): Promise<boolean> => {
  if (!isSupabaseConfigured) return false;

  // Since our Order ID might be ORD-123 but Supabase uses UUID, 
  // we either search by order_code or we ensure IDs match.
  // In the demo, we'll use order_code to identify the row.
  
  const { error } = await supabase
    .from('demo_orders')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('order_code', orderId);

  if (error) {
    console.error('Error updating Supabase order status:', error);
    return false;
  }

  return true;
};

// Mappers
const mapOrderToSupabase = (order: Order) => ({
  order_code: order.id,
  customer_name: order.customerName,
  customer_phone: order.phone,
  branch: order.branch,
  order_type: order.orderType,
  payment_status: order.paymentStatus,
  status: order.status,
  items: order.items,
  total: order.total,
  created_at: order.createdAt
});

export const mapSupabaseToOrder = (row: any): Order => ({
  id: row.order_code,
  customerName: row.customer_name,
  phone: row.customer_phone,
  branch: row.branch,
  orderType: row.order_type as any,
  paymentStatus: row.payment_status as any,
  status: row.status as any,
  items: row.items,
  total: Number(row.total),
  createdAt: row.created_at
});
