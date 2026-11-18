const commandYourMorning = "/_cdn/static/Command_your_morning_1767667535884.jpg";
const parentsForum = "/_cdn/static/Parents_Forum_1767667853073.jpg";
const covenantSundays = "/_cdn/static/covenant_sundays2_1767668224974.jpg";
const regionalCombinedService = "/_cdn/static/Screenshot_2026-01-20_at_12.37.28_1768940408267.jpg";
const monthlyPrayerVigil = "/_cdn/static/Screenshot_2026-01-20_at_18.52.31_1768940417167.jpg";
const ypfJabbok = "/_cdn/static/WhatsApp_Image_2026-01-15_at_16.03.18_1768940434327.jpg";
const parentSupportForum = "/_cdn/static/WhatsApp_Image_2026-01-16_at_17.40.20_1_1768940436725.jpg";

export const eventFlyers: Record<number, string> = {
  1: commandYourMorning,
  2: covenantSundays,
  3: covenantSundays,
  4: parentsForum,
  40: parentSupportForum,
  41: regionalCombinedService,
  42: monthlyPrayerVigil,
  43: ypfJabbok,
};

export const getEventFlyer = (eventId: number): string | undefined => {
  return eventFlyers[eventId];
};
