import { type Localized } from "./types";

export type Service = {
  slug: string;
  name: Localized;
  description: Localized;
  bestFor: Localized;
  includes: Localized[];
  timeline: Localized;
  priceFrom: number;
  priceLabel?: Localized;
};

export const services: Service[] = [
  {
    slug: "landing",
    name: { az: "Vizitkart (tək səhifəlik)", ru: "Лендинг", en: "Landing page" },
    description: {
      az: "Bir hərəkətə yönəlmiş tək səhifə. Tez hazırlanır, tez başlayır.",
      ru: "Одна страница, сфокусированная на одном действии. Быстро создать, быстро запустить.",
      en: "A single page focused on one action. Fast to build, fast to launch.",
    },
    bestFor: {
      az: "Yeni bizneslər, məhsul təqdimatları, tədbirlər, tək xidmət",
      ru: "Новый бизнес, запуск продукта, мероприятия, одна услуга",
      en: "New businesses, product launches, events, a single service",
    },
    includes: [
      { az: "Responsive dizayn", ru: "Адаптивный дизайн", en: "Responsive design" },
      { az: "Əlaqə forması", ru: "Контактная форма", en: "Contact form" },
      { az: "SEO quraşdırılması", ru: "Настройка SEO", en: "SEO setup" },
    ],
    timeline: { az: "3–5 gün", ru: "3–5 дней", en: "3–5 days" },
    priceFrom: 500,
  },
  {
    slug: "business",
    name: { az: "Biznes saytı", ru: "Бизнес-сайт", en: "Business site" },
    description: {
      az: "Peşəkar biznesin onlayn ehtiyaclarını əhatə edən beş-səkkiz səhifə.",
      ru: "Пять-восемь страниц, покрывающих всё, что нужно профессиональному бизнесу онлайн.",
      en: "Five to eight pages covering everything a professional business needs online.",
    },
    bestFor: {
      az: "Klinikalar, hüquq firmaları, konsaltinqlər, məktəblər, xidmət biznesləri",
      ru: "Клиники, юридические фирмы, консалтинг, школы, сервисный бизнес",
      en: "Clinics, law firms, consultancies, schools, service businesses",
    },
    includes: [
      { az: "8 səhifəyə qədər", ru: "До 8 страниц", en: "Up to 8 pages" },
      { az: "Əlaqə forması", ru: "Контактная форма", en: "Contact form" },
      { az: "SEO quraşdırılması", ru: "Настройка SEO", en: "SEO setup" },
      { az: "Google Analytics", ru: "Google Analytics", en: "Google Analytics" },
    ],
    timeline: { az: "7–10 gün", ru: "7–10 дней", en: "7–10 days" },
    priceFrom: 800,
  },
  {
    slug: "store",
    name: { az: "Onlayn mağaza", ru: "Интернет-магазин", en: "Online store" },
    description: {
      az: "Məhsul kataloqu, səbət və ödəniş ilə tam mağaza.",
      ru: "Полноценный магазин с каталогом товаров, корзиной и оплатой.",
      en: "A full shop with product catalogue, cart, and payment.",
    },
    bestFor: {
      az: "Pərakəndə, topdan satış, məhsul brendləri",
      ru: "Розница, оптовая торговля, продуктовые бренды",
      en: "Retail, wholesale, product brands",
    },
    includes: [
      { az: "Məhsul kataloqu", ru: "Каталог товаров", en: "Product catalogue" },
      { az: "Alış-veriş səbəti", ru: "Корзина покупок", en: "Shopping cart" },
      { az: "Ödəniş inteqrasiyası", ru: "Интеграция оплаты", en: "Payment integration" },
      { az: "Sifariş idarəetməsi", ru: "Управление заказами", en: "Order management" },
    ],
    timeline: { az: "10–14 gün", ru: "10–14 дней", en: "10–14 days" },
    priceFrom: 2000,
  },
  {
    slug: "custom",
    name: { az: "Xüsusi alət", ru: "Кастомный инструмент", en: "Custom tool" },
    description: {
      az: "Həqiqətən necə işlədiyinizə uyğun qurulmuş rezervasiya sistemi, idarəetmə paneli, daxili alət və ya müştəri portalı.",
      ru: "Система бронирования, панель управления, внутренний инструмент или клиентский портал, построенные под ваш реальный рабочий процесс.",
      en: "A booking system, dashboard, internal tool, or client portal built around how you actually work.",
    },
    bestFor: {
      az: "Hazır alətlərin həll etmədiyi iş axınları olan bizneslər",
      ru: "Бизнесы с процессами, которые готовые решения не покрывают",
      en: "Businesses with workflows that off-the-shelf tools don't solve",
    },
    includes: [
      { az: "Xüsusi funksionallıq", ru: "Кастомная функциональность", en: "Custom functionality" },
      { az: "İdarəetmə paneli", ru: "Панель управления", en: "Admin panel" },
      { az: "İstifadəçi autentifikasiyası", ru: "Аутентификация пользователей", en: "User authentication" },
      { az: "API inteqrasiyası", ru: "Интеграция API", en: "API integration" },
    ],
    timeline: { az: "2–4 həftə", ru: "2–4 недели", en: "2–4 weeks" },
    priceFrom: 0,
    priceLabel: { az: "Razılaşma yolu ilə", ru: "По договорённости", en: "By agreement" },
  },
];
