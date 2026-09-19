/**
 * OFFERING DATA — Single source of truth for all commercial facts.
 *
 * Every price, turnaround, fee, and commercial term on the site reads from
 * this file. Nothing renders a commercial figure as literal text.
 *
 * §12 decisions recorded 2026-09-19:
 *   Clock start: deposit received
 *   "gün": calendar days
 *   Support: à la carte (not bundled tiers)
 *   Payment: free draft → 50% on approval → 50% at launch
 *   Revisions on full build: 3 rounds max (don't count toward timeline)
 *   Domain renewal: agency responsibility if client has care plan
 *   Care plan cancellation: proactively remove credentials
 *   Languages: AZ+RU standard on Biznes saytı; EN is a paid add-on
 *   "Ən populyar": dropped — no data to support
 *   Loading claim: "Sürətli yüklənmə" (no specific sub-second promise)
 */

import { type Localized } from "./types";

// ─── Tier definitions ────────────────────────────────────────────────────────
// Surfaces: /services cards, /pricing cards, price estimator, meta descriptions,
// JSON-LD, hero, comparison pages, vertical pages.

export type TierId = "landing" | "business" | "store" | "custom";

export type Turnaround = {
  /** null = not stated; number[] length 1 = single; length 2 = range */
  range: [number, number] | null;
  unit: "calendar-days" | "weeks";
  /** "estimate" = no guarantee language; "guarantee" would allow zəmanət wording */
  commitment: "estimate";
};

export type TierPrice = {
  /** null = negotiable / by agreement */
  amount: number | null;
  /** Controls wording: "from" → "500 AZN-dən", "fixed" → "500 AZN", "negotiable" → "Razılaşma ilə" */
  type: "from" | "fixed" | "negotiable";
};

export type Tier = {
  id: TierId;
  /** Surfaces: service cards, pricing cards, nav */
  name: Localized;
  /** Surfaces: service card description */
  description: Localized;
  /** Surfaces: service card "best for" line, vertical routing */
  bestFor: Localized;
  /** Surfaces: service card feature list */
  includes: Localized[];
  /** Surfaces: service cards, pricing cards, meta descriptions */
  price: TierPrice;
  /** Surfaces: service cards, pricing cards, hero (per-tier only), process timeline */
  turnaround: Turnaround;
  /** Base pages included in this tier — surfaces: estimator */
  includedPages: number;
  /** Base days for the estimator calculator */
  estimatorBaseDays: number;
  /** Standard languages included at no extra charge */
  standardLanguages: Localized;
};

export const tiers: Tier[] = [
  {
    id: "landing",
    name: { az: "Vizitkart (tək səhifəlik)", ru: "Визитка (одностраничный)", en: "Business card (single page)" },
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
    price: { amount: 500, type: "from" },
    turnaround: { range: [3, 5], unit: "calendar-days", commitment: "estimate" },
    includedPages: 1,
    estimatorBaseDays: 4,
    standardLanguages: { az: "AZ", ru: "AZ", en: "AZ" },
  },
  {
    id: "business",
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
    price: { amount: 800, type: "from" },
    turnaround: { range: [7, 10], unit: "calendar-days", commitment: "estimate" },
    includedPages: 6,
    estimatorBaseDays: 9,
    // §12 #9: AZ+RU standard on Biznes saytı
    standardLanguages: { az: "AZ + RU", ru: "AZ + RU", en: "AZ + RU" },
  },
  {
    id: "store",
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
    price: { amount: 2000, type: "from" },
    turnaround: { range: [10, 14], unit: "calendar-days", commitment: "estimate" },
    includedPages: 8,
    estimatorBaseDays: 12,
    standardLanguages: { az: "AZ", ru: "AZ", en: "AZ" },
  },
  {
    id: "custom",
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
    price: { amount: null, type: "negotiable" },
    turnaround: { range: [2, 4], unit: "weeks", commitment: "estimate" },
    includedPages: 8,
    estimatorBaseDays: 21,
    standardLanguages: { az: "AZ", ru: "AZ", en: "AZ" },
  },
];

// ─── Estimator add-on pricing ────────────────────────────────────────────────
// Surfaces: price estimator calculator, WhatsApp pre-fill message

export type FeatureAddon = {
  id: string;
  /** Localized label — surfaces: estimator checkbox */
  label: Localized;
  price: number;
  /** Which tier IDs this feature is available for */
  availableFor: TierId[];
};

export const featureAddons: FeatureAddon[] = [
  {
    id: "booking",
    label: { az: "Rezervasiya sistemi", ru: "Система бронирования", en: "Booking system" },
    price: 200,
    availableFor: ["landing", "business", "store", "custom"],
  },
  {
    id: "payments",
    label: { az: "Onlayn ödəniş", ru: "Онлайн-оплата", en: "Online payments" },
    price: 300,
    availableFor: ["store", "custom"],
  },
  {
    id: "blog",
    label: { az: "Bloq və ya xəbərlər", ru: "Блог или новости", en: "Blog or news" },
    price: 150,
    availableFor: ["business", "store", "custom"],
  },
  {
    id: "admin",
    label: { az: "Admin panel", ru: "Панель управления", en: "Admin panel" },
    price: 400,
    availableFor: ["store", "custom"],
  },
];

export type OneTimeAddon = {
  id: string;
  label: Localized;
  /** Per-page price (null = flat) */
  perPage: number | null;
  /** Flat price (null = per-page only) */
  flat: number | null;
};

export const oneTimeAddons: OneTimeAddon[] = [
  {
    id: "translation",
    label: { az: "Tərcümə (əlavə dil)", ru: "Перевод (доп. язык)", en: "Translation (extra language)" },
    perPage: 12, flat: null,
  },
  {
    id: "copywriting",
    label: { az: "Mətn yazımı", ru: "Написание текстов", en: "Copywriting" },
    perPage: 35, flat: null,
  },
  {
    id: "whatsappBot",
    label: { az: "WhatsApp bot", ru: "WhatsApp бот", en: "WhatsApp bot" },
    perPage: null, flat: 400,
  },
  {
    id: "adsSetup",
    label: { az: "Reklam kampaniyası quraşdırılması", ru: "Настройка рекламной кампании", en: "Ad campaign setup" },
    perPage: null, flat: 300,
  },
];

export const onRequestServices = [
  { id: "photography", label: { az: "Fotoqrafiya", ru: "Фотография", en: "Photography" } },
  { id: "branding", label: { az: "Loqo / Brending", ru: "Логотип / Брендинг", en: "Logo / Branding" } },
  { id: "whatsappAdvanced", label: { az: "WhatsApp bot (genişləndirilmiş)", ru: "WhatsApp бот (расширенный)", en: "WhatsApp bot (advanced)" } },
] as const;

/** Extra page cost — surfaces: estimator */
export const EXTRA_PAGE_PRICE = 50;
/** Extra language cost — surfaces: estimator */
export const EXTRA_LANGUAGE_PRICE = 150;

// ─── Monthly services (à la carte) ──────────────────────────────────────────
// Surfaces: /services monthly section, estimator monthly panel.
// These are NOT bundled tiers. Each is independently selectable.

export type MonthlyService = {
  id: string;
  /** Localized label — surfaces: monthly services list, estimator */
  label: Localized;
  /** Localized one-line description */
  description: Localized;
  price: number;
  /** If set, this service requires the named one-time addon to be purchased first */
  requires?: string;
  /** Explicitly optional — copy must reflect this */
  optional: true;
};

export const monthlyServices: MonthlyService[] = [
  {
    id: "carePlan",
    label: {
      az: "Texniki dəstək planı",
      ru: "План технической поддержки",
      en: "Technical support plan",
    },
    description: {
      az: "Hostinq, domen, təhlükəsizlik yamaları, aylıq backup",
      ru: "Хостинг, домен, патчи безопасности, ежемесячный бэкап",
      en: "Hosting, domain, security patches, monthly backup",
    },
    price: 100,
    optional: true,
  },
  {
    id: "contentUpdates",
    label: {
      az: "Məzmun yeniləmələri (2 saat/ay)",
      ru: "Обновление контента (2 ч/мес)",
      en: "Content updates (2 hrs/mo)",
    },
    description: {
      az: "Saytınızdakı mətn, şəkil və məlumatları biz yeniləyirik",
      ru: "Мы обновляем тексты, фото и данные на вашем сайте",
      en: "We update text, images, and info on your site",
    },
    price: 100,
    optional: true,
  },
  {
    id: "gbpSeo",
    label: {
      az: "Google Business + Yerli SEO",
      ru: "Google Business + Локальный SEO",
      en: "Google Business + Local SEO",
    },
    description: {
      az: "Google Business profilinin idarəsi və yerli axtarış optimallaşdırması",
      ru: "Управление профилем Google Business и оптимизация локального поиска",
      en: "Google Business profile management and local search optimization",
    },
    price: 50,
    optional: true,
  },
  {
    id: "analyticsReport",
    label: {
      az: "Aylıq analitika hesabatı",
      ru: "Ежемесячный отчёт аналитики",
      en: "Monthly analytics report",
    },
    description: {
      az: "Kim ziyarət edir, haradan gəlir, nə edir — aylıq xülasə",
      ru: "Кто посещает, откуда приходит, что делает — ежемесячная сводка",
      en: "Who visits, where from, what they do — monthly summary",
    },
    price: 20,
    optional: true,
  },
  {
    id: "smmContent",
    label: {
      az: "SMM (kontent, fotosuz)",
      ru: "SMM (контент, без фото)",
      en: "SMM (content only, no photos)",
    },
    description: {
      az: "Sosial media üçün mətn kontenti",
      ru: "Текстовый контент для социальных сетей",
      en: "Text content for social media",
    },
    price: 300,
    optional: true,
  },
  {
    id: "whatsappUpkeep",
    label: {
      az: "WhatsApp bot dəstəyi",
      ru: "Поддержка WhatsApp бота",
      en: "WhatsApp bot support",
    },
    description: {
      az: "WhatsApp botunun davamlı dəstəyi və yeniləmələri",
      ru: "Постоянная поддержка и обновления WhatsApp бота",
      en: "Ongoing WhatsApp bot maintenance and updates",
    },
    price: 75,
    requires: "whatsappBot",
    optional: true,
  },
];

// ─── Business facts ─────────────────────────────────────────────────────────
// Non-tier facts that copy must reference. Any field set to null means the fact
// is unstated — rendering must OMIT it, never guess.

export const facts = {
  /** §3: Ownership and exit mechanic */
  ownership: {
    /** Surfaces: ownership section, FAQ, footer, comparison pages */
    model: {
      az: "Hər hesab — hostinq, domen, analitika — sizin adınıza yaradılır. Biz sizin icazənizlə işləyirik. Bizi çıxartmaq üçün şifrələri sıfırlayırsınız, vəssalam.",
      ru: "Каждый аккаунт — хостинг, домен, аналитика — создаётся на ваше имя. Мы работаем с вашего разрешения. Чтобы нас убрать — сбросьте пароли, и всё.",
      en: "Every account — hosting, domain, analytics — is created in your name. We work at your discretion. To remove us, reset the passwords. That's it.",
    } satisfies Localized,
    /** Concrete exit mechanic — must appear at least once on the site per §3 */
    exitMechanic: {
      az: "Hesablar sizin adınızadır. İstədiyiniz an şifrələri sıfırlayıb bizi çıxara bilərsiniz.",
      ru: "Аккаунты на ваше имя. В любой момент сбросьте пароли и уберите нас.",
      en: "Accounts are in your name. Reset the passwords anytime and we're out.",
    } satisfies Localized,
    /** What happens when care plan is cancelled — §12 #8 */
    onCancellation: {
      az: "Aylıq planı ləğv etdikdə, giriş məlumatlarımızı proaktiv şəkildə silirik.",
      ru: "При отмене плана мы проактивно удаляем наши данные для входа.",
      en: "When you cancel the plan, we proactively remove our credentials.",
    } satisfies Localized,
  },

  /** Free homepage draft scope */
  freeDraft: {
    /** Surfaces: hero, HowItWorks, FAQ, contact section */
    scope: {
      az: "Ana səhifə və bir düzəliş dövrü",
      ru: "Главная страница и один раунд правок",
      en: "Homepage and one round of revisions",
    } satisfies Localized,
    /** Surfaces: HowItWorks time badge */
    turnaround: {
      az: "3 gün",
      ru: "3 дня",
      en: "3 days",
    } satisfies Localized,
    /** How the draft is delivered — §10 */
    delivery: {
      az: "Canlı link olaraq bizim infrastrukturumuzda təqdim edilir",
      ru: "Предоставляется как рабочая ссылка на нашей инфраструктуре",
      en: "Delivered as a live link on our infrastructure",
    } satisfies Localized,
    /** When source code transfers — §10 */
    sourceTransfer: {
      az: "Mənbə kodu ödənişdən sonra sizə keçir",
      ru: "Исходный код передаётся после оплаты",
      en: "Source code transfers to you at payment",
    } satisfies Localized,
  },

  /** §12 #1: Clock start */
  clockStart: {
    az: "Müddət depozit alındıqdan sonra başlayır",
    ru: "Срок начинается после получения депозита",
    en: "Timeline starts after deposit is received",
  } satisfies Localized,

  /** §12 #2: Day type */
  dayType: {
    az: "təqvim günü",
    ru: "календарных дней",
    en: "calendar days",
  } satisfies Localized,

  /** §12 #4: Payment structure */
  payment: {
    structure: {
      az: "Pulsuz nümunəni təsdiqləyənə qədər heç nə ödəmirsiniz. Sonra tam hazırlanmanın başlanması üçün 50%, yayımda isə qalan 50%.",
      ru: "Ничего, пока не одобрите бесплатный макет. Затем 50% для начала работы и 50% при запуске.",
      en: "Nothing until you approve the free draft. Then 50% to begin the full build and 50% at launch.",
    } satisfies Localized,
  },

  /** §12 #5: Revision policy */
  revisions: {
    fullBuild: {
      az: "Tam hazırlanma zamanı 3 düzəliş dövrü daxildir. Düzəlişlər müddətə sayılmır.",
      ru: "В полную сборку входят 3 раунда правок. Правки не входят в срок доставки.",
      en: "The full build includes 3 rounds of revisions. Revisions don't count toward the delivery timeline.",
    } satisfies Localized,
  },

  /** §12 #6: Domain renewal */
  domainRenewal: {
    az: "Aylıq dəstək planınız varsa, domen yeniləməsi bizim üzərimizdədir.",
    ru: "Если у вас есть план ежемесячной поддержки, продление домена — наша обязанность.",
    en: "If you have a monthly support plan, domain renewal is on us.",
  } satisfies Localized,

  /** Post-launch free support */
  freeSupport: {
    days: 30,
    description: {
      az: "Yayımdan sonra 30 təqvim günü pulsuz dəstək — real dəyişikliklər, yalnız xəta düzəltmə deyil",
      ru: "30 календарных дней бесплатной поддержки после запуска — реальные правки, а не только баг-фиксы",
      en: "30 calendar days of free support after launch — real changes, not just bug fixes",
    } satisfies Localized,
  },

  /** Loading time claim — §12 #10: dropped sub-second, now general */
  loadingClaim: {
    az: "Sürətli yüklənmə",
    ru: "Быстрая загрузка",
    en: "Fast loading",
  } satisfies Localized,

  /** Price range for schema.org — surfaces: JSON-LD */
  schemaOrgPriceRange: "500-5000 AZN",

  /** Minimum starting price — surfaces: meta descriptions, comparison */
  entryPrice: 500,
  /** Currency */
  currency: "AZN",
} as const;

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Look up a tier by id */
export function getTier(id: TierId): Tier {
  const tier = tiers.find((t) => t.id === id);
  if (!tier) throw new Error(`Unknown tier: ${id}`);
  return tier;
}

/** Format a price for display: "500 AZN-dən" / "от 500 AZN" / "from 500 AZN" */
export function formatPrice(price: TierPrice, locale: "az" | "ru" | "en"): string {
  if (price.type === "negotiable" || price.amount === null) {
    const labels: Localized = {
      az: "Razılaşma yolu ilə",
      ru: "По договорённости",
      en: "By agreement",
    };
    return labels[locale];
  }
  if (price.type === "from") {
    if (locale === "az") return `${price.amount} AZN-dən`;
    if (locale === "ru") return `от ${price.amount} AZN`;
    return `from ${price.amount} AZN`;
  }
  return `${price.amount} AZN`;
}

/** Format a turnaround range: "3–5 təqvim günü" */
export function formatTurnaround(ta: Turnaround, locale: "az" | "ru" | "en"): string {
  if (!ta.range) return "";
  const [lo, hi] = ta.range;
  const unitLabels = {
    "calendar-days": { az: "təqvim günü", ru: "календарных дней", en: "calendar days" },
    weeks: { az: "həftə", ru: "недель", en: "weeks" },
  } as const;
  const unit = unitLabels[ta.unit][locale];
  if (lo === hi) return `${lo} ${unit}`;
  return `${lo}–${hi} ${unit}`;
}

/** Format turnaround as a short label (for cards): "3–5 gün" */
export function formatTurnaroundShort(ta: Turnaround, locale: "az" | "ru" | "en"): string {
  if (!ta.range) return "";
  const [lo, hi] = ta.range;
  const unitLabels = {
    "calendar-days": { az: "gün", ru: "дней", en: "days" },
    weeks: { az: "həftə", ru: "недель", en: "weeks" },
  } as const;
  const unit = unitLabels[ta.unit][locale];
  if (lo === hi) return `${lo} ${unit}`;
  return `${lo}–${hi} ${unit}`;
}

/** "from" label per locale */
export function fromLabel(locale: "az" | "ru" | "en"): string {
  const labels: Localized = { az: "Başlanğıc qiymət", ru: "От", en: "From" };
  return labels[locale];
}

/** Format "per month" label */
export function perMonthLabel(locale: "az" | "ru" | "en"): string {
  const labels: Localized = { az: "AZN/ay", ru: "AZN/мес", en: "AZN/mo" };
  return labels[locale];
}
