
"use client";

import Image from "next/image";
import { type FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  CircleHelp,
  Gift,
  Mail,
  MapPin,
  MessageCircle,
  Minus,
  PackageOpen,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  catalogueCategories,
  catalogueItems,
  catalogueSummary,
  categoryLabelFor,
  mithaiBoxPackaging,
  type CatalogueCategory,
  type CatalogueItem,
} from "@/data/products";

const WHATSAPP_NUMBER = "971525596653";
const BASKET_STORAGE_KEY = "khau-galli-diwali-hamper-order-v1";

type Basket = Record<string, number>;
type SortKey = "price-desc" | "price-asc";
type CategoryFilter = "all" | CatalogueCategory;

type CustomerDetails = {
  name: string;
  mobile: string;
  emirate: string;
  giftingType: "Personal" | "Corporate";
  company: string;
  deliveryDate: string;
  notes: string;
};

type AnalyticsEvent =
  | "hero_explore_collection_click"
  | "corporate_gifting_click"
  | "product_viewed"
  | "product_added_to_enquiry"
  | "product_removed"
  | "enquiry_opened"
  | "whatsapp_quote_clicked"
  | "corporate_enquiry_initiated"
  | "custom_gifting_enquiry_initiated";

const itemById = new Map(catalogueItems.map((item) => [item.id, item]));
const emptyCustomerDetails: CustomerDetails = {
  name: "",
  mobile: "",
  emirate: "",
  giftingType: "Personal",
  company: "",
  deliveryDate: "",
  notes: "",
};

const featuredSelections = [
  "royal-ganesha",
  "vasant-bagh",
  "royal-dry-fruit-box",
  "vintage-peacock",
].map((id) => itemById.get(id)!);

const fieldClass =
  "h-12 w-full rounded-xl border border-[#cbb78f] bg-[#fffdf8] px-3.5 text-base text-[#321317] outline-none transition placeholder:text-[#927d76] focus:border-[#9f6f25] focus:ring-2 focus:ring-[#dcbf7b]/35";
const textareaClass = `${fieldClass} min-h-28 resize-y py-3`;

function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function trackEvent(name: AnalyticsEvent, properties: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const event = { event: name, ...properties };
  const target = window as typeof window & { dataLayer?: Record<string, unknown>[] };
  target.dataLayer?.push(event);
  window.dispatchEvent(new CustomEvent("kg:analytics", { detail: event }));
}

function safeQuantity(value: number) {
  return Math.max(1, Math.min(99999, Math.round(value || 1)));
}

function formatAed(value: number) {
  return `AED ${value.toLocaleString("en-AE")}`;
}

function priceLabel(item: CatalogueItem) {
  return item.price === null ? "Price on request" : formatAed(item.price);
}

function kindLabel(item: CatalogueItem) {
  return categoryLabelFor(item.category);
}

function hasCompleteCustomerDetails(customer: CustomerDetails) {
  return Boolean(
    customer.name.trim().length >= 2
      && customer.mobile.replace(/\D/g, "").length >= 7
      && customer.emirate
      && customer.deliveryDate
      && (customer.giftingType !== "Corporate" || customer.company.trim().length >= 2),
  );
}

function buildQuoteMessage(
  items: Array<{ item: CatalogueItem; quantity: number }>,
  customer: CustomerDetails,
) {
  const knownTotal = items.reduce(
    (sum, line) => sum + (line.item.price ?? 0) * line.quantity,
    0,
  );
  const unpricedLines = items.filter((line) => line.item.price === null).length;
  const selections = items
    .map(({ item, quantity }) => {
      const lines = [`${quantity} x ${item.name}`];
      if (item.code) lines.push(`Code: ${item.code}`);
      lines.push(item.price === null ? "Price: Please quote" : `${formatAed(item.price)} each`);
      return lines.join("\n");
    })
    .join("\n\n");

  const estimate = unpricedLines
    ? `${formatAed(knownTotal)} for priced items (${unpricedLines} selection${unpricedLines === 1 ? "" : "s"} awaiting quotation)`
    : formatAed(knownTotal);

  return `Hello Khau Galli,

I would like a quote for Diwali gifting.

Name: ${customer.name.trim()}
Mobile: ${customer.mobile.trim()}
Gifting: ${customer.giftingType}${customer.company.trim() ? `\nCompany: ${customer.company.trim()}` : ""}
Emirate: ${customer.emirate}

Selected items:

${selections}

Estimated merchandise total: ${estimate}

Preferred delivery date: ${customer.deliveryDate}

Notes:
${customer.notes.trim() || "None"}

Please share availability and the final quotation.`;
}

function buildProductMessage(item: CatalogueItem, quantity: number) {
  return `Hello Khau Galli,

I would like to enquire about ${item.name}.
${item.code ? `Code: ${item.code}\n` : ""}${item.weight ? `Weight: ${item.weight}\n` : ""}${item.price === null ? "Please confirm the price" : `Catalogue price: ${formatAed(item.price)}`}
Quantity: ${quantity}

Please share availability and the final quotation.`;
}

function QuantitySelector({
  quantity,
  onChange,
  label,
  compact = false,
}: {
  quantity: number;
  onChange: (quantity: number) => void;
  label: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`quantity-stepper inline-flex items-center rounded-full border border-[#bca16d]/45 bg-[#fffdf8] p-1 ${compact ? "h-10" : "h-12"}`}
      aria-label={label}
    >
      <button
        type="button"
        className={`grid place-items-center rounded-full text-[#641621] transition hover:bg-[#f3e3bd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9f6f25] ${compact ? "size-8" : "size-10"}`}
        onClick={() => onChange(safeQuantity(quantity - 1))}
        aria-label={`Decrease ${label}`}
      >
        <Minus className="size-4" aria-hidden="true" />
      </button>
      <input
        type="number"
        min={1}
        max={99999}
        inputMode="numeric"
        value={quantity}
        onChange={(event) => onChange(safeQuantity(Number(event.target.value)))}
        className={`bg-transparent text-center font-extrabold text-[#3c171a] outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none ${compact ? "w-11 text-sm" : "w-14 text-base"}`}
        aria-label={label}
      />
      <button
        type="button"
        className={`grid place-items-center rounded-full text-[#641621] transition hover:bg-[#f3e3bd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9f6f25] ${compact ? "size-8" : "size-10"}`}
        onClick={() => onChange(safeQuantity(quantity + 1))}
        aria-label={`Increase ${label}`}
      >
        <Plus className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}

function Header({ count, onBasketOpen }: { count: number; onBasketOpen: () => void }) {
  const genericMessage =
    "Hello Khau Galli, I would like to know more about your Diwali gifting collection.";
  return (
    <header className="sticky top-0 z-40 border-b border-[#d2bd94]/35 bg-[#fffaf3]/92 backdrop-blur-xl">
      <div className="mx-auto flex h-[74px] max-w-[1500px] items-center justify-between gap-5 px-4 sm:px-8 lg:px-12">
        <a href="#top" aria-label="Khau Galli Diwali gifting home" className="shrink-0">
          <Image
            src="/khau-galli-wordmark.png"
            alt="Khau Galli"
            width={230}
            height={35}
            priority
            className="h-auto w-[142px] sm:w-[190px]"
          />
        </a>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          <a className="nav-link" href="#collection">Collection</a>
          <a className="nav-link" href="#corporate">Corporate gifting</a>
          <a className="nav-link" href="#custom-gifting">Custom gifting</a>
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="basket-button"
            onClick={onBasketOpen}
            aria-label={`Open enquiry basket, ${count} item${count === 1 ? "" : "s"}`}
          >
            <ShoppingBag className="size-[18px]" aria-hidden="true" />
            <span className="hidden sm:inline">Enquiry</span>
            <span key={count} className="cart-badge grid min-w-6 place-items-center rounded-full bg-[#641621] px-1.5 py-1 text-[11px] font-black text-white">{count}</span>
          </button>
          <a className="whatsapp-header" href={whatsappUrl(genericMessage)} target="_blank" rel="noreferrer">
            <MessageCircle className="size-[18px]" aria-hidden="true" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero({ onBasketOpen }: { onBasketOpen: () => void }) {
  return (
    <section id="top" className="atelier-hero relative isolate overflow-hidden text-[#42151a]">
      <div className="hero-ornament" aria-hidden="true" />
      <div className="mx-auto grid min-h-[720px] max-w-[1500px] items-center gap-8 px-5 py-12 sm:px-8 lg:min-h-[770px] lg:grid-cols-[.86fr_1.14fr] lg:px-12 lg:py-16">
        <div className="relative z-10 max-w-3xl">
          <p className="eyebrow">Khau Galli · Diwali Gifting 2026</p>
          <h1 className="mt-5 font-display text-[clamp(3.35rem,7.4vw,7.2rem)] leading-[.84] tracking-[-0.055em]">
            Diwali gifts,
            <em className="mt-2 block font-normal text-[#a7681c]">dressed for the occasion.</em>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[#6f514b] sm:text-xl">
            Curated hampers, dry-fruit selections, mithai boxes and festive décor for friends, family, teams and clients across the UAE.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              className="hero-cta-primary"
              href="#collection"
              onClick={() => trackEvent("hero_explore_collection_click")}
            >
              <ShoppingBag aria-hidden="true" />Explore collection
            </a>
            <a
              className="hero-cta-secondary"
              href="#corporate"
              onClick={() => trackEvent("corporate_gifting_click", { source: "hero" })}
            >
              <BriefcaseBusiness aria-hidden="true" />Corporate gifting
            </a>
          </div>
          <button type="button" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#6d252c] underline decoration-[#b5832f] underline-offset-4" onClick={onBasketOpen}>
            <ShoppingBag className="size-4" aria-hidden="true" />Open your enquiry basket
          </button>
        </div>

        <div className="hero-gallery relative min-h-[440px] sm:min-h-[590px] lg:min-h-[660px]" aria-label="A collage of Khau Galli Diwali hampers">
          <div className="hero-frame hero-frame-main">
            <Image
              src="/products/royal-ganesha.webp"
              alt="Royal Ganesha hamper from the Diwali 2026 catalogue"
              fill
              priority
              sizes="(max-width: 1024px) 68vw, 34vw"
              className="object-cover"
            />
          </div>
          <div className="hero-frame hero-frame-blue">
            <Image
              src="/products/blue-bloom.webp"
              alt="Blue Bloom hamper from the Diwali 2026 catalogue"
              fill
              priority
              sizes="(max-width: 1024px) 42vw, 22vw"
              className="object-cover"
            />
          </div>
          <div className="hero-frame hero-frame-orange">
            <Image
              src="/products/orange-blossom.webp"
              alt="Orange Blossom hamper from the Diwali 2026 catalogue"
              fill
              priority
              sizes="(max-width: 1024px) 46vw, 23vw"
              className="object-cover"
            />
          </div>
          <div className="hero-frame hero-frame-phoenix">
            <Image
              src="/products/phoenix-lift.webp"
              alt="Phoenix Lift hamper from the Diwali 2026 catalogue"
              fill
              priority
              sizes="(max-width: 1024px) 46vw, 22vw"
              className="object-cover"
            />
          </div>
          <div className="hero-seal"><span>{catalogueSummary.totalItems}</span> catalogue selections</div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const items = [
    [MapPin, "UAE delivery", "Delivery details confirmed on quote"],
    [Building2, "Bulk gifting", "Built for larger quantities"],
    [BriefcaseBusiness, "Corporate enquiries", "For teams, clients and events"],
    [Sparkles, "Custom options", "Speak to the team about your brief"],
  ] as const;
  return (
    <section className="border-b border-[#d7c49c]/40 bg-[#fffaf0]" aria-label="Gifting services">
      <div className="mx-auto grid max-w-[1500px] grid-cols-2 lg:grid-cols-4">
        {items.map(([Icon, title, detail]) => (
          <div key={title} className="trust-item">
            <Icon className="size-5 shrink-0 text-[#9d6c24]" aria-hidden="true" />
            <div><strong>{title}</strong><span>{detail}</span></div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturedSection({ onView }: { onView: (item: CatalogueItem) => void }) {
  return (
    <section className="bg-[#fffaf0] py-16 sm:py-24">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <div className="section-heading-row">
          <div><p className="eyebrow">Selected from the catalogue</p><h2 className="section-title">A closer look at the collection</h2></div>
          <p>Four distinctive presentations from Khau Galli&apos;s Diwali catalogue.</p>
        </div>
        <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featuredSelections.map((item, index) => (
            <button key={item.id} type="button" className={`featured-card featured-card-${index + 1} group`} onClick={() => onView(item)}>
              <span className="relative block aspect-[4/3] overflow-hidden bg-[#e9ddc7]">
                <Image src={item.image} alt={`${item.name} hamper`} fill sizes="(max-width: 768px) 100vw, 25vw" className={`${item.id === "vasant-bagh" ? "bg-[#fff7e6] object-contain" : "object-cover"} transition duration-500 group-hover:scale-[1.035]`} />
              </span>
              <span className="featured-copy"><small>{kindLabel(item)}</small><strong>{item.name}</strong><span>{priceLabel(item)}</span></span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  item,
  index,
  onView,
  onAdd,
}: {
  item: CatalogueItem;
  index: number;
  onView: (item: CatalogueItem) => void;
  onAdd: (item: CatalogueItem, quantity: number) => void;
}) {
  const preview = item.contents.slice(0, 3).join(", ");
  return (
    <article className="catalogue-card reveal-up" style={{ animationDelay: `${Math.min(index, 7) * 45}ms` }}>
      <button type="button" className="catalogue-image group" onClick={() => onView(item)} aria-label={`View ${item.name} details`}>
        <Image src={item.image} alt={`${item.name} catalogue product`} fill sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw" className={`${item.id === "vasant-bagh" ? "bg-[#fff7e6] object-contain" : "object-cover"} transition duration-500 group-hover:scale-[1.035]`} />
        <span className="catalogue-tag">{kindLabel(item)}</span>
      </button>
      <div className="flex min-h-[244px] flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0"><h3 className="font-display text-[1.72rem] leading-[1.04] text-[#55121b]">{item.name}</h3>{item.code ? <p className="mt-2 text-xs font-black uppercase tracking-[.16em] text-[#8a7166]">{item.code}</p> : null}</div>
          <p className="shrink-0 text-right text-base font-black text-[#995b1b]">{priceLabel(item)}</p>
        </div>
        <p className="mt-4 min-h-12 text-sm leading-6 text-[#6f5a55]">
          {preview ? `${preview}${item.contents.length > 3 ? ` +${item.contents.length - 3} more` : ""}` : item.price === null ? "Catalogue details to be confirmed on enquiry." : "Available as a catalogue add-on."}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <button type="button" className="text-button" onClick={() => onView(item)}>View details</button>
          <button type="button" className="add-icon-button" onClick={() => onAdd(item, 1)} aria-label={`Add ${item.name} to enquiry`}><Plus className="size-4" aria-hidden="true" />Add</button>
        </div>
      </div>
    </article>
  );
}

function CollectionFilters({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  sort,
  onSortChange,
  resultCount,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  category: CategoryFilter;
  onCategoryChange: (value: CategoryFilter) => void;
  sort: SortKey;
  onSortChange: (value: SortKey) => void;
  resultCount: number;
}) {
  return (
    <div className="collection-tools">
      <div className="scrollbar-none -mx-1 flex gap-2 overflow-x-auto px-1 pb-4" role="group" aria-label="Catalogue categories">
        <button type="button" className={`filter-pill ${category === "all" ? "active" : ""}`} onClick={() => onCategoryChange("all")} aria-pressed={category === "all"}>All</button>
        {catalogueCategories.map((option) => (
          <button key={option.id} type="button" className={`filter-pill ${category === option.id ? "active" : ""}`} onClick={() => onCategoryChange(option.id)} aria-pressed={category === option.id}>{option.label}</button>
        ))}
      </div>
      <div className="grid gap-3 border-t border-[#d8c5a0]/50 pt-4 lg:grid-cols-[minmax(280px,1fr)_230px]">
        <label className="relative block">
          <span className="sr-only">Search catalogue</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#8a7166]" aria-hidden="true" />
          <Input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search name, code or contents" className="h-12 rounded-xl border-[#cbb78f] bg-[#fffdf8] pl-12 pr-10 text-base shadow-none focus-visible:ring-[#d0a650]/40" />
          {query ? <button type="button" onClick={() => onQueryChange("")} className="absolute right-2.5 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-[#78645e] hover:bg-[#f1e1bd]" aria-label="Clear search"><X className="size-4" /></button> : null}
        </label>
        <Select value={sort} onValueChange={(value) => onSortChange(value as SortKey)}>
          <SelectTrigger aria-label="Sort catalogue items" className="h-12 rounded-xl border-[#cbb78f] bg-[#fffdf8] px-4 text-base shadow-none"><SelectValue /></SelectTrigger>
          <SelectContent className="border-[#cbb78f] bg-[#fffdf8]">
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <p className="mt-4 text-sm font-semibold text-[#7c6861]">{resultCount} {resultCount === 1 ? "selection" : "selections"}</p>
    </div>
  );
}

function PackagingSpotlight({ onViewMithai }: { onViewMithai: () => void }) {
  return (
    <section id="custom-options" className="packaging-spotlight py-16 sm:py-24">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <div className="grid overflow-hidden rounded-[2rem] border border-[#d9bf89]/55 bg-[#fffaf0] shadow-[0_24px_70px_rgba(73,28,22,.1)] lg:grid-cols-[1.1fr_.9fr]">
          <div className="relative min-h-[330px] bg-[#e8dbc1] sm:min-h-[470px]">
            <Image src={mithaiBoxPackaging.image} alt="Five illustrated Khau Galli mithai box designs" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
          </div>
          <div className="flex flex-col justify-center p-7 sm:p-12 lg:p-14">
            <p className="eyebrow">Mithai box selection</p>
            <h2 className="mt-4 font-display text-5xl leading-[.94] text-[#59141d] sm:text-6xl">Five pictured packaging options</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#6d5750]">{mithaiBoxPackaging.instruction} Add your preference in the enquiry notes; final availability is confirmed by the team.</p>
            <a className="hero-cta-primary mt-8 w-fit" href="#collection" onClick={onViewMithai}>View mithai selections</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductDialog({
  item,
  onClose,
  onAdd,
}: {
  item: CatalogueItem | null;
  onClose: () => void;
  onAdd: (item: CatalogueItem, quantity: number) => void;
}) {
  const [quantity, setQuantity] = useState(1);
  useEffect(() => setQuantity(1), [item]);
  return (
    <Dialog open={Boolean(item)} onOpenChange={(open) => !open && onClose()}>
      {item ? (
        <DialogContent className="max-h-[94vh] max-w-[1080px] overflow-y-auto border-[#bfa66e]/30 bg-[#fffaf0] p-0 sm:rounded-[1.8rem]">
          <div className="grid md:grid-cols-[1.08fr_.92fr]">
            <div className="relative min-h-[330px] overflow-hidden bg-[#eadfc9] md:min-h-[680px] md:rounded-l-[1.8rem]">
              <Image src={item.image} alt={`${item.name} catalogue product`} fill sizes="(max-width: 768px) 100vw, 52vw" className={item.id === "vasant-bagh" ? "bg-[#fff7e6] object-contain" : "object-cover"} />
            </div>
            <div className="flex flex-col p-6 sm:p-9 md:p-11">
              <DialogHeader className="pr-8 text-left">
                <p className="eyebrow">{kindLabel(item)}</p>
                <DialogTitle className="font-display text-4xl leading-[.95] text-[#59141d] sm:text-5xl">{item.name}</DialogTitle>
                <DialogDescription className="pt-2 text-lg font-black text-[#995b1b]">{priceLabel(item)}</DialogDescription>
              </DialogHeader>
              <dl className="mt-7 grid grid-cols-2 gap-3 rounded-2xl border border-[#d9c7a3] bg-[#fffdf8] p-4 text-sm">
                <div><dt className="detail-label">Product code</dt><dd>{item.code ?? "Not listed"}</dd></div>
                <div><dt className="detail-label">Weight</dt><dd>{item.weight ?? "Not listed"}</dd></div>
              </dl>
              <div className="mt-7 border-y border-[#cbb78f]/55 py-6">
                <p className="detail-label mb-3">{item.contents.length ? "What's inside" : "Catalogue information"}</p>
                {item.contents.length ? (
                  <ul className="grid gap-2 text-base text-[#59413f] sm:grid-cols-2">
                    {item.contents.map((content) => <li key={content} className="flex items-center gap-2.5"><span className="grid size-5 shrink-0 place-items-center rounded-full bg-[#ebd39c] text-[#6a1721]"><Check className="size-3" aria-hidden="true" /></span>{content}</li>)}
                  </ul>
                ) : (
                  <p className="leading-7 text-[#6f5b55]">{item.catalogueNote ? `${item.catalogueNote}. ` : ""}{item.price === null ? "Price, contents and any unlisted details are confirmed when you enquire." : "No weight or contents are listed for this catalogue add-on."}</p>
                )}
              </div>
              <div className="mt-7 flex items-center justify-between gap-4"><div><p className="text-sm font-black text-[#4d2b2c]">Quantity</p><p className="mt-1 text-xs text-[#88716a]">{item.price === null ? "Final value confirmed on quote" : `${formatAed(item.price * quantity)} subtotal`}</p></div><QuantitySelector quantity={quantity} onChange={setQuantity} label={`Quantity for ${item.name}`} /></div>
              <div className="mt-auto grid gap-3 pt-8">
                <Button className="h-13 rounded-full bg-[#641621] text-base text-white hover:bg-[#7d2330]" onClick={() => onAdd(item, quantity)}><ShoppingBag aria-hidden="true" />Add to enquiry</Button>
                <a className="outline-cta" href={whatsappUrl(buildProductMessage(item, quantity))} target="_blank" rel="noreferrer"><MessageCircle className="size-5" aria-hidden="true" />Ask about this item</a>
              </div>
            </div>
          </div>
        </DialogContent>
      ) : null}
    </Dialog>
  );
}

function CartDrawer({
  open,
  onOpenChange,
  lines,
  customer,
  onCustomerChange,
  onQuantityChange,
  onRemove,
  onClear,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lines: Array<{ item: CatalogueItem; quantity: number }>;
  customer: CustomerDetails;
  onCustomerChange: (field: keyof CustomerDetails, value: string) => void;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (item: CatalogueItem) => void;
  onClear: () => void;
}) {
  const count = lines.reduce((sum, line) => sum + line.quantity, 0);
  const knownTotal = lines.reduce((sum, line) => sum + (line.item.price ?? 0) * line.quantity, 0);
  const unpricedCount = lines.filter((line) => line.item.price === null).length;

  const handleCheckout = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!hasCompleteCustomerDetails(customer)) {
      event.currentTarget.reportValidity();
      return;
    }
    const message = buildQuoteMessage(lines, customer);
    trackEvent("whatsapp_quote_clicked", { item_count: count, estimated_total: knownTotal, quote_required_lines: unpricedCount });
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full border-l-[#cbb78f] bg-[#fffaf0] p-0 sm:max-w-[560px]">
        <SheetHeader className="border-b border-[#d4c29e]/55 p-6 pr-14 text-left">
          <SheetTitle className="font-display text-3xl text-[#5b151e]">Your enquiry basket</SheetTitle>
          <SheetDescription className="text-[#7d6760]">Build an estimate, then ask Khau Galli for availability and a final quotation on WhatsApp.</SheetDescription>
        </SheetHeader>
        <div className="scrollbar-thin h-[calc(100vh-225px)] overflow-y-auto px-5 py-5 sm:px-6">
          {lines.length ? (
            <form id="kg-enquiry-form" onSubmit={handleCheckout} className="space-y-7">
              <div className="space-y-3">
                {lines.map(({ item, quantity }) => (
                  <article key={item.id} className="basket-line">
                    <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-[#e7dcc7]"><Image src={item.image} alt="" fill sizes="80px" className="object-cover" /></div>
                    <div className="min-w-0 flex-1"><h3 className="font-display text-lg leading-5 text-[#55131c]">{item.name}</h3><p className="mt-1 text-xs font-bold text-[#8a7166]">{item.code ?? kindLabel(item)}</p><p className="mt-1 text-sm font-extrabold text-[#94591c]">{priceLabel(item)}</p><button type="button" className="mt-2 text-xs font-bold text-[#8b4d47] underline underline-offset-2" onClick={() => onRemove(item)}>Remove</button></div>
                    <QuantitySelector quantity={quantity} onChange={(value) => onQuantityChange(item.id, value)} label={`${item.name} quantity`} compact />
                  </article>
                ))}
              </div>

              <div className="estimate-panel">
                <div><p>Estimated merchandise value</p><span>{unpricedCount ? `Priced items only; ${unpricedCount} line${unpricedCount === 1 ? "" : "s"} need a quote.` : "Delivery or customisation charges may apply."}</span></div>
                <strong>{formatAed(knownTotal)}</strong>
              </div>

              <fieldset className="space-y-4">
                <legend className="font-display text-2xl text-[#5b151e]">A few useful details</legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="form-field"><span>Name *</span><input required minLength={2} autoComplete="name" className={fieldClass} value={customer.name} onChange={(event) => onCustomerChange("name", event.target.value)} /></label>
                  <label className="form-field"><span>Mobile number *</span><input required minLength={7} type="tel" inputMode="tel" autoComplete="tel" className={fieldClass} value={customer.mobile} onChange={(event) => onCustomerChange("mobile", event.target.value)} /></label>
                  <label className="form-field"><span>Emirate *</span><select required className={fieldClass} value={customer.emirate} onChange={(event) => onCustomerChange("emirate", event.target.value)}><option value="">Select emirate</option><option>Dubai</option><option>Sharjah</option><option>Abu Dhabi</option><option>Ajman</option><option>Ras Al Khaimah</option><option>Umm Al Quwain</option><option>Fujairah</option><option>Outside UAE</option></select></label>
                  <label className="form-field"><span>Personal / corporate *</span><select className={fieldClass} value={customer.giftingType} onChange={(event) => onCustomerChange("giftingType", event.target.value)}><option>Personal</option><option>Corporate</option></select></label>
                  {customer.giftingType === "Corporate" ? <label className="form-field sm:col-span-2"><span>Company name *</span><input required minLength={2} autoComplete="organization" className={fieldClass} value={customer.company} onChange={(event) => onCustomerChange("company", event.target.value)} /></label> : null}
                  <label className="form-field sm:col-span-2"><span>Preferred delivery date *</span><input required type="date" className={fieldClass} value={customer.deliveryDate} onChange={(event) => onCustomerChange("deliveryDate", event.target.value)} /></label>
                  <label className="form-field sm:col-span-2"><span>Notes <small>(optional)</small></span><textarea className={textareaClass} placeholder="Delivery location, packaging preference, card message or other requirements" value={customer.notes} onChange={(event) => onCustomerChange("notes", event.target.value)} /></label>
                </div>
              </fieldset>
            </form>
          ) : (
            <div className="grid min-h-[58vh] place-items-center text-center"><div><span className="mx-auto grid size-16 place-items-center rounded-full bg-[#ecd9ad] text-[#6a1721]"><PackageOpen className="size-7" aria-hidden="true" /></span><h3 className="mt-5 font-display text-3xl text-[#5b151e]">Your basket is empty</h3><p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-[#7d6760]">Add hampers, 1 KG selections or finishing touches. No payment is taken online.</p><Button variant="outline" className="mt-6 rounded-full border-[#bca16d] bg-transparent" onClick={() => onOpenChange(false)}>Continue browsing</Button></div></div>
          )}
        </div>
        {lines.length ? (
          <SheetFooter className="border-t border-[#d4c29e]/55 bg-[#fffdf8] p-4 sm:p-5">
            <Button type="submit" form="kg-enquiry-form" className="h-13 rounded-full bg-[#641621] text-base text-white hover:bg-[#7d2330]"><MessageCircle aria-hidden="true" />Get quote on WhatsApp</Button>
            <div className="grid grid-cols-2 gap-2"><Button variant="outline" className="rounded-full border-[#bca16d] bg-transparent" onClick={() => onOpenChange(false)}>Continue shopping</Button><Button variant="ghost" className="rounded-full text-[#8f433d] hover:bg-[#f3dfdc]" onClick={onClear}><Trash2 aria-hidden="true" />Clear basket</Button></div>
          </SheetFooter>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}

function CorporateSection() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = `Hello Khau Galli,

I would like a corporate Diwali gifting quotation.

Name: ${data.get("name")}
Company: ${data.get("company")}
Phone / WhatsApp: ${data.get("phone")}
Email: ${data.get("email")}
Number of hampers: ${data.get("quantity")}
Approximate budget per hamper: ${data.get("budget") || "Not specified"}
Preferred hamper(s): ${data.get("hampers") || "Open to recommendations"}
Delivery emirate / location: ${data.get("location")}
Delivery plan: ${data.get("deliveryPlan")}
Preferred delivery date: ${data.get("date")}
Customisation requirements: ${data.get("customisation") || "None specified"}
Additional notes: ${data.get("notes") || "None"}

Please share availability and the final quotation.`;
    trackEvent("corporate_enquiry_initiated", { quantity: data.get("quantity"), budget: data.get("budget") });
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  };
  return (
    <section id="corporate" className="corporate-section relative overflow-hidden py-16 text-[#fff8e8] sm:py-24">
      <div className="mx-auto grid max-w-[1500px] gap-12 px-5 sm:px-8 lg:grid-cols-[.78fr_1.22fr] lg:px-12">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow-light">Corporate gifting desk</p>
          <h2 className="mt-4 font-display text-5xl leading-[.91] tracking-[-.04em] sm:text-7xl">Built for the people managing the list.</h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[#ead9c4]">A direct brief for employee gifts, client hampers, partner gifting and event orders - including quantities, budget, locations and timing.</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {["Employee gifting", "Client and partner gifting", "Event gifting", "Bulk Diwali orders"].map((item) => <p key={item} className="flex items-center gap-3 text-sm font-semibold text-[#f6ead8]"><span className="grid size-7 place-items-center rounded-full bg-[#d8ad52] text-[#421118]"><Check className="size-4" aria-hidden="true" /></span>{item}</p>)}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="quote-form" aria-label="Corporate gifting enquiry">
          <div className="mb-7"><p className="eyebrow">Corporate brief</p><h3 className="mt-2 font-display text-3xl text-[#5a151e] sm:text-4xl">Request a corporate quote</h3><p className="mt-3 leading-7 text-[#725d56]">This opens a structured WhatsApp message. It does not confirm stock, delivery or a final invoice.</p></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="form-field"><span>Name *</span><input required name="name" autoComplete="name" className={fieldClass} /></label>
            <label className="form-field"><span>Company *</span><input required name="company" autoComplete="organization" className={fieldClass} /></label>
            <label className="form-field"><span>Phone / WhatsApp *</span><input required minLength={7} name="phone" type="tel" inputMode="tel" autoComplete="tel" className={fieldClass} /></label>
            <label className="form-field"><span>Email *</span><input required name="email" type="email" inputMode="email" autoComplete="email" className={fieldClass} /></label>
            <label className="form-field"><span>Number of hampers *</span><input required min={1} max={99999} name="quantity" type="number" inputMode="numeric" className={fieldClass} /></label>
            <label className="form-field"><span>Budget per hamper</span><input name="budget" inputMode="decimal" placeholder="e.g. AED 120" className={fieldClass} /></label>
            <label className="form-field sm:col-span-2"><span>Preferred hamper(s) <small>(optional)</small></span><input name="hampers" placeholder="Names or product codes" className={fieldClass} /></label>
            <label className="form-field"><span>Delivery emirate / location *</span><input required name="location" placeholder="e.g. Dubai, DIFC" className={fieldClass} /></label>
            <label className="form-field"><span>Delivery plan *</span><select required name="deliveryPlan" className={fieldClass} defaultValue=""><option value="" disabled>Select one</option><option>Single delivery location</option><option>Multiple delivery locations</option><option>Not sure yet</option></select></label>
            <label className="form-field sm:col-span-2"><span>Preferred delivery date *</span><input required name="date" type="date" className={fieldClass} /></label>
            <label className="form-field sm:col-span-2"><span>Customisation requirements <small>(optional)</small></span><textarea name="customisation" className={textareaClass} placeholder="Packaging, cards, branding or assortment requirements" /></label>
            <label className="form-field sm:col-span-2"><span>Additional notes <small>(optional)</small></span><textarea name="notes" className={textareaClass} /></label>
          </div>
          <Button type="submit" className="mt-6 h-13 w-full rounded-full bg-[#641621] text-base text-white hover:bg-[#7d2330]"><MessageCircle aria-hidden="true" />Request corporate quote</Button>
        </form>
      </div>
    </section>
  );
}

function CustomGiftingSection() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = `Hello Khau Galli,

I would like to speak to your team about custom Diwali gifting options.

Name: ${data.get("name")}
Phone / WhatsApp: ${data.get("phone")}
Budget per hamper: ${data.get("budget")}
Quantity: ${data.get("quantity")}
Recipient type: ${data.get("recipient")}
Preferred contents / notes: ${data.get("contents")}
Delivery location: ${data.get("location")}
Preferred delivery date: ${data.get("date")}

Please let me know what options may be available.`;
    trackEvent("custom_gifting_enquiry_initiated", { quantity: data.get("quantity"), budget: data.get("budget") });
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  };
  return (
    <section id="custom-gifting" className="bg-[#efe4cf] py-16 sm:py-24">
      <div className="mx-auto grid max-w-[1500px] items-start gap-10 px-5 sm:px-8 lg:grid-cols-[.92fr_1.08fr] lg:px-12">
        <div className="custom-story-panel">
          <p className="eyebrow">Can't find the right hamper?</p>
          <h2 className="mt-4 font-display text-5xl leading-[.94] text-[#58151d] sm:text-7xl">Bring the budget. Bring the brief.</h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[#6f5952]">Speak to our team about custom gifting options. Tell us the quantity, recipients, preferred contents and timing, and Khau Galli can advise what may be possible.</p>
          <div className="mt-9 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {[[CircleHelp, "A clearer brief", "Budget, quantity and recipient type"], [Gift, "Catalogue-led options", "Hampers, mithai boxes and add-ons"], [CalendarDays, "Timing upfront", "Delivery date and location in one message"]].map(([Icon, title, copy]) => {
              const FeatureIcon = Icon as typeof Gift;
              return <div key={String(title)} className="custom-benefit"><FeatureIcon className="size-5" aria-hidden="true" /><strong>{String(title)}</strong><span>{String(copy)}</span></div>;
            })}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="quote-form" aria-label="Custom gifting enquiry">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="form-field"><span>Name *</span><input required name="name" autoComplete="name" className={fieldClass} /></label>
            <label className="form-field"><span>Phone / WhatsApp *</span><input required minLength={7} name="phone" type="tel" inputMode="tel" autoComplete="tel" className={fieldClass} /></label>
            <label className="form-field"><span>Budget per hamper *</span><input required name="budget" inputMode="decimal" placeholder="e.g. AED 100" className={fieldClass} /></label>
            <label className="form-field"><span>Quantity *</span><input required min={1} max={99999} name="quantity" type="number" inputMode="numeric" className={fieldClass} /></label>
            <label className="form-field sm:col-span-2"><span>Recipient type *</span><select required name="recipient" className={fieldClass} defaultValue=""><option value="" disabled>Select one</option><option>Friends and family</option><option>Employees</option><option>Clients and partners</option><option>Event guests</option><option>Mixed recipients</option></select></label>
            <label className="form-field sm:col-span-2"><span>Preferred contents / notes *</span><textarea required name="contents" className={textareaClass} placeholder="Dry fruits, sweets, namkeen, add-ons, allergies or packaging preferences" /></label>
            <label className="form-field"><span>Delivery location *</span><input required name="location" className={fieldClass} /></label>
            <label className="form-field"><span>Preferred delivery date *</span><input required name="date" type="date" className={fieldClass} /></label>
          </div>
          <Button type="submit" className="mt-6 h-13 w-full rounded-full bg-[#641621] text-base text-white hover:bg-[#7d2330]"><MessageCircle aria-hidden="true" />Discuss custom gifting</Button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  const genericMessage = "Hello Khau Galli, I would like to enquire about Diwali gifting.";
  return (
    <footer className="bg-[#260b0f] pb-24 text-[#f5e7d2] sm:pb-10">
      <div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1fr_auto] lg:px-12">
        <div><Image src="/khau-galli-wordmark.png" alt="Khau Galli" width={230} height={35} className="h-auto w-[210px] brightness-0 invert" /><p className="mt-5 max-w-md text-sm leading-6 text-[#d6c4ae]">Dry fruits, sweets, namkeen and festive hampers for personal and corporate gifting across the UAE.</p></div>
        <div className="grid gap-3 text-sm md:min-w-80">
          <a href={whatsappUrl(genericMessage)} target="_blank" rel="noreferrer" className="footer-link"><MessageCircle className="size-5 text-[#e8bd62]" />+971 52 559 6653</a>
          <a href="mailto:khaugallijlt@gmail.com" className="footer-link"><Mail className="size-5 text-[#e8bd62]" />khaugallijlt@gmail.com</a>
          <a href="https://www.instagram.com/khaugallidubai/" target="_blank" rel="noreferrer" className="footer-link"><Users className="size-5 text-[#e8bd62]" />@khaugallidubai</a>
        </div>
      </div>
      <div className="mx-auto max-w-[1500px] border-t border-white/10 px-5 pt-5 text-xs leading-5 text-[#aa9680] sm:px-8 lg:px-12">This website creates an enquiry estimate, not a confirmed invoice. Availability, delivery, customisation and final pricing are confirmed by Khau Galli.</div>
    </footer>
  );
}

function MobileBasketBar({ count, total, unpricedLines, onOpen }: { count: number; total: number; unpricedLines: number; onOpen: () => void }) {
  if (!count) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#c9b27f]/35 bg-[#fffaf0]/96 p-3 shadow-[0_-12px_35px_rgba(54,15,19,.14)] backdrop-blur-xl sm:hidden">
      <button type="button" onClick={onOpen} className="flex h-14 w-full items-center justify-between rounded-full bg-[#641621] px-5 text-left text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9ad54] focus-visible:ring-offset-2">
        <span className="flex items-center gap-3"><span className="grid size-8 place-items-center rounded-full bg-white/15 text-sm font-black">{count}</span><span><strong className="block text-sm">View enquiry</strong><small className="block text-xs text-white/70">{unpricedLines ? `${unpricedLines} line${unpricedLines === 1 ? "" : "s"} need a quote` : "Ready to estimate"}</small></span></span>
        <strong className="text-base">{formatAed(total)}</strong>
      </button>
    </div>
  );
}

function FloatingEnquiryActions({ count, onOpen }: { count: number; onOpen: () => void }) {
  const genericMessage = "Hello Khau Galli, I would like to enquire about Diwali gifting.";
  return (
    <div className={`floating-actions ${count ? "floating-actions-with-basket" : ""}`} role="group" aria-label="Quick enquiry actions">
      <button
        type="button"
        className="floating-enquiry-button"
        onClick={onOpen}
        aria-label={`Open enquiry basket, ${count} item${count === 1 ? "" : "s"}`}
      >
        <ShoppingBag className="size-5" aria-hidden="true" />
        <span>Enquire</span>
        <span key={count} className="floating-enquiry-count" aria-hidden="true">{count}</span>
      </button>
      <a href={whatsappUrl(genericMessage)} target="_blank" rel="noreferrer" className="whatsapp-float" aria-label="Message Khau Galli on WhatsApp">
        <MessageCircle className="size-6" aria-hidden="true" />
      </a>
    </div>
  );
}

export default function Storefront() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [sort, setSort] = useState<SortKey>("price-desc");
  const [selectedItem, setSelectedItem] = useState<CatalogueItem | null>(null);
  const [basket, setBasket] = useState<Basket>({});
  const [customer, setCustomer] = useState<CustomerDetails>(emptyCustomerDetails);
  const [basketOpen, setBasketOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(BASKET_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Basket;
        setBasket(Object.fromEntries(Object.entries(parsed).filter(([id, quantity]) => itemById.has(id) && Number(quantity) > 0)));
      }
    } catch {
      localStorage.removeItem(BASKET_STORAGE_KEY);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(BASKET_STORAGE_KEY, JSON.stringify(basket));
  }, [basket, hydrated]);

  const basketLines = useMemo(
    () => catalogueItems.filter((item) => basket[item.id]).map((item) => ({ item, quantity: basket[item.id] })),
    [basket],
  );
  const basketCount = basketLines.reduce((sum, line) => sum + line.quantity, 0);
  const basketTotal = basketLines.reduce((sum, line) => sum + (line.item.price ?? 0) * line.quantity, 0);
  const unpricedLines = basketLines.filter((line) => line.item.price === null).length;

  const visibleProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const filtered = catalogueItems.filter((item) => {
      const matchesSearch = !normalized || [item.name, item.code ?? "", item.contents.join(" ")].some((value) => value.toLowerCase().includes(normalized));
      const matchesCategory = category === "all" || item.category === category;
      return matchesSearch && matchesCategory;
    });
    return filtered.sort((a, b) => {
      if (a.price === null && b.price === null) return (a.cataloguePage ?? Number.MAX_SAFE_INTEGER) - (b.cataloguePage ?? Number.MAX_SAFE_INTEGER);
      if (a.price === null) return 1;
      if (b.price === null) return -1;
      const difference = sort === "price-desc" ? b.price - a.price : a.price - b.price;
      return difference || (a.cataloguePage ?? Number.MAX_SAFE_INTEGER) - (b.cataloguePage ?? Number.MAX_SAFE_INTEGER);
    });
  }, [category, query, sort]);

  const openProduct = useCallback((item: CatalogueItem) => {
    setSelectedItem(item);
    trackEvent("product_viewed", { product_id: item.id, product_code: item.code, price: item.price, kind: item.kind });
  }, []);

  const addToBasket = useCallback((item: CatalogueItem, quantity: number) => {
    const safe = safeQuantity(quantity);
    setBasket((current) => ({ ...current, [item.id]: (current[item.id] ?? 0) + safe }));
    setSelectedItem(null);
    setStatus(`${safe} x ${item.name} added to your enquiry.`);
    trackEvent("product_added_to_enquiry", { product_id: item.id, product_code: item.code, quantity: safe, unit_price: item.price, kind: item.kind });
  }, []);

  const openBasket = useCallback(() => {
    setBasketOpen(true);
    trackEvent("enquiry_opened", { item_count: basketCount, estimated_total: basketTotal });
  }, [basketCount, basketTotal]);

  const removeItem = useCallback((item: CatalogueItem) => {
    setBasket((current) => { const next = { ...current }; delete next[item.id]; return next; });
    setStatus(`${item.name} removed from your enquiry.`);
    trackEvent("product_removed", { product_id: item.id, product_code: item.code, kind: item.kind });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setBasket((current) => ({ ...current, [id]: safeQuantity(quantity) }));
  }, []);

  const updateCustomer = useCallback((field: keyof CustomerDetails, value: string) => {
    setCustomer((current) => ({ ...current, [field]: value }));
  }, []);

  const clearBasket = useCallback(() => {
    setBasket({});
    setCustomer({ ...emptyCustomerDetails });
    setStatus("Your enquiry basket has been cleared.");
  }, []);

  useEffect(() => {
    const modelContext = (document as unknown as {
      modelContext?: { registerTool: (tool: Record<string, unknown>, options?: { signal?: AbortSignal }) => void | Promise<void> };
    }).modelContext;
    if (!modelContext?.registerTool) return;
    const lifecycle = new AbortController();
    const register = (tool: Record<string, unknown>) => {
      try { void Promise.resolve(modelContext.registerTool(tool, { signal: lifecycle.signal })).catch(() => undefined); } catch { /* WebMCP unavailable. */ }
    };

    register({
      name: "list_hampers",
      title: "List Diwali catalogue items",
      description: "Read every Khau Galli Diwali catalogue item, optionally filtered by search text or one of the four catalogue categories.",
      inputSchema: { type: "object", properties: { query: { type: "string" }, category: { type: "string", enum: catalogueCategories.map(({ id }) => id) } }, additionalProperties: false },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute: (input: unknown) => {
        const value = input && typeof input === "object" ? input as { query?: unknown; category?: unknown } : {};
        if (value.query !== undefined && typeof value.query !== "string") throw new Error("query must be a string");
        if (value.category !== undefined && !catalogueCategories.some(({ id }) => id === value.category)) throw new Error("category must be a valid catalogue category");
        const search = typeof value.query === "string" ? value.query.toLowerCase() : "";
        const selectedCategory = typeof value.category === "string" ? value.category : undefined;
        return catalogueItems
          .filter((item) => (!search || `${item.name} ${item.code ?? ""} ${item.contents.join(" ")}`.toLowerCase().includes(search)) && (!selectedCategory || item.category === selectedCategory))
          .map(({ id, name, code, price, weight, contents, category: itemCategory }) => ({ id, name, code, price, weight, contents, category: itemCategory }));
      },
    });
    register({
      name: "add_hampers_to_order",
      title: "Add catalogue items to enquiry",
      description: "Add one or more Khau Galli catalogue items to the visible enquiry basket. This stages an enquiry and does not confirm an order.",
      inputSchema: { type: "object", properties: { items: { type: "array", minItems: 1, items: { type: "object", properties: { id: { type: "string" }, quantity: { type: "integer", minimum: 1 } }, required: ["id", "quantity"], additionalProperties: false } } }, required: ["items"], additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute: (input: unknown) => {
        const value = input as { items?: Array<{ id?: unknown; quantity?: unknown }> };
        if (!Array.isArray(value?.items) || !value.items.length) throw new Error("items must be a non-empty array");
        const additions = value.items.map((candidate) => {
          if (typeof candidate.id !== "string" || !Number.isInteger(candidate.quantity) || Number(candidate.quantity) < 1) throw new Error("Each item needs a valid id and positive integer quantity");
          const item = itemById.get(candidate.id);
          if (!item) throw new Error(`Unknown catalogue item id: ${candidate.id}`);
          return { item, quantity: Number(candidate.quantity) };
        });
        setBasket((current) => {
          const next = { ...current };
          additions.forEach(({ item, quantity }) => { next[item.id] = (next[item.id] ?? 0) + quantity; });
          return next;
        });
        return { staged: true, added: additions.map(({ item, quantity }) => ({ id: item.id, quantity })) };
      },
    });
    register({
      name: "read_order_summary",
      title: "Read enquiry basket",
      description: "Read the catalogue items currently staged in the visible enquiry basket and the known merchandise estimate.",
      inputSchema: { type: "object", properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute: () => ({ items: basketLines.map(({ item, quantity }) => ({ id: item.id, name: item.name, code: item.code, price: item.price, quantity, subtotal: item.price === null ? null : item.price * quantity })), estimatedPricedTotal: basketTotal, quoteRequiredLines: unpricedLines }),
    });
    register({
      name: "prepare_whatsapp_order",
      title: "Prepare WhatsApp quote enquiry",
      description: "Prepare, but do not send, a structured WhatsApp quote enquiry for the visible basket and supplied customer details.",
      inputSchema: { type: "object", properties: { name: { type: "string", minLength: 2 }, mobile: { type: "string", minLength: 7 }, emirate: { type: "string", minLength: 2 }, giftingType: { type: "string", enum: ["Personal", "Corporate"] }, company: { type: "string" }, deliveryDate: { type: "string", minLength: 1 }, notes: { type: "string" } }, required: ["name", "mobile", "emirate", "giftingType", "deliveryDate"], additionalProperties: false },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute: (input: unknown) => {
        if (!basketLines.length) throw new Error("The enquiry basket is empty");
        const value = input && typeof input === "object" ? input as Partial<CustomerDetails> : {};
        const details: CustomerDetails = { name: typeof value.name === "string" ? value.name : "", mobile: typeof value.mobile === "string" ? value.mobile : "", emirate: typeof value.emirate === "string" ? value.emirate : "", giftingType: value.giftingType === "Corporate" ? "Corporate" : "Personal", company: typeof value.company === "string" ? value.company : "", deliveryDate: typeof value.deliveryDate === "string" ? value.deliveryDate : "", notes: typeof value.notes === "string" ? value.notes : "" };
        if (!hasCompleteCustomerDetails(details)) throw new Error("Complete name, mobile, emirate, delivery date and corporate company details where applicable");
        const message = buildQuoteMessage(basketLines, details);
        return { message, url: whatsappUrl(message), estimatedPricedTotal: basketTotal, quoteRequiredLines: unpricedLines, orderConfirmed: false };
      },
    });
    return () => lifecycle.abort();
  }, [basketLines, basketTotal, unpricedLines]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#fffaf0] text-[#341317]">
      <Header count={basketCount} onBasketOpen={openBasket} />
      <Hero onBasketOpen={openBasket} />
      <TrustStrip />
      <FeaturedSection onView={openProduct} />

      <section id="collection" className="scroll-mt-24 bg-[#fffdf8] py-16 sm:py-24">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
          <div className="section-heading-row"><div><p className="eyebrow">Diwali catalogue</p><h2 className="section-title">Explore every selection</h2></div><p>All {catalogueSummary.totalItems} catalogue items, organised into four straightforward product groups.</p></div>
          <CollectionFilters query={query} onQueryChange={setQuery} category={category} onCategoryChange={setCategory} sort={sort} onSortChange={setSort} resultCount={visibleProducts.length} />
          {visibleProducts.length ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{visibleProducts.map((item, index) => <ProductCard key={item.id} item={item} index={index} onView={openProduct} onAdd={addToBasket} />)}</div>
          ) : (
            <div className="empty-state"><Search className="mx-auto size-8 text-[#a57732]" aria-hidden="true" /><h3>No products match those filters</h3><p>Try another search or return to the full catalogue.</p><Button variant="outline" className="mt-5 rounded-full border-[#bca16d] bg-transparent" onClick={() => { setQuery(""); setCategory("all"); }}>Clear filters</Button></div>
          )}
        </div>
      </section>

      <PackagingSpotlight onViewMithai={() => setCategory("mithai-boxes-mix")} />
      <CorporateSection />
      <CustomGiftingSection />
      <Footer />

      <ProductDialog item={selectedItem} onClose={() => setSelectedItem(null)} onAdd={addToBasket} />
      <CartDrawer open={basketOpen} onOpenChange={setBasketOpen} lines={basketLines} customer={customer} onCustomerChange={updateCustomer} onQuantityChange={updateQuantity} onRemove={removeItem} onClear={clearBasket} />
      <FloatingEnquiryActions count={basketCount} onOpen={openBasket} />
      <MobileBasketBar count={basketCount} total={basketTotal} unpricedLines={unpricedLines} onOpen={openBasket} />
      <output className="sr-only" aria-live="polite" aria-atomic="true">{status}</output>
    </main>
  );
}
