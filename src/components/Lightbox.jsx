import { AnimatePresence, motion } from 'framer-motion'

export default function Lightbox({ images, index, onClose, onChange }) {
  if (index === null) return null
  const current = images[index]

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] flex items-center justify-center bg-black/92 p-4 backdrop-blur-md" onClick={onClose}>
        <button onClick={onClose} className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/5 text-2xl" aria-label="Close lightbox">×</button>
        <button
          onClick={(e) => { e.stopPropagation(); onChange((index - 1 + images.length) % images.length) }}
          className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/5"
          aria-label="Previous image"
        >
          <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="size-4 rotate-180">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <motion.img
          key={current}
          initial={{ opacity: 0, scale: .96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: .96 }}
          src={current}
          alt="FLAMA gallery moment"
          className="max-h-[86vh] max-w-[92vw] rounded-xl object-contain"
          onClick={(e) => e.stopPropagation()}
        />
        <button
          onClick={(e) => { e.stopPropagation(); onChange((index + 1) % images.length) }}
          className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/5"
          aria-label="Next image"
        >
          <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="size-4">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </motion.div>
    </AnimatePresence>
  )
}
