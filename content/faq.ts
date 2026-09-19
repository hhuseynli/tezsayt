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
      az: "Domen və hostinq kimin adınadır?",
      ru: "Кому принадлежит домен и хостинг?",
      en: "Who owns the domain and hosting?",
    },
    answer: {
      az: "Sizin adınıza. Hər hesab — domen, hostinq, analitika — birinci gündən sizin adınıza yaradılır. Biz sizin icazənizlə işləyirik. Hesablar sizin adınızadır. İstədiyiniz an şifrələri sıfırlayıb bizi çıxara bilərsiniz. Aylıq dəstək planınız varsa, domen yeniləməsi bizim üzərimizdədir. Planı ləğv etsəniz, giriş məlumatlarımızı proaktiv şəkildə silirik.",
      ru: "На ваше имя. Каждый аккаунт — домен, хостинг, аналитика — создаётся на ваше имя с первого дня. Мы работаем с вашего разрешения. Аккаунты на ваше имя. В любой момент сбросьте пароли и уберите нас. Если у вас есть план ежемесячной поддержки, продление домена — наша обязанность. При отмене плана мы проактивно удаляем наши данные для входа.",
      en: "Yours. Every account — domain, hosting, analytics — is created in your name from day one. We work at your discretion. Accounts are in your name. Reset the passwords anytime and we're out. If you have a monthly support plan, domain renewal is on us. When you cancel the plan, we proactively remove our credentials.",
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
      az: "Layihə növündən asılıdır. Vizitkart (tək səhifəlik) 3–5 təqvim günü, Biznes saytı 7–10 təqvim günü, Onlayn mağaza 10–14 təqvim günü, Xüsusi alət 2–4 həftə. Müddət depozit alındıqdan sonra başlayır. Tam hazırlanma zamanı 3 düzəliş dövrü daxildir və düzəlişlər müddətə sayılmır.",
      ru: "Зависит от типа проекта. Визитка (одностраничный) 3–5 календарных дней, Бизнес-сайт 7–10 календарных дней, Интернет-магазин 10–14 календарных дней, Кастомный инструмент 2–4 недели. Срок начинается после получения депозита. В полную сборку входят 3 раунда правок, и правки не входят в срок доставки.",
      en: "Depends on the project type. Business card (single page) 3–5 calendar days, Business site 7–10 calendar days, Online store 10–14 calendar days, Custom tool 2–4 weeks. Timeline starts after deposit is received. The full build includes 3 rounds of revisions, and revisions don't count toward the delivery timeline.",
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
      az: "Pulsuz nümunəni təsdiqləyənə qədər heç nə ödəmirsiniz. Təsdiqləyəndən sonra tam hazırlanmanın başlanması üçün 50% depozit, yayımda isə qalan 50%. Müddət depozit alındıqdan sonra başlayır.",
      ru: "Ничего, пока не одобрите бесплатный макет. После одобрения — депозит 50% для начала работы и 50% при запуске. Срок начинается после получения депозита.",
      en: "Nothing until you approve the free draft. After approval, a 50% deposit to begin the full build and 50% at launch. Timeline starts after deposit is received.",
    },
    showOnHomepage: false,
  },
  {
    id: "changes",
    question: {
      az: "Startdan sonra dəyişikliklərə ehtiyacım olsa necə?",
      ru: "Что если после запуска нужны изменения?",
      en: "What if I need changes after launch?",
    },
    answer: {
      az: "Startdan sonra otuz təqvim günü pulsuz dəstək alırsınız — həqiqi dəyişikliklər, yalnız xəta düzəlişləri deyil. Bundan sonra, ya ixtiyari aylıq xidmət planı, ya da dəyişiklik başına ödəniş. Seçim sizindir. Məcburi abunə yoxdur. Aylıq dəstək planınız varsa, domen yeniləməsi bizim üzərimizdədir.",
      ru: "Тридцать календарных дней бесплатной поддержки после запуска — реальные изменения, не только баг-фиксы. После этого — опциональный ежемесячный план или оплата за изменение. Ваш выбор. Обязательной подписки нет. Если у вас есть план ежемесячной поддержки, продление домена — наша обязанность.",
      en: "You get thirty calendar days of free support after launch — real changes, not just bug fixes. After that, either an optional monthly plan or pay per change. Your choice. No subscription required. If you have a monthly support plan, domain renewal is on us.",
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
      az: "Bəli. Biznes saytı AZ + RU dillərini standart olaraq əhatə edir. Vizitkart yalnız AZ dilində daxildir, əlavə dillər ödənişlidir. İngilis dili bütün layihələrdə əlavə olaraq sifariş edilə bilər.",
      ru: "Да. Бизнес-сайт включает AZ + RU как стандарт. Визитка включает только AZ, дополнительные языки — платно. Английский можно заказать как дополнение к любому проекту.",
      en: "Yes. The Business site includes AZ + RU as standard. The Business card includes AZ only, extra languages are paid. English can be added to any project.",
    },
    showOnHomepage: false,
  },
];
