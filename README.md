
# Khau Galli Festive Hamper Collection

A mobile-first Diwali hamper storefront for Khau Galli UAE. The site presents all 27 catalogue products, supports search, price filters, sorting, product detail views, a persistent multi-item order builder, and pre-filled WhatsApp enquiries.

## Local development

```bash
npm run dev
```

The local preview runs at `http://127.0.0.1:5173` by default.

## Production checks

```bash
npx tsc --noEmit
npm run build
```

Catalogue data lives in `data/products.ts`; optimized product imagery lives in `public/products/`.
