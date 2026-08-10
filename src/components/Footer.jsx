import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-10">
      <div className="container-flama flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <img src="/brand/flama-logo.png" alt="FLAMA" className="h-5 w-auto" />
          <p className="mt-4 max-w-sm text-sm text-white/40">La fiesta argentina, born in Amsterdam. Open to every nationality—far from home, never alone.</p>
        </div>
        <div className="flex flex-wrap gap-5 text-[.65rem] font-bold uppercase tracking-[.16em] text-white/45">
          <a href="https://instagram.com/lafiestaflama" target="_blank" rel="noreferrer" className="hover:text-white">Instagram</a>
          <a href="https://www.tiktok.com/@fiestaflama" target="_blank" rel="noreferrer" className="hover:text-white">TikTok</a>
          <a href="https://www.facebook.com/lafiestaflama" target="_blank" rel="noreferrer" className="hover:text-white">Facebook</a>
          <a href="/#contact" className="hover:text-white">Contact</a>
        </div>
      </div>
      <div className="container-flama mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-[.65rem] uppercase tracking-[.12em] text-white/30 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} FLAMA. All rights reserved.</p>
        <div className="flex flex-wrap gap-5">
          <Link to="/terms-and-conditions" className="hover:text-white">
            Terms &amp; conditions
          </Link>
          <p>Made for the ones who miss home.</p>
        </div>
      </div>
    </footer>
  )
}
