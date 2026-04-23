"use client";

import Moon from "@uri-kit/icons/fill/moon";
import Palette from "@uri-kit/icons/fill/palette";
import Sun from "@uri-kit/icons/fill/sun";
import { toggleOn, toggleOff } from "@/lib/sounds";
import { useSound } from "@web-kits/audio/react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.css";

const THEME_CYCLE = ["dark", "system", "light"] as const;

type ThemeMode = (typeof THEME_CYCLE)[number];

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const playToggleOn = useSound(toggleOn);
  const playToggleOff = useSound(toggleOff);

  useEffect(() => setMounted(true), []);

  const handleToggle = useCallback(() => {
    const current: ThemeMode = (THEME_CYCLE as readonly string[]).includes(
      theme ?? "",
    )
      ? (theme as ThemeMode)
      : "system";

    const next =
      THEME_CYCLE[(THEME_CYCLE.indexOf(current) + 1) % THEME_CYCLE.length];

    // Play sound based on what we're switching to
    if (next === "dark") {
      playToggleOn();
    } else if (next === "light") {
      playToggleOff();
    } else {
      playToggleOn();
    }

    setTheme(next);
  }, [theme, setTheme, playToggleOn, playToggleOff]);

  if (!mounted) return <div className={styles.toggle} />;

  const current: ThemeMode = (THEME_CYCLE as readonly string[]).includes(
    theme ?? "",
  )
    ? (theme as ThemeMode)
    : "system";

  const next =
    THEME_CYCLE[(THEME_CYCLE.indexOf(current) + 1) % THEME_CYCLE.length];

  const MotionMoon = motion(Moon);
  const MotionSun = motion(Sun);
  const MotionPalette = motion(Palette);

  const props = {
    initial: { opacity: 0, scale: 0.9, filter: "blur(2px)" },
    animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
    exit: { opacity: 0, scale: 0.9, filter: "blur(2px)" },
    transition: { duration: 0.2, ease: "easeInOut" },
    width: 14,
    height: 14,
    style: { display: "flex" },
  } as const;

  const label = `Theme: ${current} (click for ${next})`;

  return (
    <button
      className={styles.toggle}
      onClick={handleToggle}
      aria-label={label}
      title={label}
    >
      <AnimatePresence mode="wait">
        {current === "dark" && (
          <MotionMoon key="moon" {...props} />
        )}
        {current === "light" && (
          <MotionSun key="sun" {...props} />
        )}
        {current === "system" && (
          <MotionPalette key="palette" {...props} />
        )}
      </AnimatePresence>
    </button>
  );
}
