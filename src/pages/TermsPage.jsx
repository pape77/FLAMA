import { Link } from 'react-router-dom'
import { ArrowIcon, Reveal } from '../components/ui'
import { termsIntro, termsMeta, termsSections } from '../data/terms'

export default function TermsPage() {
  return (
    <div className="section-pad pt-28">
      <div className="container-flama max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-2 text-[.65rem] font-bold uppercase tracking-[.16em] text-white/45 transition hover:text-white">
          <ArrowIcon back /> Back home
        </Link>

        <Reveal className="mt-8">
          <p className="eyebrow">Legal</p>
          <h1 className="font-display mt-4 text-[clamp(4rem,10vw,8rem)] leading-[.82] uppercase">{termsMeta.title}</h1>
          <p className="mt-5 text-[.7rem] font-bold uppercase tracking-[.16em] text-[#f8c3dc]">Effective as of · {termsMeta.effective}</p>
        </Reveal>

        <Reveal delay={.08} className="mt-10 space-y-5 border-b border-white/10 pb-12">
          {termsIntro.map((paragraph) => (
            <p key={paragraph} className="text-sm leading-relaxed text-white/55 md:text-base">{paragraph}</p>
          ))}
        </Reveal>

        <div className="mt-12 space-y-12">
          {termsSections.map((section, index) => (
            <Reveal key={section.title} delay={Math.min(index * .03, .2)}>
              <h2 className="font-display text-4xl uppercase text-[#e95aaa] md:text-5xl">{section.title}</h2>
              <div className="mt-5 space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-relaxed text-white/55 md:text-base">{paragraph}</p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}
