/** Hosting provides the origin automatically; a custom domain remains optional. */
export function siteOrigin(env: Record<string, string | undefined>): URL {
  const origin =
    env.NEXT_PUBLIC_SITE_URL ||
    (env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
      : undefined) ||
    (env.VERCEL_URL ? `https://${env.VERCEL_URL}` : undefined) ||
    env.URL ||
    "http://localhost:3000";
  // Next.js already prepends basePath to generated metadata image URLs.
  return new URL(new URL(origin).origin);
}
