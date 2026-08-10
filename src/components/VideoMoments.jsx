import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import LazyVideo from './LazyVideo'
import { ArrowIcon, Reveal, SectionHeading } from './ui'

const clips = [
  {
    src: '/media/videos/moment-dance.mp4',
    poster: '/media/videos/moment-dance.jpg',
    title: 'Hands in the air',
  },
  {
    src: '/media/videos/moment-energy.mp4',
    poster: '/media/videos/moment-energy.jpg',
    title: 'Fernet & dancing',
  },
  {
    src: '/media/videos/hero-crowd.mp4',
    poster: '/media/videos/hero-crowd.jpg',
    title: 'One more song',
  },
]

export default function VideoMoments() {
  return (
    <>
      <section className="section-pad overflow-hidden border-y border-white/10 bg-[#1a1017]">
        <div className="container-flama">
          <SectionHeading eyebrow="Press play" title="Pour. Dance. Repeat." copy="Friends laughing, glasses up, the night you try to explain to your friends, and somehow can't." />
          <div className="mt-14 flex gap-4 overflow-x-auto pb-5 [scrollbar-width:none] md:grid md:grid-cols-3 md:overflow-visible">
            {clips.map((clip, index) => (
              <motion.article key={`${index}-${clip.title}`} initial={{ opacity: 0, rotate: index - 1 }} whileInView={{ opacity: 1, rotate: 0 }} viewport={{ once: true }} className="min-w-[78vw] md:min-w-0">
                <div className="relative aspect-[9/15] overflow-hidden rounded-[2rem] border-[6px] border-[#3f2433] bg-black shadow-2xl">
                  <LazyVideo src={clip.src} poster={clip.poster} label={clip.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 pt-20 text-white">
                    <p className="font-display text-3xl uppercase">{clip.title}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#090909]">
        <div className="container-flama">
          <div className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-[#111] lg:grid-cols-2">
            <Reveal className="relative min-h-[34rem]">
              <LazyVideo src="/media/videos/fernet-moment.mp4" poster="/media/videos/fernet-moment.jpg" label="Fernet Branca at FLAMA" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
              <span className="absolute left-6 top-6 rounded-full border border-white/20 bg-black/30 px-4 py-2 text-[.58rem] font-extrabold uppercase tracking-[.16em] backdrop-blur-md">Brand experience</span>
            </Reveal>
            <Reveal delay={.1} className="flex flex-col justify-center p-7 md:p-12 lg:p-16">
              <p className="eyebrow">FLAMA × Fernet Branca</p>
              <h2 className="font-display mt-5 text-[clamp(4rem,8vw,7rem)] leading-[.82] uppercase">A ritual<br />from home.</h2>
              <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/55 md:text-base">
                Fernet Branca lives naturally inside the FLAMA story: the shared glass, the familiar taste, the ritual that travels with Argentinians everywhere.
              </p>
              <p className="mt-4 text-xs leading-relaxed text-white/35">Presented as part of the experience—not an interruption to it.</p>
              <Link to="/gallery/fernet-branca" className="button-ghost mt-9 self-start">See partner moments <ArrowIcon /></Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
