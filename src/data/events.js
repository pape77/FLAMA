/**
 * Active upcoming event(s).
 *
 * When there's nothing to announce, replace the array below with the
 * FALLBACK block at the bottom of this file, and restore the section
 * copy comment in Events.jsx.
 */
const events = [
  {
    id: 'next-flama',
    name: 'The next FLAMA',
    date: 'Date dropping soon',
    venue: 'Secret venue',
    city: 'Amsterdam',
    status: 'announcing',
    badge: 'Announcement incoming',
    cta: 'Follow for the drop',
    ticketUrl: 'https://instagram.com/lafiestaflama',
    image: '/media/photos/general/flama25-009.jpg',
  },
]

export function getTicketsNav() {
  if (events.length > 1) return { href: '/tickets', external: false }
  const url = events[0]?.ticketUrl
  if (url) return { href: url, external: true }
  return { href: '/#agenda', external: false }
}

export default events

/*
FALLBACK — use this when there's no event announced yet
(also restore the Events.jsx section copy comment marked FALLBACK)

[
  {
    id: 'next-flama',
    name: 'The next FLAMA',
    date: 'Date dropping soon',
    venue: 'Secret venue',
    city: 'Amsterdam',
    status: 'announcing',
    badge: 'Announcement incoming',
    cta: 'Follow for the drop',
    ticketUrl: 'https://instagram.com/lafiestaflama',
    image: '/media/photos/general/flama25-009.jpg',
  },
]
*/
