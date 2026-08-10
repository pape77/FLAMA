import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-5 z-40 grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-black/70 text-white shadow-2xl backdrop-blur-md transition hover:border-[#f4a9ca] hover:bg-[#f4a9ca] hover:text-black md:bottom-8 md:right-8"
          aria-label="Go to top"
        >
          <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="size-4 -rotate-90">
            <path d="M2.5 8h11M9.5 3.5 14 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
