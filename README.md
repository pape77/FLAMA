# FLAMA Website

Premium React site for FLAMA, the Argentine party community in Amsterdam.

## Stack

- React + Vite
- Tailwind CSS v4
- React Router
- Framer Motion

## Develop

```bash
npm install
npm run dev
```

`npm run dev` synchronizes the gallery manifests before starting Vite.

Other useful commands:

```bash
npm run sync:galleries       # Rebuild gallery image lists from public/media/galleries
npm run import:drive-galleries # Re-import curated samples from all configured Drive folders
npm run build                # Create a production build
npm run preview              # Preview the production build locally
npm run lint                 # Run ESLint
```

## Build for Cloudflare Pages

```bash
npm run build
```

The build automatically runs `sync:galleries` first. Deploy the generated `dist` folder.

Build command: `npm run build`  
Output directory: `dist`

`public/_redirects` contains the SPA fallback required for direct visits to gallery routes.

## Content updates

Add or edit content in:

- `src/data/events.js`
- `src/data/galleries.json` (titles, Drive links, metadata)

### How to add a new event link

Currently, the ticket and announcement system is manual:

- The hero “Upcoming events” button scrolls to the Events section.
- The event-card CTA opens Instagram when `ticketUrl` points there.
- The navbar “Get tickets” button also always opens Instagram.
- The card badge comes from each event’s `badge` field.
- There is no mailing list, notification system, database, or automatic announcement service yet.

When you have a new event:

1. Add its browser-ready promotional image to `public/media/events/` (or `public/media/photos/general/`) and keep the source-quality original in `material/`.
2. Update `src/data/events.js` with:
   - Event name
   - Date
   - Venue and city
   - Badge wording
   - Button wording
   - Ticket URL
   - Image path
3. Update the section copy in `src/components/Events.jsx` if needed.
4. Deploy the updated website.

`events.js` exports an array, so add another event object to show multiple event cards.

A commented FALLBACK block at the bottom of `events.js` (and a matching section-copy comment in `Events.jsx`) holds the previous “no announced event yet” content for easy revert.

For example:

```js
export default [
  {
    id: 'flama-14',
    name: 'FLAMA #14',
    date: 'Saturday, 24 October 2026',
    venue: 'Venue Name',
    city: 'Amsterdam',
    status: 'tickets-live',
    badge: 'Tickets live',
    cta: 'Get tickets',
    ticketUrl: 'https://your-ticket-provider.com/flama-14',
    image: '/media/events/flama-14-event.jpg',
  },
]
```

Before tickets are available, use:

```js
{
  cta: 'Follow for the drop',
  ticketUrl: 'https://instagram.com/lafiestaflama',
}
```

Then replace those values once tickets go live.

The `status` field is stored for future use but does not currently change the card design or announcement label.

### Site photos

Source-quality originals live in `material/`. Browser-ready, optimized media lives in `public/`; only files in `public/` are served by the website.

Homepage and general-section photos:

- Source: `material/photos/general/`
- Website: `public/media/photos/general/`

Edition gallery photos:

- Source: `material/photos/<edition-slug>/`
- Website: `public/media/galleries/<edition-slug>/`

To update an edition gallery manually:

1. Keep the source image in `material/photos/<edition-slug>/`.
2. Create an optimized copy in `public/media/galleries/<edition-slug>/`.
3. Use sequential names such as `01.jpg`, `02.jpg`, and `03.jpg` to control display order.
4. Set `coverFile` in `src/data/galleries.json` to the chosen filename.
5. Run `npm run sync:galleries`. This also runs automatically with `npm run dev` and `npm run build`.

The sync script:

- Reads supported images from `public/media/galleries/<edition-slug>/`.
- Sorts them naturally by filename.
- Rebuilds each gallery’s `images` and `cover` values.
- Preserves `photoCount` for galleries with an external Drive link.
- Uses the number of local images as `photoCount` for local-only galleries.

### Importing galleries from Google Drive

Run:

```bash
npm run import:drive-galleries
```

This fetches the configured public Drive folders, counts all images using Drive pagination, selects up to 16 evenly distributed previews, optimizes them, updates gallery metadata, and runs the gallery sync.

**Warning:** the import command deletes and recreates the configured edition folders in both `material/photos/` and `public/media/galleries/`. It will overwrite manually curated preview selections, filenames, and cover choices. Use it only when intentionally rebuilding all Drive-backed galleries.

The Drive importer currently requires `curl` and macOS `sips`; normal development and production builds do not run this importer.
