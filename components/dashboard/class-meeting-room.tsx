"use client";

import Link from "next/link";
import { Video } from "lucide-react";
import { Button } from "@/components/ui/button";

type Provider = "jitsi" | "daily" | "zoom" | "google_meet" | "custom";

function getProvider(): Provider {
  const value = String(process.env.NEXT_PUBLIC_CLASS_MEETING_PROVIDER ?? "jitsi").toLowerCase().trim();
  if (value === "daily") return "daily";
  if (value === "zoom") return "zoom";
  if (value === "google_meet") return "google_meet";
  if (value === "custom") return "custom";
  return "jitsi";
}

function getRoomUrl(roomKey: string) {
  const provider = getProvider();
  const customBase = String(process.env.NEXT_PUBLIC_CLASS_MEETING_URL ?? "").trim();

  if (provider === "custom" && customBase) {
    return customBase.includes("{room}") ? customBase.replace("{room}", roomKey) : customBase;
  }
  if (provider === "daily") {
    const domain = String(process.env.NEXT_PUBLIC_DAILY_DOMAIN ?? "").trim();
    if (domain) return `https://${domain}.daily.co/${roomKey}`;
    return "";
  }
  if (provider === "jitsi") {
    const base = String(process.env.NEXT_PUBLIC_JITSI_BASE_URL ?? "https://meet.jit.si").trim();
    return `${base}/${roomKey}`;
  }
  return customBase;
}

export function ClassMeetingRoom({
  roomKey,
  title = "Live Class Meeting",
}: {
  roomKey: string;
  title?: string;
}) {
  const provider = getProvider();
  const roomUrl = getRoomUrl(roomKey);
  const cannotEmbed = provider === "zoom" || provider === "google_meet" || !roomUrl;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.15em] text-slate-600">
          {provider}
        </span>
      </div>

      {cannotEmbed ? (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
          <p>
            Embedded calls are best with Daily or Jitsi. Zoom/Google Meet generally require external opening or SDK-specific integrations.
          </p>
          {roomUrl ? (
            <Button asChild className="mt-3 h-10 rounded-xl">
              <Link href={roomUrl} target="_blank">
                <Video className="size-4" />
                Open meeting
              </Link>
            </Button>
          ) : null}
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-200">
          <iframe
            title={`${title} (${provider})`}
            src={roomUrl}
            className="h-[380px] w-full md:h-[460px]"
            allow="camera; microphone; fullscreen; display-capture; autoplay"
          />
        </div>
      )}
    </div>
  );
}
