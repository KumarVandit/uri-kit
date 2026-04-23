import HotDrink from "@uri-kit/icons/fill/hot-drink";
import Atom from "@uri-kit/icons/fill-duo/atom";
import ClockRotateClockwise from "@uri-kit/icons/fill-duo/clock-rotate-clockwise";
import Code from "@uri-kit/icons/fill-duo/code";
import ConnectedDots from "@uri-kit/icons/fill-duo/connected-dots";
import Download from "@uri-kit/icons/fill-duo/download";
import Layers from "@uri-kit/icons/fill-duo/layers";
import MapSearch from "@uri-kit/icons/fill-duo/map-search";
import Queue from "@uri-kit/icons/fill-duo/queue";
import Slider from "@uri-kit/icons/fill-duo/slider";
import Sparkle from "@uri-kit/icons/fill-duo/sparkle";
import Stack from "@uri-kit/icons/fill-duo/stack";
import TaskDebug from "@uri-kit/icons/fill-duo/task-debug";
import WindowCode2 from "@uri-kit/icons/fill-duo/window-code-2";
import Github from "@uri-kit/icons/social-media/github";
import Npm from "@uri-kit/icons/social-media/npm";
import XTwitter from "@uri-kit/icons/social-media/x-twitter";

type IconComponent = typeof MapSearch;

interface IconEntry {
  icon: IconComponent;
  color: string;
  external?: boolean;
  href?: string;
  tag?: string;
}

const iconMap: Record<string, IconEntry> = {
  "/": { icon: MapSearch, color: "var(--blue-9)" },
  "/docs": { icon: MapSearch, color: "var(--blue-9)" },
  "/docs/typescript": { icon: Code, color: "var(--blue-9)" },
  "/docs/react": { icon: Atom, color: "var(--cyan-9)" },
  "/docs/swift": { icon: Stack, color: "var(--orange-9)" },

  "/docs/cli": { icon: WindowCode2, color: "var(--purple-9)" },
  "/docs/mcp": { icon: ConnectedDots, color: "var(--green-9)" },

  "/docs/schemes": { icon: Layers, color: "var(--indigo-9)" },
  "/docs/paths": { icon: Slider, color: "var(--pink-9)" },
  "/docs/parameters": { icon: Queue, color: "var(--amber-9)" },
  "/docs/platforms": { icon: MapSearch, color: "var(--blue-9)" },
  "/docs/fallbacks": { icon: Sparkle, color: "var(--lime-9)" },

  "/docs/patches": { icon: Download, color: "var(--green-9)" },
  "/docs/api-define-uri": { icon: TaskDebug, color: "var(--red-9)" },
  "/docs/changelog": { icon: ClockRotateClockwise, color: "var(--bronze-9)" },
  "/docs/skill": { icon: Sparkle, color: "var(--violet-9)" },
  "/docs/llms": { icon: ConnectedDots, color: "var(--crimson-9)" },

  "github": { icon: Github, color: "var(--gray-9)", external: true, href: "https://github.com/KumarVandit/uri-kit" },
  "npm": { icon: Npm, color: "var(--red-9)", external: true, href: "https://www.npmjs.com/package/uri-kit" },
  "twitter": { icon: XTwitter, color: "var(--sky-9)", external: true, href: "https://twitter.com" },
  "bmc": { icon: HotDrink, color: "var(--yellow-9)", external: true, href: "https://buymeacoffee.com" },
};

export function getIconEntry(path: string): IconEntry | undefined {
  return iconMap[path];
}
