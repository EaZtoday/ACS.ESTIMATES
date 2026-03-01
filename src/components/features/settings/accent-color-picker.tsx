"use client";

import { useState, useEffect, useCallback } from "react";

// Inspired by the oklch.fyi vivid palette: fixed L/C with evenly distributed hues.
const ACCENT_PRESETS = [
  { label: "Red", value: "oklch(0.8 0.193 20)" },
  { label: "Orange", value: "oklch(0.8 0.193 50)" },
  { label: "Yellow", value: "oklch(0.8 0.193 80)" },
  { label: "Lime", value: "oklch(0.8 0.193 110)" },
  { label: "Green", value: "oklch(0.8 0.193 140)" },
  { label: "Teal", value: "oklch(0.8 0.193 170)" },
  { label: "Cyan", value: "oklch(0.8 0.193 200)" },
  { label: "Blue", value: "oklch(0.8 0.193 230)" },
  { label: "Indigo", value: "oklch(0.8 0.193 260)" },
  { label: "Violet", value: "oklch(0.8 0.193 290)" },
  { label: "Purple", value: "oklch(0.8 0.193 320)" },
  { label: "Pink", value: "oklch(0.8 0.193 350)" },
];

const DEFAULT_COLOR = ACCENT_PRESETS[3].value; // Lime
const HEX_PATTERN = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

function normalizeHex(input: string): string | null {
  const prefixed = input.startsWith("#") ? input : `#${input}`;
  return HEX_PATTERN.test(prefixed) ? prefixed.toLowerCase() : null;
}

export default function AccentColorPicker() {
  const [accentColor, setAccentColor] = useState(DEFAULT_COLOR);
  const [customHex, setCustomHex] = useState("#d6f249");
  const [hexInput, setHexInput] = useState("#d6f249");

  useEffect(() => {
    const saved = localStorage.getItem("accent-color");
    if (saved) {
      setAccentColor(saved);
      if (saved.startsWith("#")) {
        setCustomHex(saved);
        setHexInput(saved);
      }
    }
  }, []);

  const apply = useCallback((color: string) => {
    setAccentColor(color);
    localStorage.setItem("accent-color", color);
    document.documentElement.style.setProperty("--accent-color", color);
  }, []);

  const isPreset = ACCENT_PRESETS.some((p) => p.value === accentColor);

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-medium text-[var(--foreground)]">
        Accent Color
      </h2>
      <p className="text-sm text-[var(--text-secondary)]">
        Used for focus rings, buttons, and highlights.
      </p>
      <div className="flex flex-wrap items-center gap-3">
        {ACCENT_PRESETS.map((color) => (
          <button
            key={color.value}
            onClick={() => apply(color.value)}
            className="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110"
            style={{
              backgroundColor: color.value,
              borderColor:
                accentColor === color.value
                  ? "var(--foreground)"
                  : "transparent",
            }}
            title={color.label}
          />
        ))}
      </div>

      <div className="flex items-center gap-3">
        <label
          className={`relative w-8 h-8 rounded-full border-2 cursor-pointer transition-transform hover:scale-110 overflow-hidden ${
            !isPreset ? "border-[var(--foreground)]" : "border-transparent"
          }`}
          title="Custom color"
        >
          <input
            type="color"
            value={customHex}
            onChange={(e) => {
              const next = e.target.value.toLowerCase();
              setCustomHex(next);
              setHexInput(next);
              apply(next);
            }}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <span
            className="block w-full h-full rounded-full"
            style={{
              backgroundColor: !isPreset ? accentColor : customHex,
              backgroundImage:
                "conic-gradient(#f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)",
            }}
          />
        </label>

        <input
          type="text"
          inputMode="text"
          aria-label="Custom accent hex color"
          placeholder="#d6f249"
          value={hexInput}
          onChange={(e) => setHexInput(e.target.value)}
          onBlur={() => {
            const normalized = normalizeHex(hexInput.trim());
            if (!normalized) {
              setHexInput(customHex);
              return;
            }
            setCustomHex(normalized);
            setHexInput(normalized);
            apply(normalized);
          }}
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;
            const normalized = normalizeHex(hexInput.trim());
            if (!normalized) {
              setHexInput(customHex);
              return;
            }
            setCustomHex(normalized);
            setHexInput(normalized);
            apply(normalized);
          }}
          className="h-9 w-36 rounded-md border border-[var(--border)] bg-[var(--background)] px-3 text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]"
        />
      </div>
    </div>
  );
}
