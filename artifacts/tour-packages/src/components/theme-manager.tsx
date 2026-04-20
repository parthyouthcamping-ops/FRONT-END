import { useEffect } from "react";
import { useSettings } from "@/hooks/use-settings";

export function ThemeManager() {
  const { data: settings } = useSettings();

  useEffect(() => {
    if (settings?.theme) {
      const root = document.documentElement;
      const { primaryColor, accentColor, borderRadius, primaryFont, handwritingFont, headerTitle } = settings.theme;

      if (primaryColor) {
        // Simple hex to HSL approximation for compatibility with index.css
        root.style.setProperty("--primary", primaryColor);
      }
      if (accentColor) root.style.setProperty("--accent", accentColor);
      if (borderRadius) root.style.setProperty("--radius", `${borderRadius}px`);
      if (primaryFont) root.style.setProperty("--font-main", primaryFont);
      if (handwritingFont) root.style.setProperty("--font-accent-hand", handwritingFont);

      // Dimensions
      if (settings.dimensions) {
        if (settings.dimensions.heroHeight) 
          root.style.setProperty("--hero-height", `${settings.dimensions.heroHeight}px`);
        if (settings.dimensions.containerWidth) 
          root.style.setProperty("--container-max-width", `${settings.dimensions.containerWidth}px`);
      }
    }
  }, [settings]);

  return null;
}
