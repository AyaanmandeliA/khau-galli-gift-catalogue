
export type CatalogueItemKind = "hamper" | "mithai" | "add-on";

export type CatalogueItem = {
  id: string;
  name: string;
  code: string | null;
  price: number | null;
  weight: string | null;
  contents: string[];
  image: string;
  kind: CatalogueItemKind;
  cataloguePage: number;
  catalogueNote?: string;
};

export type BudgetRangeId = "under-50" | "50-99" | "100-149" | "150-plus";

export const budgetRanges: Array<{ id: BudgetRangeId; label: string; shortLabel: string }> = [
  { id: "under-50", label: "Under AED 50", shortLabel: "Under 50" },
  { id: "50-99", label: "AED 50 to 99", shortLabel: "50-99" },
  { id: "100-149", label: "AED 100 to 149", shortLabel: "100-149" },
  { id: "150-plus", label: "AED 150+", shortLabel: "150+" },
];

export const catalogueItems: CatalogueItem[] = [
  { id: "royal-ganesha", name: "Royal Ganesha", code: "KHP 0031", price: 210, weight: "800 GM", contents: ["Fancy Sweet"], image: "/products/royal-ganesha.webp", kind: "hamper", cataloguePage: 2 },
  { id: "vasant-bagh", name: "Vasant Bagh", code: "KHP 0028", price: 180, weight: "850 GM", contents: ["Cashew", "Almond", "Pista", "Fancy Sweet"], image: "/products/vasant-bagh.webp", kind: "hamper", cataloguePage: 3 },
  { id: "raj-mahal-darwaza", name: "Raj Mahal Darwaza", code: "KHP 0027", price: 150, weight: "600 GM", contents: ["Cashew", "Almond", "Fancy Sweet"], image: "/products/raj-mahal-darwaza.webp", kind: "hamper", cataloguePage: 4 },
  { id: "mor-jodi-box", name: "Mor Jodi Box", code: "KHP 0030", price: 150, weight: "600 GM", contents: ["Cashew", "Almond", "Fancy Sweet"], image: "/products/mor-jodi-box.webp", kind: "hamper", cataloguePage: 5 },
  { id: "royal-bloom", name: "Royal Bloom", code: "KHP 0035", price: 150, weight: "640 GM", contents: ["Cashew", "Almond", "Pista", "Raisin", "Fancy Sweet"], image: "/products/royal-bloom.webp", kind: "hamper", cataloguePage: 6 },
  { id: "divya-darshan-box", name: "Divya Darshan Box", code: "KHP 0031", price: 145, weight: "400 GM", contents: ["Fancy Sweets"], image: "/products/divya-darshan-box.webp", kind: "hamper", cataloguePage: 7 },
  { id: "tree-of-treats-hamper", name: "Tree of Treats Hamper", code: "KHP 0010", price: 140, weight: "900 GM", contents: ["Cashew", "Almond", "Pista", "Raisin", "Fancy Sweet"], image: "/products/tree-of-treats-hamper.webp", kind: "hamper", cataloguePage: 8 },
  { id: "tofha", name: "Tofha", code: "KHP 0014", price: 130, weight: "1200 GM", contents: ["Cashew", "Almond", "Pista", "Raisin", "Namak Para", "Chana Dal", "T-Light Diya"], image: "/products/tofha.webp", kind: "hamper", cataloguePage: 9 },
  { id: "apno-ke-liye", name: "Apno Ke Liye", code: "KHP 0020", price: 130, weight: "1200 GM", contents: ["Cashew", "Almond", "Pista", "Raisin", "Namak Para", "Chana Dal", "T-Light Diya"], image: "/products/apno-ke-liye.webp", kind: "hamper", cataloguePage: 10 },
  { id: "royal-heritage-deluxe-box", name: "Royal Heritage Deluxe Box", code: "KHP 0036", price: 125, weight: "350 GM", contents: ["Cashew", "Almond", "Pista", "Raisin", "Fancy Sweet"], image: "/products/royal-heritage-deluxe-box.webp", kind: "hamper", cataloguePage: 11 },
  { id: "royal-dry-fruit-box", name: "Royal Dry Fruit Box", code: "KHP 0026", price: 120, weight: "750 GM", contents: ["Cashew", "Almond", "Raisin", "Pista"], image: "/products/royal-dry-fruit-box.webp", kind: "hamper", cataloguePage: 12 },
  { id: "phoolon-ki-chhaon", name: "Phoolon Ki Chhaon", code: "KHP 0012", price: 115, weight: "600 GM", contents: ["Cashew", "Almond", "Fancy Sweet"], image: "/products/phoolon-ki-chhaon.webp", kind: "hamper", cataloguePage: 13 },
  { id: "royal-nut-collection", name: "Royal Nut Collection", code: "KHP 0034", price: 115, weight: "600 GM", contents: ["Cashew", "Almond", "Pista"], image: "/products/royal-nut-collection.webp", kind: "hamper", cataloguePage: 14 },
  { id: "nazakat-potli", name: "Nazakat Potli", code: "KHP 0011", price: 105, weight: "600 GM", contents: ["Cashew", "Almond", "Pista"], image: "/products/nazakat-potli.webp", kind: "hamper", cataloguePage: 15 },
  { id: "heritage-nut-box", name: "Heritage Nut Box", code: "KHP 0025", price: 100, weight: "400 GM", contents: ["Cashew", "Almond"], image: "/products/heritage-nut-box.webp", kind: "hamper", cataloguePage: 16 },
  { id: "shubh-trio", name: "Shubh Trio", code: "KHP 0025", price: 90, weight: "300 GM", contents: ["Cashew", "Almond", "Chana Dal"], image: "/products/shubh-trio.webp", kind: "hamper", cataloguePage: 17 },
  { id: "the-royal-potli", name: "The Royal Potli", code: "KHP 0017", price: 90, weight: "800 GM", contents: ["Cashew", "Almond", "Pista", "Raisin", "T-Light Diya"], image: "/products/the-royal-potli.webp", kind: "hamper", cataloguePage: 18 },
  { id: "utsav-box", name: "Utsav Box", code: "KHP 0022", price: 85, weight: "300 GM", contents: ["Cashew", "Almond", "Pista", "Subh Labh"], image: "/products/utsav-box.webp", kind: "hamper", cataloguePage: 19 },
  { id: "shahi-mefhil", name: "Shahi Mefhil", code: "KHP 0033", price: 80, weight: "600 GM", contents: ["Cashew", "Almond", "Pista"], image: "/products/shahi-mefhil.webp", kind: "hamper", cataloguePage: 20 },
  { id: "pichwai-lotus-tray", name: "Pichwai Lotus Tray", code: "KHP 0013", price: 80, weight: "250 GM", contents: ["Mix Nuts", "Pichwai Lotus Tray"], image: "/products/pichwai-lotus-tray.webp", kind: "hamper", cataloguePage: 21 },
  { id: "elite-hamper", name: "Elite Hamper", code: "KHP 0008", price: 75, weight: "800 GM", contents: ["Cashew", "Pista", "Raisin", "Almond", "Pichwai Lotus Diya"], image: "/products/elite-hamper.webp", kind: "hamper", cataloguePage: 22 },
  { id: "duo-treat", name: "Duo Treat", code: "KHP 0032", price: 60, weight: "400 GM", contents: ["Cashew", "Almond"], image: "/products/duo-treat.webp", kind: "hamper", cataloguePage: 23 },
  { id: "executive-hamper", name: "Executive Hamper", code: "KHP 0007", price: 50, weight: "400 GM", contents: ["Cashew", "Almond", "Lotus Diya"], image: "/products/executive-hamper.webp", kind: "hamper", cataloguePage: 24 },
  { id: "mini-nut-delight", name: "Mini Nut Delight", code: "KHP 0005", price: 35, weight: "400 GM", contents: ["Cashew", "Almond"], image: "/products/mini-nut-delight.webp", kind: "hamper", cataloguePage: 25 },
  { id: "festive-crunch", name: "Festive Crunch", code: "KHP 0004", price: 20, weight: "200 GM", contents: ["Mix Dry Fruits"], image: "/products/festive-crunch.webp", kind: "hamper", cataloguePage: 26 },
  { id: "festive-mix-bites", name: "Festive Mix Bites", code: "KHP 0003", price: 20, weight: "200 GM", contents: ["Cashew", "Almonds"], image: "/products/festive-mix-bites.webp", kind: "hamper", cataloguePage: 27 },
  { id: "nuts-pocket", name: "Nuts Pocket", code: "KHP 0002", price: 20, weight: "200 GM", contents: ["Mix Nuts"], image: "/products/nuts-pocket.webp", kind: "hamper", cataloguePage: 28 },
  { id: "golden-nuts-treat", name: "Golden Nuts Treat", code: "KHP 0001", price: 12, weight: "100 GM", contents: ["Mix Nuts"], image: "/products/golden-nuts-treat.webp", kind: "hamper", cataloguePage: 29 },
  { id: "vintage-peacock", name: "Vintage Peacock", code: null, price: null, weight: null, contents: [], image: "/products/vintage-peacock.webp", kind: "hamper", cataloguePage: 30, catalogueNote: "Images for illustration" },
  { id: "phoenix-lift", name: "Phoenix Lift", code: null, price: null, weight: null, contents: [], image: "/products/phoenix-lift.webp", kind: "hamper", cataloguePage: 31, catalogueNote: "Images for illustration" },
  { id: "royal-briefcase", name: "Royal Briefcase", code: null, price: null, weight: null, contents: [], image: "/products/royal-briefcase.webp", kind: "hamper", cataloguePage: 32, catalogueNote: "Images for illustration" },
  { id: "blue-bloom", name: "Blue Bloom", code: null, price: null, weight: null, contents: [], image: "/products/blue-bloom.webp", kind: "hamper", cataloguePage: 33, catalogueNote: "Images for illustration" },
  { id: "orange-blossom", name: "Orange Blossom", code: null, price: null, weight: null, contents: [], image: "/products/orange-blossom.webp", kind: "hamper", cataloguePage: 34, catalogueNote: "Images for illustration" },
  { id: "dry-fruit-mix", name: "Dry Fruit Mix", code: null, price: null, weight: "1 KG", contents: [], image: "/products/dry-fruit-mix.webp", kind: "mithai", cataloguePage: 37, catalogueNote: "Images for illustration" },
  { id: "besan-ladoo", name: "Besan Ladoo", code: null, price: null, weight: "1 KG", contents: [], image: "/products/besan-ladoo.webp", kind: "mithai", cataloguePage: 38, catalogueNote: "Images for illustration" },
  { id: "mixed-mithai-box", name: "Mixed Mithai Box", code: null, price: null, weight: "1 KG", contents: [], image: "/products/mixed-mithai-box.webp", kind: "mithai", cataloguePage: 39, catalogueNote: "Images for illustration" },
  { id: "motichur-ladoo", name: "Motichur Ladoo", code: null, price: null, weight: "1 KG", contents: [], image: "/products/motichur-ladoo.webp", kind: "mithai", cataloguePage: 40, catalogueNote: "Images for illustration" },
  { id: "enamel-tray", name: "Enamel Tray", code: null, price: 70, weight: null, contents: [], image: "/products/enamel-tray.webp", kind: "add-on", cataloguePage: 42 },
  { id: "satrangi-t-light", name: "Satrangi T-Light", code: null, price: 20, weight: null, contents: [], image: "/products/satrangi-t-light.webp", kind: "add-on", cataloguePage: 42 },
  { id: "kundan-t-light", name: "Kundan T-Light", code: null, price: 20, weight: null, contents: [], image: "/products/kundan-t-light.webp", kind: "add-on", cataloguePage: 42 },
  { id: "four-lotus-diya", name: "4 Lotus Diya", code: null, price: 20, weight: null, contents: [], image: "/products/four-lotus-diya.webp", kind: "add-on", cataloguePage: 42 },
  { id: "urli-set", name: "Urli Set", code: null, price: 20, weight: null, contents: [], image: "/products/urli-set.webp", kind: "add-on", cataloguePage: 42 },
  { id: "pichwai-shubh-labh", name: "Pichwai Shubh Labh", code: null, price: 20, weight: null, contents: [], image: "/products/pichwai-shubh-labh.webp", kind: "add-on", cataloguePage: 42 },
  { id: "pichwai-plate", name: "Pichwai Plate", code: null, price: 20, weight: null, contents: [], image: "/products/pichwai-plate.webp", kind: "add-on", cataloguePage: 43 },
  { id: "potli-urli", name: "Potli Urli", code: null, price: 15, weight: null, contents: [], image: "/products/potli-urli.webp", kind: "add-on", cataloguePage: 43 },
  { id: "bling-t-light", name: "Bling T-Light", code: null, price: 15, weight: null, contents: [], image: "/products/bling-t-light.webp", kind: "add-on", cataloguePage: 43 },
  { id: "diya-t-light", name: "Diya T-Light", code: null, price: 15, weight: null, contents: [], image: "/products/diya-t-light.webp", kind: "add-on", cataloguePage: 43 },
  { id: "keri-t-light", name: "Keri T-Light", code: null, price: 15, weight: null, contents: [], image: "/products/keri-t-light.webp", kind: "add-on", cataloguePage: 43 },
  { id: "lotus-patch-diya", name: "Lotus Patch Diya", code: null, price: 10, weight: null, contents: [], image: "/products/lotus-patch-diya.webp", kind: "add-on", cataloguePage: 43 },
];

export const mithaiBoxPackaging = {
  image: "/products/mithai-box-selection.webp",
  instruction: "Pick your preferred box for your 1 KG selection.",
  optionCount: 5,
  cataloguePage: 41,
};

export const hampers = catalogueItems.filter((item) => item.kind === "hamper");
export const mithaiSelections = catalogueItems.filter((item) => item.kind === "mithai");
export const addOns = catalogueItems.filter((item) => item.kind === "add-on");
export const pricedHampers = hampers.filter((item) => item.price !== null);

export function budgetRangeFor(price: number | null): BudgetRangeId | null {
  if (price === null) return null;
  if (price < 50) return "under-50";
  if (price < 100) return "50-99";
  if (price < 150) return "100-149";
  return "150-plus";
}

export function giftingGroupFor(item: CatalogueItem) {
  if (item.kind !== "hamper") return null;
  if (item.price === null) return "Signature previews";
  if (item.price < 50) return "Small gestures";
  if (item.price < 100) return "Team gifting";
  if (item.price < 150) return "Family gifting";
  return "Premium gifting";
}

export const catalogueSummary = {
  totalItems: catalogueItems.length,
  hampers: hampers.length,
  pricedHampers: pricedHampers.length,
  showcaseHampers: hampers.length - pricedHampers.length,
  mithaiSelections: mithaiSelections.length,
  addOns: addOns.length,
  packagingOptions: mithaiBoxPackaging.optionCount,
};

export const duplicateCatalogueCodes = Object.entries(
  catalogueItems.reduce<Record<string, string[]>>((accumulator, item) => {
    if (!item.code) return accumulator;
    accumulator[item.code] = [...(accumulator[item.code] ?? []), item.name];
    return accumulator;
  }, {}),
).filter(([, names]) => names.length > 1);
