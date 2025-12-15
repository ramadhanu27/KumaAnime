import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

// Redirect dari URL lama (/watch?slug=xxx) ke URL baru (/watch/xxx)
export const load: PageServerLoad = async ({ url }) => {
  const slug = url.searchParams.get("slug");

  if (slug) {
    // Redirect ke format URL baru
    throw redirect(301, `/watch/${encodeURIComponent(slug)}`);
  }

  // Jika tidak ada slug, redirect ke homepage
  throw redirect(302, "/");
};
