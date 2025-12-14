// Safelink utility functions

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
 * Generate a safelink URL
 * @param downloadUrl - The original download URL
 * @param title - Optional title for the link
 * @returns Full safelink URL path
 */
export function generateSafelinkUrl(downloadUrl: string, title?: string): string {
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
 * Check if safelink is enabled
 * You can modify this to enable/disable safelink globally
 */
export const SAFELINK_ENABLED = true;

/**
 * Countdown duration in seconds
 */
export const SAFELINK_COUNTDOWN = 10;
