import { useQuery } from "@tanstack/react-query";

export interface SiteSettings {
  organization: {
    name: string;
    website: string;
    supportEmail: string;
    supportPhone: string;
    address: string;
  };
  brand: {
    primaryColor: string;
    accentColor: string;
    primaryFont: string;
    handwrittenFont: string;
    logo: string;
    favicon: string;
  };
  socialLinks: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    whatsapp?: string;
    twitter?: string;
  };
  smtp: {
    host: string;
    port: string;
    user: string;
    fromName: string;
    fromEmail: string;
  };
  tripCustomFields: Array<{ label: string; type: string }>;
}

export function useSettings() {
  const apiUrl = import.meta.env.VITE_API_URL || "https://back-end-production-191d.up.railway.app/api";

  return useQuery<SiteSettings>({
    queryKey: ["settings"],
    queryFn: async () => {
      const res = await fetch(`${apiUrl}/settings`);
      const json = await res.json();
      return json.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}
