import { mkdirSync, writeFileSync, existsSync, readFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'

const ROOT = process.cwd()
const PREVIEW_COUNT = 16
const GALLERIES_JSON = join(ROOT, 'src/data/galleries.json')

const EDITIONS = [
  { slug: 'flama-07', title: 'FLAMA #7', folderId: '1-ElEME_G7HXPRK8PQ-Z-dHP-QrvqUPyP' },
  { slug: 'flama-08', title: 'FLAMA #8', folderId: '1_1jjB5b6T1rVOzBcE-jJCfMxynRU9HRG' },
  { slug: 'flama-09', title: 'FLAMA #9', folderId: '17iypXTNutw2PSMCYwwwzaf12eNPe8fpK' },
  { slug: 'flama-10', title: 'FLAMA #10', folderId: '1BaB2jPQThKktxgj1TrAs4FvI1v1JUccs' },
  { slug: 'flama-11', title: 'FLAMA #11', folderId: '1slRSJSFunyHvAhR2UXNJc8KFHtgMRF7T' },
  // Public "View all photos" / import source folders
  { slug: 'flama-12', title: 'FLAMA #12', folderId: '1c-T5rynk07AAHr7lc_nwpkbeX-1gD58Q' },
  { slug: 'flama-13', title: 'FLAMA #13', folderId: '11rxpI3_2s9vEtYF-lyu4dmrxt-thrZxL' },
  { slug: 'after-office-01', title: 'After Office #1', folderId: '16SVZuEUISGKfeGzJBEJTfLcv50T4zpaU' },
  { slug: 'after-office-02', title: 'After Office #2', folderId: '1fGkY4ca61eZEaaDaNrIcNkUc8L-Z5qII' },
]

function fetchText(url) {
  const result = spawnSync('curl', ['-sL', '-A', 'Mozilla/5.0', url], { encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 })
  if (result.status !== 0) throw new Error(`Failed to fetch ${url}`)
  return result.stdout
}

function fetchBinary(url, outPath) {
  const result = spawnSync('curl', ['-sL', '-A', 'Mozilla/5.0', '-o', outPath, url], { maxBuffer: 20 * 1024 * 1024 })
  if (result.status !== 0) throw new Error(`Failed to download ${url}`)
}

function driveApiKey(folderId) {
  const html = fetchText(`https://drive.google.com/drive/folders/${folderId}?usp=sharing`)
  const key = html.match(/AIza[0-9A-Za-z_-]{20,}/)?.[0]
  if (!key) throw new Error('Could not find Drive API key from folder page')
  return key
}

function listDriveImages(folderId, apiKey = driveApiKey(folderId)) {
  const query = encodeURIComponent(`'${folderId}' in parents and trashed=false`)
  const base =
    `https://www.googleapis.com/drive/v3/files?q=${query}` +
    `&pageSize=1000&fields=files(id,name,mimeType),nextPageToken` +
    `&supportsAllDrives=true&includeItemsFromAllDrives=true&key=${apiKey}`

  const files = []
  let pageToken = ''
  do {
    const url = pageToken ? `${base}&pageToken=${pageToken}` : base
    const data = JSON.parse(fetchText(url))
    if (data.error) throw new Error(data.error.message || 'Drive API error')
    files.push(...(data.files || []))
    pageToken = data.nextPageToken || ''
  } while (pageToken)

  return files
    .filter(
      (file) =>
        String(file.mimeType || '').startsWith('image/') ||
        /\.(jpe?g|png|webp|heic)$/i.test(file.name || ''),
    )
    .map((file) => ({ id: file.id, name: file.name }))
}

function sampleEvenly(items, count) {
  if (items.length <= count) return items
  const picked = []
  for (let i = 0; i < count; i += 1) {
    const index = Math.round((i * (items.length - 1)) / (count - 1))
    picked.push(items[index])
  }
  return [...new Map(picked.map((item) => [item.id, item])).values()]
}

function optimizeWithSips(src, dest) {
  const result = spawnSync('sips', ['-Z', '1400', '-s', 'format', 'jpeg', '-s', 'formatOptions', '78', src, '--out', dest], { encoding: 'utf8' })
  if (result.status !== 0) throw new Error(`sips failed for ${src}`)
}

const manifests = []

for (const edition of EDITIONS) {
  console.log(`\n→ ${edition.title}`)
  const files = listDriveImages(edition.folderId)
  console.log(`  found ${files.length} images`)
  if (!files.length) {
    manifests.push({ slug: edition.slug, photoCount: 0, previewCount: 0 })
    continue
  }

  const selected = sampleEvenly(files, PREVIEW_COUNT)
  const publicDir = join(ROOT, 'public/media/galleries', edition.slug)
  const materialDir = join(ROOT, 'material/photos', edition.slug)
  if (existsSync(publicDir)) rmSync(publicDir, { recursive: true, force: true })
  if (existsSync(materialDir)) rmSync(materialDir, { recursive: true, force: true })
  mkdirSync(publicDir, { recursive: true })
  mkdirSync(materialDir, { recursive: true })

  selected.forEach((file, index) => {
    const number = String(index + 1).padStart(2, '0')
    const materialFile = join(materialDir, `${number}.jpg`)
    const web = join(publicDir, `${number}.jpg`)
    const thumbUrl = `https://drive.google.com/thumbnail?id=${file.id}&sz=w1600`
    fetchBinary(thumbUrl, materialFile)
    optimizeWithSips(materialFile, web)
    console.log(`  saved ${number}.jpg ← ${file.name}`)
  })

  const coverIndex = Math.min(selected.length - 1, Math.floor(selected.length * 0.55))
  const coverFile = `${String(coverIndex + 1).padStart(2, '0')}.jpg`

  manifests.push({
    slug: edition.slug,
    photoCount: files.length,
    previewCount: selected.length,
    coverFile,
  })
}

const galleries = JSON.parse(readFileSync(GALLERIES_JSON, 'utf8'))
const bySlug = Object.fromEntries(manifests.map((item) => [item.slug, item]))
const updated = galleries.map((gallery) => {
  const meta = bySlug[gallery.slug]
  if (!meta) return gallery
  return {
    ...gallery,
    photoCount: meta.photoCount,
    coverFile: meta.coverFile || gallery.coverFile,
  }
})
writeFileSync(GALLERIES_JSON, `${JSON.stringify(updated, null, 2)}\n`)
writeFileSync(join(ROOT, 'scripts/drive-import-manifest.json'), `${JSON.stringify(manifests, null, 2)}\n`)

spawnSync('node', [join(ROOT, 'scripts/sync-galleries.mjs')], { stdio: 'inherit' })
console.log('\nDone importing Drive galleries.')
