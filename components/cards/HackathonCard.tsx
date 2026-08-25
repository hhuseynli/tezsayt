import { BrowserMockup } from "@/components/ui/BrowserMockup";
import { Badge } from "@/components/ui/Badge";

type HackathonCardProps = {
  event: string;
  organizer: string;
  project: string;
  description: string;
  image: string;
  tags: string[];
};

export function HackathonCard({ event, organizer, project, description, image, tags }: HackathonCardProps) {
  return (
    <div className="bg-surface border border-border rounded-[12px] overflow-hidden shadow-[var(--shadow-card)] transition-all duration-200 hover:shadow-[var(--shadow-lift)] hover:-translate-y-[2px]">
      <div className="relative">
        <BrowserMockup src={image} alt={`${project} screenshot`} />
        <div className="absolute inset-0 top-[32px] flex items-center justify-center bg-surface-alt/80">
          <span className="text-[13px] font-medium uppercase tracking-[0.08em] text-text-faint">Hakaton layihəsi</span>
        </div>
      </div>
      <div className="p-[20px]">
        <Badge variant="accent">{event}</Badge>
        <h3 className="font-serif text-[20px] font-normal leading-[1.3] mt-[10px]">{project}</h3>
        <p className="text-[14px] text-text-muted mt-[8px]">{description}</p>
        <div className="flex flex-wrap gap-[6px] mt-[12px]">
          {tags.map((tag) => (
            <span key={tag} className="text-[12px] text-text-faint">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
