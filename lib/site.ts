/**
 * While the full portfolio is being built, the homepage shows a simple
 * "under construction" page instead.
 *
 * - Production builds of `main` (what Firebase deploys live) show the under construction page.
 * - `npm run dev` shows the full site, so it can be worked on locally.
 * - Pull request preview builds set NEXT_PUBLIC_SHOW_FULL_SITE=true (see the
 *   GitHub workflow), so the preview URL shows the full site for review.
 *
 * To launch the full site, set LAUNCHED to true and push to main.
 */
const LAUNCHED = false;

const PREVIEW = process.env.NEXT_PUBLIC_SHOW_FULL_SITE === "true";

export const UNDER_CONSTRUCTION = !LAUNCHED && !PREVIEW && process.env.NODE_ENV === "production";
