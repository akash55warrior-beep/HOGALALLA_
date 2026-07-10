# HOGALALLA — Storefront

A plain HTML/CSS/JS site — **no build step, no framework**, so it deploys to Vercel with zero configuration (this is what fixes the "vite: command not found" error you were hitting).

## Deploying to Vercel
1. Push this whole folder to a GitHub repo.
2. In Vercel: **New Project → Import your repo**.
3. Framework Preset: choose **"Other"** (correct this time, since there's genuinely no build step).
4. Leave Build Command / Output Directory **blank** — Vercel will serve the files as-is.
5. Deploy. That's it — no `npm install`, no `vite build`, nothing to fail.

## What's real vs. what's a placeholder
Everything you see — pages, cart, checkout form, login screens — is fully working in the browser using `localStorage`. But three things are currently **mocked** and need real integration before you can actually take live orders:

| Feature | Currently | To make it real |
|---|---|---|
| Login (Google / phone OTP) | Fake login, stored in browser | Connect [Supabase Auth](https://supabase.com) — `signInWithOAuth({provider:'google'})` and `signInWithOtp({phone})`. See comments in `login.html`. |
| Payment | Order is marked "paid" instantly, no real charge | Connect [Razorpay Checkout](https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/). See comments in `checkout.html`. |
| Sending the order to Printify | Order is just saved in the browser | After payment succeeds, call a server-side function (e.g. a Supabase Edge Function) that does `POST /shops/{shop_id}/orders.json` to the Printify API with the address + line items. **Never put your Printify API key in this frontend code** — it must live server-side only. See comments in `checkout.html`. |

## Adding products the easy way (admin.html)
Go to `yoursite.com/admin.html`. It's password-protected — default password is `hogalalla2026`, **change this** by opening `app.js` and editing the `ADMIN_PASSWORD` value near the bottom.

Fill in the form (name, category, price, sizes, upload a photo) and click **Add Product** — no code editing needed.

## Connecting a real shared database (Supabase) — makes products & reviews visible to everyone
Without this, anything added via `admin.html` only shows up in your own browser. Here's the one-time setup:

1. Create a free account at [supabase.com](https://supabase.com) and make a new project.
2. Go to **SQL Editor → New Query**, paste in the contents of `supabase-setup.sql` (included in this folder), and run it. This creates the `products` and `reviews` tables.
3. Go to **Storage → New Bucket**, name it exactly `product-images`, and toggle **Public bucket ON**.
4. Go to **Project Settings → API** and copy your **Project URL** and **anon public key**.
5. Go to `yoursite.com/admin.html` → **API & Database tab** → paste both in → **Save & Reconnect**.

That's it — from then on, every product you add (and every review a customer leaves) is stored in Supabase and visible to all visitors, on any device.

## Reviews
Once Supabase is connected, every product page shows a 5-star rating summary and lets customers leave their own rating + comment — no extra setup needed beyond the database connection above.

## The Printify API key section
There's also a **Printify API Key** field in `admin.html → API & Database`. This is saved **only in your own browser** (never in the shared database) — on purpose. An API key that any visitor's browser could read is a key that could be stolen and used to place free orders under your account. Real order-forwarding to Printify needs a small server-side function (e.g. a Supabase Edge Function) that uses this key privately — this field is just a convenient place to keep it until that piece is built. Ask for help setting that up when you're ready to take live orders.

## Product catalog
`data.js` has 12 sample products with generated placeholder mockups. Replace this with a real fetch from `GET /shops/{shop_id}/products.json` (Printify) once you're ready — ideally cached in a database rather than called live on every page load.

## File structure
```
index.html              Homepage
shop.html                Category listing (?cat=anime / tees / hoodies / sweatshirts / accessories)
product.html              Product detail (?id=p1)
cart.html                Cart
checkout.html              Address + payment
order-confirmation.html      Order success page
login.html                Google + phone OTP login UI
account.html              Profile, order history, saved address
about.html / contact.html      Static pages
data.js                  Product catalog
app.js                  Cart, auth, address, toast logic (localStorage-based for now)
style.css                Design system — sky blue (#38BDF8) + black theme
```
