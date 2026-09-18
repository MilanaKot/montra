'use client'

import { useState } from 'react'
import { SERVICES } from '@/content/services'
import { LOCATION } from '@/content/location'
import { track } from '@/features/analytics'
import { Button, Container } from '@/components/ui'
import { ChoiceCard, Field, StepHeading, inputClass } from '@/components/booking/pieces'
import { cn, formatPrice } from '@/lib/utils'

const AMOUNTS = [690, 990, 1390, 1790, 2190] as const

const STEPS = ['Hodnota', 'Příjemce', 'Věnování', 'Doručení', 'Platba'] as const

export function VoucherFlow() {
  const [step, setStep] = useState(0)
  const [mode, setMode] = useState<'amount' | 'service'>('amount')
  const [amount, setAmount] = useState<number | null>(null)
  const [serviceSlug, setServiceSlug] = useState<string | null>(null)
  const [recipient, setRecipient] = useState({ name: '', email: '' })
  const [dedication, setDedication] = useState('')
  const [buyer, setBuyer] = useState({ name: '', email: '', phone: '' })
  const [company, setCompany] = useState(false)
  const [companyInfo, setCompanyInfo] = useState({ name: '', ico: '', dic: '' })
  const [payment, setPayment] = useState<'card' | 'transfer'>('card')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [done, setDone] = useState(false)

  const service = SERVICES.find((s) => s.slug === serviceSlug)
  const value =
    mode === 'amount'
      ? amount
      : (service?.durations.find((d) => d.recommended) ?? service?.durations[0])?.priceCzk ?? null

  function next() {
    if (step === 1) {
      const e: Record<string, string> = {}
      if (recipient.name.trim().length < 2) e.rname = 'Vyplňte prosím jméno obdarovaného.'
      setErrors(e)
      if (Object.keys(e).length) return
    }
    if (step === 4) {
      const e: Record<string, string> = {}
      if (buyer.name.trim().length < 2) e.bname = 'Vyplňte prosím své jméno.'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(buyer.email.trim()))
        e.bemail = 'Zadejte prosím platný e-mail.'
      setErrors(e)
      if (Object.keys(e).length) {
        document.getElementById(Object.keys(e)[0]!)?.focus()
        return
      }
      track('voucher_completed', { value })
      setDone(true)
      return
    }
    setStep((s) => s + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const canContinue =
    step === 0 ? value !== null : step === 3 ? true : step === 2 ? true : true

  if (done) {
    return (
      <Container>
        <div className="mx-auto max-w-[40rem] py-16 text-center md:py-24">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-accent text-background">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-8">
              <path
                d="M5 12.5l4.5 4.5L19 7.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <h2 className="text-display-2 mt-8">Poukaz je na cestě.</h2>
          <p className="text-body-lg mt-5 text-secondary">
            Po přijetí platby vám pošleme e-mail s odkazem na zobrazení a stažení
            dárkového poukazu. Stačí ho vytisknout a vzít s sebou.
          </p>
          <p className="text-small mt-6 text-secondary">
            Každý kód poukazu je unikátní a elektronicky ověřovaný. Zvolenou částku
            nemusíte vyčerpat při jedné návštěvě — lze ji použít kreditním způsobem.
          </p>
        </div>
      </Container>
    )
  }

  return (
    <div className="pb-28 md:pb-16">
      <Container>
        <div className="mx-auto max-w-[46rem]">
          <div className="pt-8 md:pt-12">
            <p className="text-eyebrow text-secondary">
              Krok {step + 1} / {STEPS.length} · {STEPS[step]}
            </p>
            <ol className="mt-3 flex gap-1.5">
              {STEPS.map((s, i) => (
                <li
                  key={s}
                  className={cn(
                    'h-1 flex-1 rounded-pill',
                    i < step ? 'bg-foreground' : i === step ? 'bg-accent' : 'bg-foreground/12',
                  )}
                />
              ))}
            </ol>
          </div>

          <div className="mt-10">
            {/* ------------------------------------------------- 1. value */}
            {step === 0 ? (
              <>
                <StepHeading hint="Poukaz platí na jakoukoli masáž v salonu Montra Beroun.">
                  Vyberte hodnotu poukazu
                </StepHeading>

                <div className="flex gap-2">
                  {(['amount', 'service'] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMode(m)}
                      aria-pressed={mode === m}
                      className={cn(
                        'rounded-pill border px-5 py-2.5 text-[0.9375rem] transition-colors',
                        mode === m
                          ? 'border-foreground bg-foreground text-background'
                          : 'border-border-subtle text-secondary hover:border-foreground/40',
                      )}
                    >
                      {m === 'amount' ? 'Na částku' : 'Na konkrétní masáž'}
                    </button>
                  ))}
                </div>

                {mode === 'amount' ? (
                  <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                    {AMOUNTS.map((a) => (
                      <button
                        key={a}
                        type="button"
                        aria-pressed={amount === a}
                        onClick={() => {
                          setAmount(a)
                          setServiceSlug(null)
                          track('voucher_started', { value: a })
                        }}
                        className={cn(
                          'rounded-card border py-6 transition-colors',
                          amount === a
                            ? 'border-foreground bg-foreground/[0.04]'
                            : 'border-border-subtle bg-surface hover:border-foreground/35',
                        )}
                      >
                        <span className="font-display text-[1.75rem] leading-none">
                          {formatPrice(a)}
                        </span>
                      </button>
                    ))}
                    <div className="col-span-2 sm:col-span-3">
                      <Field id="custom" label="Nebo vlastní částka">
                        {(p) => (
                          <input
                            {...p}
                            type="number"
                            min={300}
                            step={10}
                            inputMode="numeric"
                            className={inputClass}
                            placeholder="např. 1 500"
                            onChange={(e) => {
                              setAmount(e.target.value ? Number(e.target.value) : null)
                              setServiceSlug(null)
                            }}
                          />
                        )}
                      </Field>
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 max-h-[28rem] space-y-2 overflow-y-auto pr-1">
                    {SERVICES.map((s) => {
                      const d = s.durations.find((x) => x.recommended) ?? s.durations[0]!
                      return (
                        <ChoiceCard
                          key={s.slug}
                          selected={serviceSlug === s.slug}
                          onSelect={() => {
                            setServiceSlug(s.slug)
                            setAmount(null)
                            track('voucher_started', { service: s.slug })
                          }}
                          title={s.name}
                          subtitle={`${d.minutes} min`}
                          meta={
                            <span className="font-display text-[1.25rem] leading-none">
                              {formatPrice(d.priceCzk)}
                            </span>
                          }
                        />
                      )
                    })}
                  </div>
                )}
              </>
            ) : null}

            {/* --------------------------------------------- 2. recipient */}
            {step === 1 ? (
              <>
                <StepHeading>Komu chcete poukaz darovat?</StepHeading>
                <div className="space-y-5">
                  <Field id="rname" label="Jméno obdarovaného" error={errors.rname}>
                    {(p) => (
                      <input
                        {...p}
                        className={inputClass}
                        value={recipient.name}
                        onChange={(e) => setRecipient((r) => ({ ...r, name: e.target.value }))}
                      />
                    )}
                  </Field>
                  <Field
                    id="remail"
                    label="E-mail obdarovaného (nepovinné)"
                    hint="Pokud ho vyplníte, pošleme poukaz rovnou jemu. Jinak ho dostanete vy."
                  >
                    {(p) => (
                      <input
                        {...p}
                        type="email"
                        inputMode="email"
                        className={inputClass}
                        value={recipient.email}
                        onChange={(e) => setRecipient((r) => ({ ...r, email: e.target.value }))}
                      />
                    )}
                  </Field>
                </div>
              </>
            ) : null}

            {/* -------------------------------------------- 3. dedication */}
            {step === 2 ? (
              <>
                <StepHeading hint="Vytiskneme ji přímo na poukaz. Můžete ji i přeskočit.">
                  Věnování
                </StepHeading>
                <Field id="dedication" label="Text věnování (nepovinné)">
                  {(p) => (
                    <textarea
                      {...p}
                      rows={4}
                      maxLength={240}
                      className={inputClass}
                      placeholder="Ať si pořádně odpočineš."
                      value={dedication}
                      onChange={(e) => setDedication(e.target.value)}
                    />
                  )}
                </Field>
                <p className="text-small mt-2 text-secondary">{dedication.length} / 240</p>
              </>
            ) : null}

            {/* ---------------------------------------------- 4. delivery */}
            {step === 3 ? (
              <>
                <StepHeading>Doručení</StepHeading>
                <ChoiceCard
                  selected
                  onSelect={() => {}}
                  title="E-mailem"
                  subtitle="Poukaz dostanete jako PDF k vytištění. Doručení zdarma."
                  meta={<span className="text-small text-secondary">0 Kč</span>}
                />
                <p className="text-small mt-5 text-secondary">
                  Poukazy doručujeme výhradně e-mailem, poštovní adresu proto nepotřebujeme.
                  Stačí poukaz vytisknout a vzít s sebou do kteréhokoli salonu Montra.
                </p>
              </>
            ) : null}

            {/* ----------------------------------------------- 5. payment */}
            {step === 4 ? (
              <>
                <StepHeading>Platba a vaše údaje</StepHeading>
                <div className="space-y-2">
                  <ChoiceCard
                    selected={payment === 'card'}
                    onSelect={() => setPayment('card')}
                    title="Online platební kartou"
                    meta={<span className="text-small text-secondary">0 Kč</span>}
                  />
                  <ChoiceCard
                    selected={payment === 'transfer'}
                    onSelect={() => setPayment('transfer')}
                    title="Bankovním převodem"
                    subtitle={`Č. účtu ${LOCATION.operator.bankAccount}`}
                    meta={<span className="text-small text-secondary">0 Kč</span>}
                  />
                </div>

                <div className="mt-8 space-y-5">
                  <Field id="bname" label="Vaše jméno a příjmení" error={errors.bname}>
                    {(p) => (
                      <input
                        {...p}
                        className={inputClass}
                        autoComplete="name"
                        value={buyer.name}
                        onChange={(e) => setBuyer((b) => ({ ...b, name: e.target.value }))}
                      />
                    )}
                  </Field>
                  <Field id="bemail" label="Váš e-mail" error={errors.bemail}>
                    {(p) => (
                      <input
                        {...p}
                        type="email"
                        inputMode="email"
                        className={inputClass}
                        autoComplete="email"
                        value={buyer.email}
                        onChange={(e) => setBuyer((b) => ({ ...b, email: e.target.value }))}
                      />
                    )}
                  </Field>
                  <Field id="bphone" label="Telefon (nepovinné)">
                    {(p) => (
                      <input
                        {...p}
                        type="tel"
                        inputMode="tel"
                        className={inputClass}
                        autoComplete="tel"
                        value={buyer.phone}
                        onChange={(e) => setBuyer((b) => ({ ...b, phone: e.target.value }))}
                      />
                    )}
                  </Field>

                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      className="size-4 accent-accent"
                      checked={company}
                      onChange={(e) => setCompany(e.target.checked)}
                    />
                    <span className="text-[0.9375rem]">Nakupuji na firmu</span>
                  </label>

                  {company ? (
                    <div className="space-y-5 rounded-card border border-border-subtle p-5">
                      <Field id="cnameco" label="Název firmy">
                        {(p) => (
                          <input
                            {...p}
                            className={inputClass}
                            value={companyInfo.name}
                            onChange={(e) =>
                              setCompanyInfo((c) => ({ ...c, name: e.target.value }))
                            }
                          />
                        )}
                      </Field>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field id="cico" label="IČO">
                          {(p) => (
                            <input
                              {...p}
                              inputMode="numeric"
                              className={inputClass}
                              value={companyInfo.ico}
                              onChange={(e) =>
                                setCompanyInfo((c) => ({ ...c, ico: e.target.value }))
                              }
                            />
                          )}
                        </Field>
                        <Field id="cdic" label="DIČ (nepovinné)">
                          {(p) => (
                            <input
                              {...p}
                              className={inputClass}
                              value={companyInfo.dic}
                              onChange={(e) =>
                                setCompanyInfo((c) => ({ ...c, dic: e.target.value }))
                              }
                            />
                          )}
                        </Field>
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="mt-8 rounded-card-lg border border-border-subtle bg-surface p-6">
                  <h3 className="text-eyebrow text-secondary">Shrnutí</h3>
                  <dl className="mt-4 divide-y divide-border-hairline">
                    <div className="flex justify-between gap-6 pb-3">
                      <dt className="text-small text-secondary">Poukaz</dt>
                      <dd className="text-right text-[0.9375rem]">
                        {service ? service.name : 'Na částku'}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-6 py-3">
                      <dt className="text-small text-secondary">Obdarovaný</dt>
                      <dd className="text-right text-[0.9375rem]">{recipient.name || '—'}</dd>
                    </div>
                    <div className="flex justify-between gap-6 py-3">
                      <dt className="text-small text-secondary">Doručení</dt>
                      <dd className="text-right text-[0.9375rem]">E-mailem · 0 Kč</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-6 pt-4">
                      <dt className="text-small text-secondary">Celkem</dt>
                      <dd className="font-display text-[1.625rem] leading-none">
                        {value ? formatPrice(value) : '—'}
                      </dd>
                    </div>
                  </dl>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </Container>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border-hairline bg-background/92 backdrop-blur-md md:static md:mt-12 md:border-0 md:bg-transparent md:backdrop-blur-none">
        <Container>
          <div className="mx-auto flex max-w-[46rem] items-center gap-3 py-3.5 md:py-0">
            {step > 0 ? (
              <Button
                variant="secondary"
                size="lg"
                className="shrink-0 px-6"
                onClick={() => setStep((s) => s - 1)}
              >
                Zpět
              </Button>
            ) : null}
            <Button size="lg" className="flex-1" disabled={!canContinue} onClick={next}>
              {step === 4 ? 'Zaplatit a odeslat' : 'Pokračovat'}
            </Button>
          </div>
        </Container>
      </div>
    </div>
  )
}
