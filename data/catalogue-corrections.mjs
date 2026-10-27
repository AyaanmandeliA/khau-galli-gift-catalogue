// Revised supplier sheet with user-protected Blue products; raw supplier values remain separate.
export default {
  "sourceFile": "Hamper Pos Price & Delivery Price 2026  UP Date 27oct -26 Latest Sheet (1).xlsx",
  "date": "2026-10-28",
  "publication": "Publish revised final sheet per user instruction, preserving both protected Blue products.",
  "pricePolicy": "Exact last explicitly labelled POS price/final; never delivery or cost subtotal.",
  "overrides": {
    "vasant-bagh": {
      "image": "/products/gallery/vasant-bagh-open-box-review-20261025.png"
    },
    "blue-bloom": {
      "price": 140
    },
    "royal-bloom": {
      "price": 180
    }
  },
  "approvedPriceOverrides": {
    "date": "2026-10-27",
    "authority": "Explicit user instruction with screenshots: Blue Bloom 140; Blue Royal 180 dirhams.",
    "scope": "Blue Bloom (blue-bloom, KHP 0038) and Blue Royale Gift Hamper Box (royal-bloom, KHP 0035). The separately named KHP 0038 supplier entry retains its sheet price."
  },
  "frozenProducts": {
    "royal-bloom": {
      "id": "royal-bloom",
      "name": "Blue Royale Gift Hamper Box",
      "code": "KHP 0035",
      "price": 180,
      "weight": "640 GM",
      "contents": [
        "Cashew — 130 g",
        "Almond — 130 g",
        "Salted Pista — 100 g",
        "Raisin — 130 g",
        "Fancy Sweet — 150 g"
      ],
      "image": "/products/gallery/royal-bloom-02.jpg",
      "images": [
        "/products/gallery/royal-bloom-02.jpg"
      ],
      "kind": "hamper",
      "category": "gift-hampers",
      "cataloguePage": 6
    },
    "blue-bloom": {
      "id": "blue-bloom",
      "name": "Blue Bloom",
      "code": "KHP 0038",
      "price": 140,
      "weight": "1000 GM",
      "contents": [
        "Cashew — 200 g",
        "Almond — 200 g",
        "Salted Pista — 200 g",
        "Raisin — 200 g",
        "Fancy Sweet — 200 g"
      ],
      "image": "/products/gallery/blue-bloom-02.jpg",
      "images": [
        "/products/gallery/blue-bloom-02.jpg",
        "/products/gallery/blue-bloom-03.jpg",
        "/products/gallery/blue-bloom-04.jpg"
      ],
      "kind": "hamper",
      "category": "gift-hampers",
      "cataloguePage": 33,
      "catalogueNote": "Images for illustration"
    }
  },
  "frozenProductsAuthority": "28 October explicit user instruction: do not change either Blue product; confirmed prices remain AED 140 and AED 180."
};
