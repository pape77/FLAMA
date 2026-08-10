import { useCounter } from '../hooks/useCounter'
import { Reveal } from './ui'

const START_YEAR = 2023

const stats = [
  { value: 5000, suffix: '+', label: 'People attended' },
  { value: 15, suffix: '+', label: 'Events created' },
  { value: new Date().getFullYear() - START_YEAR, suffix: '', label: 'Years running' },
]

function Stat({ value, suffix, label }) {
  const [ref, count] = useCounter(value)
  return (
    <div ref={ref} className="border-t border-white/15 pt-5">
      <p className="font-display text-6xl text-[#f4a9ca] md:text-8xl">{count}{suffix}</p>
      <p className="mt-1 text-[.65rem] font-bold uppercase tracking-[.16em] text-white/45">{label}</p>
    </div>
  )
}

export default function Story() {
  return (
    <>
      <section id="story" className="section-pad relative overflow-hidden border-y border-white/10 bg-[#1a1017]">
        <div className="container-flama relative grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">
          <Reveal>
            <p className="eyebrow">Our story</p>
            <h2 className="font-display mt-5 text-[clamp(4.7rem,10vw,9rem)] leading-[.79] uppercase">
              Far from home.<br /><span className="text-[#e95aaa]">Never alone.</span>
            </h2>
            <div className="mt-10 grid grid-cols-2 gap-3">
              <img src="/media/photos/general/20241026_011536378_ios.jpg" alt="Dancing together at FLAMA" loading="lazy" className="aspect-[3/4] rounded-[1.2rem] object-cover" />
              <img src="/media/photos/general/flama-87.jpg" alt="Friends celebrating under the FLAMA sign" loading="lazy" className="mt-8 aspect-[3/4] rounded-[1.2rem] object-cover" />
            </div>
          </Reveal>
          <Reveal delay={.15} className="lg:pt-20">
            <p className="text-xl font-semibold leading-snug md:text-3xl">
              For Argentinians abroad—and anyone who wants to feel that night with us.
            </p>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/55 md:text-base">
              Back in 2023, one night turned homesickness into a dancefloor. Argentine music was missing from Amsterdam’s nightlife, but the need to feel home was everywhere.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/55 md:text-base">
              So we created the night we were looking for: the music, rituals and energy of Argentina, alive in one room.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/55 md:text-base">
              FLAMA was born on the 25th of May, 2023. That first edition brought strangers together like old friends—and what began as one party became a growing community. Far from Argentina, never far from home.
            </p>
            <div className="mt-9 flex flex-wrap gap-2">
              {['Community', 'Inclusive', 'Belonging', 'Argentina'].map((word) => (
                <span key={word} className="rounded-full border border-white/20 px-4 py-2 text-[.65rem] font-extrabold uppercase tracking-[.14em]">{word}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad bg-[#0c0c0c]">
        <div className="container-flama">
          <Reveal className="mb-12 flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">FLAMA in numbers</p>
              <h2 className="font-display mt-4 text-5xl uppercase md:text-7xl">One fire. Growing together.</h2>
            </div>
          </Reveal>
          <div className="grid gap-x-5 gap-y-10 sm:grid-cols-3">
            {stats.map((stat) => <Stat key={stat.label} {...stat} />)}
          </div>
        </div>
      </section>
    </>
  )
}
