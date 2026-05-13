"use client";

import {
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
} from "react";

type Theme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

const THEME_KEY = "gamevault-theme";

// Module-level pub/sub
const listeners = new Set<() => void>();
function emitChange() {
  for (const fn of listeners) fn();
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Resolve "system" preference to actual theme */
function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

// Cached snapshot
let cachedPreference: Theme | undefined;
let cachedResolved: ResolvedTheme | undefined;

interface ThemeSnapshot {
  preference: Theme;
  resolved: ResolvedTheme;
}

const SERVER_SNAPSHOT: ThemeSnapshot = {
  preference: "system",
  resolved: "dark",
};

let cachedSnapshot: ThemeSnapshot = SERVER_SNAPSHOT;

function applyTheme(resolved: ResolvedTheme) {
  const html = document.documentElement;
  html.classList.remove("light", "dark");
  html.classList.add(resolved);
}

function readPreference(): Theme {
  const raw = localStorage.getItem(THEME_KEY);
  if (raw === "light" || raw === "dark" || raw === "system") return raw;
  return "system";
}

function getSnapshot(): ThemeSnapshot {
  const pref = readPreference();
  const resolved = pref === "system" ? getSystemTheme() : pref;

  if (pref !== cachedPreference || resolved !== cachedResolved) {
    cachedPreference = pref;
    cachedResolved = resolved;
    cachedSnapshot = { preference: pref, resolved };
    applyTheme(resolved);
  }

  return cachedSnapshot;
}

function getServerSnapshot(): ThemeSnapshot {
  return SERVER_SNAPSHOT;
}

function writeTheme(theme: Theme) {
  localStorage.setItem(THEME_KEY, theme);
  cachedPreference = undefined; // invalidate cache
  cachedResolved = undefined;
  emitChange();
}

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const snapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const setTheme = useCallback((theme: Theme) => {
    writeTheme(theme);
  }, []);

  const toggleTheme = useCallback(() => {
    const current = getSnapshot();
    writeTheme(current.resolved === "dark" ? "light" : "dark");
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme: snapshot.preference,
        resolvedTheme: snapshot.resolved,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
