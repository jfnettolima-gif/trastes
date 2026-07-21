import type { MetadataRoute } from "next";

// Sistema privado e restrito: nenhum buscador deve rastrear ou indexar.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", disallow: "/" }],
  };
}
