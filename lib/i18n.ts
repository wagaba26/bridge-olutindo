export type SiteLocale = "en" | "ja";

export const SITE_LANGUAGE_STORAGE_KEY = "bridge-site-locale";

export const NAV_TRANSLATIONS: Record<string, { en: string; ja: string }> = {
  Learn: { en: "Learn", ja: "\u5b66\u7fd2" },
  "Learn Japanese": { en: "Learn Japanese", ja: "\u65e5\u672c\u8a9e\u5b66\u7fd2" },
  "Teach Yourself": { en: "Teach Yourself", ja: "\u72ec\u5b66" },
  Study: { en: "Study", ja: "\u7559\u5b66" },
  "Study in Japan": { en: "Study in Japan", ja: "\u65e5\u672c\u7559\u5b66" },
  Partners: { en: "Partners", ja: "\u30d1\u30fc\u30c8\u30ca\u30fc" },
  Resources: { en: "Resources", ja: "\u8cc7\u6599" },
};

export function tNav(label: string, locale: SiteLocale) {
  const translated = NAV_TRANSLATIONS[label];
  if (!translated) return label;
  return translated[locale];
}
