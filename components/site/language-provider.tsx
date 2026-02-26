"use client";

import { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from "react";

import { SITE_LANGUAGE_STORAGE_KEY, type SiteLocale } from "@/lib/i18n";

type LanguageContextValue = {
  locale: SiteLocale;
  setLocale: (locale: SiteLocale) => void;
};

const SiteLanguageContext = createContext<LanguageContextValue | null>(null);
const LOCALE_EVENT = "bridge:locale-change";

function readLocale(): SiteLocale {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(SITE_LANGUAGE_STORAGE_KEY);
  return stored === "ja" || stored === "en" ? stored : "en";
}

function subscribeLocale(listener: () => void) {
  if (typeof window === "undefined") return () => {};

  window.addEventListener("storage", listener);
  window.addEventListener(LOCALE_EVENT, listener);
  return () => {
    window.removeEventListener("storage", listener);
    window.removeEventListener(LOCALE_EVENT, listener);
  };
}

export function SiteLanguageProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore<SiteLocale>(subscribeLocale, readLocale, () => "en");

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  function setLocale(nextLocale: SiteLocale) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(SITE_LANGUAGE_STORAGE_KEY, nextLocale);
    window.dispatchEvent(new Event(LOCALE_EVENT));
    document.documentElement.lang = nextLocale;
  }

  const value = useMemo(
    () => ({
      locale,
      setLocale,
    }),
    [locale]
  );

  return <SiteLanguageContext.Provider value={value}>{children}</SiteLanguageContext.Provider>;
}

export function useSiteLanguage() {
  const context = useContext(SiteLanguageContext);
  if (!context) {
    throw new Error("useSiteLanguage must be used within SiteLanguageProvider");
  }
  return context;
}
