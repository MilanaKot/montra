export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

export function formatPrice(czk: number): string {
  return `${czk.toLocaleString('cs-CZ').replace(/ /g, ' ')} Kč`
}

export function formatDuration(minutes: number): string {
  return `${minutes} min`
}

const WEEKDAYS = ['neděle', 'pondělí', 'úterý', 'středa', 'čtvrtek', 'pátek', 'sobota']

/** "Dnes" / "Zítra" / "Sobota" — the grouping label used in the booking flow. */
export function dayLabel(date: Date, today = new Date()): string {
  const d = startOfDay(date)
  const t = startOfDay(today)
  const diff = Math.round((d.getTime() - t.getTime()) / 86_400_000)
  if (diff === 0) return 'Dnes'
  if (diff === 1) return 'Zítra'
  const name = WEEKDAYS[d.getDay()] ?? ''
  return name.charAt(0).toUpperCase() + name.slice(1)
}

export function dateLabel(date: Date): string {
  return `${date.getDate()}. ${date.getMonth() + 1}.`
}

export function startOfDay(d: Date): Date {
  const c = new Date(d)
  c.setHours(0, 0, 0, 0)
  return c
}

export function timeLabel(d: Date): string {
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

export function addDays(d: Date, n: number): Date {
  const c = new Date(d)
  c.setDate(c.getDate() + n)
  return c
}
