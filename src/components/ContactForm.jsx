import { useState } from 'react'

const topics = ['General', 'Bookings', 'Press', 'Collaborations', 'Privacy / data request', 'Other']

const initial = {
  name: '',
  email: '',
  topic: 'General',
  message: '',
  company: '', // honeypot
}

export default function ContactForm() {
  const [form, setForm] = useState(initial)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const update = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }))
  }

  async function onSubmit(event) {
    event.preventDefault()
    setError('')
    setStatus('sending')

    try {
      // Bots fill this; pretend success without sending
      if (form.company.trim()) {
        setStatus('sent')
        setForm(initial)
        return
      }

      const accessKey = typeof __FLAMA_WEB3FORMS_KEY__ !== 'undefined' ? __FLAMA_WEB3FORMS_KEY__ : ''
      if (!accessKey) {
        throw new Error('Contact form is not configured yet.')
      }

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `FLAMA contact · ${form.topic}`,
          from_name: 'FLAMA website',
          name: form.name.trim(),
          email: form.email.trim(),
          topic: form.topic,
          message: form.message.trim(),
        }),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok || data.success === false) {
        throw new Error(data.message || 'Something went wrong. Please try again.')
      }
      setStatus('sent')
      setForm(initial)
    } catch (err) {
      setStatus('error')
      setError(err.message || 'Something went wrong. Please try again.')
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-[1.2rem] border border-[#d887b2]/40 bg-white/[.03] px-6 py-8">
        <p className="text-[.62rem] font-extrabold uppercase tracking-[.16em] text-[#f8c3dc]">Message sent</p>
        <p className="mt-3 text-xl font-bold">Thanks — we’ll get back to you soon.</p>
        <button type="button" onClick={() => setStatus('idle')} className="button-ghost mt-7 !min-h-11">
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="rounded-[1.2rem] border border-white/15 bg-white/[.025] p-6 md:p-7">
      <p className="text-[.62rem] font-extrabold uppercase tracking-[.16em] text-white/45">Contact form</p>
      <p className="mt-2 text-sm text-white/50">Bookings, press, collaborations — write us here. Your message reaches FLAMA without exposing our email to bots.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-1">
          <span className="mb-2 block text-[.62rem] font-extrabold uppercase tracking-[.14em] text-white/45">Name</span>
          <input required value={form.name} onChange={update('name')} name="name" autoComplete="name" className="field-flama" placeholder="Your name" />
        </label>
        <label className="block sm:col-span-1">
          <span className="mb-2 block text-[.62rem] font-extrabold uppercase tracking-[.14em] text-white/45">Email</span>
          <input required type="email" value={form.email} onChange={update('email')} name="email" autoComplete="email" className="field-flama" placeholder="you@email.com" />
        </label>
      </div>

      <label className="mt-4 block">
        <span className="mb-2 block text-[.62rem] font-extrabold uppercase tracking-[.14em] text-white/45">Topic</span>
        <select value={form.topic} onChange={update('topic')} name="topic" className="field-flama">
          {topics.map((topic) => <option key={topic} value={topic}>{topic}</option>)}
        </select>
      </label>

      <label className="mt-4 block">
        <span className="mb-2 block text-[.62rem] font-extrabold uppercase tracking-[.14em] text-white/45">Message</span>
        <textarea required value={form.message} onChange={update('message')} name="message" rows={5} className="field-flama resize-y" placeholder="Tell us what you’re planning…" />
      </label>

      {/* Honeypot — leave empty */}
      <label className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        Company
        <input tabIndex={-1} autoComplete="off" value={form.company} onChange={update('company')} name="company" />
      </label>

      {error && <p className="mt-4 text-sm text-[#f8c3dc]">{error}</p>}

      <button type="submit" disabled={status === 'sending'} className="button-primary mt-6 w-full sm:w-auto disabled:cursor-wait disabled:opacity-70">
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}
