import { useEffect } from "react";
import { useSettings } from "@/hooks/use-settings";

export function ThemeManager() {
  const { data: settings } = useSettings();

  useEffect(() => {
    if (settings?.theme) {
      const root = document.documentElement;
      const { primaryColor, accentColor, borderRadius, primaryFont } = settings.theme;

      if (primaryColor) root.style.setProperty("--primary", primaryColor);
      if (accentColor) root.style.setProperty("--accent", accentColor);
      if (borderRadius) root.style.setProperty("--radius", `${borderRadius}px`);
      if (primaryFont) root.style.setProperty("--font-family", primaryFont);
    }
  }, [settings]);

  return null;
}
