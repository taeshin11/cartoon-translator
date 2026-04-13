"use client";

import { useEffect, useRef } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type AdFormat = "banner" | "native" | "social";

interface AdsterraAdProps {
  adKey: string;
  width?: number;
  height?: number;
  format?: AdFormat;
}

// ---------------------------------------------------------------------------
// Core component
// ---------------------------------------------------------------------------

/**
 * AdsterraAd — renders an Adsterra ad unit by injecting the publisher script.
 *
 * If `adKey` is falsy (empty string, undefined) the component renders nothing,
 * providing a graceful fallback when the env var is not set.
 */
export default function AdsterraAd({
  adKey,
  width = 728,
  height = 90,
  format = "banner",
}: AdsterraAdProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!adKey || !containerRef.current) return;

    const container = containerRef.current;

    // Adsterra expects certain atOptions to be set before the script loads.
    // We scope them onto the container's dataset rather than window to avoid
    // collisions when multiple units are on the same page.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any)["atOptions"] = {
      key: adKey,
      format,
      width,
      height,
    };

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `//www.highperformanceformat.com/${adKey}/invoke.js`;
    script.async = true;

    container.appendChild(script);

    return () => {
      // Clean up on unmount so re-renders don't append duplicate scripts.
      if (container.contains(script)) {
        container.removeChild(script);
      }
    };
    // adKey is intentionally the only dep — format/width/height are static per unit.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adKey]);

  // Graceful fallback: render nothing when no key is configured.
  if (!adKey) return null;

  return (
    <div
      ref={containerRef}
      data-ad-format={format}
      style={{ width, height, maxWidth: "100%" }}
      aria-hidden="true"
    />
  );
}

// ---------------------------------------------------------------------------
// Convenience variants
// ---------------------------------------------------------------------------

const ADSTERRA_BANNER_KEY = "ac84de1f04617a88c8d2213336a9b320"; // 728x90
const ADSTERRA_BANNER_468_KEY = "1a9b63fc87681075dca4283da5917c8a"; // 468x60
const ADSTERRA_NATIVE_URL = "https://pl29139696.profitablecpmratenetwork.com/493be860b3ec4369df7457254f120966/invoke.js";
const ADSTERRA_NATIVE_CONTAINER = "container-493be860b3ec4369df7457254f120966";
const ADSTERRA_SOCIAL_URL = "https://pl29139695.profitablecpmratenetwork.com/37/4b/55/374b55859102e685628a30c2017b7c24.js";

// Legacy env var fallbacks (unused now but kept for reference)
const ADSTERRA_NATIVE_KEY = process.env.NEXT_PUBLIC_ADSTERRA_NATIVE_KEY ?? "";
const ADSTERRA_SOCIAL_KEY = process.env.NEXT_PUBLIC_ADSTERRA_SOCIAL_KEY ?? "";

/** AdBanner — 728×90 leaderboard */
export function AdBanner() {
  return <AdsterraAd adKey={ADSTERRA_BANNER_KEY} width={728} height={90} format="banner" />;
}

/** AdBanner468 — 468×60 banner */
export function AdBanner468() {
  return <AdsterraAd adKey={ADSTERRA_BANNER_468_KEY} width={468} height={60} format="banner" />;
}

/** AdNative — Adsterra native banner (container + script URL) */
export function AdNative() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const s = document.createElement("script");
    s.async = true;
    s.setAttribute("data-cfasync", "false");
    s.src = ADSTERRA_NATIVE_URL;
    ref.current.appendChild(s);
    return () => { if (ref.current?.contains(s)) ref.current.removeChild(s); };
  }, []);
  return <div ref={ref} id={ADSTERRA_NATIVE_CONTAINER} />;
}

/** AdSocialBar — sticky social bar (direct script URL) */
export function AdSocialBar() {
  useEffect(() => {
    const s = document.createElement("script");
    s.src = ADSTERRA_SOCIAL_URL;
    document.head.appendChild(s);
    return () => { if (document.head.contains(s)) document.head.removeChild(s); };
  }, []);
  return null;
}
