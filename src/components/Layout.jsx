import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'

export default function Layout({ children }) {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 40)
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [location.pathname, location.hash])

  return (
    <div className="relative min-h-dvh bg-[#0a0709] text-[#f6f9fc]">
      <div className="noise" aria-hidden="true" />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
