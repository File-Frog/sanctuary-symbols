import { refRegex } from './books'
import { symbols } from './symbols'
import { dailySteps, dailyTerms, feasts, garments, priestVerses, prophecyKeys, prophecyPeriods, prophecyTerms, yearlySteps, yearlyTerms } from './extras'

/** Where each scripture reference is used on the site. */
export function buildUsage() {
  const map = new Map<string, { path: string; title: string }[]>()
  const add = (path: string, title: string, blob: unknown) => {
    for (const m of JSON.stringify(blob).matchAll(refRegex())) {
      const list = map.get(m[0]) ?? []
      if (!list.some((x) => x.path === path)) list.push({ path, title })
      map.set(m[0], list)
    }
  }
  symbols.forEach((s) => add(`/symbol/${s.id}`, s.name, s))
  add('/services/daily', 'The Daily Service', [dailySteps, dailyTerms])
  add('/services/atonement', 'The Day of Atonement', [yearlySteps, yearlyTerms])
  add('/feasts', 'The Feasts', feasts)
  add('/priest', 'The High Priest', [garments, priestVerses])
  add('/prophecy', 'The 2300 Days', [prophecyPeriods, prophecyTerms, prophecyKeys])
  return map
}
