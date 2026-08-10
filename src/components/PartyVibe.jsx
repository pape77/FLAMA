import { motion } from 'framer-motion'
import LazyVideo from './LazyVideo'
import { SectionHeading } from './ui'

const clips = [
  ['/media/videos/vibe-people.mp4', '/media/videos/vibe-people.jpg', 'No one stands still'],
  ['/media/videos/vibe-teaser.mp4', '/media/videos/vibe-teaser.jpg', "Let's get wild"],
  ['/media/videos/vibe-aftermovie.mp4', '/media/videos/vibe-aftermovie.jpg', 'The room catches fire'],
]

export default function PartyVibe() {
  return (
    <section className="section-pad overflow-hidden bg-[#0a0709]">
      <div className="container-flama">
        <SectionHeading
          eyebrow="Dancefloor"
          title="Party vibe"
          copy="Packed floor, hands up, Argentina in the room."
        />
        <div className="mt-14 flex gap-4 overflow-x-auto pb-5 [scrollbar-width:none] md:grid md:grid-cols-3 md:overflow-visible">
          {clips.map(([src, poster, label], index) => (
            <motion.article
              key={src}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * .08, duration: .7, ease: [.22, 1, .36, 1] }}
              className="min-w-[78vw] md:min-w-0"
            >
              <div className="relative aspect-[9/15] overflow-hidden rounded-[2rem] border-[6px] border-[#3f2433] bg-black shadow-2xl">
                <LazyVideo src={src} poster={poster} label={label} className="h-full w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent p-5 pt-24 text-white">
                  <p className="font-display text-3xl uppercase">{label}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
