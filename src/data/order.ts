import { symbols, zones, type Zone } from './symbols'

export interface Section {
  path: string
  title: string
}

export interface NavGroup {
  heading?: string
  note?: string
  colour?: string
  numbered?: boolean
  items: Section[]
}

export interface Topic {
  id: string
  title: string
  subtitle: string
  base: string
  groups: NavGroup[]
}

const zoneColour: Record<Zone, string> = { court: 'var(--court)', holy: 'var(--holy)', most: 'var(--most)' }

/*
  Every study topic on the site. Add a new topic here (with its pages under its own base path)
  and it appears in the left navigation as its own expandable section.
*/
export const topics: Topic[] = [
  {
    id: 'sanctuary',
    title: 'The Sanctuary',
    subtitle: 'Thy way, O God, is in the sanctuary',
    base: '/sanctuary',
    groups: [
      { items: [{ path: '/sanctuary', title: 'Overview' }] },
      ...(Object.keys(zones) as Zone[]).map((z) => ({
        heading: zones[z].name,
        note: zones[z].phase,
        colour: zoneColour[z],
        numbered: true,
        items: symbols.filter((s) => s.zone === z).map((s) => ({ path: `/sanctuary/symbol/${s.id}`, title: s.name })),
      })),
      {
        heading: 'The services',
        items: [
          { path: '/sanctuary/services/daily', title: 'The Daily Service' },
          { path: '/sanctuary/services/atonement', title: 'The Day of Atonement' },
          { path: '/sanctuary/feasts', title: 'The Feasts' },
          { path: '/sanctuary/priest', title: 'The High Priest' },
        ],
      },
      { heading: 'Prophecy', items: [{ path: '/sanctuary/prophecy', title: 'The 2300 Days' }] },
      {
        heading: 'Study',
        items: [
          { path: '/sanctuary/scripture', title: 'Scripture Index' },
          { path: '/sanctuary/quiz', title: 'Test Yourself' },
          { path: '/sanctuary/resources', title: 'Resources' },
        ],
      },
    ],
  },
]

export function topicSections(t: Topic) {
  return t.groups.flatMap((g) => g.items)
}

export function topicFor(pathname: string) {
  return topics.find((t) => pathname === t.base || pathname.startsWith(t.base + '/'))
}

/** Previous/next within the topic the page belongs to. The stage arrows walk this list. */
export function neighbours(pathname: string) {
  const t = topicFor(pathname)
  const list = t ? topicSections(t) : []
  const i = list.findIndex((s) => s.path === pathname)
  if (i < 0) return { prev: undefined, next: undefined, index: -1, total: list.length }
  return { prev: list[i - 1], next: list[i + 1], index: i, total: list.length }
}
