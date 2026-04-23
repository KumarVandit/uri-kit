import { defineSound } from "@web-kits/audio";

// UI Sound Effects - Sound definitions for useSound hook
// These are the sound definition objects, not the player functions

export const toggleOn = {
  source: { type: "sine" as const, frequency: { start: 400, end: 600 } },
  envelope: { attack: 0.001, decay: 0.1, sustain: 0, release: 0.1 },
  gain: 0.15,
};

export const toggleOff = {
  source: { type: "sine" as const, frequency: { start: 600, end: 400 } },
  envelope: { attack: 0.001, decay: 0.1, sustain: 0, release: 0.1 },
  gain: 0.15,
};

export const click = {
  source: { type: "sine" as const, frequency: 800 },
  envelope: { attack: 0.001, decay: 0.05, sustain: 0, release: 0.05 },
  gain: 0.15,
};

export const tap = {
  source: { type: "sine" as const, frequency: 600 },
  envelope: { attack: 0.001, decay: 0.03, sustain: 0, release: 0.03 },
  gain: 0.1,
};

export const checkbox = {
  source: { type: "sine" as const, frequency: { start: 400, end: 600 } },
  envelope: { attack: 0.001, decay: 0.08, sustain: 0, release: 0.08 },
  gain: 0.15,
};

export const slider = {
  source: { type: "sine" as const, frequency: 300 },
  envelope: { attack: 0.001, decay: 0.02, sustain: 0, release: 0.02 },
  gain: 0.08,
};

export const tabSwitch = {
  source: { type: "sine" as const, frequency: { start: 500, end: 450 } },
  envelope: { attack: 0.001, decay: 0.06, sustain: 0, release: 0.06 },
  gain: 0.12,
};

export const drawerOpen = {
  source: { type: "sine" as const, frequency: { start: 200, end: 300 } },
  envelope: { attack: 0.05, decay: 0.2, sustain: 0, release: 0.2 },
  gain: 0.1,
};

export const drawerClose = {
  source: { type: "sine" as const, frequency: { start: 300, end: 200 } },
  envelope: { attack: 0.05, decay: 0.2, sustain: 0, release: 0.2 },
  gain: 0.1,
};

export const linkClick = {
  source: { type: "sine" as const, frequency: 700 },
  envelope: { attack: 0.001, decay: 0.04, sustain: 0, release: 0.04 },
  gain: 0.12,
};

// Also export player functions for direct usage (without useSound hook)
export const playClick = defineSound(click);
export const playTap = defineSound(tap);
export const playCheckbox = defineSound(checkbox);
export const playSlider = defineSound(slider);
export const playTabSwitch = defineSound(tabSwitch);
export const playDrawerOpen = defineSound(drawerOpen);
export const playDrawerClose = defineSound(drawerClose);
export const playLinkClick = defineSound(linkClick);
export const playToggleOn = defineSound(toggleOn);
export const playToggleOff = defineSound(toggleOff);
