export type Product = {
  id: string;
  name: string;
  code: string;
  price: number;
  weight: string;
  contents: string[];
  image: string;
  category: string;
  featuredOrder: number;
};

export const products: Product[] = [
  { id: "vasant-bagh", name: "Vasant Bagh", code: "KHP 0028", price: 180, weight: "850 GM", contents: ["Cashew", "Almond", "Pista", "Fancy Sweet"], image: "/products/vasant-bagh.webp", category: "Dry Fruits & Sweets", featuredOrder: 1 },
  { id: "raj-mahal-darwaza", name: "Raj Mahal Darwaza", code: "KHP 0027", price: 150, weight: "600 GM", contents: ["Cashew", "Almond", "Fancy Sweet"], image: "/products/raj-mahal-darwaza.webp", category: "Dry Fruits & Sweets", featuredOrder: 2 },
  { id: "mor-jodi-box", name: "Mor Jodi Box", code: "KHP 0030", price: 150, weight: "600 GM", contents: ["Cashew", "Almond", "Fancy Sweet"], image: "/products/mor-jodi-box.webp", category: "Dry Fruits & Sweets", featuredOrder: 3 },
  { id: "royal-bloom", name: "Royal Bloom", code: "KHP 0035", price: 150, weight: "640 GM", contents: ["Cashew", "Almond", "Pista", "Raisin", "Fancy Sweet"], image: "/products/royal-bloom.webp", category: "Dry Fruits & Sweets", featuredOrder: 4 },
  { id: "divya-darshan-box", name: "Divya Darshan Box", code: "KHP 0031", price: 145, weight: "400 GM", contents: ["Fancy Sweets"], image: "/products/divya-darshan-box.webp", category: "Sweets", featuredOrder: 5 },
  { id: "tree-of-treats-hamper", name: "Tree of Treats Hamper", code: "KHP 0010", price: 140, weight: "900 GM", contents: ["Cashew", "Almond", "Pista", "Raisin", "Fancy Sweet"], image: "/products/tree-of-treats-hamper.webp", category: "Dry Fruits & Sweets", featuredOrder: 6 },
  { id: "tofha", name: "Tofha", code: "KHP 0014", price: 130, weight: "1200 GM", contents: ["Cashew", "Almond", "Pista", "Raisin", "Namak Para", "Chana Dal", "T-Light Diya"], image: "/products/tofha.webp", category: "Dry Fruits, Snacks & Festive Gifts", featuredOrder: 7 },
  { id: "apno-ke-liye", name: "Apno Ke Liye", code: "KHP 0020", price: 130, weight: "1200 GM", contents: ["Cashew", "Almond", "Pista", "Raisin", "Namak Para", "Chana Dal", "T-Light Diya"], image: "/products/apno-ke-liye.webp", category: "Dry Fruits, Snacks & Festive Gifts", featuredOrder: 8 },
  { id: "royal-heritage-deluxe-box", name: "Royal Heritage Deluxe Box", code: "KHP 0036", price: 125, weight: "350 GM", contents: ["Cashew", "Almond", "Pista", "Raisin", "Fancy Sweet"], image: "/products/royal-heritage-deluxe-box.webp", category: "Dry Fruits & Sweets", featuredOrder: 9 },
  { id: "royal-dry-fruit-box", name: "Royal Dry Fruit Box", code: "KHP 0026", price: 120, weight: "750 GM", contents: ["Cashew", "Almond", "Raisin", "Pista"], image: "/products/royal-dry-fruit-box.webp", category: "Dry Fruits", featuredOrder: 10 },
  { id: "phoolon-ki-chhaon", name: "Phoolon Ki Chhaon", code: "KHP 0012", price: 115, weight: "600 GM", contents: ["Cashew", "Almond", "Fancy Sweet"], image: "/products/phoolon-ki-chhaon.webp", category: "Dry Fruits & Sweets", featuredOrder: 11 },
  { id: "royal-nut-collection", name: "Royal Nut Collection", code: "KHP 0034", price: 115, weight: "600 GM", contents: ["Cashew", "Almond", "Pista"], image: "/products/royal-nut-collection.webp", category: "Dry Fruits", featuredOrder: 12 },
  { id: "nazakat-potli", name: "Nazakat Potli", code: "KHP 0011", price: 105, weight: "600 GM", contents: ["Cashew", "Almond", "Pista"], image: "/products/nazakat-potli.webp", category: "Dry Fruits", featuredOrder: 13 },
  { id: "heritage-nut-box", name: "Heritage Nut Box", code: "KHP 0025", price: 100, weight: "400 GM", contents: ["Cashew", "Almond"], image: "/products/heritage-nut-box.webp", category: "Dry Fruits", featuredOrder: 14 },
  { id: "shubh-trio", name: "Shubh Trio", code: "KHP 0025", price: 90, weight: "300 GM", contents: ["Cashew", "Almond", "Chana Dal"], image: "/products/shubh-trio.webp", category: "Dry Fruits & Snacks", featuredOrder: 15 },
  { id: "the-royal-potli", name: "The Royal Potli", code: "KHP 0017", price: 90, weight: "800 GM", contents: ["Cashew", "Almond", "Pista", "Raisin", "T-Light Diya"], image: "/products/the-royal-potli.webp", category: "Dry Fruits & Festive Gifts", featuredOrder: 16 },
  { id: "utsav-box", name: "Utsav Box", code: "KHP 0022", price: 85, weight: "300 GM", contents: ["Cashew", "Almond", "Pista", "Subh Labh"], image: "/products/utsav-box.webp", category: "Dry Fruits & Festive Gifts", featuredOrder: 17 },
  { id: "shahi-mefhil", name: "Shahi Mefhil", code: "KHP 0033", price: 80, weight: "600 GM", contents: ["Cashew", "Almond", "Pista"], image: "/products/shahi-mefhil.webp", category: "Dry Fruits", featuredOrder: 18 },
  { id: "pichwai-lotus-tray", name: "Pichwai Lotus Tray", code: "KHP 0013", price: 80, weight: "250 GM", contents: ["Mix Nuts", "Pichwai Lotus Tray"], image: "/products/pichwai-lotus-tray.webp", category: "Dry Fruits & Festive Gifts", featuredOrder: 19 },
  { id: "elite-hamper", name: "Elite Hamper", code: "KHP 0008", price: 75, weight: "800 GM", contents: ["Cashew", "Pista", "Raisin", "Almond", "Pichwai Lotus Diya"], image: "/products/elite-hamper.webp", category: "Dry Fruits & Festive Gifts", featuredOrder: 20 },
  { id: "duo-treat", name: "Duo Treat", code: "KHP 0032", price: 60, weight: "400 GM", contents: ["Cashew", "Almond"], image: "/products/duo-treat.webp", category: "Dry Fruits", featuredOrder: 21 },
  { id: "executive-hamper", name: "Executive Hamper", code: "KHP 0007", price: 50, weight: "400 GM", contents: ["Cashew", "Almond", "Lotus Diya"], image: "/products/executive-hamper.webp", category: "Dry Fruits & Festive Gifts", featuredOrder: 22 },
  { id: "mini-nut-delight", name: "Mini Nut Delight", code: "KHP 0005", price: 35, weight: "400 GM", contents: ["Cashew", "Almond"], image: "/products/mini-nut-delight.webp", category: "Dry Fruits", featuredOrder: 23 },
  { id: "festive-crunch", name: "Festive Crunch", code: "KHP 0004", price: 20, weight: "200 GM", contents: ["Mix Dry Fruits"], image: "/products/festive-crunch.webp", category: "Dry Fruits", featuredOrder: 24 },
  { id: "festive-mix-bites", name: "Festive Mix Bites", code: "KHP 0003", price: 20, weight: "200 GM", contents: ["Cashew", "Almonds"], image: "/products/festive-mix-bites.webp", category: "Dry Fruits", featuredOrder: 25 },
  { id: "nuts-pocket", name: "Nuts Pocket", code: "KHP 0002", price: 20, weight: "200 GM", contents: ["Mix Nuts"], image: "/products/nuts-pocket.webp", category: "Dry Fruits", featuredOrder: 26 },
  { id: "golden-nuts-treat", name: "Golden Nuts Treat", code: "KHP 0001", price: 12, weight: "100 GM", contents: ["Mix Nuts"], image: "/products/golden-nuts-treat.webp", category: "Dry Fruits", featuredOrder: 27 },
];
