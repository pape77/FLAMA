import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = process.cwd()
const GALLERIES_JSON = join(ROOT, 'src/data/galleries.json')
const MEDIA_ROOT = join(ROOT, 'public/media/galleries')
const IMAGE_EXT = /\.(jpe?g|png|webp|avif)$/i

function naturalSort(a, b) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
}

function listImages(folder) {
  const dir = join(MEDIA_ROOT, folder)
  if (!existsSync(dir)) return []
  return readdirSync(dir)
    .filter((name) => IMAGE_EXT.test(name))
    .filter((name) => !/^cover\./i.test(name))
    .sort(naturalSort)
}

const galleries = JSON.parse(readFileSync(GALLERIES_JSON, 'utf8'))

const synced = galleries.map((gallery) => {
  if (!gallery.folder) return gallery

  const files = listImages(gallery.folder)
  const dir = join(MEDIA_ROOT, gallery.folder)
  const allFiles = existsSync(dir)
    ? readdirSync(dir).filter((name) => IMAGE_EXT.test(name)).sort(naturalSort)
    : []

  const preferredCover = gallery.coverFile && allFiles.includes(gallery.coverFile)
    ? gallery.coverFile
    : allFiles.find((name) => /^cover\./i.test(name)) || files[0]

  const images = files.map((name) => `/media/galleries/${gallery.folder}/${name}`)
  const cover = preferredCover
    ? `/media/galleries/${gallery.folder}/${preferredCover}`
    : gallery.cover

  return {
    ...gallery,
    cover,
    images,
    photoCount: gallery.externalUrl ? gallery.photoCount : images.length,
  }
})

writeFileSync(GALLERIES_JSON, `${JSON.stringify(synced, null, 2)}\n`)
console.log(`Synced ${synced.filter((g) => g.folder).length} folder-based galleries.`)
