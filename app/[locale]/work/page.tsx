"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Filter as FilterIcon } from "lucide-react";
import { projects } from "@/content/projects";
import { hackathons } from "@/content/hackathons";
import { testimonials } from "@/content/testimonials";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { HackathonCard } from "@/components/cards/HackathonCard";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { Button } from "@/components/ui/Button";
import { Instagram } from "@/components/ui/icons/Instagram";
import { WhatsApp } from "@/components/ui/icons/WhatsApp";
import { waLink, igLink, cn } from "@/lib/utils";
import { tl, type Locale } from "@/content/types";
import { getDictionary } from "@/lib/i18n";

type ProjectType = "all" | "clients" | "hackathons";

// Unified item type for rendering
type WorkItem = {
  key: string;
  type: "client" | "hackathon";
  // client fields
  client?: string;
  industry?: string;
  description: string;
  image: string;
  url?: string | null;
  // hackathon fields
  event?: string;
  organizer?: string;
  project?: string;
  tags?: string[];
};

export default function WorkPage() {
  const params = useParams();
  const locale = (params.locale as Locale) || "az";
  const [typeFilter, setTypeFilter] = useState<ProjectType>("all");
  const [showFilters, setShowFilters] = useState(false);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [dict, setDict] = useState<Record<string, string>>({});

  useEffect(() => { getDictionary(locale).then(setDict); }, [locale]);

  // Build unified items list — both client and hackathon projects get tags
  const allItems = useMemo((): WorkItem[] => {
    const clientItems: WorkItem[] = projects.map((p) => ({
      key: `client-${p.slug}`,
      type: "client" as const,
      client: p.client,
      industry: tl(p.industry, locale),
      description: tl(p.description, locale),
      image: p.image,
      url: p.url,
      tags: p.tags.map((t) => tl(t, locale)),
    }));

    const hackathonItems: WorkItem[] = hackathons.map((h) => ({
      key: `hack-${h.slug}`,
      type: "hackathon" as const,
      event: tl(h.event, locale),
      organizer: h.organizer,
      project: tl(h.project, locale),
      description: tl(h.built, locale),
      image: h.image,
      tags: h.tags.map((t) => tl(t, locale)),
    }));

    return [...clientItems, ...hackathonItems];
  }, [locale]);

  // Collect all tags from both projects and hackathons
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => tags.add(tl(t, locale))));
    hackathons.forEach((h) => h.tags.forEach((t) => tags.add(tl(t, locale))));
    return Array.from(tags);
  }, [locale]);

  // Filter by type and tag — tags apply to everything
  const filteredItems = allItems.filter((item) => {
    if (typeFilter === "clients" && item.type !== "client") return false;
    if (typeFilter === "hackathons" && item.type !== "hackathon") return false;
    if (activeTag && item.tags && !item.tags.includes(activeTag)) return false;
    return true;
  });

  if (Object.keys(dict).length === 0) return null;

  const typeFilters: { key: ProjectType; label: string }[] = [
    { key: "all", label: dict["work.filter.all"] },
    { key: "clients", label: dict["work.filter.clients"] },
    { key: "hackathons", label: dict["work.filter.hackathons"] },
  ];

  return (
    <div>
      <section className="bg-bg">
        <div className="max-w-[1120px] mx-auto px-[20px] md:px-[24px] pt-[48px] md:pt-[64px]">
          <h1 className="font-serif text-[32px] md:text-[48px] font-normal leading-[1.1] tracking-[-0.02em]">{dict["work.heading"]}</h1>
          <p className="text-[18px] leading-[1.6] text-text-muted mt-[12px]">{dict["work.sub"]}</p>

          {/* Tags + filter icon */}
          <div className="flex items-center gap-[12px] mt-[32px]">
            <div className="flex flex-wrap gap-[8px] flex-1">
              <button
                onClick={() => { setActiveTag(null); setTypeFilter("all"); }}
                className={cn("px-[12px] py-[4px] rounded-[999px] text-[12px] font-medium border transition-colors",
                  !activeTag && typeFilter === "all" ? "bg-accent text-white border-accent" : "bg-surface text-text-muted border-border hover:border-accent")}
              >
                {dict["work.filter.all"]}
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => { setActiveTag(activeTag === tag ? null : tag); setTypeFilter("all"); }}
                  className={cn("px-[12px] py-[4px] rounded-[999px] text-[12px] font-medium border transition-colors",
                    activeTag === tag ? "bg-accent text-white border-accent" : "bg-surface text-text-muted border-border hover:border-accent")}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Type filter icon */}
            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={cn("p-[6px] rounded-[6px] transition-colors", showFilters || typeFilter !== "all" ? "bg-accent-bg text-accent" : "text-text-faint hover:text-text")}
                aria-label="Filter by type"
              >
                <FilterIcon size={16} strokeWidth={1.75} />
              </button>
              {showFilters && (
                <div className="absolute right-0 top-[36px] bg-surface border border-border rounded-[8px] shadow-[var(--shadow-lift)] py-[4px] min-w-[160px] z-10">
                  {typeFilters.map((f) => (
                    <button
                      key={f.key}
                      onClick={() => { setTypeFilter(f.key); setShowFilters(false); }}
                      className={cn("block w-full text-left px-[14px] py-[8px] text-[14px] transition-colors",
                        typeFilter === f.key ? "text-accent font-medium" : "text-text-muted hover:text-text hover:bg-surface-alt")}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Unified grid */}
      <section className="bg-bg">
        <div className="max-w-[1120px] mx-auto px-[20px] md:px-[24px] py-[48px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, i) => (
                <motion.div key={item.key} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25, delay: i * 0.03 }}>
                  {item.type === "client" ? (
                    <ProjectCard
                      client={item.client!}
                      industry={item.industry!}
                      description={item.description}
                      image={item.image}
                      url={item.url!}
                      viewSiteLabel={dict["common.viewSite"]}
                    />
                  ) : (
                    <HackathonCard
                      event={item.event!}
                      organizer={item.organizer!}
                      project={item.project!}
                      description={item.description}
                      image={item.image}
                      tags={item.tags!}
                    />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredItems.length === 0 && (
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
