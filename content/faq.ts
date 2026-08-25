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
      az: "Pulsuz nümunənin tutduğu nədir?",
      ru: "В чём подвох с бесплатным макетом?",
      en: "What's the catch with the free draft?",
    },
    answer: {
      az: "Heç nə. Ana səhifənizi hazırlayırıq çünki nə edə bildiyimizi göstərməyin ən sürətli yoludur — portfoliodan da, satış zəngindən də sürətli. Öz bizneslərini real səhifədə görən insanların əksəriyyəti qalanını da hazırlatmaq istəyir. Bəziləri istəmir, bu da normaldır. Üç gün sübut etməyə sərf etməyi üç gün mübahisə etməkdən üstün tuturuq.",
      ru: "Ни в чём. Мы делаем главную страницу, потому что это самый быстрый способ показать, что мы умеем — быстрее портфолио, быстрее звонка. Большинство людей, увидев свой бизнес на реальной странице, хотят доделать остальное. Некоторые нет, и это нормально. Мы лучше потратим три дня на доказательство, чем три дня на споры.",
      en: "There isn't one. We build your homepage because it's the fastest way to show you what we can do — faster than a portfolio, faster than a sales call. Most people who see their own business on a real page want the rest built. Some don't, and that's fine. We'd rather spend three days proving it than three days arguing about it.",
    },
    showOnHomepage: true,
  },
  {
    id: "fast",
    question: {
      az: "Bu qədər sürətli necə ola bilərsiniz?",
      ru: "Как вы можете быть такими быстрыми?",
      en: "How can you be this fast?",
    },
    answer: {
      az: "AI kodun təkrarlanan hissələrini idarə edir — əvvəllər günlərlə yazmaq lazım olan işi. Bu, bizə dizayn, struktur və sizin konkret biznesiniz üçün işləməsinə diqqət yetirməyə imkan verir. Keyfiyyət düşmür. Müddət düşür.",
      ru: "AI обрабатывает повторяющиеся части кода — работу, на которую раньше уходили дни. Это позволяет нам сосредоточиться на дизайне, структуре и работе для вашего конкретного бизнеса. Качество не падает. Сроки — да.",
      en: "AI handles the repetitive parts of writing code — the work that used to take days of typing. That leaves us to focus on design, structure, and making it work for your specific business. The quality doesn't drop. The timeline does.",
    },
    showOnHomepage: false,
  },
  {
    id: "own",
    question: {
      az: "Sonra həqiqətən hər şeyə sahibəm?",
      ru: "Я действительно владею всем после?",
      en: "Do I actually own everything afterwards?",
    },
    answer: {
      az: "Bəli. Domeniniz birinci gündən sizin adınıza qeydiyyat olunur, kod sizə təhvil verilir və hostinq hesabı sizindir. Gələn il başqası ilə işləmək qərarına gəlsəniz, hər şeyi özünüzlə aparırsınız. Bizə bağlı heç nə yoxdur.",
      ru: "Да. Домен зарегистрирован на ваше имя с первого дня, код передаётся вам, и хостинг-аккаунт ваш. Если через год решите работать с кем-то другим, вы забираете всё с собой. Ничто не привязано к нам.",
      en: "Yes. Your domain is registered in your name from day one, the code is handed over to you, and the hosting account is yours. If you decide to work with someone else next year, you take everything with you. Nothing is locked to us.",
    },
    showOnHomepage: true,
  },
  {
    id: "changes",
    question: {
      az: "Startdan sonra dəyişikliklərə ehtiyacım olsa necə?",
      ru: "Что если после запуска нужны изменения?",
      en: "What if I need changes after launch?",
    },
    answer: {
      az: "Startdan sonra otuz gün pulsuz dəstək alırsınız — həqiqi dəyişikliklər, yalnız xəta düzəlişləri deyil. Bundan sonra, ya ixtiyari aylıq xidmət planı, ya da dəyişiklik başına ödəniş. Seçim sizindir. Məcburi abunə yoxdur.",
      ru: "Тридцать дней бесплатной поддержки после запуска — реальные изменения, не только баг-фиксы. После этого — опциональный ежемесячный план или оплата за изменение. Ваш выбор. Обязательной подписки нет.",
      en: "You get thirty days of free support after launch — real changes, not just bug fixes. After that, either an optional monthly maintenance plan or pay per change. Your choice. No subscription required.",
    },
    showOnHomepage: false,
  },
  {
    id: "prepare",
    question: {
      az: "Nə hazırlamağım lazımdır?",
      ru: "Что мне нужно подготовить?",
      en: "What do I need to prepare?",
    },
    answer: {
      az: "Varsa logonuz, biznesinizin təsviri və istifadə etmək istədiyiniz fotoşəkillər. Yazılı mətniniz yoxdursa, kömək edəcəyik. Logonuz yoxdursa, sadə bir logo hazırlaya bilərik.",
      ru: "Логотип, если есть, описание бизнеса и фотографии, которые хотите использовать. Если нет текста — поможем. Если нет логотипа — сделаем простой.",
      en: "Your logo if you have one, a description of your business, and any photos you want to use. If you don't have text written, we'll help. If you don't have a logo, we can make a simple one.",
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
      az: "Pulsuz nümunəni təsdiqləyənə qədər heç nə. Bundan sonra, tam hazırlanmaya başlamaq üçün yarısı və startda yarısı.",
      ru: "Ничего, пока не одобрите бесплатный макет. После этого — половина для начала работы и половина при запуске.",
      en: "Nothing until you've approved the free draft. After that, half to begin the full build and half at launch.",
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
      az: "Bəli. Azərbaycan, rus və ingilis dilləri bizim üçün standartdır. Əlavə dillər qiymətə az miqdarda və müddətə bir neçə gün əlavə edir.",
      ru: "Да. Азербайджанский, русский и английский для нас стандарт. Дополнительные языки немного увеличивают цену и добавляют пару дней к срокам.",
      en: "Yes. Azerbaijani, Russian, and English are all standard for us. Additional languages add a small amount to the price and a couple of days to the timeline.",
    },
    showOnHomepage: false,
  },
];
