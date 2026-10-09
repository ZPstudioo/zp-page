import type { MetadataRoute } from "next";
import { URL_SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: URL_SITE, changeFrequency: "monthly", priority: 1 }];
}
