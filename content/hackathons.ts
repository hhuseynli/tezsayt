import { type Localized } from "./types";

export type Hackathon = {
  slug: string;
  event: Localized;
  organizer: string;
  project: Localized;
  problem: Localized;
  built: Localized;
  tags: Localized[];
  image: string;
};

export const hackathons: Hackathon[] = [
  {
    slug: "metro",
    event: { az: "Bakı Metro Hakatonu", ru: "Хакатон Бакинского метро", en: "Baku Metro Hackathon" },
    organizer: "Baku Metro",
    project: {
      az: "İzdiham idarəetmə sistemi",
      ru: "Система управления толпой",
      en: "Crowd management system",
    },
    problem: {
      az: "Metronun ayrı-ayrı vaqonlarının nə qədər dolu olduğunu real vaxtda görmək imkanı yox idi.",
      ru: "Метро не имело возможности видеть заполненность отдельных вагонов в реальном времени.",
      en: "The metro had no way to see how full individual wagons were in real time.",
    },
    built: {
      az: "Kamera görüntülərindən vaqonlardakı sərnişin sıxlığını qiymətləndirən kompüter görmə modeli, operatorlar üçün canlı idarəetmə paneli ilə.",
      ru: "Модель компьютерного зрения для оценки плотности пассажиров в вагонах по камерам, с панелью мониторинга для операторов.",
      en: "A computer vision model estimating passenger density inside wagons from camera feeds, with a live dashboard for operators.",
    },
    tags: [{ az: "Nəqliyyat", ru: "Транспорт", en: "Transport" }],
    image: "/images/projects/metro.png",
  },
  {
    slug: "pasha",
    event: { az: "Pasha Hakatonu", ru: "Хакатон Pasha", en: "Pasha Hackathon" },
    organizer: "Pasha Holding",
    project: {
      az: "RFID məhsul yerləşdirmə sistemi",
      ru: "Система определения местоположения товаров RFID",
      en: "RFID product location system",
    },
    problem: {
      az: "Anbarlarda əl ilə skan etmədən real vaxtda məhsul izləmə imkanı yox idi.",
      ru: "Склады не имели возможности отслеживать товары в реальном времени без ручного сканирования.",
      en: "Warehouses had no real-time product tracking without manual scanning.",
    },
    built: {
      az: "Passiv RFID oxuyucularından istifadə edən daxili yerləşdirmə sistemi, inventar üçün canlı admin paneli ilə.",
      ru: "Система внутреннего позиционирования с пассивными RFID-считывателями и панелью управления запасами.",
      en: "An indoor location system using passive RFID readers, with a live admin dashboard for inventory.",
    },
    tags: [{ az: "Logistika", ru: "Логистика", en: "Logistics" }],
    image: "/images/projects/pasha.png",
  },
  {
    slug: "azcon",
    event: { az: "AZCON Hakatonu", ru: "Хакатон AZCON", en: "AZCON Hackathon" },
    organizer: "AZCON",
    project: {
      az: "Multimodal logistika optimallaşdırıcısı",
      ru: "Мультимодальный оптимизатор логистики",
      en: "Multimodal logistics optimizer",
    },
    problem: {
      az: "Yol və dəmir yolunu birləşdirən yük marşrutlarının vahid optimallaşdırılması yox idi.",
      ru: "Грузовые маршруты, сочетающие автомобильный и железнодорожный транспорт, не имели единой оптимизации.",
      en: "Freight routes combining road and rail had no unified optimization.",
    },
    built: {
      az: "Bir neçə nəqliyyat növü üzrə planlaşdıran və xərc ilə vaxtı müqayisə edən marşrut optimallaşdırma sistemi.",
      ru: "Система оптимизации маршрутов, планирующая по нескольким видам транспорта и сравнивающая стоимость и время.",
      en: "A route optimization system that plans across multiple transport modes and compares cost and time.",
    },
    tags: [
      { az: "Logistika", ru: "Логистика", en: "Logistics" },
      { az: "Nəqliyyat", ru: "Транспорт", en: "Transport" },
    ],
    image: "/images/projects/azcon.png",
  },
  {
    slug: "narimanov",
    event: { az: "Nərimanov Hakatonu", ru: "Хакатон Наримановского района", en: "Narimanov Hackathon" },
    organizer: "Narimanov District",
    project: {
      az: "Vətəndaş problem bildirmə platforması",
      ru: "Платформа сообщений о городских проблемах",
      en: "Civic issue reporting platform",
    },
    problem: {
      az: "Sakinlərin yerli infrastruktur problemlərini bildirmək və izləmək üçün strukturlaşdırılmış yolu yox idi.",
      ru: "Жители не имели структурированного способа сообщать и отслеживать местные инфраструктурные проблемы.",
      en: "Residents had no structured way to report and track local infrastructure problems.",
    },
    built: {
      az: "Geolokasiyalı problem hesabatları təqdim etmək üçün mobil-əvvəl veb tətbiq, administratorlar üçün rayon səviyyəsində izləmə ilə.",
      ru: "Мобильное веб-приложение для отправки геолокированных отчётов о проблемах с отслеживанием на уровне района для администраторов.",
      en: "A mobile-first web app for submitting geolocated issue reports, with district-level tracking for administrators.",
    },
    tags: [{ az: "Dövlət", ru: "Государство", en: "Government" }],
    image: "/images/projects/narimanov.png",
  },
];
