"use client";

import { useEffect, useState } from "react";

/**
 * Debounced localStorage-backed draft state. Single-user app, so a per-key blob
 * in localStorage is enough — survives accidental navigation / reloads without a
 * round-trip to the server. Reloads cleanly when `key` changes (e.g. switching
 * prompts), and never writes a stale value under a freshly-switched key.
 */
export function useDraft<T>(key: string, initial: T, debounceMs = 500) {
  const [value, setValue] = useState<T>(initial);
  const [hydratedKey, setHydratedKey] = useState<string | null>(null);

  // (Re)load whenever the key changes.
  useEffect(() => {
    let next = initial;
    try {
      const raw = localStorage.getItem(key);
      if (raw != null) next = JSON.parse(raw) as T;
    } catch {
      /* corrupt/unavailable storage — fall back to initial */
    }
    // localStorage is client-only, so hydration must happen in an effect.
    /* eslint-disable react-hooks/set-state-in-effect */
    setValue(next);
    setHydratedKey(key);
    /* eslint-enable react-hooks/set-state-in-effect */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // Persist (debounced) only once the value is in sync with the current key.
  useEffect(() => {
    if (hydratedKey !== key) return;
    const id = setTimeout(() => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch {
        /* quota / unavailable — drafts are best-effort */
      }
    }, debounceMs);
    return () => clearTimeout(id);
  }, [key, value, hydratedKey, debounceMs]);

  function clear() {
    try {
      localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  }

  return { value, setValue, clear, hydrated: hydratedKey === key };
}
