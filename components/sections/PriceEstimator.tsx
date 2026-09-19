"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WhatsApp } from "@/components/ui/icons/WhatsApp";
import { cn } from "@/lib/utils";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import type { Locale } from "@/lib/constants";
import {
  tiers,
  featureAddons as offeringFeatureAddons,
  oneTimeAddons as offeringOneTimeAddons,
  onRequestServices as offeringOnRequestServices,
  monthlyServices as offeringMonthlyServices,
  EXTRA_PAGE_PRICE,
  EXTRA_LANGUAGE_PRICE,
  perMonthLabel,
  type TierId,
} from "@/content/offering";
import { tl } from "@/content/types";

type SiteType = TierId;

// --- Pricing config derived from offering.ts ---
const basePrice: Record<SiteType, number | null> = Object.fromEntries(
  tiers.map((t) => [t.id, t.price.amount])
) as Record<SiteType, number | null>;
const includedPages: Record<SiteType, number> = Object.fromEntries(
  tiers.map((t) => [t.id, t.includedPages])
) as Record<SiteType, number>;
const baseDays: Record<SiteType, number> = Object.fromEntries(
  tiers.map((t) => [t.id, t.estimatorBaseDays])
) as Record<SiteType, number>;

const featureAddons: Record<string, number> = Object.fromEntries(
  offeringFeatureAddons.map((a) => [a.id, a.price])
);
const featuresPerType: Record<SiteType, string[]> = Object.fromEntries(
  tiers.map((t) => [t.id, offeringFeatureAddons.filter((a) => a.availableFor.includes(t.id)).map((a) => a.id)])
) as Record<SiteType, string[]>;

const oneTimeAddons: Record<string, { perPage?: number; flat?: number }> = Object.fromEntries(
  offeringOneTimeAddons.map((a) => [a.id, { ...(a.perPage ? { perPage: a.perPage } : {}), ...(a.flat ? { flat: a.flat } : {}) }])
);

const monthlyServices: Record<string, { price: number; requires?: string }> = Object.fromEntries(
  offeringMonthlyServices.map((s) => [s.id, { price: s.price, ...(s.requires ? { requires: s.requires } : {}) }])
);

export function PriceEstimator({ locale, dict }: { locale: Locale; dict: Record<string, string> }) {
  const [type, setType] = useState<SiteType>("business");
  const [pages, setPages] = useState(5);
  const [languages, setLanguages] = useState(2);
  const [features, setFeatures] = useState<Set<string>>(new Set());
  const [oneTimeSelected, setOneTimeSelected] = useState<Set<string>>(new Set());
  const [onRequestSelected, setOnRequestSelected] = useState<Set<string>>(new Set());
  const [monthlySelected, setMonthlySelected] = useState<Set<string>>(new Set());

  function handleTypeChange(newType: SiteType) {
    setType(newType);
    // Clear features not relevant to the new type
    const allowed = new Set(featuresPerType[newType]);
    setFeatures(prev => new Set([...prev].filter(f => allowed.has(f))));
  }

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
  const extraPages = Math.max(0, pages - includedPages[type]) * EXTRA_PAGE_PRICE;
  oneTime += extraPages;
  // AZ+RU standard (2 languages free); charge only for 3rd+
  const extraLanguages = Math.max(0, languages - 2);
  oneTime += extraLanguages * EXTRA_LANGUAGE_PRICE;
  for (const f of features) oneTime += featureAddons[f] || 0;
  for (const a of oneTimeSelected) {
    const addon = oneTimeAddons[a];
    if (addon?.flat) oneTime += addon.flat;
    if (addon?.perPage) {
      if (a === "translation") oneTime += addon.perPage * pages * extraLanguages;
      else oneTime += addon.perPage * pages;
    }
  }
  const oneTimeMin = Math.floor(oneTime / 50) * 50;
  const oneTimeMax = Math.ceil((oneTime * 1.15) / 50) * 50;
  const days = baseDays[type] + Math.floor(extraPages / 50) + extraLanguages * 2 + features.size * 2;

  // --- Calculate monthly ---
  let monthly = 0;
  for (const key of monthlySelected) {
    const svc = monthlyServices[key];
    if (!svc) continue;
    if (svc.requires && !oneTimeSelected.has(svc.requires)) continue;
    monthly += svc.price;
  }

  // --- WhatsApp message ---
  const typeLabels: Record<SiteType, string> = Object.fromEntries(
    tiers.map((t) => [t.id, tl(t.name, locale)])
  ) as Record<SiteType, string>;

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

  const types: { key: SiteType; label: string }[] = tiers.map((t) => ({
    key: t.id,
    label: tl(t.name, locale),
  }));

  const allFeatures = offeringFeatureAddons.map((a) => ({
    key: a.id,
    label: tl(a.label, locale),
  }));
  const featureList = allFeatures.filter(f => featuresPerType[type].includes(f.key));

  const oneTimeAddonList = offeringOneTimeAddons.map((a) => ({
    key: a.id,
    label: tl(a.label, locale),
  }));

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
            <button key={t.key} onClick={() => handleTypeChange(t.key)} className={cn(
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
          {[2, 3].map((n, i) => (
            <button key={n} onClick={() => setLanguages(n)} className={cn(
              "px-[20px] py-[10px] text-[14px] font-medium border transition-colors",
              languages === n ? "bg-accent text-white border-accent" : "bg-surface text-text border-border",
              i === 0 && "rounded-l-[8px]", i === 1 && "rounded-r-[8px]", i > 0 && "border-l-0",
            )}>{n}</button>
          ))}
        </div>
        <p className="text-[12px] text-text-faint mt-[6px]">{dict["estimator.languages.hint"]}</p>
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
          {offeringOnRequestServices.map((svc) => (
            <Checkbox key={svc.id} checked={onRequestSelected.has(svc.id)} onToggle={() => toggle(onRequestSelected, svc.id, setOnRequestSelected)} muted>
              {tl(svc.label, locale)} <span className="text-[12px] text-text-faint ml-[4px]">({dict["estimator.onRequest.tag"]})</span>
            </Checkbox>
          ))}
        </div>
      </div>

      {/* Monthly services (new, visually distinct) */}
      <div className="border-t border-border pt-[24px]">
        <p className="text-[14px] font-medium mb-[8px]">{dict["estimator.monthlyServices.label"]}</p>
        <div className="bg-surface-alt rounded-[12px] p-[20px] space-y-[12px]">
          {offeringMonthlyServices.map((svc) => {
            if (svc.requires && !oneTimeSelected.has(svc.requires)) return null;
            return (
              <div key={svc.id} className="flex items-center justify-between">
                <Checkbox checked={monthlySelected.has(svc.id)} onToggle={() => toggle(monthlySelected, svc.id, setMonthlySelected)}>
                  {tl(svc.label, locale)}
                </Checkbox>
                <span className="text-[13px] text-text-muted ml-[8px] flex-shrink-0">{svc.price} {perMonthLabel(locale)}</span>
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
