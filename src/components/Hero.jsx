import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowIcon } from './ui'

const clips = [
  { src: '/media/videos/hero-crowd.mp4', poster: '/media/videos/hero-crowd.jpg', label: 'Crowd at FLAMA' },
  { src: '/media/videos/hero-friends.mp4', poster: '/media/videos/hero-friends.jpg', label: 'FLAMA atmosphere' },
  { src: '/media/videos/hero-dj.mp4', poster: '/media/videos/hero-dj.jpg', label: 'Friends at FLAMA' },
]

export default function Hero() {
  const { scrollYProgress } = useScroll()
  const contentY = useTransform(scrollYProgress, [0, .35], [0, 100])
  const videosY = useTransform(scrollYProgress, [0, .45], [0, 180])

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-black">
      <motion.div style={{ y: videosY }} className="absolute -inset-x-[22vw] -top-10 bottom-[-10rem] flex items-center justify-center gap-2 opacity-80 sm:inset-x-[-5vw] md:gap-4">
        {clips.map((clip, index) => (
          <motion.div
            key={clip.src}
            initial={{ opacity: 0, y: index === 1 ? -30 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: .15 + index * .12 }}
            className={`relative h-[83vh] w-[38vw] min-w-[12rem] max-w-[31rem] overflow-hidden rounded-[1.5rem] md:h-[88vh] md:rounded-[2rem] ${index === 1 ? '-translate-y-6' : index === 2 ? 'translate-y-8' : 'translate-y-2'}`}
          >
            <motion.video
              src={clip.src}
              poster={clip.poster}
              aria-label={clip.label}
              autoPlay
              muted
              loop
              playsInline
              preload={index === 1 ? 'auto' : 'metadata'}
              animate={{ scale: [1.03, 1.1] }}
              transition={{ duration: 18 + index * 2, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
              className="h-full w-full object-cover"
            />
          </motion.div>
        ))}
      </motion.div>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.44)_0%,rgba(0,0,0,.05)_35%,rgba(0,0,0,.54)_75%,#070707_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_5%,rgba(0,0,0,.52)_100%)]" />

      <motion.div style={{ y: contentY }} className="container-flama relative z-10 flex min-h-[100svh] flex-col items-center justify-center pb-14 pt-24 text-center">
        <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .55 }} className="mb-5 text-[.65rem] font-extrabold uppercase tracking-[.28em] text-white/70">
          La fiesta argentina · Born in Amsterdam
        </motion.p>
        <motion.h1 initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: .35, ease: [.22, 1, .36, 1] }} className="font-display max-w-[90rem] text-[clamp(3.4rem,12vw,12rem)] leading-[.8] uppercase">
          <span className="block">Feels like</span>
          <span className="block">Argentina.</span>
          <span className="block text-[#e95aaa]">Hits like FLAMA</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .85 }} className="mt-7 max-w-md text-sm font-medium leading-relaxed text-white/75 md:text-base">
          One room. Every nationality. A night that feels like Argentina—and like you belong.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="mt-8 flex w-full max-w-sm flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row">
          <a href="#agenda" className="button-primary">Upcoming events <ArrowIcon diagonal /></a>
          <Link to="/gallery" className="button-ghost">View gallery <ArrowIcon /></Link>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-center">
        <span className="text-[.58rem] font-bold uppercase tracking-[.2em] text-white/45">Feel the night</span>
        <div className="mx-auto mt-2 h-10 w-px overflow-hidden bg-white/20">
          <motion.div animate={{ y: [0, 40] }} transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }} className="h-5 w-px bg-[#d887b2]" />
        </div>
      </div>
    </section>
  )
}
