// Safelink utility functions with ouo.io integration

/**
 * ouo.io Configuration
 * Replace values with your actual settings
 * Get your API key from: https://ouo.io/manage/tools/quick-link
 */
export const OUO_CONFIG = {
  enabled: true, // Set to false to disable ouo.io
  apiKey: "YG5waAvG", // Your ouo.io API key from the Quick Link page
  baseUrl: "https://ouo.io/qs", // Quick Link format
  // PENTING: Ganti dengan domain production Anda!
  productionDomain: "https://kumastream.web.id", // Domain untuk ouo.io redirect
};

/**
 * Check if current environment is localhost/development
 * @param origin - window.location.origin
 * @returns true if localhost
 */
export function isLocalhost(origin: string): boolean {
  return origin.includes("localhost") || origin.includes("127.0.0.1");
}

/**
 * Encode a URL for safelink (browser-safe)
 * @param url - The original download URL
 * @returns Encoded URL string
 */
export function encodeForSafelink(url: string): string {
  try {
    return btoa(unescape(encodeURIComponent(url)));
  } catch {
    return "";
  }
}

/**
 * Decode a safelink URL back to original (browser-safe)
 * @param encoded - The encoded URL string
 * @returns Original URL
 */
export function decodeFromSafelink(encoded: string): string {
  try {
    return decodeURIComponent(escape(atob(encoded)));
  } catch {
    return "";
  }
}

/**
 * Generate the internal safelink URL (without domain)
 * @param downloadUrl - The original download URL
 * @param title - Optional title for the link
 * @returns Safelink path
 */
export function generateInternalSafelinkUrl(downloadUrl: string, title?: string): string {
  const encodedUrl = encodeForSafelink(downloadUrl);
  const params = new URLSearchParams({
    url: encodedUrl,
  });

  if (title) {
    params.set("title", title);
  }

  return `/safelink?${params.toString()}`;
}

/**
 * Wrap a URL with ouo.io Quick Link
 * @param destinationUrl - The full destination URL (including domain)
 * @param origin - Current window.location.origin (to detect localhost)
 * @returns ouo.io wrapped URL or original URL if on localhost
 */
export function wrapWithOuo(destinationUrl: string, origin?: string): string {
  if (!OUO_CONFIG.enabled) {
    return destinationUrl;
  }

  // Skip ouo.io on localhost - langsung ke safelink
  // ouo.io tidak menerima localhost URLs
  if (origin && isLocalhost(origin)) {
    // Di localhost, extract path dari URL dan return path saja
    try {
      const url = new URL(destinationUrl);
      return url.pathname + url.search;
    } catch {
      return destinationUrl;
    }
  }

  // Format: https://ouo.io/qs/API_KEY?s=destination_url
  const encodedDestination = encodeURIComponent(destinationUrl);
  return `${OUO_CONFIG.baseUrl}/${OUO_CONFIG.apiKey}?s=${encodedDestination}`;
}

/**
 * Generate a safelink URL with ouo.io wrapper
 * Flow: User clicks → ouo.io → Safelink → Download
 *
 * @param downloadUrl - The original download URL
 * @param title - Optional title for the link
 * @param siteBaseUrl - Your site's base URL (e.g., https://kumastream.web.id)
 * @returns Full ouo.io wrapped safelink URL
 */
export function generateSafelinkUrl(downloadUrl: string, title?: string): string {
  // Generate the internal safelink path
  const safelinkPath = generateInternalSafelinkUrl(downloadUrl, title);

  // For client-side, we need to construct full URL
  // In browser, this will be handled by the component
  // Return just the path if ouo.io is disabled
  if (!OUO_CONFIG.enabled) {
    return safelinkPath;
  }

  // Return a special format that the component will process
  // Format: ouo::{safelink_path}
  return `ouo::${safelinkPath}`;
}

/**
 * Get the full ouo.io URL (must be called client-side with window.location.origin)
 * @param safelinkPath - The safelink path
 * @param origin - The site origin (window.location.origin)
 * @returns Full ouo.io wrapped URL or just the path if on localhost
 */
export function getOuoUrl(safelinkPath: string, origin: string): string {
  // Jika localhost, langsung return path saja (skip ouo.io)
  if (isLocalhost(origin)) {
    return safelinkPath;
  }

  // Di production, gunakan domain production untuk ouo.io
  const fullSafelinkUrl = `${OUO_CONFIG.productionDomain}${safelinkPath}`;
  return wrapWithOuo(fullSafelinkUrl, origin);
}

/**
 * Check if a URL is an ouo.io wrapped URL
 * @param url - The URL to check
 * @returns true if it's an ouo-prefixed URL
 */
export function isOuoUrl(url: string): boolean {
  return url.startsWith("ouo::");
}

/**
 * Extract safelink path from ouo-prefixed URL
 * @param url - The ouo-prefixed URL
 * @returns The safelink path
 */
export function extractSafelinkPath(url: string): string {
  if (isOuoUrl(url)) {
    return url.replace("ouo::", "");
  }
  return url;
}

/**
 * Check if safelink is enabled
 * You can modify this to enable/disable safelink globally
 */
export const SAFELINK_ENABLED = true;

/**
 * Countdown duration in seconds
 */
export const SAFELINK_COUNTDOWN = 10;
