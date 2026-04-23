import { version as audioVersion } from "@uri-kit/audio/package.json";
import HotDrink from "@uri-kit/icons/fill/hot-drink";
import Atom from "@uri-kit/icons/fill-duo/atom";
import CircleWaveformLines from "@uri-kit/icons/fill-duo/circle-waveform-lines";
import ClockRotateClockwise from "@uri-kit/icons/fill-duo/clock-rotate-clockwise";
import Code from "@uri-kit/icons/fill-duo/code";
import ConnectedDots from "@uri-kit/icons/fill-duo/connected-dots";
import Dial from "@uri-kit/icons/fill-duo/dial";
import Download from "@uri-kit/icons/fill-duo/download";
import Equalizer from "@uri-kit/icons/fill-duo/equalizer";
import Headphones from "@uri-kit/icons/fill-duo/headphones";
import Layers from "@uri-kit/icons/fill-duo/layers";
import MapSearch from "@uri-kit/icons/fill-duo/map-search";
import MediaPlay from "@uri-kit/icons/fill-duo/media-play";
import Music from "@uri-kit/icons/fill-duo/music";
import MusicNote from "@uri-kit/icons/fill-duo/music-note";
import MusicPlaylist from "@uri-kit/icons/fill-duo/music-playlist";
import Queue from "@uri-kit/icons/fill-duo/queue";
import Slider from "@uri-kit/icons/fill-duo/slider";
import Sparkle from "@uri-kit/icons/fill-duo/sparkle";
import Speaker from "@uri-kit/icons/fill-duo/speaker";
import Stack from "@uri-kit/icons/fill-duo/stack";
import TaskDebug from "@uri-kit/icons/fill-duo/task-debug";
import WaveformLines from "@uri-kit/icons/fill-duo/waveform-lines";
import WindowCode2 from "@uri-kit/icons/fill-duo/window-code-2";
import Github from "@uri-kit/icons/social-media/github";
import XTwitter from "@uri-kit/icons/social-media/x-twitter";

type IconComponent = typeof WaveformLines;

interface IconEntry {
  icon: IconComponent;
  color: string;
  external?: boolean;
  href?: string;
  tag?: string;
}

const iconMap: Record<string, IconEntry> = {
  "/": { icon: MapSearch, color: "var(--blue-9)" },
  "/getting-started": { icon: Download, color: "var(--green-9)" },
  "/getting-started/typescript": { icon: Code, color: "var(--blue-9)" },
  "/getting-started/react": { icon: Atom, color: "var(--cyan-9)" },

  "/cli": { icon: WindowCode2, color: "var(--purple-9)" },

  "/concepts/sources": { icon: WaveformLines, color: "var(--purple-9)" },
  "/concepts/filters": { icon: Equalizer, color: "var(--orange-9)" },
  "/concepts/envelopes": { icon: Slider, color: "var(--pink-9)" },
  "/concepts/modulation": { icon: Dial, color: "var(--amber-9)" },
  "/concepts/layers": { icon: Layers, color: "var(--blue-9)" },
  "/concepts/effects": { icon: ConnectedDots, color: "var(--red-9)" },
  "/concepts/spatial": { icon: Headphones, color: "var(--teal-9)" },

  "/integrations/patches": {
    icon: Queue,
    color: "var(--violet-9)",
  },

  "/integrations/react": { icon: Code, color: "var(--cyan-9)" },
  "/integrations/react/provider": {
    icon: CircleWaveformLines,
    color: "var(--blue-9)",
  },
  "/integrations/react/use-sound": {
    icon: MusicNote,
    color: "var(--purple-9)",
  },
  "/integrations/react/use-patch": {
    icon: MusicPlaylist,
    color: "var(--violet-9)",
  },
  "/integrations/react/use-sequence": {
    icon: WaveformLines,
    color: "var(--pink-9)",
  },
  "/integrations/react/use-analyser": {
    icon: Equalizer,
    color: "var(--orange-9)",
  },
  "/integrations/react/use-listener": {
    icon: Headphones,
    color: "var(--teal-9)",
  },

  "/api/sounds": { icon: MusicNote, color: "var(--blue-9)" },
  "/api/sounds/define-sound": {
    icon: MusicNote,
    color: "var(--purple-9)",
  },
  "/api/sounds/define-sequence": {
    icon: WaveformLines,
    color: "var(--pink-9)",
  },
  "/api/sounds/shorthands": { icon: MediaPlay, color: "var(--green-9)" },

  "/api/patches": { icon: Stack, color: "var(--violet-9)" },
  "/api/patches/define-patch": {
    icon: MusicPlaylist,
    color: "var(--amber-9)",
  },
  "/api/patches/load-patch": { icon: Download, color: "var(--green-9)" },

  "/api/context": { icon: Dial, color: "var(--amber-9)" },
  "/api/context/get-context": {
    icon: CircleWaveformLines,
    color: "var(--blue-9)",
  },
  "/api/context/ensure-ready": {
    icon: MediaPlay,
    color: "var(--green-9)",
  },
  "/api/context/set-master-volume": {
    icon: Speaker,
    color: "var(--purple-9)",
  },
  "/api/context/set-listener": {
    icon: Headphones,
    color: "var(--teal-9)",
  },

  "/api/output": { icon: Speaker, color: "var(--green-9)" },
  "/api/output/create-master-analyser": {
    icon: Equalizer,
    color: "var(--orange-9)",
  },
  "/api/output/render-to-buffer": {
    icon: WaveformLines,
    color: "var(--pink-9)",
  },
  "/api/output/render-to-wav": {
    icon: MusicNote,
    color: "var(--purple-9)",
  },
  "/api/output/buffer-to-wav": {
    icon: MusicNote,
    color: "var(--amber-9)",
  },

  "/api/reference": { icon: ConnectedDots, color: "var(--ds-gray-9)" },
  "/api/reference/types": { icon: ConnectedDots, color: "var(--red-9)" },

  "/resources/changelog": {
    icon: ClockRotateClockwise,
    color: "var(--orange-9)",
  },
  "/resources/llms": { icon: Sparkle, color: "var(--violet-9)" },
  "/resources/skill": { icon: TaskDebug, color: "var(--pink-9)" },
  "/github": {
    icon: Github,
    color: "var(--ds-gray-9)",
    external: true,
    href: "https://github.com/raphaelsalaja/audio",
  },
  "/twitter": {
    icon: XTwitter,
    color: "var(--ds-gray-9)",
    external: true,
    href: "https://twitter.com/raphaelsalaja",
  },
  "/npm": {
    icon: Download,
    color: "var(--red-9)",
    external: true,
    href: "https://npmjs.com/package/@uri-kit/audio",
    tag: `v${audioVersion}`,
  },
  "/buy-me-a-coffee": {
    icon: HotDrink,
    color: "var(--amber-9)",
    external: true,
    href: "https://buymeacoffee.com/raphaelsalaja",
  },

  "/library": { icon: Music, color: "var(--violet-9)" },
};

export function getIconEntry(href: string): IconEntry | undefined {
  return iconMap[href];
}
