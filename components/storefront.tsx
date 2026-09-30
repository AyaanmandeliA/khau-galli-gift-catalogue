"use client";

import { type FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  Building2,
  Check,
  Gift,
  Heart,
  AtSign,
  MapPin,
  MessageCircle,
  Minus,
  PackageOpen,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { products, type Product } from "@/data/products";

const WHATSAPP_NUMBER = "971525596653";
const CART_STORAGE_KEY = "khau-galli-diwali-hamper-order-v1";

type Cart = Record<string, number>;
type CustomerDetails = {
  name: string;
  mobile: string;
  deliveryArea: string;
  preferredDeliveryDate: string;
};
type FilterKey = "all" | "under-50" | "50-99" | "100-149" | "150-plus";
type SortKey = "featured" | "price-asc" | "price-desc";
type AnalyticsEvent =
  | "view_product"
  | "add_to_order"
  | "remove_from_order"
  | "whatsapp_product_click"
  | "whatsapp_cart_checkout"
  | "bulk_order_click";

const filters: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All Hampers" },
  { key: "under-50", label: "Under AED 50" },
  { key: "50-99", label: "AED 50–99" },
  { key: "100-149", label: "AED 100–149" },
  { key: "150-plus", label: "AED 150+" },
];

const emptyCustomerDetails: CustomerDetails = {
  name: "",
  mobile: "",
  deliveryArea: "",
  preferredDeliveryDate: "",
};

const values = [
  [Gift, "Premium Dry Fruits & Sweets"],
  [Sparkles, "Beautifully Curated Hampers"],
  [Heart, "Perfect for Every Occasion"],
  [Building2, "Corporate & Bulk Gifting Available"],
] as const;

const genericMessage =
  "Hi Khau Galli! I'm interested in your Diwali hamper collection. Could you help me place an order?";

const bulkMessage = `Hi Khau Galli! I'm interested in a corporate/bulk Diwali hamper order.

Company Name:
Approximate Quantity:
Budget Per Hamper:
Preferred Delivery Date:

Please share the available options.`;

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

function buildOrderMessage(
  items: { product: Product; quantity: number }[],
  customer: CustomerDetails,
) {
  const itemLines = items
    .map(({ product, quantity }) => {
      const subtotal = product.price * quantity;
      return `${quantity} × ${product.name} (${product.code})
AED ${product.price} each
Subtotal: AED ${subtotal}`;
    })
    .join("\n\n");
  const total = items.reduce(
    (sum, { product, quantity }) => sum + product.price * quantity,
    0,
  );

  return `Hi Khau Galli!

I'd like to place an enquiry/order for your Diwali hampers.

My selection:

${itemLines}

Estimated Total: AED ${total}

Customer details:
Name: ${customer.name.trim()}
Mobile: ${customer.mobile.trim()}
Delivery Area: ${customer.deliveryArea.trim()}
Preferred Delivery Date: ${customer.preferredDeliveryDate}

Please confirm availability and final order details.`;
}

function hasCompleteCustomerDetails(customer: CustomerDetails) {
  return Boolean(
    customer.name.trim().length >= 2
      && customer.mobile.replace(/\D/g, "").length >= 7
      && customer.deliveryArea.trim().length >= 2
      && customer.preferredDeliveryDate,
  );
}

function QuantitySelector({
  quantity,
  onChange,
  label,
}: {
  quantity: number;
  onChange: (quantity: number) => void;
  label: string;
}) {
  return (
    <div className="inline-flex h-12 items-center rounded-full border border-[#c89a50]/35 bg-[#fffaf0] p-1" aria-label={label}>
      <button
        type="button"
        className="grid size-10 place-items-center rounded-full text-[#681c25] transition hover:bg-[#f4e2bc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b56b16]"
        onClick={() => onChange(Math.max(1, quantity - 1))}
        aria-label="Decrease quantity"
      >
        <Minus className="size-4" aria-hidden="true" />
      </button>
      <output className="min-w-9 text-center text-base font-black text-[#4f1b21]" aria-live="polite">{quantity}</output>
      <button
        type="button"
        className="grid size-10 place-items-center rounded-full text-[#681c25] transition hover:bg-[#f4e2bc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b56b16]"
        onClick={() => onChange(quantity + 1)}
        aria-label="Increase quantity"
      >
        <Plus className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}

function Header({ count, onCartOpen }: { count: number; onCartOpen: () => void }) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#a9742a]/15 bg-[#fffaf0]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1480px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="#top" aria-label="Khau Galli hamper collection home">
          <Image src="/khau-galli-wordmark.png" alt="Khau Galli" width={230} height={35} priority className="h-auto w-[160px] sm:w-[215px]" />
        </a>
        <nav className="flex items-center gap-2 sm:gap-4" aria-label="Primary navigation">
          <a className="hidden text-sm font-semibold text-[#681c25] transition hover:text-[#b56b16] md:block" href="#hampers">Shop hampers</a>
          <a className="hidden text-sm font-semibold text-[#681c25] transition hover:text-[#b56b16] md:block" href="#bulk-gifting">Bulk gifting</a>
          <button
            type="button"
            className="relative inline-flex h-11 items-center gap-2 rounded-full border border-[#b56b16]/30 bg-white/70 px-4 text-sm font-extrabold text-[#681c25] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b56b16]"
            onClick={onCartOpen}
            aria-label={`Open order summary, ${count} item${count === 1 ? "" : "s"}`}
          >
            <ShoppingBag className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">Your order</span>
            <span key={count} className="cart-badge grid size-6 place-items-center rounded-full bg-[#681c25] text-xs text-white">{count}</span>
          </button>
          <a className="festive-button h-11 px-4" href={whatsappUrl(genericMessage)} target="_blank" rel="noreferrer">
            <MessageCircle aria-hidden="true" />
            <span className="hidden lg:inline">WhatsApp</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero({ onOrderOpen }: { onOrderOpen: () => void }) {
  return (
    <section id="top" className="relative isolate overflow-hidden border-b border-[#a9742a]/15">
      <div className="festive-glow absolute inset-0 -z-10" aria-hidden="true" />
      <div className="mx-auto grid max-w-[1480px] items-center gap-9 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1.03fr_.97fr] lg:px-12 lg:py-20">
        <div className="max-w-3xl">
          <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-[#a66a1c] sm:text-sm"><span className="h-px w-10 bg-[#d0a34f]" />Diwali 2026 · UAE</p>
          <h1 className="font-display text-[clamp(3.15rem,8vw,7.4rem)] leading-[.84] tracking-[-0.045em] text-[#681c25]">Festive Hamper <em className="block font-normal text-[#b56b16]">Collection</em></h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[#6e4a46] sm:text-xl">Thoughtfully curated gifting, beautifully presented for the season of lights.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a className="festive-button justify-center px-7 py-4" href="#hampers">Shop hampers<ShoppingBag aria-hidden="true" /></a>
            <button type="button" className="festive-button-secondary justify-center px-7 py-4" onClick={onOrderOpen}><MessageCircle aria-hidden="true" />Order on WhatsApp</button>
          </div>
        </div>
        <div className="relative min-h-[390px] lg:min-h-[590px]">
          <div className="absolute left-[4%] top-[4%] h-[78%] w-[72%] overflow-hidden rounded-[2rem] border border-[#f1d9aa] bg-white p-2 shadow-[0_35px_90px_rgba(76,28,22,.2)] sm:rounded-[3rem]">
            <Image src="/products/royal-heritage-deluxe-box.webp" alt="Royal Heritage Deluxe Box, KHP 0036" fill priority sizes="(max-width: 1024px) 75vw, 36vw" className="rounded-[1.6rem] object-cover sm:rounded-[2.6rem]" />
          </div>
          <div className="absolute bottom-[3%] right-[2%] h-[53%] w-[48%] overflow-hidden rounded-[1.7rem] border-[7px] border-[#fffaf0] bg-white shadow-[0_30px_80px_rgba(76,28,22,.24)] sm:rounded-[2.5rem]">
            <Image src="/products/divya-darshan-box.webp" alt="Divya Darshan Box, KHP 0031" fill priority sizes="(max-width: 1024px) 48vw, 24vw" className="object-cover" />
          </div>
          <div className="absolute right-[8%] top-0 rounded-full border border-[#d3a64f]/45 bg-[#fff8e8]/95 px-4 py-2 text-sm font-bold text-[#7b2b2e] shadow-lg backdrop-blur">27 festive gifts</div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section aria-label="Why choose Khau Galli hampers" className="border-b border-[#a9742a]/15 bg-[#fffdf7]">
      <div className="mx-auto grid max-w-[1480px] grid-cols-2 divide-x divide-y divide-[#a9742a]/15 px-5 sm:px-8 lg:grid-cols-4 lg:divide-y-0 lg:px-12">
        {values.map(([Icon, label]) => (
          <div key={label} className="flex min-h-28 items-center gap-3 px-3 py-6 sm:px-6">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#f7e7bf] text-[#8a3b27]"><Icon className="size-5" aria-hidden="true" /></span>
            <p className="text-sm font-semibold leading-5 text-[#5e3232] sm:text-base">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProductCard({
  product,
  index,
  onView,
  onOrder,
}: {
  product: Product;
  index: number;
  onView: (product: Product) => void;
  onOrder: (product: Product, quantity: number) => void;
}) {
  return (
    <article className="product-card reveal-up overflow-hidden rounded-[1.6rem] border border-[#bd8739]/20 bg-[#fffdf7] shadow-[0_16px_45px_rgba(70,28,20,.08)]" style={{ animationDelay: `${Math.min(index, 7) * 45}ms` }}>
      <button type="button" className="group relative block aspect-[4/3] w-full overflow-hidden bg-[#f3ead8] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#b56b16]" onClick={() => onView(product)} aria-label={`View ${product.name} details`}>
        <Image src={product.image} alt={`${product.name} hamper`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw" className="product-image object-cover" />
        <span className="absolute left-4 top-4 rounded-full bg-[#fffaf0]/92 px-3 py-1.5 text-xs font-black tracking-wide text-[#681c25] shadow-sm backdrop-blur">{product.weight}</span>
      </button>
      <div className="flex min-h-[260px] flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-[1.6rem] leading-7 text-[#5e1821]">{product.name}</h3>
            <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-[#9b6b52]">{product.code}</p>
          </div>
          <p className="shrink-0 text-lg font-black text-[#a45119]">AED {product.price}</p>
        </div>
        <p className="mt-4 line-clamp-2 min-h-12 text-sm leading-6 text-[#6d5550]">{product.contents.join(", ")}</p>
        <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
          <Button variant="outline" className="h-11 rounded-full border-[#b67b2a]/30 bg-transparent text-[#681c25] hover:bg-[#f7e7bf]" onClick={() => onView(product)}>View details</Button>
          <Button className="h-11 rounded-full bg-[#681c25] px-3 text-white hover:bg-[#7b2630]" onClick={() => onOrder(product, 1)}><MessageCircle aria-hidden="true" />Order</Button>
        </div>
      </div>
    </article>
  );
}

function ProductModal({
  product,
  onClose,
  onAdd,
  onOrder,
}: {
  product: Product | null;
  onClose: () => void;
  onAdd: (product: Product, quantity: number) => void;
  onOrder: (product: Product, quantity: number) => void;
}) {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => setQuantity(1), [product]);

  return (
    <Dialog open={Boolean(product)} onOpenChange={(open) => !open && onClose()}>
      {product ? (
        <DialogContent className="max-h-[92vh] max-w-[1040px] overflow-y-auto border-[#c89a50]/25 bg-[#fffaf0] p-0 sm:rounded-[2rem]">
          <div className="grid md:grid-cols-[1.05fr_.95fr]">
            <div className="relative min-h-[310px] overflow-hidden bg-[#efe1ca] md:min-h-[650px] md:rounded-l-[2rem]">
              <Image src={product.image} alt={`${product.name} hamper`} fill sizes="(max-width: 768px) 100vw, 52vw" className="object-cover" />
            </div>
            <div className="flex flex-col p-6 sm:p-9 md:p-11">
              <DialogHeader className="pr-7 text-left">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#a66a1c]">{product.code} · {product.weight}</p>
                <DialogTitle className="font-display text-4xl leading-none text-[#681c25] sm:text-5xl">{product.name}</DialogTitle>
                <DialogDescription className="pt-2 text-lg font-black text-[#a45119]">AED {product.price}</DialogDescription>
              </DialogHeader>
              <div className="mt-8 border-y border-[#b77a27]/20 py-6">
                <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-[#8b5d42]">What&apos;s inside</p>
                <ul className="grid gap-2 text-base text-[#5f4140]">
                  {product.contents.map((item) => <li key={item} className="flex items-center gap-3"><span className="grid size-5 shrink-0 place-items-center rounded-full bg-[#f2dbab] text-[#7b2b2e]"><Check className="size-3" aria-hidden="true" /></span>{item}</li>)}
                </ul>
              </div>
              <div className="mt-7 flex items-center justify-between gap-4">
                <div><p className="text-sm font-bold text-[#5f4140]">Quantity</p><p className="text-xs text-[#8b716a]">AED {product.price * quantity} subtotal</p></div>
                <QuantitySelector quantity={quantity} onChange={setQuantity} label={`Quantity for ${product.name}`} />
              </div>
              <div className="mt-auto grid gap-3 pt-8">
                <Button className="h-13 rounded-full bg-[#681c25] text-base text-white hover:bg-[#7b2630]" onClick={() => onAdd(product, quantity)}><ShoppingBag aria-hidden="true" />Add to order</Button>
                <Button variant="outline" className="h-13 rounded-full border-[#a66a1c]/40 bg-transparent text-base text-[#681c25] hover:bg-[#f7e7bf]" onClick={() => onOrder(product, quantity)}><MessageCircle aria-hidden="true" />Order this hamper</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      ) : null}
    </Dialog>
  );
}

function Filters({
  query,
  onQueryChange,
  filter,
  onFilterChange,
  sort,
  onSortChange,
  resultCount,
}: {
  query: string;
  onQueryChange: (query: string) => void;
  filter: FilterKey;
  onFilterChange: (filter: FilterKey) => void;
  sort: SortKey;
  onSortChange: (sort: SortKey) => void;
  resultCount: number;
}) {
  return (
    <div className="mb-8 rounded-[1.6rem] border border-[#b77a27]/20 bg-[#fffdf7] p-4 shadow-[0_10px_35px_rgba(70,28,20,.05)] sm:p-5">
      <div className="grid gap-3 lg:grid-cols-[minmax(280px,1fr)_auto]">
        <label className="relative block">
          <span className="sr-only">Search hampers</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#926b5e]" aria-hidden="true" />
          <Input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search by hamper, code or contents" className="h-12 rounded-full border-[#b77a27]/25 bg-[#fffaf0] pl-12 pr-11 text-base shadow-none focus-visible:ring-[#b56b16]/40" />
          {query ? <button type="button" onClick={() => onQueryChange("")} className="absolute right-3 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-[#7c625d] hover:bg-[#f2dfbb]" aria-label="Clear search"><X className="size-4" /></button> : null}
        </label>
        <Select value={sort} onValueChange={(value) => onSortChange(value as SortKey)}>
          <SelectTrigger aria-label="Sort hampers" className="h-12 w-full rounded-full border-[#b77a27]/25 bg-[#fffaf0] px-5 text-base shadow-none lg:w-[220px]"><SelectValue /></SelectTrigger>
          <SelectContent className="border-[#b77a27]/20 bg-[#fffdf7]">
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="scrollbar-none -mx-1 flex min-w-0 flex-1 gap-2 overflow-x-auto px-1 pb-1" role="group" aria-label="Price filters">
          {filters.map((option) => (
            <button key={option.key} type="button" onClick={() => onFilterChange(option.key)} className={`shrink-0 rounded-full border px-4 py-2.5 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b56b16] ${filter === option.key ? "border-[#681c25] bg-[#681c25] text-white" : "border-[#b77a27]/25 bg-[#fffaf0] text-[#6e3a36] hover:border-[#b77a27]/55"}`} aria-pressed={filter === option.key}>{option.label}</button>
          ))}
        </div>
        <p className="hidden shrink-0 text-sm font-semibold text-[#83675f] sm:block">{resultCount} {resultCount === 1 ? "hamper" : "hampers"}</p>
      </div>
    </div>
  );
}

function CartDrawer({
  open,
  onOpenChange,
  cartItems,
  customerDetails,
  onCustomerChange,
  onQuantityChange,
  onRemove,
  onClear,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cartItems: { product: Product; quantity: number }[];
  customerDetails: CustomerDetails;
  onCustomerChange: (field: keyof CustomerDetails, value: string) => void;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (product: Product) => void;
  onClear: () => void;
}) {
  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const handleCheckout = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!hasCompleteCustomerDetails(customerDetails)) {
      event.currentTarget.reportValidity();
      return;
    }
    const message = buildOrderMessage(cartItems, customerDetails);
    trackEvent("whatsapp_cart_checkout", { item_count: count, estimated_total: total });
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  };
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full border-l-[#b77a27]/20 bg-[#fffaf0] p-0 sm:max-w-[500px]">
        <SheetHeader className="border-b border-[#b77a27]/15 p-6 pr-14 text-left">
          <SheetTitle className="font-display text-3xl text-[#681c25]">Order summary</SheetTitle>
          <SheetDescription>{count ? `${count} hamper${count === 1 ? "" : "s"} selected. Add your details before continuing to WhatsApp.` : "Add hampers to start your order enquiry."}</SheetDescription>
        </SheetHeader>
        <div className="scrollbar-thin flex-1 overflow-y-auto px-5 py-5">
          {cartItems.length ? (
            <>
              <div className="space-y-4">
                {cartItems.map(({ product, quantity }) => (
                  <article key={product.id} className="rounded-2xl border border-[#b77a27]/18 bg-[#fffdf7] p-3 shadow-sm">
                    <div className="flex gap-3">
                      <div className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-[#efe2cc]"><Image src={product.image} alt="" fill sizes="96px" className="object-cover" /></div>
                      <div className="min-w-0 flex-1 py-1">
                        <div className="flex items-start justify-between gap-2">
                          <div><h3 className="font-display text-xl leading-5 text-[#681c25]">{product.name}</h3><p className="mt-1 text-xs font-bold tracking-wide text-[#9a715d]">{product.code}</p></div>
                          <button type="button" onClick={() => onRemove(product)} className="grid size-9 shrink-0 place-items-center rounded-full text-[#9a4c47] hover:bg-[#f6dfdc]" aria-label={`Remove ${product.name}`}><Trash2 className="size-4" /></button>
                        </div>
                        <p className="mt-2 text-sm font-black text-[#a45119]">AED {product.price * quantity}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between border-t border-[#b77a27]/12 pt-3">
                      <span className="text-xs font-semibold text-[#80645d]">AED {product.price} each</span>
                      <QuantitySelector quantity={quantity} onChange={(next) => onQuantityChange(product.id, next)} label={`Quantity for ${product.name}`} />
                    </div>
                  </article>
                ))}
              </div>

              <form id="kg-order-details" className="mt-6 rounded-2xl border border-[#b77a27]/22 bg-[#fffdf7] p-4 sm:p-5" onSubmit={handleCheckout}>
                <div className="flex items-start justify-between gap-4">
                  <div><p className="text-xs font-black uppercase tracking-[0.18em] text-[#a66a1c]">Delivery details</p><h3 className="mt-1 font-display text-2xl text-[#681c25]">Tell us where to reach you</h3></div>
                  <span className="rounded-full bg-[#f5e5c3] px-3 py-1 text-[11px] font-bold text-[#7b2b2e]">Required</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-[#7c625d]">These details are added to your WhatsApp message so Khau Galli can respond with a complete order enquiry.</p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-1.5 text-sm font-bold text-[#5f4140]">
                    Full name <span className="sr-only">required</span>
                    <Input required minLength={2} autoComplete="name" value={customerDetails.name} onChange={(event) => onCustomerChange("name", event.target.value)} placeholder="Your full name" className="h-11 border-[#b77a27]/25 bg-[#fffaf0] font-normal shadow-none focus-visible:ring-[#b56b16]/40" />
                  </label>
                  <label className="grid gap-1.5 text-sm font-bold text-[#5f4140]">
                    Mobile number <span className="sr-only">required</span>
                    <Input required type="tel" inputMode="tel" autoComplete="tel" pattern="[+0-9 ()-]{7,20}" title="Enter a valid mobile number" value={customerDetails.mobile} onChange={(event) => onCustomerChange("mobile", event.target.value)} placeholder="e.g. +971 50 123 4567" className="h-11 border-[#b77a27]/25 bg-[#fffaf0] font-normal shadow-none focus-visible:ring-[#b56b16]/40" />
                  </label>
                  <label className="grid gap-1.5 text-sm font-bold text-[#5f4140] sm:col-span-2">
                    Delivery area <span className="sr-only">required</span>
                    <Input required minLength={2} autoComplete="address-level2" value={customerDetails.deliveryArea} onChange={(event) => onCustomerChange("deliveryArea", event.target.value)} placeholder="Area or neighbourhood in the UAE" className="h-11 border-[#b77a27]/25 bg-[#fffaf0] font-normal shadow-none focus-visible:ring-[#b56b16]/40" />
                  </label>
                  <label className="grid gap-1.5 text-sm font-bold text-[#5f4140] sm:col-span-2">
                    Preferred delivery date <span className="sr-only">required</span>
                    <Input required type="date" value={customerDetails.preferredDeliveryDate} onChange={(event) => onCustomerChange("preferredDeliveryDate", event.target.value)} className="h-11 border-[#b77a27]/25 bg-[#fffaf0] font-normal shadow-none focus-visible:ring-[#b56b16]/40" />
                  </label>
                </div>
                <p className="mt-4 text-xs leading-5 text-[#92746c]">Nothing is submitted on this page. Your details are only inserted into the WhatsApp message you choose to send.</p>
              </form>
            </>
          ) : (
            <div className="grid min-h-[55vh] place-items-center text-center">
              <div><span className="mx-auto grid size-16 place-items-center rounded-full bg-[#f3e1bd] text-[#7b2b2e]"><PackageOpen className="size-7" /></span><h3 className="mt-5 font-display text-2xl text-[#681c25]">Your order is empty</h3><p className="mt-2 max-w-xs text-sm leading-6 text-[#7c625d]">Choose a hamper, set the quantity and add it here. No payment is taken online.</p><Button variant="outline" className="mt-6 rounded-full border-[#b77a27]/30 bg-transparent" onClick={() => onOpenChange(false)}>Continue shopping</Button></div>
            </div>
          )}
        </div>
        {cartItems.length ? (
          <SheetFooter className="border-t border-[#b77a27]/15 bg-[#fffdf7] p-5 sm:p-6">
            <div className="mb-2 flex items-end justify-between"><div><p className="text-sm font-bold text-[#74544f]">Estimated total</p><p className="text-xs text-[#94766d]">Availability and final details are confirmed on WhatsApp.</p></div><p className="font-display text-3xl font-bold text-[#681c25]">AED {total}</p></div>
            <Button type="submit" form="kg-order-details" className="h-13 rounded-full bg-[#681c25] text-base text-white hover:bg-[#7b2630]"><MessageCircle aria-hidden="true" />Continue on WhatsApp</Button>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="rounded-full border-[#b77a27]/25 bg-transparent" onClick={() => onOpenChange(false)}>Continue shopping</Button>
              <Button variant="ghost" className="rounded-full text-[#93483f] hover:bg-[#f6dfdc]" onClick={onClear}><Trash2 aria-hidden="true" />Clear order</Button>
            </div>
          </SheetFooter>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}

function BulkOrderSection() {
  return (
    <section id="bulk-gifting" className="relative overflow-hidden bg-[#5c1720] text-[#fff8e8]">
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_2px_2px,#f1c76b_1px,transparent_0)] [background-size:28px_28px]" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-[1480px] items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:px-12 lg:py-24">
        <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-white/15 shadow-2xl lg:min-h-[520px]">
          <Image src="/products/tree-of-treats-hamper.webp" alt="Tree of Treats corporate gifting hamper" fill sizes="(max-width: 1024px) 100vw, 44vw" className="object-cover" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#3b0b12] to-transparent p-6 pt-20"><p className="text-sm font-bold uppercase tracking-[0.2em] text-[#f1c76b]">Curated for larger celebrations</p></div>
        </div>
        <div className="lg:pl-10">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.25em] text-[#efc46b]">Corporate & Bulk Gifting</p>
          <h2 className="font-display text-4xl leading-[.98] sm:text-6xl lg:text-7xl">Make Diwali Memorable for Your Team & Clients</h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#f5e5cf]">Thoughtful festive gifting for employees, clients, events, corporate celebrations and larger quantities — curated with the same Khau Galli detail.</p>
          <div className="mt-7 grid gap-3 text-sm text-[#f8ecd8] sm:grid-cols-2">
            {["Employee gifting", "Client hampers", "Event gifting", "Corporate celebrations"].map((item) => <p key={item} className="flex items-center gap-3"><span className="grid size-6 place-items-center rounded-full bg-[#efc46b] text-[#5c1720]"><Check className="size-3.5" /></span>{item}</p>)}
          </div>
          <Button asChild className="mt-9 h-13 rounded-full bg-[#f1c76b] px-7 text-base font-black text-[#4d121a] hover:bg-[#f7d889]"><a href={whatsappUrl(bulkMessage)} target="_blank" rel="noreferrer" onClick={() => trackEvent("bulk_order_click")}><MessageCircle aria-hidden="true" />Enquire for bulk orders</a></Button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#341014] pb-24 text-[#f8ecd8] sm:pb-10">
      <div className="mx-auto grid max-w-[1480px] gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1fr_auto] lg:px-12">
        <div><Image src="/khau-galli-wordmark.png" alt="Khau Galli" width={230} height={35} className="h-auto w-[210px] brightness-0 invert" /><p className="mt-5 text-sm font-semibold tracking-wide text-[#e6cfb0]">Dryfruits | Sweets | Namkeen | Festive Hampers</p><p className="mt-2 text-sm text-[#cdb89e]">UAE</p></div>
        <div className="grid gap-3 text-sm md:min-w-72">
          <a href={whatsappUrl(genericMessage)} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 transition hover:border-[#e9bd65]/50"><MessageCircle className="size-5 text-[#efc46b]" />+971 52 559 6653</a>
          <span className="flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 text-[#bba990]"><AtSign className="size-5" />Instagram — link to be added</span>
          <span className="flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 text-[#bba990]"><MapPin className="size-5" />Location — link to be added</span>
        </div>
      </div>
      <div className="mx-auto max-w-[1480px] border-t border-white/10 px-5 pt-5 text-xs leading-5 text-[#aa9781] sm:px-8 lg:px-12">Orders are enquiries sent through WhatsApp. Availability and final order details are confirmed by Khau Galli.</div>
    </footer>
  );
}

function MobileOrderBar({ count, total, detailsComplete, onOpen }: { count: number; total: number; detailsComplete: boolean; onOpen: () => void }) {
  if (!count) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#a9742a]/20 bg-[#fffaf0]/96 p-3 shadow-[0_-12px_35px_rgba(70,28,20,.12)] backdrop-blur-xl sm:hidden">
      <button type="button" onClick={onOpen} className="flex h-14 w-full items-center justify-between rounded-full bg-[#681c25] px-5 text-left text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5b755] focus-visible:ring-offset-2">
        <span className="flex items-center gap-3"><span className="grid size-8 place-items-center rounded-full bg-white/15 text-sm font-black">{count}</span><span><strong className="block text-sm">View your order</strong><small className="block text-xs text-white/75">{detailsComplete ? "Ready for WhatsApp" : "Add delivery details"}</small></span></span>
        <strong className="text-base">AED {total}</strong>
      </button>
    </div>
  );
}

export default function Storefront() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterKey>("all");
  const [sort, setSort] = useState<SortKey>("featured");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<Cart>({});
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>(emptyCustomerDetails);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartHydrated, setCartHydrated] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) setCart(JSON.parse(saved) as Cart);
    } catch {
      localStorage.removeItem(CART_STORAGE_KEY);
    } finally {
      setCartHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (cartHydrated) localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart, cartHydrated]);

  const cartItems = useMemo(
    () => products.filter((product) => cart[product.id]).map((product) => ({ product, quantity: cart[product.id] })),
    [cart],
  );
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const customerDetailsComplete = hasCompleteCustomerDetails(customerDetails);

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const matchesSearch = !normalizedQuery || [product.name, product.code, product.contents.join(" ")].some((value) => value.toLowerCase().includes(normalizedQuery));
      const matchesPrice = filter === "all" || (filter === "under-50" && product.price < 50) || (filter === "50-99" && product.price >= 50 && product.price <= 99) || (filter === "100-149" && product.price >= 100 && product.price <= 149) || (filter === "150-plus" && product.price >= 150);
      return matchesSearch && matchesPrice;
    });
    return filtered.sort((a, b) => sort === "price-asc" ? a.price - b.price : sort === "price-desc" ? b.price - a.price : a.featuredOrder - b.featuredOrder);
  }, [query, filter, sort]);

  const addToOrder = useCallback((product: Product, quantity: number) => {
    setCart((current) => ({ ...current, [product.id]: (current[product.id] ?? 0) + quantity }));
    setStatus(`${quantity} × ${product.name} added to your order.`);
    setSelectedProduct(null);
    trackEvent("add_to_order", { product_id: product.id, product_code: product.code, quantity, unit_price: product.price });
  }, []);

  const orderNow = useCallback((product: Product, quantity: number) => {
    setCart((current) => ({ ...current, [product.id]: (current[product.id] ?? 0) + quantity }));
    setStatus(`${quantity} × ${product.name} added. Complete your delivery details to continue.`);
    setSelectedProduct(null);
    setCartOpen(true);
    trackEvent("add_to_order", { product_id: product.id, product_code: product.code, quantity, unit_price: product.price, source: "order_button" });
  }, []);

  const openProduct = useCallback((product: Product) => {
    setSelectedProduct(product);
    trackEvent("view_product", { product_id: product.id, product_code: product.code, price: product.price });
  }, []);

  const changeCartQuantity = useCallback((id: string, quantity: number) => setCart((current) => ({ ...current, [id]: Math.max(1, quantity) })), []);
  const removeFromOrder = useCallback((product: Product) => {
    setCart((current) => { const next = { ...current }; delete next[product.id]; return next; });
    setStatus(`${product.name} removed from your order.`);
    trackEvent("remove_from_order", { product_id: product.id, product_code: product.code });
  }, []);
  const updateCustomerDetails = useCallback((field: keyof CustomerDetails, value: string) => {
    setCustomerDetails((current) => ({ ...current, [field]: value }));
  }, []);
  const clearOrder = useCallback(() => {
    setCart({});
    setCustomerDetails({ ...emptyCustomerDetails });
    setStatus("Your order and delivery details have been cleared.");
  }, []);

  useEffect(() => {
    const modelContext = (document as unknown as {
      modelContext?: {
        registerTool: (tool: Record<string, unknown>, options?: { signal?: AbortSignal }) => void | Promise<void>;
      };
    }).modelContext;
    if (!modelContext?.registerTool) return;
    const lifecycle = new AbortController();
    const register = (tool: Record<string, unknown>) => {
      try { void Promise.resolve(modelContext.registerTool(tool, { signal: lifecycle.signal })).catch(() => undefined); } catch { /* Unsupported WebMCP host. */ }
    };

    register({
      name: "list_hampers",
      title: "List festive hampers",
      description: "Read the available Khau Galli Diwali hampers, optionally filtered by search text or maximum price.",
      inputSchema: { type: "object", properties: { query: { type: "string" }, maxPrice: { type: "number", minimum: 0 } }, additionalProperties: false },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute: (input: unknown) => {
        const value = input && typeof input === "object" ? input as { query?: unknown; maxPrice?: unknown } : {};
        if (value.query !== undefined && typeof value.query !== "string") throw new Error("query must be a string");
        if (value.maxPrice !== undefined && (typeof value.maxPrice !== "number" || value.maxPrice < 0)) throw new Error("maxPrice must be a non-negative number");
        const search = typeof value.query === "string" ? value.query.toLowerCase() : "";
        const maxPrice = typeof value.maxPrice === "number" ? value.maxPrice : undefined;
        return products.filter((product) => (!search || `${product.name} ${product.code} ${product.contents.join(" ")}`.toLowerCase().includes(search)) && (maxPrice === undefined || product.price <= maxPrice)).map(({ id, name, code, price, weight, contents }) => ({ id, name, code, price, weight, contents }));
      },
    });
    register({
      name: "add_hampers_to_order",
      title: "Add hampers to order",
      description: "Add one or more catalogue hampers to the same visible order summary. This stages an enquiry and does not confirm an order.",
      inputSchema: { type: "object", properties: { items: { type: "array", minItems: 1, items: { type: "object", properties: { id: { type: "string" }, quantity: { type: "integer", minimum: 1 } }, required: ["id", "quantity"], additionalProperties: false } } }, required: ["items"], additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute: (input: unknown) => {
        const value = input as { items?: { id?: unknown; quantity?: unknown }[] };
        if (!Array.isArray(value?.items) || !value.items.length) throw new Error("items must be a non-empty array");
        const additions = value.items.map((item) => {
          if (typeof item.id !== "string" || !Number.isInteger(item.quantity) || Number(item.quantity) < 1) throw new Error("Each item needs a valid id and positive integer quantity");
          const product = products.find((candidate) => candidate.id === item.id);
          if (!product) throw new Error(`Unknown hamper id: ${item.id}`);
          return { product, quantity: Number(item.quantity) };
        });
        setCart((current) => {
          const next = { ...current };
          additions.forEach(({ product, quantity }) => { next[product.id] = (next[product.id] ?? 0) + quantity; });
          return next;
        });
        setStatus(`${additions.length} hamper selection${additions.length === 1 ? "" : "s"} added to your order.`);
        return { staged: true, added: additions.map(({ product, quantity }) => ({ id: product.id, quantity })) };
      },
    });
    register({
      name: "read_order_summary",
      title: "Read order summary",
      description: "Read the hampers currently staged in the visible order summary and the estimated total.",
      inputSchema: { type: "object", properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute: () => ({ items: cartItems.map(({ product, quantity }) => ({ id: product.id, name: product.name, code: product.code, quantity, subtotal: product.price * quantity })), estimatedTotal: cartTotal }),
    });
    register({
      name: "prepare_whatsapp_order",
      title: "Prepare WhatsApp order enquiry",
      description: "Prepare, but do not send, a complete WhatsApp order enquiry using the visible order summary and required customer delivery details.",
      inputSchema: {
        type: "object",
        properties: {
          name: { type: "string", minLength: 2 },
          mobile: { type: "string", minLength: 7 },
          deliveryArea: { type: "string", minLength: 2 },
          preferredDeliveryDate: { type: "string", minLength: 1 },
        },
        required: ["name", "mobile", "deliveryArea", "preferredDeliveryDate"],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute: (input: unknown) => {
        if (!cartItems.length) throw new Error("The order summary is empty");
        const value = input && typeof input === "object" ? input as Partial<CustomerDetails> : {};
        const customer: CustomerDetails = {
          name: typeof value.name === "string" ? value.name : "",
          mobile: typeof value.mobile === "string" ? value.mobile : "",
          deliveryArea: typeof value.deliveryArea === "string" ? value.deliveryArea : "",
          preferredDeliveryDate: typeof value.preferredDeliveryDate === "string" ? value.preferredDeliveryDate : "",
        };
        if (!hasCompleteCustomerDetails(customer)) throw new Error("Complete name, mobile, delivery area and preferred delivery date are required");
        const message = buildOrderMessage(cartItems, customer);
        return { message, url: whatsappUrl(message), estimatedTotal: cartTotal, orderConfirmed: false };
      },
    });
    return () => lifecycle.abort();
  }, [cartItems, cartTotal]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#fffaf0] text-[#3b171b]">
      <Header count={cartCount} onCartOpen={() => setCartOpen(true)} />
      <Hero onOrderOpen={() => setCartOpen(true)} />
      <TrustStrip />

      <section id="hampers" className="mx-auto max-w-[1480px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mb-10 flex items-end justify-between gap-5">
          <div><p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-[#a66a1c]">The collection</p><h2 className="font-display text-4xl leading-none text-[#681c25] sm:text-6xl">Gifts worth gathering for</h2></div>
          <p className="hidden max-w-sm text-right text-sm leading-6 text-[#7c625d] lg:block">Browse all 27 hampers from the Khau Galli festive catalogue, from thoughtful tokens to grand gifts.</p>
        </div>
        <Filters query={query} onQueryChange={setQuery} filter={filter} onFilterChange={setFilter} sort={sort} onSortChange={setSort} resultCount={visibleProducts.length} />
        {visibleProducts.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{visibleProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index} onView={openProduct} onOrder={orderNow} />)}</div>
        ) : (
          <div className="grid min-h-72 place-items-center rounded-[1.8rem] border border-dashed border-[#b77a27]/35 bg-[#fffdf7] p-8 text-center"><div><Search className="mx-auto size-8 text-[#b17a3e]" /><h3 className="mt-4 font-display text-2xl text-[#681c25]">No hampers found</h3><p className="mt-2 text-sm text-[#7c625d]">Try another search or clear the price filter.</p><Button variant="outline" className="mt-5 rounded-full border-[#b77a27]/30 bg-transparent" onClick={() => { setQuery(""); setFilter("all"); }}>Clear filters</Button></div></div>
        )}
      </section>

      <BulkOrderSection />
      <Footer />
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAdd={addToOrder} onOrder={orderNow} />
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} cartItems={cartItems} customerDetails={customerDetails} onCustomerChange={updateCustomerDetails} onQuantityChange={changeCartQuantity} onRemove={removeFromOrder} onClear={clearOrder} />
      <a href={whatsappUrl(genericMessage)} target="_blank" rel="noreferrer" className={`fixed right-4 z-30 grid size-14 place-items-center rounded-full bg-[#1fa463] text-white shadow-[0_14px_35px_rgba(22,120,72,.35)] transition hover:-translate-y-1 hover:bg-[#168b52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#11613a] focus-visible:ring-offset-2 sm:bottom-6 sm:right-6 ${cartCount ? "bottom-[5.75rem]" : "bottom-5"}`} aria-label="Message Khau Galli on WhatsApp"><MessageCircle className="size-6" /></a>
      <MobileOrderBar count={cartCount} total={cartTotal} detailsComplete={customerDetailsComplete} onOpen={() => setCartOpen(true)} />
      <output className="sr-only" aria-live="polite" aria-atomic="true">{status}</output>
    </main>
  );
}
