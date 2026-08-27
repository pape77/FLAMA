import { motion } from 'framer-motion'
import events from '../data/events'
import { ArrowIcon, SectionHeading } from './ui'

function EventMeta({ event }) {
  const [weekday, rest] = event.date.split(' · ')
  const dateParts = (rest || event.date).trim().split(/\s+/)
  const day = event.day || dateParts.find((part) => /^\d+$/.test(part)) || ''
  const month = event.month || dateParts.find((part) => /[A-Za-z]/.test(part)) || ''
  const year = event.year || dateParts.find((part) => /^\d{4}$/.test(part)) || ''
  const dayLabel = event.weekday || weekday || ''

  return (
    <div className="mt-4 grid gap-3 sm:grid-cols-2 sm:max-w-xl">
      <div className="rounded-[1rem] border border-[#d887b2]/35 bg-black/45 px-4 py-3.5 backdrop-blur-md">
        <p className="text-[.58rem] font-extrabold uppercase tracking-[.18em] text-[#f8c3dc]">When</p>
        <div className="mt-2 flex items-end gap-3">
          <p className="font-display text-[clamp(2.8rem,8vw,4rem)] leading-none text-[#e95aaa]">{day}</p>
          <div className="pb-1">
            <p className="font-display text-[clamp(1.8rem,5vw,2.6rem)] uppercase leading-[.9]">{month}</p>
            <p className="mt-1.5 text-[.62rem] font-bold uppercase tracking-[.14em] text-white/65">{dayLabel}{year ? ` · ${year}` : ''}</p>
          </div>
        </div>
      </div>

      <div className="rounded-[1rem] border border-white/20 bg-black/45 px-4 py-3.5 backdrop-blur-md">
        <p className="text-[.58rem] font-extrabold uppercase tracking-[.18em] text-white/45">Where</p>
        <p className="font-display mt-2 text-[clamp(1.8rem,5vw,2.6rem)] uppercase leading-[.9] text-white">{event.venue}</p>
        <p className="mt-2 text-[.62rem] font-bold uppercase tracking-[.14em] text-[#f8c3dc]">{event.city}</p>
      </div>
    </div>
  )
}

export default function Events() {
  return (
    <section id="agenda" className="section-pad bg-[#070707]">
      <div className="container-flama">
        {/* Active event copy */}
        <SectionHeading eyebrow="Next up" title="Meet us in the night" copy="Amsterdam in September, Gran Canaria in October. Save the dates—two nights, one fire." />
        {/* FALLBACK — no event announced yet
        <SectionHeading eyebrow="Next up" title="Meet us in the night" copy="The next chapter is coming. Be first to get the date, venue and ticket drop." />
        */}
        <div className="mt-12 space-y-5 md:mt-16">
          {events.map((event, index) => (
            <motion.article key={event.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} whileHover={{ y: -4 }} className="group relative min-h-[34rem] overflow-hidden rounded-[2rem] border border-white/10 bg-[#121212] md:min-h-[32rem]">
              <img src={event.image} alt={`${event.name} in ${event.city}`} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.92)_0%,rgba(0,0,0,.72)_48%,rgba(0,0,0,.28)_100%)]" />
              <div className="relative z-10 flex min-h-[34rem] max-w-3xl flex-col justify-between p-6 md:min-h-[32rem] md:p-12">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-[#d887b2]/60 bg-black/35 px-4 py-2 text-[.62rem] font-extrabold uppercase tracking-[.16em] text-[#f8c3dc] backdrop-blur-md">{event.badge}</span>
                  {events.length > 1 && (
                    <span className="font-display text-6xl leading-none text-white/25">{String(index + 1).padStart(2, '0')}</span>
                  )}
                </div>
                <div>
                  <h3 className="font-display text-[clamp(2.8rem,6vw,4.5rem)] leading-[.85] uppercase">{event.name}</h3>
                  <EventMeta event={event} />
                  <div className="mt-4">
                    {event.ticketUrl ? (
                      <a
                        href={event.ticketUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="button-primary !min-h-10 !gap-2 !px-4 !py-2 !text-[.65rem]"
                      >
                        {event.cta}<ArrowIcon diagonal />
                      </a>
                    ) : (
                      <span
                        aria-disabled="true"
                        className="inline-flex !min-h-10 cursor-not-allowed items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[.65rem] font-extrabold uppercase tracking-[.08em] text-white/40"
                      >
                        {event.cta}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
