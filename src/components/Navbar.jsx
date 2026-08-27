import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { getTicketsNav } from '../data/events'
import { ArrowIcon } from './ui'

const links = [
  ['Agenda', '/#agenda'],
  ['Story', '/#story'],
  ['Gallery', '/#gallery'],
  ['FAQ', '/#faq'],
  ['Contact', '/#contact'],
]

function TicketsCta({ className, children, onClick }) {
  const target = getTicketsNav()
  if (target.external) {
    return (
      <a href={target.href} target="_blank" rel="noreferrer" className={className} onClick={onClick}>
        {children}
      </a>
    )
  }
  return (
    <Link to={target.href} className={className} onClick={onClick}>
      {children}
    </Link>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,box-shadow] duration-300 ${scrolled ? 'bg-black/80 shadow-[0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-xl' : 'bg-transparent'}`}>
      {/* Covers iOS/overscroll gap above the fixed bar */}
      <div className="pointer-events-none absolute inset-x-0 bottom-full h-8 bg-[#0a0709]" aria-hidden="true" />
      <div className="container-flama flex h-20 items-center justify-between">
        <Link to="/" aria-label="FLAMA home" className="relative z-20">
          <img src="/brand/flama-logo.png" alt="FLAMA" className="h-6 w-auto object-contain md:h-7" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {links.map(([label, href]) => (
            <Link key={label} to={href} className="text-[.68rem] font-bold uppercase tracking-[.16em] text-white/65 transition hover:text-white">
              {label}
            </Link>
          ))}
          <TicketsCta className="button-primary !min-h-10 !px-5">
            Get tickets
          </TicketsCta>
        </nav>

        <button onClick={() => setOpen(!open)} className="relative z-20 grid h-11 w-11 place-items-center rounded-full border border-white/20 md:hidden" aria-expanded={open} aria-label={open ? 'Close navigation' : 'Open navigation'}>
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5">
            {open ? (
              <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: '-100%' }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: '-100%' }} transition={{ duration: .45, ease: [.22, 1, .36, 1] }} className="fixed inset-0 z-10 flex min-h-dvh flex-col justify-center bg-[#0a0a0a] px-8">
            <nav className="flex flex-col" aria-label="Mobile navigation">
              {links.map(([label, href], index) => (
                <motion.div key={label} initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .12 + index * .06 }}>
                  <Link to={href} onClick={() => setOpen(false)} className="font-display block border-b border-white/10 py-3 text-6xl uppercase">{label}</Link>
                </motion.div>
              ))}
            </nav>
            <TicketsCta className="button-primary mt-10" onClick={() => setOpen(false)}>Get tickets <ArrowIcon diagonal /></TicketsCta>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
