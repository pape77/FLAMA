/**
 * Active upcoming event(s).
 *
 * When there's nothing to announce, replace the array below with the
 * FALLBACK block at the bottom of this file, and restore the section
 * copy comment in Events.jsx.
 */
const events = [
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
  {
    id: 'flama-dia-de-los-muertos-october-31',
    name: 'FLAMA stage - Fiesta Macumba (Dia de muertos)',
    date: 'Saturday · 31 October 2026',
    weekday: 'Saturday',
    day: '31',
    month: 'October',
    year: '2026',
    venue: 'Amaze',
    city: 'Amsterdam',
    status: 'announcing',
    badge: 'Save the date',
    cta: 'Tickets',
    ticketUrl:
      'https://shop.weeztix.com/4ae21f99-57e1-464d-b51c-55a76218c615/tickets?shop_code=aytgg666&original_referer=https%3A%2F%2Fwww.fiestamacumba.nl%2Fen%2Fevents%2Famaze-8%2F',
    image: '/media/events/flama-dia-de-los-muertos-october-31.jpg',
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
