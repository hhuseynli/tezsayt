import { type Localized } from "./types";

export type Testimonial = {
  id: string;
  quote: Localized;
  name: string;
  role: Localized;
  business: string;
  photo: string | null;
  logo: string | null;
};

export const testimonials: Testimonial[] = [];
