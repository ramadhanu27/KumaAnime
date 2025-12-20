/**
 * Helper function untuk fetch API dengan timeout dan error handling
 * @param url - URL to fetch
 * @param customFetch - Custom fetch function (dari SvelteKit context)
 * @param options - RequestInit options
 * @param timeoutMs - Timeout in milliseconds (default 15000)
 */
export async function fetchWithTimeout(url: string, customFetch: typeof fetch = fetch, options: RequestInit = {}, timeoutMs: number = 15000): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await customFetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        "User-Agent": "KumaStream/1.0",
        ...options.headers,
      },
    });

    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}
