import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import galleries from '../data/galleries.json'
import Lightbox from '../components/Lightbox'
import { ArrowIcon, Reveal } from '../components/ui'

export default function GalleryDetailPage() {
  const { slug } = useParams()
  const gallery = useMemo(() => galleries.find((item) => item.slug === slug), [slug])
  const [active, setActive] = useState(null)

  if (!gallery) {
    return (
      <div className="container-flama section-pad pt-28">
        <h1 className="font-display text-6xl uppercase">Edition not found</h1>
        <Link to="/gallery" className="button-ghost mt-8 inline-flex">Back to gallery <ArrowIcon /></Link>
      </div>
    )
  }

  return (
    <div className="section-pad pt-28">
      <div className="container-flama">
        <Link to="/gallery" className="inline-flex items-center gap-2 text-[.65rem] font-bold uppercase tracking-[.16em] text-white/45 transition hover:text-white"><ArrowIcon back /> All editions</Link>
        <Reveal className="mt-8 max-w-4xl">
          <p className="eyebrow">{gallery.eyebrow}</p>
          <h1 className="font-display mt-4 text-[clamp(4.5rem,10vw,9rem)] leading-[.8] uppercase">{gallery.title}</h1>
          {gallery.partner && <p className="mt-5 text-sm uppercase tracking-[.16em] text-[#f8c3dc]">In collaboration with {gallery.partner}</p>}
          {gallery.externalUrl && (
            <a href={gallery.externalUrl} target="_blank" rel="noreferrer" className="button-primary mt-7">
              View all {gallery.photoCount} photos <ArrowIcon diagonal />
            </a>
          )}
        </Reveal>

        <div className="masonry mt-12">
          {gallery.images.map((image, index) => (
            <button key={image} onClick={() => setActive(index)} className="group relative block w-full overflow-hidden rounded-xl">
              <img src={image} alt={`${gallery.title} moment ${index + 1}`} loading="lazy" className="w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
              <span className="pointer-events-none absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />
            </button>
          ))}
        </div>
      </div>
      <Lightbox images={gallery.images} index={active} onClose={() => setActive(null)} onChange={setActive} />
    </div>
  )
}
