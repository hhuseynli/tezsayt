import { ArrowUpRight } from "lucide-react";
import { BrowserMockup } from "@/components/ui/BrowserMockup";
import { Badge } from "@/components/ui/Badge";

type ProjectCardProps = {
  client: string;
  industry: string;
  description: string;
  image: string;
  url: string | null;
  viewSiteLabel: string;
  tags?: string[];
};

export function ProjectCard({ client, industry, description, image, url, viewSiteLabel, tags }: ProjectCardProps) {
  const displayTags = tags && tags.length > 0 ? tags : [industry];

  return (
    <div className="bg-surface border border-border rounded-[12px] overflow-hidden shadow-[var(--shadow-card)] transition-all duration-200 hover:shadow-[var(--shadow-lift)] hover:-translate-y-[2px]">
      <div className="relative">
        <BrowserMockup src={image} alt={`${client} website screenshot`} />
        {!url && (
          <div className="absolute inset-0 top-[32px] flex items-center justify-center bg-surface-alt/80">
            <span className="text-[13px] font-medium uppercase tracking-[0.08em] text-text-faint">Hazırlanır</span>
          </div>
        )}
      </div>
      <div className="p-[20px]">
        <div className="flex flex-wrap gap-[6px]">
          {displayTags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <h3 className="font-serif text-[20px] font-normal leading-[1.3] mt-[10px]">{client}</h3>
        <p className="text-[14px] text-text-muted mt-[8px]">{description}</p>
        {url ? (
          <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-[4px] text-accent font-medium mt-[14px] hover:underline text-[15px]">
            {viewSiteLabel} <ArrowUpRight size={16} strokeWidth={1.75} />
          </a>
        ) : (
          <span className="inline-flex items-center px-[10px] py-[4px] rounded-[999px] text-[12px] font-medium bg-surface-alt text-text-faint border border-border mt-[14px]">
            Hazırlanır
          </span>
        )}
      </div>
    </div>
  );
}
