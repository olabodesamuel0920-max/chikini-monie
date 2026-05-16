
# Supabase Setup for Chikini Monie Cloud Sync

This document outlines the steps to enable real-time cloud synchronization for the Chikini Monie Digital Hub prototype.

## 1. Environment Variables
Add the following to your `.env.local` or Vercel environment variables:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 2. SQL Schema
Run the following SQL in your Supabase SQL Editor to create the demo orders table:

```sql
-- Create the demo_orders table
CREATE TABLE IF NOT EXISTS demo_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_code text NOT NULL,
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  branch text NOT NULL,
  order_type text NOT NULL,
  payment_status text NOT NULL,
  status text NOT NULL DEFAULT 'Pending',
  items jsonb NOT NULL,
  total numeric NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Realtime for this table
ALTER PUBLICATION supabase_realtime ADD TABLE demo_orders;

-- Set up Row Level Security (RLS)
-- NOTE: For this Business Review Prototype, we are enabling open access.
-- WARNING: In a production environment, RLS must be restricted to authenticated staff/managers.

ALTER TABLE demo_orders ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read orders (for demo purposes)
CREATE POLICY "Allow public read for demo" ON demo_orders
FOR SELECT USING (true);

-- Allow anyone to insert orders (for demo purposes)
CREATE POLICY "Allow public insert for demo" ON demo_orders
FOR INSERT WITH CHECK (true);

-- Allow anyone to update orders (for demo purposes)
CREATE POLICY "Allow public update for demo" ON demo_orders
FOR UPDATE USING (true);
```

## 3. Realtime Configuration
1. Go to the **Database** tab in Supabase.
2. Select **Replication**.
3. Ensure the `supabase_realtime` publication has `demo_orders` enabled.

## 4. Verification
Once configured, the platform will automatically switch from "Local Demo Mode" to "Cloud Demo Active". Orders placed on one device will appear instantly on all others.

---
*Disclaimer: This setup is for presentation and review purposes only. Official production security and data handling must be implemented before live operations.*
