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
