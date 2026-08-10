import { motion, useReducedMotion } from 'framer-motion'

export function ArrowIcon({ diagonal = false, back = false, className = '' }) {
  const rotation = back ? 'rotate(180deg)' : diagonal ? 'rotate(-45deg)' : undefined
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      className={`inline-block size-[.95em] shrink-0 align-[-0.1em] ${className}`}
      style={rotation ? { transform: rotation } : undefined}
    >
      <path
        d="M2.5 8h11M9.5 3.5 14 8l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Reveal({ children, className = '', delay = 0, y = 28 }) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: .75, delay, ease: [.22, 1, .36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({ eyebrow, title, copy, align = 'left', tone = 'dark' }) {
  const isLight = tone === 'light'
  return (
    <Reveal className={`max-w-4xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <p className={`eyebrow ${align === 'center' ? 'justify-center before:hidden' : ''} ${isLight ? '!text-black/45' : ''}`}>{eyebrow}</p>
      <h2 className="font-display mt-5 text-[clamp(3.7rem,9vw,8rem)] leading-[.82] uppercase">{title}</h2>
      {copy && (
        <p className={`mt-6 max-w-2xl text-base leading-relaxed md:text-lg ${isLight ? 'text-black/55' : 'text-white/55'}`}>
          {copy}
        </p>
      )}
    </Reveal>
  )
}
