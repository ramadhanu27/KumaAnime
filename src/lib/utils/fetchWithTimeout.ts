/**
 * Helper function untuk fetch API dengan timeout dan error handling
 * Khusus untuk Cloudflare Workers compatibility
 */
export async function fetchWithTimeout(
  url: string,
  customFetch: typeof fetch = fetch,
  options: RequestInit = {},
  timeoutMs: number = 30000 // Increased to 30 seconds for Cloudflare
): Promise<Response> {
  try {
    // Cloudflare Workers has built-in timeout, so we don't need AbortController
    const response = await customFetch(url, {
      ...options,
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0 (compatible; KumaStream/1.0)",
        "Cache-Control": "no-cache",
        ...options.headers,
      },
    });

    return response;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
