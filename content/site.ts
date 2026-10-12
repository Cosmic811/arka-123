/** Event-space concept and approved media.
 * Provenance: docs/assets-sources.md. Concept data never claims real verification.
 */
import { publicAsset } from "../lib/publicAsset.ts";

export type MediaAsset = {
  id: string;
  src: string | null;
  expectedPath: string;
  label: string;
  alt: string;
  width: number;
  height: number;
  objectFit?: "cover" | "contain";
  objectPosition?: string;
  status: "missing" | "verified" | "concept";
};

function media(
  id: string,
  expectedPath: string,
  label: string,
  width: number,
  height: number,
  options: Partial<
    Pick<MediaAsset, "src" | "alt" | "status" | "objectFit" | "objectPosition">
  > = {},
): MediaAsset {
  return {
    id,
    expectedPath,
    label,
    alt: label,
    width,
    height,
    status: "missing",
    ...options,
    src: options.src ? publicAsset(options.src) : null,
  };
}

export type Review = {
  id: string;
  quote: string;
  author: string;
  context?: string;
  verified: boolean;
  provenance: "provided" | "concept";
};

export const site = {
  name: "АРКА 123",
  isFictionalConcept: true,
  slogan: "Встречаемся напротив Библиотеки.",
  navigation: [
    { href: "#space", label: "Пространство" },
    { href: "#formats", label: "Форматы" },
    { href: "#gallery", label: "Галерея" },
    { href: "#rates", label: "Тарифы" },
    { href: "#inquiry", label: "Контакты" },
  ],
  logo: media("logo", "/brand/arka-logo.png", "Фирменный логотип", 936, 240, {
    src: "/brand/arka-logo.png",
    status: "verified",
  }),
  logoMotion: {
    src: null as string | null,
    expectedPath: "/brand/arka-logo-motion.webm",
    alternatePath: "/brand/arka-logo-motion.mp4",
  },
  hero: {
    eyebrow: "АРКА 123 · пространство для мероприятий",
    title: "Встреча начинается с вида.",
    titleLines: ["Встреча", "начинается", "с"],
    titleAccent: "вида.",
    description:
      "123 м² для мастер-классов, лекций и камерных встреч. Арочные окна и вид на Национальную библиотеку.",
    primary: "Обсудить мероприятие",
    secondary: "Посмотреть пространство",
    media: media(
      "hero",
      "/images/space/hero-room.webp",
      "Фотография пространства",
      1600,
      2000,
      {
        src: "/images/space/hero-room.webp",
        status: "verified",
        objectPosition: "50% 50%",
        alt: "Реальное помещение АРКА 123: арочные окна, дневной свет и деревянный пол",
      },
    ),
  },
  about: {
    title: "Место для разговора, знаний и новых идей.",
    description:
      "АРКА 123 — пространство для мастер-классов, семинаров, лекций и камерных деловых встреч. В названии — его архитектура и площадь: арочные окна и 123 м². За окнами — Национальная библиотека. Внутри — место для вашего события.",
  },
  space: {
    title: "Посмотрите, где состоится ваша встреча.",
    description:
      "Арочные окна размером 4 × 3,5 м, дневной свет и вид на библиотеку. Рассмотрите пространство и выберите сценарий своего мероприятия.",
    facts: [
      { value: "123 м²", label: "площадь пространства" },
      { value: "4 × 3,5 м", label: "размер арочных окон" },
      { value: "Национальная библиотека", label: "вид из окна" },
    ],
    layouts: [
      {
        id: "room",
        label: "Пространство",
        concept: false,
        media: media(
          "room",
          "/images/space/room-wide.webp",
          "Общий вид пространства",
          2000,
          1250,
          {
            src: "/images/space/room-wide.webp",
            status: "verified",
            alt: "Общий вид реального помещения с двумя арочными окнами",
          },
        ),
      },
      {
        id: "workshop",
        label: "Мастер-класс",
        concept: true,
        media: media(
          "workshop",
          "/images/space/workshop-layout.webp",
          "Концепция расстановки для мастер-класса",
          2000,
          1250,
          {
            src: "/images/space/workshop-layout.webp",
            status: "concept",
            alt: "Концепция мастер-класса: два общих стола в реальном помещении АРКА 123",
          },
        ),
      },
      {
        id: "lecture",
        label: "Лекция / встреча",
        concept: true,
        media: media(
          "lecture",
          "/images/space/lecture-layout.webp",
          "Концепция расстановки для лекции или встречи",
          2000,
          1250,
          {
            src: "/images/space/lecture-layout.webp",
            status: "concept",
            alt: "Концепция лекции: ряды стульев и трибуна при сохранённой архитектуре помещения",
          },
        ),
      },
    ],
    conceptNote:
      "Концепция расстановки. Возможности уточняются при подготовке мероприятия.",
    depth: publicAsset("/images/space/room-wide-depth.png"),
    sceneLabel: "Свет и глубина",
    pause: "Остановить движение",
    resume: "Включить движение",
    roomCaption: "Арочные окна. Дневной свет. Пространство для вашей встречи.",
  },
  formats: {
    title: "Один адрес. Разные поводы встретиться.",
    description:
      "Расскажите, что планируете: формат, дату и количество гостей. Обсудим, подойдёт ли пространство вашему событию.",
    items: [
      {
        id: "workshop",
        title: "Мастер-класс",
        description: "Для практики, обсуждения и обмена опытом.",
      },
      {
        id: "lecture",
        title: "Лекция или семинар",
        description: "Для выступления, вопросов и разговора после.",
      },
      {
        id: "meeting",
        title: "Камерная деловая встреча",
        description: "Для совместной работы и обсуждения за одним столом.",
      },
      {
        id: "presentation",
        title: "Презентация",
        description: "Для показа проекта и разговора с небольшой аудиторией.",
      },
    ],
  },
  host: {
    title: "Познакомьтесь с пространством.",
    description:
      "Арочные окна, дневной свет и место для вашего события. Хозяйка встречи приглашает рассмотреть пространство.",
    cta: "Обсудить вашу встречу",
    poster: media(
      "host-poster",
      "/images/host/host-film-poster.webp",
      "Постер видео с фирменным героем",
      1920,
      1080,
    ),
    portrait: media(
      "host-portrait",
      "/images/host/host-main.webp",
      "Портрет фирменного героя",
      1600,
      2000,
      {
        objectFit: "contain",
        src: "/images/host/host-main.webp",
        status: "concept",
        alt: "Фирменная хозяйка АРКА 123 в графитовом жакете с брошей 123 — вымышленный персонаж",
      },
    ),
    cutout: publicAsset("/images/host/host-cutout.webp"),
    scene: {
      opening: "Встречаемся напротив Библиотеки.",
      title: "Вы выбираете повод. Мы встречаем гостей.",
      description: "Начнём с вашего формата.",
      caption: "АРКА 123 · хозяйка встречи",
    },
    video: {
      desktop: null as string | null,
      mobile: null as string | null,
      expectedDesktop: "/video/host-motion.mp4",
      expectedMobile: "/video/host-motion-mobile.mp4",
    },
  },
  gallery: {
    title: "Рассмотрите детали.",
    items: [
      media(
        "gallery-room",
        "/images/space/gallery-room.webp",
        "Общий вид",
        1600,
        1200,
        {
          src: "/images/space/gallery-room.webp",
          status: "verified",
          alt: "Два арочных окна и паркет в реальном помещении",
        },
      ),
      media(
        "gallery-window",
        "/images/space/gallery-window.webp",
        "Арочное окно",
        1200,
        1600,
        {
          src: "/images/space/gallery-window.webp",
          status: "verified",
          alt: "Арочное окно АРКА 123 крупным планом",
        },
      ),
      media(
        "gallery-view",
        "/images/space/gallery-city-view.webp",
        "Город за окном",
        1200,
        1600,
        {
          src: "/images/space/gallery-city-view.webp",
          status: "verified",
          alt: "Городская улица и деревья за арочным окном АРКА 123",
        },
      ),
      media(
        "gallery-detail",
        "/images/space/gallery-detail.webp",
        "Деталь интерьера",
        1600,
        1200,
        {
          src: "/images/space/gallery-detail.webp",
          status: "verified",
          alt: "Деталь реального интерьера АРКА 123",
        },
      ),
    ],
  },
  rates: {
    title: "Время для вашей встречи.",
    description:
      "Короткое событие или день с несколькими сессиями. Выберите время, а формат и подготовку обсудим вместе.",
    note: "Пространство предоставляется целиком. Подготовка и завершение события входят в выбранное время. Дату, рассадку и дополнительные услуги согласуем заранее.",
    items: [
      {
        id: "short",
        title: "Встреча",
        duration: "2 часа",
        price: "320",
        currency: "BYN",
        description: "Для презентации, разговора или короткого мастер-класса.",
      },
      {
        id: "half",
        title: "Полдня",
        duration: "4 часа",
        price: "560",
        currency: "BYN",
        description: "Для лекции с обсуждением или практического занятия.",
      },
      {
        id: "day",
        title: "День",
        duration: "8 часов",
        price: "960",
        currency: "BYN",
        description: "Для программы из нескольких сессий с перерывами.",
      },
    ],
    cta: "Обсудить аренду",
    itemCta: "Выбрать время",
    provenance:
      "Concept pricing for a fictional brand; not a verified venue offer",
  },
  reviewsTitle: "После встречи остаются впечатления.",
  reviews: [
    {
      id: "anna",
      quote:
        "Проводили мастер-класс днём. Столы собрали двумя группами — было удобно подходить к каждому. И свет из окон очень помог с фотографиями работ.",
      author: "Анна К.",
      context: "Мастер-класс",
      verified: false,
      provenance: "concept",
    },
    {
      id: "mikhail",
      quote:
        "После лекции не пришлось сразу расходиться: осталось место для вопросов и небольших разговоров. Для нашей камерной группы формат подошёл.",
      author: "Михаил С.",
      context: "Лекция",
      verified: false,
      provenance: "concept",
    },
    {
      id: "olga",
      quote:
        "Выбрали пространство для презентации проекта. Запомнился вид из окна — гости подходили посмотреть ещё до начала. Получилось спокойно, без ощущения большого конференц-зала.",
      author: "Ольга М.",
      context: "Презентация",
      verified: false,
      provenance: "concept",
    },
  ] as Review[],
  inquiry: {
    title: "Давайте запланируем вашу встречу.",
    description:
      "Расскажите о событии: когда хотите встретиться, что планируете и сколько человек приглашаете.",
    demoMessage: "Демонстрационная форма. Сообщение не отправлено.",
    address: "Минск · Мстиславца, 10",
    locationNote:
      "Напротив Национальной библиотеки. Вход и детали встречи согласуем заранее.",
  },
  footer: { note: "АРКА 123 — концепция сайта вымышленной компании" },
};

export const publishedReviews = site.reviews.filter(
  (review) =>
    (review.verified ||
      (site.isFictionalConcept && review.provenance === "concept")) &&
    review.quote.trim() &&
    review.author.trim(),
);
