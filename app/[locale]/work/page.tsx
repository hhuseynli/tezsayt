"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import { projects, projectTypeLabels, type ProjectType } from "@/content/projects";
import { testimonials } from "@/content/testimonials";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { Button } from "@/components/ui/Button";
import { Instagram } from "@/components/ui/icons/Instagram";
import { WhatsApp } from "@/components/ui/icons/WhatsApp";
import { waLink, igLink, cn } from "@/lib/utils";
import { tl, type Locale } from "@/content/types";
import { getDictionary } from "@/lib/i18n";

const allTypes: (ProjectType | "all")[] = ["all", "landing", "business", "store", "platform"];

export default function WorkPage() {
  const params = useParams();
  const locale = (params.locale as Locale) || "az";
  const [activeType, setActiveType] = useState<ProjectType | "all">("all");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [showTypeMenu, setShowTypeMenu] = useState(false);
  const [dict, setDict] = useState<Record<string, string>>({});
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!showTypeMenu) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setShowTypeMenu(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showTypeMenu]);

  useEffect(() => { getDictionary(locale).then(setDict); }, [locale]);

  const industryTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => tags.add(tl(t, locale))));
    return Array.from(tags);
  }, [locale]);

  const filteredProjects = projects.filter((p) => {
    // Either/or: industry tag takes priority, otherwise type filter
    if (activeTag) return p.tags.some((t) => tl(t, locale) === activeTag);
    if (activeType !== "all") return p.type === activeType;
    return true;
  });

  if (Object.keys(dict).length === 0) return null;

  return (
    <div>
      <section className="bg-bg">
        <div className="max-w-[1120px] mx-auto px-[20px] md:px-[24px] pt-[48px] md:pt-[64px]">
          <h1 className="font-serif text-[32px] md:text-[48px] font-normal leading-[1.1] tracking-[-0.02em]">{dict["work.heading"]}</h1>
          <p className="text-[18px] leading-[1.6] text-text-muted mt-[12px]">{dict["work.sub"]}</p>

          {/* Filters */}
          <div className="mt-[32px] flex items-start gap-[12px]">
            {/* Industry tags */}
            <div className="flex flex-wrap gap-[8px] flex-1">
              <button
                onClick={() => { setActiveTag(null); setActiveType("all"); }}
                className={cn("px-[12px] py-[5px] rounded-[999px] text-[13px] font-medium border transition-colors",
                  !activeTag && activeType === "all" ? "bg-accent text-white border-accent" : "bg-surface text-text-muted border-border hover:border-accent")}
              >
                {dict["work.filter.all"]}
              </button>
              {industryTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => { setActiveTag(activeTag === tag ? null : tag); setActiveType("all"); }}
                  className={cn("px-[12px] py-[5px] rounded-[999px] text-[13px] font-medium border transition-colors",
                    activeTag === tag
                      ? "bg-accent text-white border-accent"
                      : "bg-surface text-text-muted border-border hover:border-accent")}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Type filter dropdown */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowTypeMenu(!showTypeMenu)}
                className={cn("flex items-center gap-[6px] px-[12px] py-[5px] rounded-[999px] text-[13px] font-medium border transition-colors",
                  activeType !== "all"
                    ? "bg-accent-bg text-accent border-accent-border"
                    : "bg-surface text-text-muted border-border hover:border-accent")}
              >
                <SlidersHorizontal size={14} strokeWidth={1.75} />
                {activeType !== "all"
                  ? tl(projectTypeLabels[activeType], locale)
                  : (dict["work.filter.typeLabel"] || "Site type")}
              </button>
              {showTypeMenu && (
                <div className="absolute right-0 top-[40px] bg-surface border border-border rounded-[10px] shadow-[var(--shadow-lift)] py-[4px] min-w-[180px] z-10">
                  {allTypes.map((type) => {
                    const label = type === "all"
                      ? dict["work.filter.all"]
                      : tl(projectTypeLabels[type], locale);
                    return (
                      <button
                        key={type}
                        onClick={() => { setActiveType(type); setActiveTag(null); setShowTypeMenu(false); }}
                        className={cn("block w-full text-left px-[14px] py-[8px] text-[14px] transition-colors",
                          activeType === type ? "text-accent font-medium" : "text-text-muted hover:text-text hover:bg-surface-alt")}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg">
        <div className="max-w-[1120px] mx-auto px-[20px] md:px-[24px] py-[48px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((p, i) => (
                <motion.div key={p.slug} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25, delay: i * 0.03 }}>
                  <ProjectCard
                    client={p.client}
                    industry={tl(p.industry, locale)}
                    description={tl(p.description, locale)}
                    image={p.image}
                    url={p.url}
                    viewSiteLabel={dict["common.viewSite"]}
                    tags={p.tags.map((t) => tl(t, locale))}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredProjects.length === 0 && (
            <p className="text-[16px] text-text-muted text-center py-[48px]">
              {dict["guides.empty"]}
            </p>
          )}
        </div>
      </section>

      {testimonials.length > 0 && (
        <section id="testimonials" className="bg-surface-alt">
          <div className="max-w-[1120px] mx-auto px-[20px] md:px-[24px] py-[48px] md:py-[64px]">
            <h2 className="font-serif text-[26px] md:text-[32px] font-normal leading-[1.2] tracking-[-0.02em] mb-[32px]">{dict["work.testimonials.heading"]}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
              {testimonials.map((t) => <TestimonialCard key={t.id} quote={tl(t.quote, locale)} name={t.name} role={tl(t.role, locale)} business={t.business} photo={t.photo} logo={t.logo} />)}
            </div>
          </div>
        </section>
      )}

      <section className="bg-surface-alt">
        <div className="max-w-[560px] mx-auto px-[20px] md:px-[24px] py-[64px] md:py-[96px] text-center">
          <h2 className="font-serif text-[26px] md:text-[32px] font-normal leading-[1.2] tracking-[-0.02em]">{dict["work.cta.heading"]}</h2>
          <p className="text-[18px] leading-[1.6] text-text-muted mt-[12px]">{dict["work.cta.body"]}</p>
          <div className="flex flex-col sm:flex-row gap-[12px] mt-[32px] justify-center">
            <Button variant="primary" href={igLink()} target="_blank" rel="noopener noreferrer" icon={<Instagram />}>{dict["common.instagram"]}</Button>
            <Button variant="secondary" href={waLink(locale)} target="_blank" rel="noopener noreferrer" icon={<WhatsApp />}>{dict["common.whatsapp"]}</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
