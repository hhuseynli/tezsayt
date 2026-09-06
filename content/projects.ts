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
    slug: "saleh",
    client: "Saleh Tech School",
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
    slug: "ztopup",
    client: "Zelix Topup",
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
    industry: { az: "Maliyyə xidmətləri", ru: "Финансовые услуги", en: "Financial services" },
    description: {
      az: "İnvestisiya şirkəti üçün korporativ vebsayt.",
      ru: "Корпоративный сайт инвестиционной компании.",
      en: "Corporate website for an investment company.",
    },
    image: "/images/projects/byin.png",
    url: "https://byininvest.com",
    featured: false,
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
];
