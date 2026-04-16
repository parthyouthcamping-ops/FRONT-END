import { useQuery } from "@tanstack/react-query";

export interface SiteSettings {
  siteName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  currency: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
    linkedin: string;
  };
  logo: string;
  favicon: string;
}

export function useSettings() {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8888/api";

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
