import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async () => {
  const baseUrl = "https://kumastream.web.id";
  const currentDate = new Date().toISOString().split("T")[0];

  // Static pages
  const staticPages = [
    { url: "/", priority: 1.0, changefreq: "daily" },
    { url: "/anime-list", priority: 0.9, changefreq: "daily" },
    { url: "/ongoing", priority: 0.9, changefreq: "daily" },
    { url: "/complete", priority: 0.8, changefreq: "weekly" },
    { url: "/schedule", priority: 0.8, changefreq: "daily" },
    { url: "/search", priority: 0.7, changefreq: "weekly" },
  ];

  // Genre pages
  const genres = ["action", "adventure", "comedy", "drama", "fantasy", "horror", "isekai", "mecha", "music", "mystery", "psychological", "romance", "school", "sci-fi", "slice-of-life", "sports", "supernatural", "thriller"];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
`;

  // Add static pages
  for (const page of staticPages) {
    sitemap += `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  }

  // Add genre pages
  for (const genre of genres) {
    sitemap += `  <url>
    <loc>${baseUrl}/genre?genre=${genre}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;
  }

  sitemap += `</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "max-age=3600, s-maxage=86400",
    },
  });
};
