import { Link } from 'react-router-dom'
import galleries from '../data/galleries.json'
import { ArrowIcon, Reveal, SectionHeading } from '../components/ui'

const SECTIONS = [
  {
    id: 'editions',
    eyebrow: 'Main nights',
    title: 'FLAMA editions',
    copy: 'The full party chapters—music, crowd and the feeling of home.',
  },
  {
    id: 'after-office',
    eyebrow: 'Weeknight heat',
    title: 'After Offices',
    copy: 'Earlier doors, same energy. The midweek FLAMA ritual.',
  },
  {
    id: 'partners',
    eyebrow: 'Brand experience',
    title: 'Fernet Moments',
    copy: 'Argentina in every pour, woven into the night.',
  },
]

function GalleryCard({ gallery, index }) {
  return (
    <Reveal delay={(index % 2) * .08}>
      <Link to={`/gallery/${gallery.slug}`} className="group block overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#111]">
        <div className="aspect-[5/4] overflow-hidden">
          <img src={gallery.cover} alt={gallery.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        </div>
        <div className="flex items-center justify-between gap-4 p-6">
          <div>
            <p className="text-[.6rem] font-bold uppercase tracking-[.16em] text-white/45">{gallery.eyebrow}</p>
            <h3 className="font-display mt-1 text-5xl uppercase">{gallery.title}</h3>
          </div>
          <span className="grid h-11 w-11 place-items-center rounded-full border border-white/20 transition group-hover:bg-white group-hover:text-black"><ArrowIcon /></span>
        </div>
      </Link>
    </Reveal>
  )
}

export default function GalleryIndexPage() {
  return (
    <div className="section-pad pt-28">
      <div className="container-flama">
        <SectionHeading
          eyebrow="Gallery"
          title={<>Every edition. <span className="text-[#e95aaa]">Every feeling.</span></>}
          copy="Browse FLAMA nights, After Office editions and partner moments."
        />

        <div className="mt-16 space-y-20">
          {SECTIONS.map((section) => {
            const items = galleries.filter((gallery) => gallery.section === section.id)
            if (!items.length) return null

            return (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`}>
                <Reveal>
                  <p className="eyebrow">{section.eyebrow}</p>
                  <h2 id={`${section.id}-title`} className="font-display mt-4 text-[clamp(3rem,7vw,5.5rem)] leading-[.85] uppercase text-[#e95aaa]">
                    {section.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/50 md:text-base">{section.copy}</p>
                </Reveal>
                <div className={`mt-10 grid gap-5 ${items.length > 1 ? 'md:grid-cols-2' : 'md:grid-cols-1 md:max-w-2xl'}`}>
                  {items.map((gallery, index) => (
                    <GalleryCard key={gallery.slug} gallery={gallery} index={index} />
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}
