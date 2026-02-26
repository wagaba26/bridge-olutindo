"use client";

import { useEffect, useState } from "react";

const heroVideos = [
  {
    src: "/videos/hero/learn-japanese.mp4",
    label: "Learn Japanese",
  },
  {
    src: "/videos/hero/study-in-japan.mp4",
    label: "Study in Japan",
  },
];

export function HeroMedia() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroVideos.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="hidden md:block absolute inset-0">
      {heroVideos.map((video, index) => (
        <video
          key={video.src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={video.src} type="video/mp4" />
        </video>
      ))}

      <div className="absolute bottom-6 right-6 z-10 rounded-full bg-slate-950/55 px-4 py-2 text-xs font-semibold tracking-[0.12em] text-white">
        {heroVideos[activeIndex].label}
      </div>
    </div>
  );
}
