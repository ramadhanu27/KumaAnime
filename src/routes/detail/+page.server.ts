import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

// Redirect dari URL lama (/detail?slug=xxx) ke URL baru (/detail/xxx)
export const load: PageServerLoad = async ({ url }) => {
  const slug = url.searchParams.get("slug");

  if (slug) {
    // Redirect ke format URL baru
    throw redirect(301, `/detail/${encodeURIComponent(slug)}`);
  }

  // Jika tidak ada slug, redirect ke homepage
  throw redirect(302, "/");
};
