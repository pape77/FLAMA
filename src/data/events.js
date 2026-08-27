/**
 * Active upcoming event(s).
 *
 * When there's nothing to announce, replace the array below with the
 * FALLBACK block at the bottom of this file, and restore the section
 * copy comment in Events.jsx.
 */
const events = [
  {
    id: 'after-office-september-17',
    name: 'After Office',
    date: 'Thursday · 17 September 2026',
    weekday: 'Thursday',
    day: '17',
    month: 'September',
    year: '2026',
    venue: 'De Ebeling',
    city: 'Amsterdam',
    status: 'announcing',
    badge: 'Save the date',
    cta: 'Tickets',
    ticketUrl: 'https://weeztix.shop/zdjbktw5',
    image: '/media/events/after-office-september-17.png',
  },
  {
    id: 'flama-gran-canaria-october-9',
    name: 'FLAMA - Gran Canaria',
    subtitle: 'In collaboration with Cuartango',
    date: 'Friday · 9 October 2026',
    weekday: 'Friday',
    day: '9',
    month: 'October',
    year: '2026',
    venue: 'Sala Alboroto',
    city: 'Las Palmas',
    status: 'announcing',
    badge: 'Special Edition',
    cta: 'Tickets',
    ticketUrl: 'https://weeztix.shop/wuvyysuw',
    image: '/media/events/flama-gran-canaria-october-9.jpg',
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
