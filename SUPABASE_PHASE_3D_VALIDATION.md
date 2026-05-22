# Supabase Schema Activation & Sync Validation (Phase 3D)

This technical document details the activation, validation, and design parameters of the PostgreSQL schema migration for **Phase 3D: Supabase Schema Activation + Cloud Sync Validation** in Chikini Monie.

---

## 1. Scope of Phase 3D

Phase 3D activates and verifies the staging database schema. It bridges the local client-side state machine (from Phase 3C) and the remote Supabase real-time cluster. Once the schema migration is applied, all granular order states, fulfillment types, staging tracking codes, and rider parameters sync in real-time across multiple devices (e.g., staff, kitchen, customer tracker, and rider dashboards).

---

## 2. Required Supabase Database Columns

The `demo_orders` table requires the following 9 staging columns:

| Column Name | Database Type | Default Value | Purpose |
| :--- | :--- | :--- | :--- |
| `fulfillment_type` | `VARCHAR(50)` | `'pickup'` | fulfillment classes (`pickup`, `delivery`, `counter_order`, `showcase_order`) |
| `payment_method_status` | `VARCHAR(50)` | `'pay_on_delivery'` | payment previews (`pay_on_delivery`, `bank_transfer_confirmation`, etc.) |
| `customer_tracking_code`| `VARCHAR(50)` | `NULL` (Unique) | Unique customer tracking identifier (`TRK-XXXX`) |
| `rider_name` | `VARCHAR(100)`| `NULL` | Assigned simulated dispatch rider name |
| `rider_phone` | `VARCHAR(50)` | `NULL` | Assigned simulated dispatch rider contact |
| `rider_status` | `VARCHAR(50)` | `'idle'` | Rider simulation status state |
| `estimated_delivery_time`| `VARCHAR(50)`| `NULL` | Estimated delivery time interval |
| `delivery_note` | `TEXT` | `NULL` | Custom delivery notes and dispatch warning logs |
| `last_status_update` | `TIMESTAMP` | `CURRENT_TIMESTAMP`| Audit timestamp for tracking timeline |

---

## 3. Real-Time Sync E2E Test Workflow

To validate cross-device real-time synchronizations:
1. **Submit Order:** Open `/order` on Browser A (representing a customer). Complete a delivery order. Note the tracking code (`TRK-XXXX`).
2. **Staff Dispatch Verification:** Open `/staff` on Browser B (representing a shop staff). The order should appear immediately via PostgreSQL Realtime channels.
3. **Logistics Assignment:** Open `/rider` on Browser B (representing a logistics operator). Select the order, enter rider parameters, and click **Save & Assign Preview**.
4. **Logistics Progress:** Progress the status from `/rider` (*Mark Picked Up* ➔ *Mark Out for Delivery*).
5. **Timeline Update:** Open `/track?code=TRK-XXXX` on Browser A. Observe that the customer status timeline and rider metrics update instantly without requiring a page refresh.
6. **Metrics Audit:** Open `/manager` on Browser B. Confirm logistics numbers under *Rider Dispatch Preview Insights* successfully increment.
7. **Kitchen Prep Segregation:** Open `/kitchen` on Browser B. Verify that the order ticket disappears from the kitchen board immediately upon reaching `ready_for_pickup` or subsequent active logistics stages.

---

## 4. Defensive Staging Design & Fallback Metrics

- **localStorage Coexistence:** Staging transactions are recorded simultaneously in local storage (`chikini_monie_orders`) and Supabase.
- **Fail-Safe Try-Catch wrappers:** Database operations mapping staging fields are wrapped in robust client-side `try-catch` mappers in [`order-utils.ts`](file:///c:/Users/USER/Documents/GitHub/chikini-monie/src/lib/order-utils.ts). If columns are missing in production or client keys are unconfigured, the app logs a console error and continues operating cleanly via `localStorage`, guaranteeing zero downtime.
- **No live API claims:** Safe payment simulation remains isolated under mock sandboxes. Real Paystack production modules, live SMS channels, and active rider GPS tracking are fully disabled.

---

## 5. Staging Constraints and Limitations

> [!WARNING]
> This schema is verified for **Production-Staging** architecture. Do NOT use live Paystack payment keys, require real rider GPS tracking coordinates, or remove preview disclaimers. Enable Supabase Auth policies and full RLS safeguards before transitioning to public production operations.
