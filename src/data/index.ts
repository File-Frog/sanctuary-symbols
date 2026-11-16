import { refRegex } from './books'
import { symbols } from './symbols'
// Page source text, so references written directly in a page (intros and meaning sections) are counted too.
import serviceSrc from '../pages/Service.tsx?raw'
import feastsSrc from '../pages/Feasts.tsx?raw'
import priestSrc from '../pages/Priest.tsx?raw'
import prophecySrc from '../pages/Prophecy.tsx?raw'
import homeSrc from '../pages/Home.tsx?raw'
import { dailySteps, dailyTerms, feasts, feastTerms, garments, priestTerms, priestVerses, prophecyKeys, prophecyPeriods, prophecyTerms, quiz, yearlySteps, yearlyTerms } from './extras'

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
  symbols.forEach((s) => add(`/sanctuary/symbol/${s.id}`, s.name, s))
  add('/sanctuary/services/daily', 'The Daily Service', [dailySteps, dailyTerms])
  add('/sanctuary/services/atonement', 'The Day of Atonement', [yearlySteps, yearlyTerms])
  add('/sanctuary/feasts', 'The Feasts', feasts)
  add('/sanctuary/priest', 'The High Priest', [garments, priestVerses])
  add('/sanctuary/prophecy', 'The 2300 Days', [prophecyPeriods, prophecyTerms, prophecyKeys])
  const split = serviceSrc.indexOf('atonement: {')
  add('/sanctuary/services/daily', 'The Daily Service', serviceSrc.slice(0, split))
  add('/sanctuary/services/atonement', 'The Day of Atonement', serviceSrc.slice(split))
  add('/sanctuary/feasts', 'The Feasts', [feastsSrc, feastTerms])
  add('/sanctuary/priest', 'The High Priest', [priestSrc, priestTerms])
  add('/sanctuary', 'Overview', homeSrc)
  add('/sanctuary/quiz', 'Test Yourself', quiz)
  add('/sanctuary/prophecy', 'The 2300 Days', prophecySrc)
  return map
}
