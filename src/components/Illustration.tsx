import { motion, useReducedMotion } from 'framer-motion'

/* Detailed illustrations of each piece of furniture, drawn in a 400 × 300 box. */

const G = { gold: '#c9a24a', hi: '#f6dc93', deep: '#8a6a26', brass: '#b9783c', brassDeep: '#6e421d', linen: '#efe7d6', blue: '#24497f', purple: '#5b2a5f', scarlet: '#9e2a2b' }

function Defs() {
  return (
    <defs>
      <linearGradient id="ilGold" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={G.hi} />
        <stop offset="0.45" stopColor={G.gold} />
        <stop offset="1" stopColor={G.deep} />
      </linearGradient>
      <linearGradient id="ilGoldSide" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor={G.deep} />
        <stop offset="1" stopColor={G.gold} />
      </linearGradient>
      <linearGradient id="ilBrass" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#e2a467" />
        <stop offset="1" stopColor={G.brassDeep} />
      </linearGradient>
      <radialGradient id="ilFlame" cx="0.5" cy="0.75" r="0.6">
        <stop offset="0" stopColor="#fff6d6" />
        <stop offset="0.45" stopColor="#f6b83c" />
        <stop offset="1" stopColor="#c2410c" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="ilGlow">
        <stop offset="0" stopColor="#fff4cf" stopOpacity="0.95" />
        <stop offset="0.4" stopColor="#f2c96b" stopOpacity="0.45" />
        <stop offset="1" stopColor="#f2c96b" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="ilWater" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#7fb0dd" />
        <stop offset="1" stopColor="#1f4a7a" />
      </linearGradient>
      <filter id="ilSoft"><feGaussianBlur stdDeviation="2" /></filter>
    </defs>
  )
}

function Flame({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="0" cy="-10" rx="14" ry="20" fill="url(#ilFlame)" opacity="0.6" filter="url(#ilSoft)" />
      <path className="flicker" d="M0 -24 C 7 -14, 8 -6, 0 0 C -8 -6, -7 -14, 0 -24 Z" fill="url(#ilFlame)" />
    </g>
  )
}

function Floor() {
  return <ellipse cx="200" cy="262" rx="150" ry="16" fill="#000" opacity="0.28" />
}

function Gate() {
  const cols = [G.blue, G.purple, G.scarlet, G.linen]
  return (
    <g>
      <Floor />
      {/* fence */}
      <rect x="10" y="120" width="70" height="132" fill={G.linen} opacity="0.85" />
      <rect x="320" y="120" width="70" height="132" fill={G.linen} opacity="0.85" />
      {/* hanging */}
      {Array.from({ length: 24 }, (_, i) => (
        <rect key={i} x={80 + i * 10} y="110" width="10" height="142" fill={cols[i % 4]} />
      ))}
      <rect x="80" y="110" width="240" height="142" fill="url(#ilGold)" opacity="0.08" />
      {[80, 160, 240, 320].map((x) => (
        <g key={x}>
          <rect x={x - 5} y="96" width="10" height="160" fill="url(#ilBrass)" />
          <rect x={x - 8} y="92" width="16" height="8" fill={G.hi} />
          <rect x={x - 8} y="252" width="16" height="8" fill={G.brassDeep} />
        </g>
      ))}
      <path d="M200 20 l10 20 h-20 Z" fill="none" />
      <circle cx="200" cy="50" r="22" fill="url(#ilGlow)" />
    </g>
  )
}

function Altar() {
  return (
    <g>
      <Floor />
      <Flame x={200} y={118} s={2.2} />
      <Flame x={168} y={124} s={1.4} />
      <Flame x={234} y={124} s={1.5} />
      {/* top */}
      <path d="M90 130 L200 106 L310 130 L200 154 Z" fill="#4a2a14" />
      <path d="M115 130 L200 112 L285 130 L200 148 Z" fill="#2a1408" />
      {/* sides */}
      <path d="M90 130 L200 154 L200 262 L90 238 Z" fill="url(#ilBrass)" />
      <path d="M310 130 L200 154 L200 262 L310 238 Z" fill="#7a4a22" />
      {/* grate band */}
      <path d="M90 184 L200 208 L310 184" stroke="#e2a467" strokeWidth="3" fill="none" />
      {Array.from({ length: 9 }, (_, i) => (
        <line key={i} x1={100 + i * 12} y1={186 + i * 2.6} x2={100 + i * 12} y2={200 + i * 2.6} stroke="#3b200e" strokeWidth="2" />
      ))}
      {/* horns */}
      {[[90, 130], [310, 130], [200, 154], [200, 106]].map(([x, y]) => (
        <path key={`${x}${y}`} d={`M${x - 7} ${y} q 0 -18 7 -24 q 7 6 7 24 Z`} fill="#e3b07a" />
      ))}
      {/* blood on horn */}
      <path d="M195 150 q5 -4 10 0 v10 q-5 3 -10 0 Z" fill={G.scarlet} />
      {/* poles */}
      <rect x="40" y="206" width="70" height="7" rx="3" fill="url(#ilBrass)" transform="rotate(12 75 210)" />
      <rect x="290" y="206" width="70" height="7" rx="3" fill="url(#ilBrass)" transform="rotate(-12 325 210)" />
    </g>
  )
}

function Laver() {
  return (
    <g>
      <Floor />
      <path d="M170 262 L180 190 L220 190 L230 262 Z" fill="url(#ilBrass)" />
      <ellipse cx="200" cy="262" rx="40" ry="8" fill={G.brassDeep} />
      <path d="M110 140 Q200 220 290 140 Z" fill="url(#ilBrass)" />
      <ellipse cx="200" cy="140" rx="90" ry="22" fill="#e2a467" />
      <ellipse cx="200" cy="142" rx="80" ry="17" fill="url(#ilWater)" />
      <path className="ripple" d="M150 142 q50 -12 100 0" stroke="#bfe0ff" strokeWidth="2" fill="none" opacity="0.7" />
      {/* reflections: mirrors */}
      {[130, 165, 235, 270].map((x, i) => (
        <ellipse key={x} cx={x} cy={170 - Math.abs(i - 1.5) * 6} rx="10" ry="7" fill="#f7d6a8" opacity="0.5" />
      ))}
      {/* drops */}
      <path className="drip" d="M200 98 q6 10 0 14 q-6 -4 0 -14 Z" fill="#9cc3e6" />
    </g>
  )
}

function Tent() {
  return (
    <g>
      <Floor />
      {/* outer covering */}
      <path d="M60 120 L200 70 L340 120 L340 250 L60 250 Z" fill="#5a4636" />
      <path d="M60 120 L200 70 L340 120" stroke="#3b2c20" strokeWidth="6" fill="none" />
      {/* rams' skins dyed red edge */}
      <path d="M60 124 L200 76 L340 124" stroke={G.scarlet} strokeWidth="4" fill="none" />
      {/* boards */}
      <rect x="70" y="128" width="260" height="122" fill="url(#ilGoldSide)" opacity="0.5" />
      {Array.from({ length: 13 }, (_, i) => (
        <line key={i} x1={70 + i * 20} x2={70 + i * 20} y1="128" y2="250" stroke={G.deep} strokeWidth="1.5" />
      ))}
      {/* door */}
      <rect x="150" y="140" width="100" height="110" fill={G.blue} />
      {[G.purple, G.scarlet, G.linen, G.blue, G.purple].map((c, i) => (
        <rect key={i} x={150 + i * 20 + 10} y="140" width="10" height="110" fill={c} opacity="0.9" />
      ))}
      {[150, 175, 200, 225, 250].map((x) => (
        <rect key={x} x={x - 3} y="136" width="6" height="118" fill="url(#ilGold)" />
      ))}
      {/* cloud above */}
      <g className="drift">
        <ellipse cx="200" cy="40" rx="70" ry="22" fill="#e9e3d4" opacity="0.18" />
        <ellipse cx="180" cy="34" rx="40" ry="16" fill="#e9e3d4" opacity="0.22" />
      </g>
    </g>
  )
}

function Table() {
  return (
    <g>
      <Floor />
      {/* legs */}
      {[100, 140, 260, 300].map((x, i) => (
        <rect key={x} x={x} y={i % 3 === 0 ? 168 : 150} width="10" height={i % 3 === 0 ? 92 : 80} fill="url(#ilGold)" />
      ))}
      {/* top */}
      <path d="M80 160 L130 140 L320 140 L310 168 L90 168 Z" fill="url(#ilGold)" />
      <path d="M90 168 L310 168 L310 178 L90 178 Z" fill={G.deep} />
      <path d="M80 158 L130 138 L322 138" stroke={G.hi} strokeWidth="3" fill="none" />
      {/* two stacks of six */}
      {[0, 1].map((r) =>
        Array.from({ length: 6 }, (_, i) => (
          <ellipse key={`${r}${i}`} cx={160 + r * 90} cy={150 - i * 11} rx="34" ry="8" fill={i % 2 ? '#e7cf9b' : '#d9b97a'} stroke="#a6824b" strokeWidth="1" />
        )),
      )}
      {/* frankincense cups */}
      {[160, 250].map((x) => (
        <g key={x}>
          <path d={`M${x - 10} 82 h20 l-4 10 h-12 Z`} fill="url(#ilGold)" />
          <path className="smoke" d={`M${x} 80 c -8 -12 8 -18 0 -30 c -8 -12 8 -16 0 -26`} stroke="#efe7d6" strokeWidth="2" fill="none" opacity="0.5" />
        </g>
      ))}
    </g>
  )
}

function Lampstand() {
  const arms = [60, 40, 20]
  return (
    <g>
      <circle cx="200" cy="90" r="160" fill="url(#ilGlow)" opacity="0.35" />
      <Floor />
      {/* base */}
      <path d="M160 262 L180 236 L220 236 L240 262 Z" fill="url(#ilGold)" />
      <rect x="194" y="70" width="12" height="170" fill="url(#ilGoldSide)" />
      {arms.map((w, i) => (
        <g key={w}>
          <path d={`M200 ${190 - i * 34} C ${200 - w * 1.9} ${190 - i * 34}, ${200 - w * 1.9} ${150 - i * 34}, ${200 - w * 1.9} 80`} stroke="url(#ilGold)" strokeWidth="9" fill="none" />
          <path d={`M200 ${190 - i * 34} C ${200 + w * 1.9} ${190 - i * 34}, ${200 + w * 1.9} ${150 - i * 34}, ${200 + w * 1.9} 80`} stroke="url(#ilGold)" strokeWidth="9" fill="none" />
        </g>
      ))}
      {/* almond-blossom knops */}
      {arms.flatMap((w) => [-1, 1].map((s) => [200 + s * w * 1.9, 120])).concat([[200, 120], [200, 160], [200, 200]]).map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="7" ry="5" fill={G.hi} />
      ))}
      {/* lamps */}
      {[-114, -76, -38, 0, 38, 76, 114].map((dx) => (
        <g key={dx}>
          <path d={`M${200 + dx - 12} 80 q12 10 24 0 l-4 -6 h-16 Z`} fill="url(#ilGold)" />
          <Flame x={200 + dx} y={72} s={0.9} />
        </g>
      ))}
    </g>
  )
}

function Incense() {
  return (
    <g>
      <Floor />
      {/* smoke column */}
      <g className="smoke-rise">
        <path d="M200 90 c -20 -20 20 -30 0 -50 c -20 -18 16 -26 4 -40" stroke="#efe7d6" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.35" />
        <path d="M206 92 c 18 -16 -14 -28 6 -48 c 18 -16 -12 -26 0 -40" stroke="#f6dc93" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.4" />
      </g>
      <Flame x={200} y={108} s={0.9} />
      {/* altar */}
      <path d="M150 112 L200 98 L250 112 L200 126 Z" fill={G.hi} />
      <path d="M150 112 L200 126 L200 258 L150 244 Z" fill="url(#ilGold)" />
      <path d="M250 112 L200 126 L200 258 L250 244 Z" fill={G.deep} />
      <path d="M150 124 L200 138 L250 124" stroke={G.hi} strokeWidth="3" fill="none" />
      {[[150, 112], [250, 112], [200, 126], [200, 98]].map(([x, y]) => (
        <path key={`${x}${y}`} d={`M${x - 5} ${y} q 0 -13 5 -17 q 5 4 5 17 Z`} fill={G.hi} />
      ))}
      {/* censer */}
      <g transform="translate(290 220)">
        <path d="M-18 0 q18 18 36 0 Z" fill="url(#ilGold)" />
        <line x1="0" y1="0" x2="0" y2="-40" stroke={G.gold} strokeWidth="2" />
      </g>
    </g>
  )
}

function Veil({ torn }: { torn?: boolean }) {
  const reduce = useReducedMotion()
  const cols = [G.blue, G.purple, G.scarlet, G.linen]
  const half = (side: -1 | 1) => (
    <motion.g
      animate={torn ? { x: side * 60, rotate: side * 4, opacity: 0.85 } : { x: 0, rotate: 0, opacity: 1 }}
      transition={{ duration: reduce ? 0 : 1.6, ease: [0.7, 0, 0.2, 1] }}
      style={{ transformOrigin: side < 0 ? '80px 40px' : '320px 40px' }}
    >
      <g clipPath={`url(#veilClip${side < 0 ? 'L' : 'R'})`}>
        {Array.from({ length: 24 }, (_, i) => (
          <rect key={i} x={80 + i * 10} y="40" width="10" height="214" fill={cols[i % 4]} />
        ))}
        {/* woven cherubim */}
        {[140, 260].map((x) => (
          <g key={x} opacity="0.55" stroke={G.hi} strokeWidth="2" fill="none">
            <path d={`M${x} 120 c -30 -10 -40 -40 -36 -60 M${x} 120 c 30 -10 40 -40 36 -60`} />
            <circle cx={x} cy="132" r="8" />
            <path d={`M${x} 140 v40`} />
          </g>
        ))}
      </g>
    </motion.g>
  )
  return (
    <g>
      <defs>
        <clipPath id="veilClipL"><path d="M80 40 H204 L196 90 L206 140 L194 190 L204 254 H80 Z" /></clipPath>
        <clipPath id="veilClipR"><path d="M204 40 H320 V254 H204 L194 190 L206 140 L196 90 Z" /></clipPath>
      </defs>
      <motion.circle cx="200" cy="150" r="120" fill="url(#ilGlow)" animate={{ opacity: torn ? 1 : 0.15 }} transition={{ duration: reduce ? 0 : 1.6 }} />
      <Floor />
      {half(-1)}
      {half(1)}
      {[80, 146, 254, 320].map((x) => (
        <rect key={x} x={x - 5} y="30" width="10" height="230" fill="url(#ilGold)" />
      ))}
      <rect x="70" y="26" width="260" height="8" fill="url(#ilGold)" />
    </g>
  )
}

function Ark({ seat }: { seat?: boolean }) {
  return (
    <g>
      {seat && <circle className="glory" cx="200" cy="110" r="150" fill="url(#ilGlow)" />}
      <Floor />
      {/* poles */}
      <rect x="30" y="214" width="340" height="9" rx="4" fill="url(#ilGold)" />
      {/* chest */}
      <rect x="100" y="170" width="200" height="88" fill="url(#ilGold)" />
      <rect x="100" y="170" width="200" height="88" fill="none" stroke={G.deep} strokeWidth="2" />
      <rect x="96" y="164" width="208" height="10" fill={G.hi} />
      <rect x="110" y="182" width="180" height="62" fill="none" stroke={G.hi} strokeWidth="1.5" opacity="0.7" />
      {/* mercy seat */}
      <rect x="94" y="156" width="212" height="10" fill={G.hi} />
      {/* cherubim */}
      {[-1, 1].map((s) => (
        <g key={s} transform={`translate(${200 + s * 80} 156) scale(${s} 1)`}>
          <path d="M0 0 C 2 -26 -6 -46 -4 -62 L 6 -62 C 8 -44 6 -24 10 0 Z" fill="url(#ilGold)" />
          <circle cx="2" cy="-70" r="9" fill="url(#ilGold)" />
          <path d="M4 -52 C 30 -80, 60 -84, 76 -70 C 56 -66, 34 -54, 16 -30 Z" fill="url(#ilGold)" stroke={G.deep} strokeWidth="1" />
          <path d="M4 -42 C 24 -60, 52 -66, 70 -56" stroke={G.deep} strokeWidth="1" fill="none" />
        </g>
      ))}
      {seat ? (
        <g>
          {[178, 190, 202, 214, 226, 196, 208].map((x, i) => (
            <circle key={i} cx={x} cy={i < 5 ? 160 : 150} r="3" fill={G.scarlet} />
          ))}
        </g>
      ) : (
        <g>
          {/* cutaway contents */}
          <rect x="140" y="196" width="34" height="44" rx="12" fill="#cfc6b2" stroke="#8d846f" />
          <rect x="178" y="196" width="34" height="44" rx="12" fill="#cfc6b2" stroke="#8d846f" />
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={i} x1="146" x2="168" y1={210 + i * 6} y2={210 + i * 6} stroke="#8d846f" />
          ))}
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={i} x1="184" x2="206" y1={210 + i * 6} y2={210 + i * 6} stroke="#8d846f" />
          ))}
          <path d="M224 240 q0 -26 12 -30 q12 4 12 30 Z" fill={G.hi} />
          <path d="M262 244 L272 192" stroke="#8a6a3a" strokeWidth="4" />
          {[0, 1, 2].map((i) => (
            <ellipse key={i} cx={270 - i * 2 + (i % 2 ? 8 : -6)} cy={200 + i * 12} rx="5" ry="3" fill="#f1e2c4" />
          ))}
        </g>
      )}
    </g>
  )
}

// Supplied artwork in src/art/<id>.(png|webp|jpg|svg) replaces the placeholder drawing.
const ART = import.meta.glob('../art/*.{png,webp,jpg,jpeg,svg}', { eager: true, import: 'default', query: '?url' }) as Record<string, string>
export function artFor(id: string) {
  const key = Object.keys(ART).find((k) => k.replace(/^.*\//, '').replace(/\.[^.]+$/, '') === id)
  return key ? ART[key] : undefined
}

export default function Illustration({ id, torn }: { id: string; torn?: boolean }) {
  const src = artFor(id)
  if (src) return <img className="illus illus-img" src={src} alt="" />
  const body = (() => {
    switch (id) {
      case 'gate': return <Gate />
      case 'altar': return <Altar />
      case 'laver': return <Laver />
      case 'tent': return <Tent />
      case 'table': return <Table />
      case 'lampstand': return <Lampstand />
      case 'incense': return <Incense />
      case 'veil': return <Veil torn={torn} />
      case 'ark': return <Ark />
      case 'mercyseat': return <Ark seat />
      default: return null
    }
  })()
  return (
    <svg className="illus" viewBox="0 0 400 300" role="img" aria-hidden="true">
      <Defs />
      {body}
    </svg>
  )
}
