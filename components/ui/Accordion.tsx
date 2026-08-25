"use client";

import { useState, useRef, useEffect } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) setHeight(contentRef.current.scrollHeight);
  }, [answer]);

  return (
    <div className="border-b border-border last:border-b-0">
      <button className="w-full flex items-center justify-between py-[20px] text-left" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen}>
        <span className="text-[16px] font-medium text-text pr-[16px]">{question}</span>
        <Plus size={18} className={cn("flex-shrink-0 text-text-muted transition-transform duration-200", isOpen && "rotate-45")} />
      </button>
      <div className="overflow-hidden transition-[height] duration-[250ms]" style={{ height: isOpen ? height : 0 }}>
        <div ref={contentRef} className="pb-[20px]">
          <p className="text-[15px] text-text-muted leading-[1.7] max-w-[65ch]">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export function Accordion({ items, className }: { items: { question: string; answer: string }[]; className?: string }) {
  return (
    <div className={cn(className)}>
      {items.map((item, i) => (
        <AccordionItem key={i} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
}
