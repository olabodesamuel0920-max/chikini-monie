# Supabase Database Migration Guide (Production-Staging Readiness)

> [!CAUTION]
> **CRITICAL PRE-REQUISITE**: Always perform a complete database backup of your `demo_orders` table in your Supabase project dashboard before executing any DDL or schema-altering SQL. These operations must be performed manually within the **Supabase SQL Editor** by an administrator.

This guide provides a step-by-step walkthrough to transition Chikini Monie's database schema from a preview prototype structure into a robust, high-performance production-staging environment. 

These updates support new features such as **granular order statuses**, **fulfillment classes**, **payment preview tracking**, and **rider assignment placeholders** while maintaining complete backward compatibility.

---

## Step 1: Database Backup
Before executing any queries:
1. Navigate to your **Supabase Dashboard**.
2. Select your project and go to **Database** -> **Backups**.
3. Trigger a manual backup snapshot or export the current `demo_orders` table data as a CSV/SQL insert script to prevent any inadvertent data loss during column alterations.

---

## Step 2: Open SQL Editor
1. In the left navigation menu of your Supabase Dashboard, click on **SQL Editor**.
2. Click **New Query** to open a blank SQL query window.
3. Name the query file: `Phase 3B: Upgrade Order Lifecycle Schema`.

---

## Step 3: Execute Schema Additions
Paste and execute the following DDL script to append the 9 new staging lifecycle columns and metadata fields to `demo_orders`:

```sql
-- 1. Upgrade demo_orders with fulfillment and payment metadata fields
ALTER TABLE public.demo_orders 
  ADD COLUMN IF NOT EXISTS fulfillment_type VARCHAR(50) DEFAULT 'pickup',
  ADD COLUMN IF NOT EXISTS payment_method_status VARCHAR(50) DEFAULT 'pay_on_delivery',
  ADD COLUMN IF NOT EXISTS customer_tracking_code VARCHAR(50) UNIQUE DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS rider_name VARCHAR(100) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS rider_phone VARCHAR(50) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS rider_status VARCHAR(50) DEFAULT 'idle',
  ADD COLUMN IF NOT EXISTS estimated_delivery_time VARCHAR(50) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS delivery_note TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS last_status_update TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

-- 2. Add availability status column to the menu items table
-- (Applicable if static menu items are migrated to a Postgres table in production)
ALTER TABLE public.menu_items 
  ADD COLUMN IF NOT EXISTS availability_status VARCHAR(50) DEFAULT 'available_today';
```

---

## Step 4: Add Domain Integrity Check Constraints
Run these domain checks to enforce structured schemas on both counter/showcase orders and online checkouts:

```sql
-- 1. Enforce granular order status lifecycle constraints
ALTER TABLE public.demo_orders 
  DROP CONSTRAINT IF EXISTS chk_order_status,
  ADD CONSTRAINT chk_order_status CHECK (
    status IN (
      'Pending', 'Confirmed', 'Preparing', 'Ready', 'Completed', 'Cancelled', -- Legacy fallback support
      'order_received',
      'awaiting_payment',
      'payment_previewed',
      'payment_confirmed',
      'staff_confirmed',
      'preparing_or_packing',
      'ready_for_pickup',
      'assigned_to_rider',
      'out_for_delivery',
      'delivered',
      'completed',
      'cancelled',
      'refunded_review'
    )
  );

-- 2. Enforce fulfillment type constraints
ALTER TABLE public.demo_orders
  DROP CONSTRAINT IF EXISTS chk_fulfillment_type,
  ADD CONSTRAINT chk_fulfillment_type CHECK (
    fulfillment_type IN ('pickup', 'delivery', 'counter_order', 'showcase_order')
  );

-- 3. Enforce payment method status constraints
ALTER TABLE public.demo_orders
  DROP CONSTRAINT IF EXISTS chk_payment_method_status,
  ADD CONSTRAINT chk_payment_method_status CHECK (
    payment_method_status IN (
      'pay_on_delivery',
      'bank_transfer_confirmation',
      'pos_counter',
      'paystack_test',
      'paystack_live_future',
      'whatsapp_payment_confirmation'
    )
  );

-- 4. Enforce menu item showcase availability status constraints
ALTER TABLE public.menu_items
  DROP CONSTRAINT IF EXISTS chk_availability_status,
  ADD CONSTRAINT chk_availability_status CHECK (
    availability_status IN (
      'available_today',
      'limited',
      'sold_out',
      'preparing_more',
      'not_listed_today'
    )
  );
```

---

## Step 5: Implement High-Performance Safe Indexes
Apply optimized indexes to secure low-latency response times for real-time customer tracking and staff board queries:

```sql
-- 1. Index for rapid public tracking code lookups (extremely vital for /track)
CREATE INDEX IF NOT EXISTS idx_orders_customer_tracking_code 
  ON public.demo_orders (customer_tracking_code);

-- 2. Index for staff dashboard pipeline aggregation and status filtering
CREATE INDEX IF NOT EXISTS idx_orders_status 
  ON public.demo_orders (status);

-- 3. Index for chronological query ordering and dashboard feed analysis
CREATE INDEX IF NOT EXISTS idx_orders_created_at 
  ON public.demo_orders (created_at DESC);

-- 4. Composite index for active branch performance and fulfillment tracking
CREATE INDEX IF NOT EXISTS idx_orders_branch_fulfillment 
  ON public.demo_orders (branch, fulfillment_type);

-- 5. Index for rider dashboard queries (assigned orders)
CREATE INDEX IF NOT EXISTS idx_orders_rider_name 
  ON public.demo_orders (rider_name) 
  WHERE rider_name IS NOT NULL;
```

---

## Step 6: Security & Access Control (Future RLS Policy Foundation)
Enable Row-Level Security (RLS) policies to allow customers tracking code access, while restricting staff/rider changes to authorised sessions:

```sql
-- Enable RLS on the orders table
ALTER TABLE public.demo_orders ENABLE ROW LEVEL SECURITY;

-- Policy A: Public Customer Read-Only Tracking
-- Customers can query details about their own order if they know the unique tracking code
CREATE POLICY "Public tracking code access" 
  ON public.demo_orders
  FOR SELECT 
  TO public
  USING (customer_tracking_code IS NOT NULL);

-- Policy B: Staff/Admin Full Control
-- Staff members authenticated through Supabase Auth can query, update, and manage all orders
CREATE POLICY "Staff dashboard access" 
  ON public.demo_orders
  FOR ALL
  TO authenticated
  USING (
    auth.jwt() ->> 'role' IN ('staff', 'admin') OR
    (auth.jwt() -> 'app_metadata' ->> 'role') IN ('staff', 'admin')
  );

-- Policy C: Rider Read/Update Access
-- Assigned riders can view and update status of orders dispatching to them
CREATE POLICY "Rider dispatch access" 
  ON public.demo_orders
  FOR UPDATE
  TO authenticated
  USING (
    rider_name = auth.jwt() ->> 'email' OR 
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'rider'
  );
```

---

## Step 7: Local Validation & Compatibility
Once executed, the production backend sync matches the local client schema. 
- If you deploy the frontend *before* running these migrations in Supabase, the application's mapper utilities (`mapSupabaseToOrder`/`mapOrderToSupabase` in [`supabase-orders.ts`](file:///c:/Users/USER/Documents/GitHub/chikini-monie/src/lib/supabase-orders.ts)) will safely default to client-side localStorage fallback or default values, preventing system downtime or crash triggers.
- Safe-payment and GPS-tracking modules remain marked under simulation and mock disclaimers, preserving high security.
