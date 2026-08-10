import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowIcon, Reveal, SectionHeading } from './ui'
import ContactForm from './ContactForm'

const faqs = [
  ['Where is FLAMA?', 'FLAMA lives in Amsterdam. Each edition may land in a different venue—follow @lafiestaflama for the next location.'],
  ['How do tickets work?', 'Ticket links drop on Instagram and on this site. Join early. Some editions sell out before the night.'],
  ['What music do you play?', 'A night that moves between Argentine energy, Latin rhythms and dancefloor-ready selections—reggaeton, cumbia, cuarteto and RKT among them. Always made for the body.'],
  ['Is everyone welcome?', 'Yes—always. FLAMA is a home for Argentinians abroad, and an open invitation to every nationality. Come spend a night together and feel how Argentina parties—everyone belongs here.'],
  ['What is the age requirement?', '18+ unless the venue announces a different rule for that edition.'],
  ['Where do I find venue info?', 'Exact details are published with every ticket release: address, times and door policy.'],
]

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-white/10">
      <button onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between gap-6 py-6 text-left" aria-expanded={open}>
        <span className="text-base font-semibold md:text-lg">{question}</span>
        <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/20 text-xl transition ${open ? 'rotate-45 bg-white text-black' : ''}`}>+</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <p className="pb-6 pr-10 text-sm leading-relaxed text-white/50 md:text-base">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FaqContact() {
  return (
    <>
      <section id="faq" className="section-pad bg-[#070707]">
        <div className="container-flama grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <SectionHeading eyebrow="FAQ" title="Good to know" />
          <div>
            {faqs.map(([question, answer]) => <FaqItem key={question} question={question} answer={answer} />)}
          </div>
        </div>
      </section>

      <section id="contact" className="section-pad relative overflow-hidden border-t border-[#d887b2]/20 bg-[#1a1017]">
        <div className="container-flama relative">
          <Reveal>
            <p className="eyebrow">Contact</p>
          </Reveal>
          <div className="mt-5 grid items-start gap-12 lg:grid-cols-2">
            <Reveal>
              <h2 className="font-display text-[clamp(4.5rem,10vw,9rem)] leading-[.8] uppercase">
                Let’s make the <span className="text-[#e95aaa]">night.</span>
              </h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-white/55 md:text-base">For bookings, collaborations, press or partnerships, get in touch.</p>
              <a href="https://instagram.com/lafiestaflama" target="_blank" rel="noreferrer" className="group mt-8 flex items-center justify-between rounded-[1.2rem] border border-white/15 bg-white/[.025] px-6 py-6 transition hover:border-[#d887b2] hover:bg-[#d887b2] hover:text-black">
                <div>
                  <p className="text-[.62rem] font-extrabold uppercase tracking-[.16em] opacity-55">Instagram</p>
                  <p className="mt-1 text-2xl font-bold">@lafiestaflama</p>
                </div>
                <ArrowIcon diagonal />
              </a>
            </Reveal>
            <Reveal delay={.12}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
