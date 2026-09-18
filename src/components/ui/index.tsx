import Link from 'next/link'
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import { cn } from '@/lib/utils'

/* ------------------------------------------------------------------ layout */

export function Container({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={cn('container-site', className)}>{children}</div>
}

export function Section({
  children,
  className,
  tight,
  id,
  ...rest
}: {
  children: ReactNode
  className?: string
  tight?: boolean
  id?: string
} & ComponentPropsWithoutRef<'section'>) {
  return (
    <section id={id} className={cn(tight ? 'section-tight' : 'section', className)} {...rest}>
      {children}
    </section>
  )
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn('text-eyebrow text-secondary', className)}>{children}</p>
}

/** Section header: eyebrow + big display heading + optional lede and action. */
export function SectionHead({
  eyebrow,
  title,
  lede,
  action,
  className,
  level = 'h2',
}: {
  eyebrow?: string
  title: ReactNode
  lede?: ReactNode
  action?: ReactNode
  className?: string
  level?: 'h1' | 'h2' | 'h3'
}) {
  const Heading = level as ElementType
  return (
    <div
      className={cn(
        'flex flex-col gap-6 md:flex-row md:items-end md:justify-between',
        className,
      )}
    >
      <div className="max-w-2xl">
        {eyebrow ? <Eyebrow className="mb-4">{eyebrow}</Eyebrow> : null}
        <Heading className={level === 'h1' ? 'text-display-1' : 'text-display-2'}>{title}</Heading>
        {lede ? <p className="text-body-lg mt-5 text-secondary">{lede}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}

/* ----------------------------------------------------------------- buttons */

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'dark'
type ButtonSize = 'sm' | 'md' | 'lg'

const BUTTON_BASE =
  'inline-flex items-center justify-center gap-2 rounded-pill font-medium ' +
  'transition-[transform,background-color,color,border-color] duration-200 ease-out-soft ' +
  'active:scale-[0.98] disabled:pointer-events-none disabled:opacity-45 text-center'

const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  // Black text on accent — 7.9:1. Never white text on accent (2.7:1).
  primary: 'bg-accent text-foreground hover:bg-accent-secondary',
  secondary: 'border border-foreground/85 text-foreground hover:bg-foreground hover:text-background',
  ghost: 'text-foreground hover:bg-foreground/[0.06]',
  dark: 'bg-foreground text-background hover:bg-foreground/85',
}

const BUTTON_SIZES: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 text-[0.8125rem]',
  md: 'h-12 px-6 text-[0.9375rem]',
  lg: 'h-14 px-8 text-base',
}

export function buttonClass(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className?: string,
) {
  return cn(BUTTON_BASE, BUTTON_VARIANTS[variant], BUTTON_SIZES[size], className)
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: { variant?: ButtonVariant; size?: ButtonSize } & ComponentPropsWithoutRef<'button'>) {
  return <button className={buttonClass(variant, size, className)} {...props} />
}

/** An anchor that looks like a button. Use for navigation, never for actions. */
export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  href,
  ...props
}: { variant?: ButtonVariant; size?: ButtonSize; href: string } & Omit<
  ComponentPropsWithoutRef<'a'>,
  'href'
>) {
  const cls = buttonClass(variant, size, className)
  if (href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')) {
    return <a href={href} className={cls} {...props} />
  }
  return <Link href={href} className={cls} {...props} />
}

/* ------------------------------------------------------------------- cards */

export function Card({
  children,
  className,
  as: As = 'div',
}: {
  children: ReactNode
  className?: string
  as?: ElementType
}) {
  return (
    <As
      className={cn(
        'rounded-card-lg border border-border-subtle bg-surface',
        className,
      )}
    >
      {children}
    </As>
  )
}

export function Badge({
  children,
  tone = 'neutral',
  className,
}: {
  children: ReactNode
  tone?: 'neutral' | 'accent' | 'outline'
  className?: string
}) {
  const tones = {
    neutral: 'bg-foreground/[0.06] text-secondary',
    accent: 'bg-accent text-foreground',
    outline: 'border border-border-subtle text-secondary',
  } as const
  return (
    <span
      className={cn(
        'text-eyebrow inline-flex items-center rounded-pill px-3 py-1.5',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

/* ------------------------------------------------------------------ arrows */

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={cn('size-4', className)}
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
