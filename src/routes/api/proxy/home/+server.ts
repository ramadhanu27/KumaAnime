import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ fetch }) => {
  try {
    const response = await fetch("https://www.sankavollerei.com/anime/home", {
      headers: {
        Accept: "application/json",
        "User-Agent": "KumaStream/1.0",
      },
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ error: "API error" }), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300", // Cache for 5 minutes
      },
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
