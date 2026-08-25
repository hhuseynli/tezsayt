"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WhatsApp } from "@/components/ui/icons/WhatsApp";
import { cn } from "@/lib/utils";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import type { Locale } from "@/lib/constants";

type SiteType = "landing" | "business" | "store" | "custom";

// --- Pricing config ---
const basePrice: Record<SiteType, number | null> = { landing: 500, business: 800, store: 2000, custom: null };
const includedPages: Record<SiteType, number> = { landing: 1, business: 6, store: 8, custom: 8 };
const baseDays: Record<SiteType, number> = { landing: 4, business: 9, store: 12, custom: 21 };

const featureAddons: Record<string, number> = { booking: 200, payments: 300, blog: 150, admin: 400 };

const oneTimeAddons: Record<string, { perPage?: number; flat?: number }> = {
  translation: { perPage: 12 },
  copywriting: { perPage: 35 },
  whatsappBot: { flat: 400 },
  adsSetup: { flat: 300 },
};

const onRequestServices = ["photography", "branding", "whatsappAdvanced"] as const;

const monthlyServices: Record<string, { price: number; requires?: string }> = {
  carePlan: { price: 100 },
  gbpSeo: { price: 50 },
  analyticsReport: { price: 20 },
  smmContent: { price: 300 },
  whatsappUpkeep: { price: 75, requires: "whatsappBot" },
};

export function PriceEstimator({ locale, dict }: { locale: Locale; dict: Record<string, string> }) {
  const [type, setType] = useState<SiteType>("business");
  const [pages, setPages] = useState(5);
  const [languages, setLanguages] = useState(1);
  const [features, setFeatures] = useState<Set<string>>(new Set());
  const [oneTimeSelected, setOneTimeSelected] = useState<Set<string>>(new Set());
  const [onRequestSelected, setOnRequestSelected] = useState<Set<string>>(new Set());
  const [monthlySelected, setMonthlySelected] = useState<Set<string>>(new Set());

  const toggle = (set: Set<string>, key: string, setter: (s: Set<string>) => void) => {
    const n = new Set(set);
    n.has(key) ? n.delete(key) : n.add(key);
    // If whatsappBot is deselected, also remove whatsappUpkeep
    if (key === "whatsappBot" && !n.has(key)) {
      const m = new Set(monthlySelected);
      m.delete("whatsappUpkeep");
      setMonthlySelected(m);
    }
    setter(n);
  };

  // --- Calculate one-time ---
  const base = basePrice[type];
  const isCustom = base === null;
  let oneTime = base || 0;
  const extraPages = Math.max(0, pages - includedPages[type]) * 50;
  oneTime += extraPages;
  oneTime += (languages - 1) * 150;
  for (const f of features) oneTime += featureAddons[f] || 0;
  for (const a of oneTimeSelected) {
    const addon = oneTimeAddons[a];
    if (addon?.flat) oneTime += addon.flat;
    if (addon?.perPage) {
      if (a === "translation") oneTime += addon.perPage * pages * Math.max(0, languages - 1);
      else oneTime += addon.perPage * pages;
    }
  }
  const oneTimeMin = Math.floor(oneTime / 50) * 50;
  const oneTimeMax = Math.ceil((oneTime * 1.15) / 50) * 50;
  const days = baseDays[type] + Math.floor(extraPages / 50) + (languages - 1) * 2 + features.size * 2;

  // --- Calculate monthly ---
  let monthly = 0;
  for (const key of monthlySelected) {
    const svc = monthlyServices[key];
    if (!svc) continue;
    if (svc.requires && !oneTimeSelected.has(svc.requires)) continue;
    monthly += svc.price;
  }

  // --- WhatsApp message ---
  const typeLabels: Record<SiteType, string> = {
    landing: dict["estimator.type.landing"] || "Landing",
    business: dict["estimator.type.business"] || "Business",
    store: dict["estimator.type.store"] || "Store",
    custom: dict["estimator.type.custom"] || "Custom",
  };

  function buildWaLink() {
    let msg = `Salam! ${typeLabels[type]} üçün maraqlanıram.\n`;
    if (!isCustom) msg += `Təxmini bir dəfəlik: ${oneTimeMin}–${oneTimeMax} AZN\n`;
    else msg += `Xüsusi layihə üçün təklif istəyirəm.\n`;
    if (monthly > 0) msg += `Aylıq xidmətlər: ${monthly} AZN/ay\n`;
    if (onRequestSelected.size > 0) {
      const labels = Array.from(onRequestSelected).map(s => dict[`estimator.onRequest.${s}`] || s);
      msg += `Əlavə maraqlandığım: ${labels.join(", ")}\n`;
    }
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }

  const types: { key: SiteType; label: string }[] = [
    { key: "landing", label: dict["estimator.type.landing"] },
    { key: "business", label: dict["estimator.type.business"] },
    { key: "store", label: dict["estimator.type.store"] },
    { key: "custom", label: dict["estimator.type.custom"] },
  ];

  const featureList = [
    { key: "booking", label: dict["estimator.addon.booking"] },
    { key: "payments", label: dict["estimator.addon.payments"] },
    { key: "blog", label: dict["estimator.addon.blog"] },
    { key: "admin", label: dict["estimator.addon.admin"] },
  ];

  const oneTimeAddonList = [
    { key: "translation", label: dict["estimator.addon.translation"] },
    { key: "copywriting", label: dict["estimator.addon.copywriting"] },
    { key: "whatsappBot", label: dict["estimator.addon.whatsappBot"] },
    { key: "adsSetup", label: dict["estimator.addon.adsSetup"] },
  ];

  const Checkbox = ({ checked, onToggle, children, muted }: { checked: boolean; onToggle: () => void; children: React.ReactNode; muted?: boolean }) => (
    <label className="flex items-center gap-[12px] cursor-pointer">
      <button type="button" role="checkbox" aria-checked={checked} onClick={onToggle}
        className={cn("w-[18px] h-[18px] rounded-[4px] border flex items-center justify-center flex-shrink-0 transition-colors",
          checked ? "bg-accent border-accent" : "bg-surface border-border")}>
        {checked && <Check size={14} className="text-white" strokeWidth={2.5} />}
      </button>
      <span className={cn("text-[14px]", muted && "text-text-muted")}>{children}</span>
    </label>
  );

  return (
    <div className="space-y-[24px]">
      {/* Type selector */}
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

      {/* Pages slider */}
      <div>
        <div className="flex justify-between mb-[8px]">
          <p className="text-[14px] font-medium">{dict["estimator.pages.label"]}</p>
          <span className="text-[15px] font-medium">{pages}</span>
        </div>
        <input type="range" min={1} max={15} step={1} value={pages} onChange={(e) => setPages(Number(e.target.value))} className="w-full accent-accent" />
      </div>

      {/* Languages */}
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

      {/* Features (existing) */}
      <div>
        <p className="text-[14px] font-medium mb-[8px]">{dict["estimator.addons.label"]}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[12px]">
          {featureList.map((f) => (
            <Checkbox key={f.key} checked={features.has(f.key)} onToggle={() => toggle(features, f.key, setFeatures)}>
              {f.label}
            </Checkbox>
          ))}
        </div>
      </div>

      {/* One-time add-ons (new) */}
      <div>
        <p className="text-[14px] font-medium mb-[8px]">{dict["estimator.oneTimeAddons.label"]}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[12px]">
          {oneTimeAddonList.map((a) => (
            <Checkbox key={a.key} checked={oneTimeSelected.has(a.key)} onToggle={() => toggle(oneTimeSelected, a.key, setOneTimeSelected)}>
              {a.label}
            </Checkbox>
          ))}
        </div>
      </div>

      {/* On-request services */}
      <div>
        <p className="text-[14px] font-medium mb-[8px]">{dict["estimator.onRequest.label"]}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[12px]">
          {onRequestServices.map((key) => (
            <Checkbox key={key} checked={onRequestSelected.has(key)} onToggle={() => toggle(onRequestSelected, key, setOnRequestSelected)} muted>
              {dict[`estimator.onRequest.${key}`]} <span className="text-[12px] text-text-faint ml-[4px]">({dict["estimator.onRequest.tag"]})</span>
            </Checkbox>
          ))}
        </div>
      </div>

      {/* Monthly services (new, visually distinct) */}
      <div className="border-t border-border pt-[24px]">
        <p className="text-[14px] font-medium mb-[8px]">{dict["estimator.monthlyServices.label"]}</p>
        <div className="bg-surface-alt rounded-[12px] p-[20px] space-y-[12px]">
          {Object.entries(monthlyServices).map(([key, svc]) => {
            if (svc.requires && !oneTimeSelected.has(svc.requires)) return null;
            return (
              <div key={key} className="flex items-center justify-between">
                <Checkbox checked={monthlySelected.has(key)} onToggle={() => toggle(monthlySelected, key, setMonthlySelected)}>
                  {dict[`estimator.monthlyServices.${key}`]}
                </Checkbox>
                <span className="text-[13px] text-text-muted ml-[8px] flex-shrink-0">{svc.price} AZN/ay</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Results — two boxes side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] mt-[32px]">
        {/* One-time box */}
        <div className="bg-accent-bg border border-accent-border rounded-[12px] p-[24px]">
          <p className="text-[13px] text-text-muted">{dict["estimator.result.oneTime"]}</p>
          {isCustom ? (
            <p className="font-serif text-[28px] font-normal mt-[4px]">{dict["estimator.result.customPrice"]}</p>
          ) : (
            <p className="font-serif text-[28px] font-normal mt-[4px]">{oneTimeMin}–{oneTimeMax} AZN</p>
          )}
          <p className="text-[14px] mt-[8px]">{dict["estimator.result.timeline"]} {days} {dict["estimator.result.days"]}</p>
        </div>

        {/* Monthly box */}
        <div className="bg-accent-bg border border-accent-border rounded-[12px] p-[24px]">
          <p className="text-[13px] text-text-muted">{dict["estimator.result.monthly"]}</p>
          {monthly > 0 ? (
            <p className="font-serif text-[28px] font-normal mt-[4px]">{monthly} AZN<span className="text-[14px] text-text-muted">/ay</span></p>
          ) : (
            <p className="text-[16px] text-text-faint mt-[8px]">{dict["estimator.monthlyServices.none"]}</p>
          )}
        </div>
      </div>

      <p className="text-[13px] text-text-faint italic">{dict["estimator.disclaimer"]}</p>

      <Button variant="primary" href={buildWaLink()} target="_blank" rel="noopener noreferrer" icon={<WhatsApp />} className="mt-[8px]">
        {dict["estimator.cta"]}
      </Button>
    </div>
  );
}
