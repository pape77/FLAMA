import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import galleries from '../data/galleries.json'
import { ArrowIcon, Reveal, SectionHeading } from './ui'

const SECTIONS = [
  { id: 'editions', title: 'FLAMA editions', limit: 2 },
  { id: 'after-office', title: 'After Offices', limit: 2 },
  { id: 'partners', title: 'Fernet Moments', limit: 1 },
]

function GalleryCard({ gallery, index }) {
  return (
    <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (index % 2) * .08 }}>
      <Link to={`/gallery/${gallery.slug}`} className="group relative block aspect-[4/5] overflow-hidden rounded-[1.5rem] md:aspect-[4/3]">
        <img src={gallery.cover} alt={gallery.title} loading="lazy" className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/5 to-transparent" />
        <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/35 px-3 py-2 text-[.58rem] font-bold uppercase tracking-[.16em] backdrop-blur-md">
          {gallery.partner ? 'Partner moment' : `${gallery.photoCount} photos`}
        </span>
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 md:p-8">
          <div>
            <p className="text-[.6rem] font-bold uppercase tracking-[.18em] text-white/55">{gallery.eyebrow}</p>
            <h3 className="font-display mt-1 text-5xl uppercase md:text-7xl">{gallery.title}</h3>
          </div>
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/35 bg-white/5 text-xl transition group-hover:rotate-[-25deg] group-hover:bg-white group-hover:text-black"><ArrowIcon diagonal /></span>
        </div>
      </Link>
    </motion.div>
  )
}

export default function GalleryPreview() {
  return (
    <section id="gallery" className="section-pad bg-[#070707]">
      <div className="container-flama">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Through our eyes" title="Gallery" copy="FLAMA editions, After Office nights and Fernet moments—each with its own archive." />
          <Link to="/gallery" className="button-ghost shrink-0">Open full gallery <ArrowIcon /></Link>
        </div>

        <div className="mt-16 space-y-16">
          {SECTIONS.map((section) => {
            const items = galleries.filter((gallery) => gallery.section === section.id).slice(0, section.limit)
            if (!items.length) return null

            return (
              <div key={section.id}>
                <Reveal className="mb-6 flex items-end justify-between gap-4">
                  <h3 className="font-display text-4xl uppercase text-[#e95aaa] md:text-5xl">{section.title}</h3>
                  <Link to={`/gallery#${section.id}`} className="hidden text-[.65rem] font-bold uppercase tracking-[.16em] text-white/45 transition hover:text-white sm:inline">
                    View all <ArrowIcon />
                  </Link>
                </Reveal>
                <div className={`grid gap-4 ${items.length > 1 ? 'md:grid-cols-2' : 'md:grid-cols-1 md:max-w-3xl'}`}>
                  {items.map((gallery, index) => (
                    <GalleryCard key={gallery.slug} gallery={gallery} index={index} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
