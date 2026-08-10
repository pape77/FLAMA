import { useEffect, useRef, useState } from 'react'

export default function LazyVideo({ src, poster, className = '', label }) {
  const ref = useRef(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { rootMargin: '300px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!active || !ref.current) return
    const video = ref.current
    video.load()
    const promise = video.play()
    if (promise) promise.catch(() => undefined)
  }, [active, src])

  return (
    <video
      ref={ref}
      src={active ? src : undefined}
      poster={poster}
      aria-label={label}
      autoPlay
      muted
      loop
      playsInline
      preload={active ? 'metadata' : 'none'}
      className={className}
    />
  )
}
