"use client";

import { useEffect, useRef, useState } from "react";

type UseEngagementPromptOptions = {
  key: string;
  cooldownMs: number;
  chipDelayMs?: number;
  autoOpenAfterMs?: number;
  autoOpenScrollRatio?: number;
  suppressionSignals?: Array<{ key: string; withinMs: number }>;
};

export function useEngagementPrompt({
  key,
  cooldownMs,
  chipDelayMs = 1400,
  autoOpenAfterMs = 8000,
  autoOpenScrollRatio = 0.4,
  suppressionSignals = [],
}: UseEngagementPromptOptions) {
  const dismissKey = `${key}_last_dismissed_at`;
  const viewKey = `${key}_views`;

  const [chipVisible, setChipVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const hasAutoOpened = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const now = Date.now();
    const lastDismissed = Number(window.localStorage.getItem(dismissKey) ?? "0");
    if (Number.isFinite(lastDismissed) && now - lastDismissed < cooldownMs) return;

    for (const signal of suppressionSignals) {
      const value = Number(window.localStorage.getItem(signal.key) ?? "0");
      if (Number.isFinite(value) && now - value < signal.withinMs) return;
    }

    const nextViews = Number(window.sessionStorage.getItem(viewKey) ?? "0") + 1;
    window.sessionStorage.setItem(viewKey, String(nextViews));

    const chipTimer = window.setTimeout(() => {
      setChipVisible(true);
    }, chipDelayMs);

    function maybeAutoOpen() {
      if (hasAutoOpened.current) return;
      hasAutoOpened.current = true;
      setModalOpen(true);
      setChipVisible(true);
    }

    if (nextViews >= 2) {
      const secondViewTimer = window.setTimeout(maybeAutoOpen, 700);
      return () => {
        window.clearTimeout(chipTimer);
        window.clearTimeout(secondViewTimer);
      };
    }

    const timeTimer = window.setTimeout(maybeAutoOpen, autoOpenAfterMs);
    const onScroll = () => {
      if (hasAutoOpened.current) return;
      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      const ratio = window.scrollY / total;
      if (ratio >= autoOpenScrollRatio) {
        maybeAutoOpen();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(chipTimer);
      window.clearTimeout(timeTimer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [autoOpenAfterMs, autoOpenScrollRatio, chipDelayMs, cooldownMs, dismissKey, suppressionSignals, viewKey]);

  function openModal() {
    setChipVisible(true);
    setModalOpen(true);
    hasAutoOpened.current = true;
  }

  function closeModal() {
    setModalOpen(false);
    setChipVisible(true);
  }

  function dismissForNow() {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(dismissKey, String(Date.now()));
    }
    setModalOpen(false);
    setChipVisible(false);
  }

  return {
    modalOpen,
    chipVisible,
    shouldRun: modalOpen || chipVisible,
    openModal,
    closeModal,
    dismissForNow,
  };
}
