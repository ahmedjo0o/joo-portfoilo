/**
 * While the full portfolio is being built, the homepage shows a simple
 * "under construction" page instead.
 *
 * - Production builds (what Firebase deploys) show the under construction page.
 * - `npm run dev` still shows the full site, so it can be worked on locally.
 *
 * To launch the full site, set LAUNCHED to true and push to main.
 */
const LAUNCHED = false;

export const UNDER_CONSTRUCTION = !LAUNCHED && process.env.NODE_ENV === "production";
