import { type Localized } from "./types";

export type Project = {
  slug: string;
  client: string;
  industry: Localized;
  description: Localized;
  image: string;
  url: string | null;
  featured: boolean;
  tags: Localized[];
};

export const projects: Project[] = [
  {
    slug: "mindmorph",
    client: "MindMorph",
    industry: { az: "Texnologiya", ru: "Технологии", en: "Technology" },
    description: {
      az: "Koqnitiv məşq və zehni sağlamlıq platforması.",
      ru: "Платформа для когнитивных тренировок.",
      en: "Cognitive training and mental wellness platform.",
    },
    image: "/images/projects/mindmorph.png",
    url: "https://mindmorph.co.uk",
    featured: true,
    tags: [{ az: "Səhiyyə", ru: "Здравоохранение", en: "Healthcare" }],
  },
  {
    slug: "kraamzorg",
    client: "Kraamzorg",
    industry: { az: "Səhiyyə", ru: "Здравоохранение", en: "Healthcare" },
    description: {
      az: "Analıq qayğısı mütəxəssislərini ailələrlə birləşdirən sayt.",
      ru: "Сайт, связывающий специалистов по уходу за матерями с семьями.",
      en: "Connecting maternity care professionals with families.",
    },
    image: "/images/projects/kraamzorg.png",
    url: "https://hhuseynli.github.io/Kraamzorg/",
    featured: true,
    tags: [{ az: "Səhiyyə", ru: "Здравоохранение", en: "Healthcare" }],
  },
  {
    slug: "byin",
    client: "Infinity Investment",
    industry: { az: "Maliyyə xidmətləri", ru: "Финансовые услуги", en: "Financial services" },
    description: {
      az: "İnvestisiya şirkəti üçün korporativ vebsayt.",
      ru: "Корпоративный сайт инвестиционной компании.",
      en: "Corporate website for an investment company.",
    },
    image: "/images/projects/byin.png",
    url: "https://byininvest.com",
    featured: true,
    tags: [{ az: "Maliyyə", ru: "Финансы", en: "Finance" }],
  },
  {
    slug: "meridiana",
    client: "Meridiana",
    industry: { az: "Texnologiya", ru: "Технологии", en: "Technology" },
    description: {
      az: "Tərtibatçılara yönəlmiş texnologiya şirkəti saytı.",
      ru: "Сайт технологической компании для разработчиков.",
      en: "Developer-focused technology company website.",
    },
    image: "/images/projects/meridiana.png",
    url: "https://meridiana.dev",
    featured: false,
    tags: [{ az: "Texnologiya", ru: "Технологии", en: "Technology" }],
  },
  {
    slug: "saleh",
    client: "Saleh Tech School",
    industry: { az: "Təhsil", ru: "Образование", en: "Education" },
    description: {
      az: "Proqramlaşdırma kursları təklif edən texnologiya məktəbi.",
      ru: "Школа технологий с курсами программирования.",
      en: "Technology school offering programming courses.",
    },
    image: "/images/projects/saleh.png",
    url: null,
    featured: false,
    tags: [{ az: "Təhsil", ru: "Образование", en: "Education" }],
  },
  {
    slug: "gaming",
    client: "GameHub",
    industry: { az: "Oyun", ru: "Игры", en: "Gaming" },
    description: {
      az: "Turnir və komanda profilləri olan oyun icması.",
      ru: "Игровое сообщество с турнирами и профилями команд.",
      en: "Gaming community with tournaments and team profiles.",
    },
    image: "/images/projects/gaming.png",
    url: null,
    featured: false,
    tags: [{ az: "Əyləncə", ru: "Развлечения", en: "Entertainment" }],
  },
];
