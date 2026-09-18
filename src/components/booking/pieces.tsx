'use client'

import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** A large, thumb-friendly selectable card used across the booking steps. */
export function ChoiceCard({
  selected,
  onSelect,
  title,
  subtitle,
  meta,
  badge,
  className,
}: {
  selected: boolean
  onSelect: () => void
  title: ReactNode
  subtitle?: ReactNode
  meta?: ReactNode
  badge?: ReactNode
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        'flex w-full items-center gap-4 rounded-card border p-5 text-left transition-colors duration-200',
        'min-h-[4.5rem]',
        selected
          ? 'border-foreground bg-foreground/[0.04]'
          : 'border-border-subtle bg-surface hover:border-foreground/35',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'grid size-5 shrink-0 place-items-center rounded-full border transition-colors',
          selected ? 'border-foreground bg-foreground' : 'border-foreground/30',
        )}
      >
        {selected ? <span className="size-1.5 rounded-full bg-background" /> : null}
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="text-[1.0625rem] leading-snug">{title}</span>
          {badge}
        </span>
        {subtitle ? (
          <span className="text-small mt-1 block text-secondary">{subtitle}</span>
        ) : null}
      </span>

      {meta ? <span className="shrink-0 text-right">{meta}</span> : null}
    </button>
  )
}

export function StepHeading({
  children,
  hint,
}: {
  children: ReactNode
  hint?: ReactNode
}) {
  return (
    <div className="mb-8">
      <h2 className="text-display-3">{children}</h2>
      {hint ? <p className="text-small mt-2.5 text-secondary">{hint}</p> : null}
    </div>
  )
}

export function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string
  label: string
  error?: string
  hint?: string
  children: (props: { id: string; 'aria-describedby'?: string; 'aria-invalid'?: true }) => ReactNode
}) {
  const describedBy = [error ? `${id}-error` : null, hint ? `${id}-hint` : null]
    .filter(Boolean)
    .join(' ')

  return (
    <div>
      <label htmlFor={id} className="text-small block font-medium">
        {label}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="text-small mt-1 text-secondary">
          {hint}
        </p>
      ) : null}
      <div className="mt-2">
        {children({
          id,
          ...(describedBy ? { 'aria-describedby': describedBy } : {}),
          ...(error ? { 'aria-invalid': true as const } : {}),
        })}
      </div>
      {error ? (
        <p id={`${id}-error`} className="text-small mt-2 text-accent-secondary">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export const inputClass =
  'w-full rounded-card border border-border-subtle bg-surface px-4 py-3.5 text-[1rem] ' +
  'transition-colors placeholder:text-secondary/60 hover:border-foreground/30 ' +
  'focus:border-foreground focus:outline-none aria-[invalid]:border-accent-secondary'
