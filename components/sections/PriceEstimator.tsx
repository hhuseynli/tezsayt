"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WhatsApp } from "@/components/ui/icons/WhatsApp";
import { waLink, cn } from "@/lib/utils";
import type { Locale } from "@/lib/constants";

type SiteType = "landing" | "business" | "store" | "custom";
type Addon = "booking" | "payments" | "blog" | "admin";

const basePrice: Record<SiteType, number> = { landing: 300, business: 600, store: 1000, custom: 1500 };
const includedPages: Record<SiteType, number> = { landing: 1, business: 6, store: 8, custom: 8 };
const baseDays: Record<SiteType, number> = { landing: 4, business: 9, store: 12, custom: 21 };
const addonPrices: Record<Addon, number> = { booking: 200, payments: 300, blog: 150, admin: 400 };
const supportPrice: Record<SiteType, number> = { landing: 100, business: 100, store: 200, custom: 200 };

export function PriceEstimator({ locale, dict }: { locale: Locale; dict: Record<string, string> }) {
  const [type, setType] = useState<SiteType>("business");
  const [pages, setPages] = useState(5);
  const [languages, setLanguages] = useState(1);
  const [addons, setAddons] = useState<Set<Addon>>(new Set());
  const [includeSupport, setIncludeSupport] = useState(false);

  const toggleAddon = (a: Addon) => setAddons((prev) => { const n = new Set(prev); n.has(a) ? n.delete(a) : n.add(a); return n; });

  const extraPages = Math.max(0, pages - includedPages[type]) * 50;
  const total = basePrice[type] + extraPages + (languages - 1) * 150 + Array.from(addons).reduce((s, a) => s + addonPrices[a], 0);
  const low = Math.floor(total / 50) * 50;
  const high = Math.ceil((total + 150) / 50) * 50;
  const days = baseDays[type] + Math.floor(Math.max(0, pages - includedPages[type]) / 50) + (languages - 1) * 2 + addons.size * 2;
  const monthly = supportPrice[type];

  const types: { key: SiteType; label: string }[] = [
    { key: "landing", label: dict["estimator.type.landing"] }, { key: "business", label: dict["estimator.type.business"] },
    { key: "store", label: dict["estimator.type.store"] }, { key: "custom", label: dict["estimator.type.custom"] },
  ];
  const addonList: { key: Addon; label: string }[] = [
    { key: "booking", label: dict["estimator.addon.booking"] }, { key: "payments", label: dict["estimator.addon.payments"] },
    { key: "blog", label: dict["estimator.addon.blog"] }, { key: "admin", label: dict["estimator.addon.admin"] },
  ];

  return (
    <div className="space-y-[24px]">
      <div>
        <p className="text-[14px] font-medium mb-[8px]">{dict["estimator.type.label"]}</p>
        <div className="grid grid-cols-2 md:flex">
          {types.map((t, i) => (
            <button key={t.key} onClick={() => setType(t.key)} className={cn(
              "px-[16px] py-[10px] text-[14px] font-medium transition-colors border md:flex-1",
              type === t.key ? "bg-accent text-white border-accent" : "bg-surface text-text border-border",
              i === 0 && "rounded-tl-[8px] md:rounded-l-[8px] md:rounded-tr-none",
              i === 1 && "rounded-tr-[8px] md:rounded-none",
              i === 2 && "rounded-bl-[8px] md:rounded-none",
              i === 3 && "rounded-br-[8px] md:rounded-r-[8px] md:rounded-bl-none",
              i > 0 && "md:border-l-0", i >= 2 && "border-t-0 md:border-t",
            )}>{t.label}</button>
          ))}
        </div>
      </div>
      <div>
        <div className="flex justify-between mb-[8px]"><p className="text-[14px] font-medium">{dict["estimator.pages.label"]}</p><span className="text-[15px] font-medium">{pages}</span></div>
        <input type="range" min={1} max={15} step={1} value={pages} onChange={(e) => setPages(Number(e.target.value))} className="w-full accent-accent" />
      </div>
      <div>
        <p className="text-[14px] font-medium mb-[8px]">{dict["estimator.languages.label"]}</p>
        <div className="flex">
          {[1, 2, 3].map((n, i) => (
            <button key={n} onClick={() => setLanguages(n)} className={cn(
              "px-[20px] py-[10px] text-[14px] font-medium border transition-colors",
              languages === n ? "bg-accent text-white border-accent" : "bg-surface text-text border-border",
              i === 0 && "rounded-l-[8px]", i === 2 && "rounded-r-[8px]", i > 0 && "border-l-0",
            )}>{n}</button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-[14px] font-medium mb-[8px]">{dict["estimator.addons.label"]}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[12px]">
          {addonList.map((addon) => (
            <label key={addon.key} className="flex items-center gap-[12px] cursor-pointer">
              <button type="button" role="checkbox" aria-checked={addons.has(addon.key)} onClick={() => toggleAddon(addon.key)}
                className={cn("w-[18px] h-[18px] rounded-[4px] border flex items-center justify-center flex-shrink-0 transition-colors",
                  addons.has(addon.key) ? "bg-accent border-accent" : "bg-surface border-border")}>
                {addons.has(addon.key) && <Check size={14} className="text-white" strokeWidth={2.5} />}
              </button>
              <span className="text-[14px]">{addon.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Support upsell checkbox (#4) */}
      <div className="border-t border-border pt-[20px]">
        <label className="flex items-center gap-[12px] cursor-pointer">
          <button type="button" role="checkbox" aria-checked={includeSupport} onClick={() => setIncludeSupport(!includeSupport)}
            className={cn("w-[18px] h-[18px] rounded-[4px] border flex items-center justify-center flex-shrink-0 transition-colors",
              includeSupport ? "bg-accent border-accent" : "bg-surface border-border")}>
            {includeSupport && <Check size={14} className="text-white" strokeWidth={2.5} />}
          </button>
          <span className="text-[14px]">{dict["services.maintenance.supportLine"]} ({monthly} {dict["services.maintenance.perMonth"]})</span>
        </label>
      </div>

      {/* Result */}
      <div className="bg-accent-bg border border-accent-border rounded-[12px] p-[24px] mt-[32px]">
        <p className="text-[13px] text-text-muted">{dict["estimator.result.label"]}</p>
        <p className="font-serif text-[32px] font-normal mt-[4px]">{low}–{high} AZN</p>
        {includeSupport && (
          <p className="text-[15px] text-accent mt-[4px]">+ {monthly} {dict["services.maintenance.perMonth"]}</p>
        )}
        <p className="text-[15px] mt-[8px]">{dict["estimator.result.timeline"]} {days} {dict["estimator.result.days"]}</p>
        <p className="text-[13px] text-text-muted mt-[16px]">{dict["estimator.disclaimer"]}</p>
        <Button variant="primary" href={waLink(locale)} target="_blank" rel="noopener noreferrer" icon={<WhatsApp />} className="mt-[20px]">{dict["estimator.cta"]}</Button>
      </div>
    </div>
  );
}
