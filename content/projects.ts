import { type Localized } from "./types";

export type ProjectType = "landing" | "business" | "store" | "platform";

export type Project = {
  slug: string;
  client: string;
  type: ProjectType;
  industry: Localized;
  description: Localized;
  image: string;
  url: string | null;
  featured: boolean;
  tags: Localized[];
};

/** Localized labels for project types */
export const projectTypeLabels: Record<ProjectType, Localized> = {
  landing: { az: "Landing səhifə", ru: "Лендинг", en: "Landing page" },
  business: { az: "Biznes sayt", ru: "Бизнес-сайт", en: "Business site" },
  store: { az: "Onlayn mağaza", ru: "Интернет-магазин", en: "Online store" },
  platform: { az: "Platforma", ru: "Платформа", en: "Platform" },
};

export const projects: Project[] = [
  {
    slug: "saleh",
    client: "Saleh Tech School",
    type: "business",
    industry: { az: "Təhsil", ru: "Образование", en: "Education" },
    description: {
      az: "6-18 yaş uşaqlar üçün texnologiya kursları təklif edən məktəb.",
      ru: "Школа технологий с курсами для детей от 6 до 18 лет.",
      en: "Technology school offering courses for kids aged 6–18.",
    },
    image: "/images/projects/saleh.png",
    url: "https://saleh-tech-school.onrender.com",
    featured: true,
    tags: [{ az: "Təhsil", ru: "Образование", en: "Education" }],
  },
  {
    slug: "xsolla-game-recap",
    client: "Xsolla Game Recap",
    type: "platform",
    industry: { az: "Oyun", ru: "Игры", en: "Gaming" },
    description: {
      az: "Oyunçular üçün oyun statistikası və xülasə platforması.",
      ru: "Платформа игровой статистики и обзоров для геймеров.",
      en: "Game statistics and recap platform for gamers.",
    },
    image: "/images/projects/xsolla-game-recap.png",
    url: "https://team-noclip.vercel.app",
    featured: true,
    tags: [
      { az: "Oyun", ru: "Игры", en: "Gaming" },
      { az: "Texnologiya", ru: "Технологии", en: "Technology" },
    ],
  },
  {
    slug: "kraamzorg",
    client: "Kraamzorg",
    type: "landing",
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
    slug: "mindmorph",
    client: "MindMorph",
    type: "platform",
    industry: { az: "Texnologiya", ru: "Технологии", en: "Technology" },
    description: {
      az: "Koqnitiv məşq və zehni sağlamlıq platforması.",
      ru: "Платформа для когнитивных тренировок.",
      en: "Cognitive training and mental wellness platform.",
    },
    image: "/images/projects/mindmorph.png",
    url: "https://mindmorph.co.uk",
    featured: false,
    tags: [
      { az: "Səhiyyə", ru: "Здравоохранение", en: "Healthcare" },
      { az: "Texnologiya", ru: "Технологии", en: "Technology" },
    ],
  },
  {
    slug: "ztopup",
    client: "Zelix Topup",
    type: "store",
    industry: { az: "E-ticarət", ru: "Электронная коммерция", en: "E-commerce" },
    description: {
      az: "Oyun top-up və pin kod satış platforması.",
      ru: "Платформа для покупки игровых валют и пин-кодов.",
      en: "Game top-up and PIN code marketplace.",
    },
    image: "/images/projects/ztopup.png",
    url: "https://ztopup-game-sales-srp7.onrender.com",
    featured: false,
    tags: [
      { az: "E-ticarət", ru: "Электронная коммерция", en: "E-commerce" },
      { az: "Oyun", ru: "Игры", en: "Gaming" },
    ],
  },
  {
    slug: "byin",
    client: "Infinity Investment",
    type: "business",
    industry: { az: "Maliyyə xidmətləri", ru: "Финансовые услуги", en: "Financial services" },
    description: {
      az: "İnvestisiya şirkəti üçün korporativ vebsayt.",
      ru: "Корпоративный сайт инвестиционной компании.",
      en: "Corporate website for an investment company.",
    },
    image: "/images/projects/byin.png",
    url: "https://byininvest.com",
    featured: false,
    tags: [
      { az: "Maliyyə", ru: "Финансы", en: "Finance" },
      { az: "Korporativ", ru: "Корпоративный", en: "Corporate" },
    ],
  },
  {
    slug: "meridiana",
    client: "Meridiana",
    type: "business",
    industry: { az: "Texnologiya", ru: "Технологии", en: "Technology" },
    description: {
      az: "Tərtibatçılara yönəlmiş texnologiya şirkəti saytı.",
      ru: "Сайт технологической компании для разработчиков.",
      en: "Developer-focused technology company website.",
    },
    image: "/images/projects/meridiana.png",
    url: "https://meridiana.dev",
    featured: false,
    tags: [
      { az: "Texnologiya", ru: "Технологии", en: "Technology" },
      { az: "Korporativ", ru: "Корпоративный", en: "Corporate" },
    ],
  },
];
