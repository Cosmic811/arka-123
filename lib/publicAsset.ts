/** Public files need the same project prefix as Next.js on GitHub Pages. */
export function publicAsset(
  path: string,
  basePath = process.env.NEXT_PUBLIC_BASE_PATH || "",
): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  return `${basePath.replace(/\/$/, "")}${path}`;
}
