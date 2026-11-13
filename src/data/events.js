/**
 * Active upcoming event(s).
 *
 * When there's nothing to announce, replace the array below with the
 * FALLBACK block at the bottom of this file, and restore the section
 * copy comment in Events.jsx.
 */
const events = [
  {
    id: 'flama-gran-canaria-december-5',
    name: 'FLAMA - Gran Canaria',
    subtitle: 'In collaboration with Cuartango',
    date: 'Saturday · 5 December 2026',
    weekday: 'Saturday',
    day: '5',
    month: 'December',
    year: '2026',
    time: '23:00–06:00',
    venue: 'Moma Club',
    city: 'Las Palmas',
    status: 'announcing',
    badge: 'Save the date',
    cta: 'Tickets soon',
    ticketUrl: '',
    image: '/media/events/flama-gran-canaria-december-5.jpg',
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
