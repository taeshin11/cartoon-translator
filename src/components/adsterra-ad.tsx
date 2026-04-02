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

const ADSTERRA_BANNER_KEY =
  process.env.NEXT_PUBLIC_ADSTERRA_BANNER_KEY ?? "";

const ADSTERRA_NATIVE_KEY =
  process.env.NEXT_PUBLIC_ADSTERRA_NATIVE_KEY ?? "";

const ADSTERRA_SOCIAL_KEY =
  process.env.NEXT_PUBLIC_ADSTERRA_SOCIAL_KEY ?? "";

/**
 * AdBanner — standard leaderboard / rectangle banner unit.
 * Defaults to 728×90. Pass `width` and `height` to override.
 */
export function AdBanner({
  adKey = ADSTERRA_BANNER_KEY,
  width = 728,
  height = 90,
}: Partial<AdsterraAdProps>) {
  return (
    <AdsterraAd adKey={adKey} width={width} height={height} format="banner" />
  );
}

/**
 * AdNative — Adsterra native ad unit.
 * Width and height are advisory; native units are typically fluid.
 */
export function AdNative({
  adKey = ADSTERRA_NATIVE_KEY,
  width = 300,
  height = 250,
}: Partial<AdsterraAdProps>) {
  return (
    <AdsterraAd adKey={adKey} width={width} height={height} format="native" />
  );
}

/**
 * AdSocialBar — Adsterra Social Bar (sticky bottom bar format).
 * Renders a full-width social-style unit; width/height are informational only.
 */
export function AdSocialBar({
  adKey = ADSTERRA_SOCIAL_KEY,
  width = 0,
  height = 0,
}: Partial<AdsterraAdProps>) {
  return (
    <AdsterraAd
      adKey={adKey}
      width={width}
      height={height}
      format="social"
    />
  );
}
