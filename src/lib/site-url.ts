const FALLBACK = 'https://www.montra.cz'

/** Returns the input as an absolute origin, or null if it cannot be one. */
function toOrigin(value: string | undefined): string | null {
  const raw = value?.trim()
  if (!raw) return null
  const candidate = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`
  try {
    return new URL(candidate).origin
  } catch {
    return null
  }
}

/**
 * The site's public origin, resolved at build time.
 *
 * Every source is validated rather than trusted: an env var that exists but is
 * empty, or holds something that is not a URL, falls through to the next
 * source instead of throwing. `new URL('')` used to crash the whole build here
 * — metadataBase is evaluated while Next collects page data, so one bad value
 * takes down every route.
 *
 * Order: explicit override, then the URL Vercel assigns the deployment (so
 * previews describe themselves correctly), then the production domain.
 */
export const SITE_URL: string =
  toOrigin(process.env.NEXT_PUBLIC_SITE_URL) ??
  toOrigin(process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL) ??
  toOrigin(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
  toOrigin(process.env.NEXT_PUBLIC_VERCEL_URL) ??
  toOrigin(process.env.VERCEL_URL) ??
  FALLBACK
