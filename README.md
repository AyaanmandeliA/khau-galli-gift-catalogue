# Khau Galli Gift Catalogue

A seasonal gift catalogue with an enquiry basket for Khau Galli, an Indian street food and sweets business in the UAE. It was built for the 2026 Diwali hamper collection.

Live: https://catalog.thekhaugalli.com

## How it works

Visitors browse hampers, mithai boxes and festive add-ons, with search, filters, sorting and a detail view with a photo gallery for each product. An always-visible basket lets them set quantities for several products at once, and the basket is remembered in the browser's local storage. When they are ready, they enter their details and the site opens WhatsApp with a pre-filled enquiry listing the chosen items and an indicative total. There is no checkout, payment, login or database; enquiries are sent by the customer through WhatsApp. The catalogue is a typed data file (`data/products.ts`), and a verification script (`scripts/verify-catalogue.mjs`) checks it against a snapshot of the supplier price sheet before every production build.

## Stack

- Next.js 16 on the vinext runtime, deployed to Cloudflare Workers
- React 19 and TypeScript
- Tailwind CSS 4 with shadcn-style components built on Base UI
- Drizzle ORM scaffolding (present in the starter, no database is used)

## Run it

Requires Node.js 22.13 or newer.

```sh
npm run install:ci
npm run dev
npm run build
```

## Authorship

I set the requirements and check the results. AI tools write most of the code.

## Status

Live; the 2026 Diwali collection has been published.
