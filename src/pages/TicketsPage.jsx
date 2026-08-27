import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import events, { getTicketsNav } from '../data/events'
import { ArrowIcon, Reveal } from '../components/ui'

const ticketed = events.filter((event) => event.ticketUrl)

export default function TicketsPage() {
  const navigate = useNavigate()

  useEffect(() => {
    if (events.length > 1) return
    const target = getTicketsNav()
    if (target.external) {
      window.location.replace(target.href)
      return
    }
    navigate(target.href, { replace: true })
  }, [navigate])

  if (events.length <= 1) return null
  return (
    <div className="section-pad pt-28">
      <div className="container-flama max-w-5xl">
        <Link to="/" className="inline-flex items-center gap-2 text-[.65rem] font-bold uppercase tracking-[.16em] text-white/45 transition hover:text-white">
          <ArrowIcon back /> Back home
        </Link>

        <Reveal className="mt-8">
          <p className="eyebrow">Tickets</p>
          <h1 className="font-display mt-4 text-[clamp(3.4rem,9vw,7.5rem)] leading-[.82] uppercase">Pick your night</h1>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/55 md:text-base">Choose the FLAMA edition you want tickets for. You’ll continue to the official shop for that night.</p>
        </Reveal>

        {ticketed.length ? (
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {ticketed.map((event, index) => (
              <Reveal key={event.id} delay={Math.min(index * .06, .18)}>
                <article className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#111]">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={event.image} alt={`${event.name} in ${event.city}`} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-6 md:p-7">
                    {event.badge && (
                      <p className="text-[.58rem] font-extrabold uppercase tracking-[.16em] text-[#f8c3dc]">{event.badge}</p>
                    )}
                    <h2 className="font-display mt-2 text-[clamp(2.2rem,5vw,3.4rem)] leading-[.85] uppercase">{event.name}</h2>
                    {event.subtitle && (
                      <p className="mt-2 text-[.62rem] font-bold uppercase tracking-[.16em] text-white/45">{event.subtitle}</p>
                    )}
                    <p className="mt-4 text-sm text-white/55">{event.weekday} · {event.day} {event.month} {event.year}</p>
                    <p className="mt-1 text-sm text-white/55">{event.venue} · {event.city}</p>
                    <a
                      href={event.ticketUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="button-primary mt-6 !min-h-11 !px-5"
                    >
                      Get tickets <ArrowIcon diagonal />
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal className="mt-12">
            <p className="text-sm text-white/55">No ticket shops are live yet. Check the agenda for the next drop.</p>
            <Link to="/#agenda" className="button-ghost mt-6">View agenda <ArrowIcon /></Link>
          </Reveal>
        )}
      </div>
    </div>
  )
}
