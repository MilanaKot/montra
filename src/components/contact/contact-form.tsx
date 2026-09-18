'use client'

import { useState } from 'react'
import { Button } from '@/components/ui'
import { Field, inputClass } from '@/components/booking/pieces'

export function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [sent, setSent] = useState(false)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const next: Record<string, string> = {}
    if (values.name.trim().length < 2) next.cname = 'Vyplňte prosím jméno a příjmení.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
      next.cemail = 'Zadejte prosím platný e-mail.'
    if (values.message.trim().length < 5) next.cmessage = 'Napište nám prosím váš dotaz.'
    setErrors(next)
    if (Object.keys(next).length) {
      document.getElementById(Object.keys(next)[0]!)?.focus()
      return
    }
    // PROTOTYPE: no message is sent anywhere yet.
    setSent(true)
  }

  if (sent) {
    return (
      <div className="rounded-card-lg border border-border-subtle bg-surface p-8">
        <h3 className="text-display-3">Děkujeme za zprávu.</h3>
        <p className="text-body-lg mt-4 text-secondary">
          Ozveme se vám co nejdříve. Pokud spěcháte, zavolejte nám prosím.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className="space-y-5 rounded-card-lg border border-border-subtle bg-surface p-6 md:p-8"
    >
      <Field id="cname" label="Jméno a příjmení" error={errors.cname}>
        {(p) => (
          <input
            {...p}
            className={inputClass}
            autoComplete="name"
            value={values.name}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
          />
        )}
      </Field>
      <Field id="cemail" label="E-mail" error={errors.cemail}>
        {(p) => (
          <input
            {...p}
            type="email"
            inputMode="email"
            className={inputClass}
            autoComplete="email"
            value={values.email}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
          />
        )}
      </Field>
      <Field id="cmessage" label="Dotaz" error={errors.cmessage}>
        {(p) => (
          <textarea
            {...p}
            rows={5}
            className={inputClass}
            value={values.message}
            onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
          />
        )}
      </Field>
      <Button type="submit" size="lg" className="w-full sm:w-auto">
        Odeslat dotaz
      </Button>
    </form>
  )
}
