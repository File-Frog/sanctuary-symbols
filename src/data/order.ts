import { symbols } from './symbols'

export interface Section {
  path: string
  title: string
}

// The whole study, in teaching order. The stage arrows walk this list.
export const sections: Section[] = [
  { path: '/', title: 'Overview' },
  ...symbols.map((s) => ({ path: `/symbol/${s.id}`, title: s.name })),
  { path: '/services/daily', title: 'The Daily Service' },
  { path: '/services/atonement', title: 'The Day of Atonement' },
  { path: '/feasts', title: 'The Feasts' },
  { path: '/priest', title: 'The High Priest' },
  { path: '/prophecy', title: 'The 2300 Days' },
  { path: '/scripture', title: 'Scripture Index' },
  { path: '/quiz', title: 'Test Yourself' },
  { path: '/resources', title: 'Resources' },
]

export function neighbours(pathname: string) {
  const i = sections.findIndex((s) => s.path === pathname)
  if (i < 0) return { prev: undefined, next: undefined, index: -1 }
  return { prev: sections[i - 1], next: sections[i + 1], index: i }
}
