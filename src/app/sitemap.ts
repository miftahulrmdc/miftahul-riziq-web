import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/profile";

// Required by `output: export` — written once at build time.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
