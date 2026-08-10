import { ArrowIcon, Reveal, SectionHeading } from './ui'

const instagramImages = [
  '/media/photos/general/_por2173.jpg',
  '/media/photos/general/flama-20.jpg',
  '/media/photos/general/flama-45.jpg',
  '/media/photos/general/_por2640.jpg',
  '/media/photos/general/flama25-026.jpg',
  '/media/photos/general/_por2584.jpg',
]

export default function SocialProof() {
  return (
    <section className="section-pad bg-[#080808]">
      <div className="container-flama">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="@lafiestaflama" title="Keep the fire close" copy="The nights, the aftermovies and everything in between." />
          <a href="https://instagram.com/lafiestaflama" target="_blank" rel="noreferrer" className="button-primary shrink-0">Follow on Instagram <ArrowIcon diagonal /></a>
        </div>
        <div className="mt-14 grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3">
          {instagramImages.map((image, index) => (
            <Reveal key={image} delay={(index % 3) * .05}>
              <a href="https://instagram.com/lafiestaflama" target="_blank" rel="noreferrer" className="group relative block aspect-square overflow-hidden rounded-xl">
                <img src={image} alt="FLAMA community moment" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-black/45 text-xs opacity-0 backdrop-blur-md transition group-hover:opacity-100"><ArrowIcon diagonal /></span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
