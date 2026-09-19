import { type Localized } from "./types";

export type FaqItem = {
  id: string;
  question: Localized;
  answer: Localized;
  showOnHomepage: boolean;
};

export const faqItems: FaqItem[] = [
  {
    id: "catch",
    question: {
      az: "Pulsuz nümunə nələri əhatə edir?",
      ru: "Что входит в бесплатный макет?",
      en: "What does the free draft include?",
    },
    answer: {
      az: "Ana səhifənizi hazırlayırıq — real, işləyən sayt, maket deyil. Bir düzəliş dövrü daxildir. Bunu ona görə edirik ki, nə edə bildiyimizi göstərməyin ən sürətli yoludur. Öz biznesini saytda görən insanların çoxu qalanını da sifariş edir. Bəziləri etmir — bu da normaldır.",
      ru: "Мы делаем вашу главную страницу — настоящий, работающий сайт, не макет. Включён один раунд правок. Мы делаем это, потому что это самый быстрый способ показать, что мы умеем. Большинство людей, увидев свой бизнес на реальной странице, заказывают остальное. Кто-то нет — и это нормально.",
      en: "We build your homepage — a real, working site, not a mockup. One round of revisions is included. We do this because it's the fastest way to show what we can do. Most people who see their business on a real page order the rest. Some don't — and that's fine.",
    },
    showOnHomepage: true,
  },
  {
    id: "fast",
    question: {
      az: "Bu qədər sürətli necə işləyirsiniz?",
      ru: "Как вы можете быть такими быстрыми?",
      en: "How can you be this fast?",
    },
    answer: {
      az: "AI kodun təkrarlanan hissələrini idarə edir — əvvəllər günlərlə yazılacaq işi avtomatlaşdırır. Bizə dizayn, struktur və sizin konkret biznesinizə uyğunlaşdırma qalır. Keyfiyyət düşmür, müddət qısalır.",
      ru: "AI обрабатывает повторяющиеся части кода — работу, на которую раньше уходили дни. Это позволяет нам сосредоточиться на дизайне, структуре и работе для вашего конкретного бизнеса. Качество не падает. Сроки — да.",
      en: "AI handles the repetitive parts of writing code — the work that used to take days of typing. That leaves us to focus on design, structure, and making it work for your specific business. The quality doesn't drop. The timeline does.",
    },
    showOnHomepage: false,
  },
  {
    id: "own",
    question: {
      az: "Domen və hostinq kimin adınadır?",
      ru: "Кому принадлежит домен и хостинг?",
      en: "Who owns the domain and hosting?",
    },
    answer: {
      az: "Sizin. Hər hesab — domen, hostinq, analitika — birinci gündən sizin adınıza yaradılır. Biz sizdən icazə ilə işləyirik. Hesablar sizin adınızadır — istədiyiniz an şifrələri sıfırlayıb bizi çıxara bilərsiniz. Aylıq dəstək planınız varsa, domenin yenilənməsini biz ödəyirik. Planı ləğv etsəniz, girişimizi dərhal ləğv edirik.",
      ru: "На ваше имя. Каждый аккаунт — домен, хостинг, аналитика — создаётся на ваше имя с первого дня. Мы работаем с вашего разрешения. Аккаунты на ваше имя — в любой момент сбросьте пароли и уберите нас. Если у вас есть план поддержки, продление домена — наша обязанность. При отмене плана мы сами удаляем наш доступ.",
      en: "Yours. Every account — domain, hosting, analytics — is created in your name from day one. We work with your permission. Accounts are in your name — reset the passwords anytime and we're out. If you have a support plan, domain renewal is on us. When you cancel, we remove our access ourselves.",
    },
    showOnHomepage: true,
  },
  {
    id: "timeline",
    question: {
      az: "Sayt hazırlamaq nə qədər vaxt aparır?",
      ru: "Сколько времени занимает создание сайта?",
      en: "How long does it take to build a site?",
    },
    answer: {
      az: "Layihə növündən asılıdır. Vizitkart 3–5 təqvim günü, Biznes saytı 7–10 təqvim günü, Onlayn mağaza 10–14 təqvim günü, Xüsusi alət 2–4 həftə. Müddət depozit alındıqdan sonra başlayır. 3 düzəliş dövrü daxildir, düzəlişlər müddətə sayılmır.",
      ru: "Зависит от типа. Визитка 3–5 календарных дней, Бизнес-сайт 7–10, Интернет-магазин 10–14, Кастомный инструмент 2–4 недели. Срок начинается после депозита. 3 раунда правок включены, правки не входят в срок.",
      en: "Depends on the type. Business card 3–5 calendar days, Business site 7–10, Online store 10–14, Custom tool 2–4 weeks. Timeline starts after deposit. 3 rounds of revisions included, revisions don't count toward the timeline.",
    },
    showOnHomepage: false,
  },
  {
    id: "payment",
    question: {
      az: "Ödəniş necə işləyir?",
      ru: "Как работает оплата?",
      en: "How does payment work?",
    },
    answer: {
      az: "Pulsuz nümunəni bəyənənə qədər heç nə ödəmirsiniz. Bəyəndikdən sonra işə başlamaq üçün 50% depozit, yayımda qalan 50%. Müddət depozit alındıqdan sonra başlayır.",
      ru: "Ничего, пока не одобрите бесплатный макет. После одобрения — депозит 50% для начала работы и 50% при запуске. Срок начинается после получения депозита.",
      en: "Nothing until you approve the free draft. After approval, a 50% deposit to begin the full build and 50% at launch. Timeline starts after deposit is received.",
    },
    showOnHomepage: false,
  },
  {
    id: "changes",
    question: {
      az: "Yayımdan sonra dəyişiklik lazım olsa nə edim?",
      ru: "Что если после запуска нужны изменения?",
      en: "What if I need changes after launch?",
    },
    answer: {
      az: "Yayımdan sonra 30 təqvim günü pulsuz dəstək alırsınız — sadəcə xəta deyil, həqiqi dəyişikliklər. Ondan sonra ya ixtiyari aylıq dəstək planı seçirsiniz, ya da hər dəyişiklik üçün ayrıca ödəyirsiniz. Məcburi abunəlik yoxdur. Dəstək planınız varsa, domenin yenilənməsini biz ödəyirik.",
      ru: "30 календарных дней бесплатной поддержки после запуска — реальные изменения, не только баг-фиксы. Потом — опциональный ежемесячный план или оплата за каждую правку. Обязательной подписки нет. Если у вас есть план поддержки, продление домена — на нас.",
      en: "30 calendar days of free support after launch — real changes, not just bug fixes. After that, either an optional monthly plan or pay per change. No subscription required. If you have a support plan, domain renewal is on us.",
    },
    showOnHomepage: false,
  },
  {
    id: "prepare",
    question: {
      az: "Nə hazırlamalıyam?",
      ru: "Что мне нужно подготовить?",
      en: "What do I need to prepare?",
    },
    answer: {
      az: "Varsa logonuz, biznesinizin təsviri və istifadə etmək istədiyiniz şəkillər. Mətniniz yoxdursa kömək edərik, logonuz yoxdursa sadə bir loqo hazırlaya bilərik.",
      ru: "Логотип, если есть, описание бизнеса и фотографии, которые хотите использовать. Если нет текста — поможем. Если нет логотипа — сделаем простой.",
      en: "Your logo if you have one, a description of your business, and any photos you want to use. If you don't have text written, we'll help. If you don't have a logo, we can make a simple one.",
    },
    showOnHomepage: false,
  },
  {
    id: "outside",
    question: {
      az: "Bakıdan kənarda işləyirsiniz?",
      ru: "Вы работаете за пределами Баку?",
      en: "Do you work outside Baku?",
    },
    answer: {
      az: "Bəli — Azərbaycanın istənilən yerində və beynəlxalq. Hər şey uzaqdan edilir.",
      ru: "Да — в любой точке Азербайджана и международно. Всё делается удалённо.",
      en: "Yes — anywhere in Azerbaijan and internationally. Everything is done remotely.",
    },
    showOnHomepage: false,
  },
  {
    id: "languages",
    question: {
      az: "Sayt birdən çox dildə ola bilər?",
      ru: "Может ли сайт быть на нескольких языках?",
      en: "Can the site be in more than one language?",
    },
    answer: {
      az: "Bəli. Biznes saytında AZ + RU standart olaraq daxildir. Vizitkartda yalnız AZ daxildir, əlavə dillər ödənişlidir. İngilis dili istənilən layihəyə əlavə edilə bilər.",
      ru: "Да. В Бизнес-сайт AZ + RU входят как стандарт. В Визитку входит только AZ, дополнительные языки — платно. Английский можно добавить к любому проекту.",
      en: "Yes. The Business site includes AZ + RU as standard. The Business card includes AZ only, extra languages are paid. English can be added to any project.",
    },
    showOnHomepage: false,
  },
];
