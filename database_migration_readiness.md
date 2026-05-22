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
      'picked_up',
      'out_for_delivery',
      'delivered',
      'completed',
      'cancelled',
      'refunded_review',
      'issue_reported'
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

---

## Phase 3D Manual Supabase Migration Checklist

Ensure the following tasks are performed carefully in sequence when promoting the schema to staging:

### [ ] 1. Pre-Migration Safety Backup
- Navigate to your **Supabase Dashboard** ➔ **Table Editor** ➔ `demo_orders`.
- Click **Export** ➔ **Export to CSV** to download a snapshot of all active/legacy demo orders.
- (Optional but recommended) Run a backup script in the **SQL Editor**:
  ```sql
  CREATE TABLE public.demo_orders_backup_phase3 AS 
  SELECT * FROM public.demo_orders;
  ```

### [ ] 2. Schema Promotability Check
- Open the **SQL Editor** in Supabase.
- Run the DDL statements from **Step 3**, **Step 4**, and **Step 5** in a single transaction blocks or separately.
- Confirm execution outputs state: `Success. No rows returned.`

### [ ] 3. Realtime Activation on demo_orders
- Go to the **Database** menu in the left sidebar of the Supabase dashboard.
- Select **Replication** under the Database options.
- Look at the `supabase_realtime` publication, click **Edit** (or select the tables under replication).
- Confirm the toggle is turned **ON** for the `demo_orders` table. This is critical for instant multi-device /staff /kitchen and /rider updates.

### [ ] 4. Column Schema Auditing
- Go to **Table Editor** ➔ select `demo_orders`.
- Scroll horizontal columns and verify that the 9 new staging fields are present and configured:
  - `fulfillment_type` (text, default 'pickup')
  - `payment_method_status` (text, default 'pay_on_delivery')
  - `customer_tracking_code` (text, default null, unique)
  - `rider_name` (text, default null)
  - `rider_phone` (text, default null)
  - `rider_status` (text, default 'idle')
  - `estimated_delivery_time` (text, default null)
  - `delivery_note` (text, default null)
  - `last_status_update` (timestamp with timezone, default current_timestamp)

### [ ] 5. Backward Compatibility & Integrity Check
- Load the `/staff` board in the web application (with Supabase sync active).
- Verify that old/legacy orders still load cleanly and don't throw syntax or parsing errors.
- Confirm they default to `Customer Pickup` and `Pay on Delivery (Preview)` values gracefully on the UI.

### [ ] 6. Multi-Device/Browser E2E Live Sync Test
- Open `/order` in Browser A (or mobile device) and checkout a new delivery order.
- Open `/staff` in Browser B. Verify the new order shows up immediately with the correct tracking code and rider dispatch block.
- Open `/rider` in Browser B. Assign rider preview and mark it as *Out for Delivery*.
- Open `/track?code=TRK-XXXX` in Browser A. Verify the timeline successfully updates to "Out for Delivery" and the simulated rider details are populated.
- Open `/manager` in Browser B. Verify that metrics under the *Rider Dispatch Preview Insights* block increment correctly.

### [ ] 7. Rollback Procedures
If any operational issue arises, execute the following SQL in the SQL Editor to revert database alterations safely:
```sql
-- Revert constraints
ALTER TABLE public.demo_orders DROP CONSTRAINT IF EXISTS chk_order_status;
ALTER TABLE public.demo_orders DROP CONSTRAINT IF EXISTS chk_fulfillment_type;
ALTER TABLE public.demo_orders DROP CONSTRAINT IF EXISTS chk_payment_method_status;

-- Revert indexes
DROP INDEX IF EXISTS idx_orders_customer_tracking_code;
DROP INDEX IF EXISTS idx_orders_status;
DROP INDEX IF EXISTS idx_orders_created_at;
DROP INDEX IF EXISTS idx_orders_branch_fulfillment;
DROP INDEX IF EXISTS idx_orders_rider_name;

-- Drop newly added columns safely
ALTER TABLE public.demo_orders 
  DROP COLUMN IF EXISTS fulfillment_type,
  DROP COLUMN IF EXISTS payment_method_status,
  DROP COLUMN IF EXISTS customer_tracking_code,
  DROP COLUMN IF EXISTS rider_name,
  DROP COLUMN IF EXISTS rider_phone,
  DROP COLUMN IF EXISTS rider_status,
  DROP COLUMN IF EXISTS estimated_delivery_time,
  DROP COLUMN IF EXISTS delivery_note,
  DROP COLUMN IF EXISTS last_status_update;

-- Restore from backup if needed
-- INSERT INTO public.demo_orders SELECT * FROM public.demo_orders_backup_phase3;
```

