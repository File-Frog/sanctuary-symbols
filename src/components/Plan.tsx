import { motion, useReducedMotion } from 'framer-motion'
import { useId, useState } from 'react'
import { symbols } from '../data/symbols'

/*
  The tabernacle drawn to scale in cubits.
  x runs east (left, the gate) to west (right, the most holy place); y runs north (top) to south.
  Court 100 × 50 (Ex 27:9-18). Tent 30 × 10, holy place 20, most holy a 10-cubit cube.
*/

type Pt = [number, number]

export const spots: Record<string, { c: Pt; w: number }> = {
  gate: { c: [2, 25], w: 34 },
  altar: { c: [22, 25], w: 30 },
  laver: { c: [36, 25], w: 30 },
  tent: { c: [65, 25], w: 44 },
  table: { c: [57, 22.4], w: 17 },
  lampstand: { c: [57, 27.6], w: 17 },
  incense: { c: [67.5, 25], w: 15 },
  veil: { c: [70, 25], w: 17 },
  ark: { c: [75, 25], w: 14 },
  mercyseat: { c: [75, 25], w: 11 },
}

const FULL = { x: -8, y: -7, w: 116, h: 64 }

export function viewFor(focus?: string, pair?: string) {
  const s = focus ? spots[focus] : undefined
  if (!s) return `${FULL.x} ${FULL.y} ${FULL.w} ${FULL.h}`
  const p = pair ? spots[pair] : undefined
  if (p && p !== s) {
    const minX = Math.min(s.c[0], p.c[0])
    const maxX = Math.max(s.c[0], p.c[0])
    const w = Math.max(maxX - minX + 22, 30)
    const h = w * 0.55
    return `${(minX + maxX) / 2 - w / 2} ${25 - h / 2} ${w} ${h}`
  }
  const h = s.w * 0.55
  return `${s.c[0] - s.w / 2} ${s.c[1] - h / 2} ${s.w} ${h}`
}

export interface Marker {
  at: Pt
  label: string
  active?: boolean
}

interface Props {
  focus?: string
  onSelect?: (id: string) => void
  route?: Pt[]
  routeColor?: string
  routeKey?: string
  markers?: Marker[]
  intro?: boolean
  dimOutside?: boolean
  pair?: string
}

function pillarPositions(): Pt[] {
  const pts: Pt[] = []
  for (let i = 0; i <= 20; i++) {
    pts.push([i * 5, 0], [i * 5, 50])
  }
  for (let j = 1; j < 10; j++) {
    pts.push([100, j * 5])
    if (j * 5 < 15 || j * 5 > 35) pts.push([0, j * 5])
  }
  return pts
}
const PILLARS = pillarPositions()

export default function Plan({ focus, onSelect, route, routeColor = '#f2c96b', routeKey, markers, intro, dimOutside, pair }: Props) {
  const reduce = useReducedMotion()
  const [hover, setHover] = useState<string | null>(null)
  const uid = useId().replace(/:/g, '')
  const vb = viewFor(focus, pair)
  const scale = Number(vb.split(' ')[2]) / FULL.w
  const label = (s: number) => 2.1 * Math.max(scale, 0.18) * s

  const draw = intro && !reduce
  const fade = (delay: number) =>
    draw ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay, duration: 0.8 } } : {}

  const hit = (id: string) => ({
    className: 'hit',
    role: onSelect ? 'link' : undefined,
    tabIndex: onSelect ? 0 : undefined,
    'aria-label': symbols.find((s) => s.id === id)?.name,
    onClick: () => onSelect?.(id),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onSelect?.(id)
      }
    },
    onMouseEnter: () => setHover(id),
    onMouseLeave: () => setHover(null),
    onFocus: () => setHover(id),
    onBlur: () => setHover(null),
    opacity: dimOutside && focus && focus !== id && pair !== id && !(focus === 'mercyseat' && id === 'ark') && !(focus === 'ark' && id === 'mercyseat') ? 0.45 : 1,
  })

  const routeD = route?.map((p, i) => `${i ? 'L' : 'M'}${p[0]} ${p[1]}`).join(' ')
  const hovered = hover ? symbols.find((s) => s.id === hover) : undefined
  const hp = hover ? spots[hover] : undefined

  return (
    <motion.svg
      className="stage-svg"
      viewBox={vb}
      initial={false}
      animate={{ viewBox: vb }}
      transition={{ duration: reduce ? 0 : 1.1, ease: [0.65, 0, 0.2, 1] }}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Floor plan of the wilderness tabernacle"
    >
      <defs>
        <radialGradient id={`glory${uid}`}>
          <stop offset="0" stopColor="#fff4cf" stopOpacity="0.95" />
          <stop offset="0.35" stopColor="#f2c96b" stopOpacity="0.5" />
          <stop offset="1" stopColor="#f2c96b" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`gold${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f6dc93" />
          <stop offset="0.5" stopColor="#c9a24a" />
          <stop offset="1" stopColor="#8a6a26" />
        </linearGradient>
        <linearGradient id={`brass${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d79a5b" />
          <stop offset="1" stopColor="#7a4a22" />
        </linearGradient>
        <pattern id={`linen${uid}`} width="1" height="1" patternUnits="userSpaceOnUse">
          <rect width="1" height="1" fill="#1a2e4d" />
          <path d="M0 .5h1" stroke="#20365a" strokeWidth=".15" />
        </pattern>
      </defs>

      {/* Camp ground and compass */}
      <motion.g {...fade(0)}>
        <text x={-5} y={-3.2} fontSize={label(1)} className="tip-label" fill="#d8c39a" opacity={0.7}>East, toward sunrise</text>
        <text x={105} y={-3.2} fontSize={label(1)} textAnchor="end" className="tip-label" opacity={0.7}>West</text>
      </motion.g>

      {/* Court floor and linen fence */}
      <motion.rect
        x={0}
        y={0}
        width={100}
        height={50}
        fill={`url(#linen${uid})`}
        stroke="#efe7d6"
        strokeWidth={1.2}
        vectorEffect="non-scaling-stroke"
        initial={draw ? { pathLength: 0, opacity: 0 } : false}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: 'easeInOut' }}
      />
      <motion.g {...fade(0.9)}>
        {PILLARS.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={0.55} fill="#d8c39a" />
        ))}
      </motion.g>

      {/* Gate */}
      <motion.g {...fade(1.1)} {...hit('gate')}>
        <rect className="hit-ring" x={-1.4} y={14} width={2.8} height={22} fill="transparent" stroke="none" />
        {['#24497f', '#5b2a5f', '#9e2a2b', '#efe7d6'].map((c, i) => (
          <rect key={c} x={-0.9 + i * 0.45} y={15} width={0.45} height={20} fill={c} />
        ))}
      </motion.g>

      {/* Altar */}
      <motion.g {...fade(1.3)} {...hit('altar')}>
        <rect className="hit-ring" x={19} y={22} width={6} height={6} fill="transparent" stroke="transparent" vectorEffect="non-scaling-stroke" />
        <rect x={19.5} y={22.5} width={5} height={5} fill={`url(#brass${uid})`} />
        <rect x={20.6} y={23.6} width={2.8} height={2.8} fill="#3b1f10" />
        <circle cx={22} cy={25} r={1} fill="#e26a2c" opacity={0.85}>
          {!reduce && <animate attributeName="r" values="0.8;1.15;0.8" dur="2.4s" repeatCount="indefinite" />}
        </circle>
        {[[19.5, 22.5], [24.5, 22.5], [19.5, 27.5], [24.5, 27.5]].map(([x, y]) => (
          <circle key={`${x}${y}`} cx={x} cy={y} r={0.45} fill="#e3b07a" />
        ))}
      </motion.g>

      {/* Laver */}
      <motion.g {...fade(1.45)} {...hit('laver')}>
        <circle className="hit-ring" cx={36} cy={25} r={2.3} fill="transparent" stroke="transparent" vectorEffect="non-scaling-stroke" />
        <circle cx={36} cy={25} r={1.8} fill={`url(#brass${uid})`} />
        <circle cx={36} cy={25} r={1.25} fill="#2d5a8a" />
        <circle cx={35.6} cy={24.6} r={0.4} fill="#9cc3e6" opacity={0.7} />
      </motion.g>

      {/* Tent */}
      <motion.g {...fade(1.6)}>
        <rect x={50} y={20} width={30} height={10} fill="#22395c" stroke="#c9a24a" strokeWidth={1} vectorEffect="non-scaling-stroke" />
        <rect x={70} y={20} width={10} height={10} fill="#2a2a4a" />
        {/* boards */}
        {Array.from({ length: 20 }, (_, i) => (
          <line key={i} x1={50 + i * 1.5} x2={50 + i * 1.5} y1={20} y2={20.4} stroke="#c9a24a" strokeWidth={0.5} vectorEffect="non-scaling-stroke" opacity={0.6} />
        ))}
      </motion.g>
      <motion.g {...fade(1.6)} {...hit('tent')}>
        <rect className="hit-ring" x={49.2} y={19.5} width={1.6} height={11} fill="transparent" stroke="transparent" vectorEffect="non-scaling-stroke" />
        {['#24497f', '#5b2a5f', '#9e2a2b'].map((c, i) => (
          <rect key={c} x={49.7 + i * 0.25} y={20.2} width={0.25} height={9.6} fill={c} />
        ))}
      </motion.g>

      {/* Table */}
      <motion.g {...fade(1.75)} {...hit('table')}>
        <rect className="hit-ring" x={55.5} y={21.5} width={3} height={2} fill="transparent" stroke="transparent" vectorEffect="non-scaling-stroke" />
        <rect x={56} y={21.9} width={2} height={1} fill={`url(#gold${uid})`} />
        {Array.from({ length: 6 }, (_, i) => (
          <g key={i}>
            <rect x={56.15 + i * 0.29} y={22.02} width={0.24} height={0.32} rx={0.06} fill="#e8cf9a" />
            <rect x={56.15 + i * 0.29} y={22.56} width={0.24} height={0.32} rx={0.06} fill="#e8cf9a" />
          </g>
        ))}
      </motion.g>

      {/* Lampstand */}
      <motion.g {...fade(1.9)} {...hit('lampstand')}>
        <rect className="hit-ring" x={55.6} y={26.6} width={2.8} height={2.2} fill="transparent" stroke="transparent" vectorEffect="non-scaling-stroke" />
        <circle cx={57} cy={27.6} r={2.2} fill={`url(#glory${uid})`} opacity={0.5} />
        <line x1={55.8} x2={58.2} y1={27.6} y2={27.6} stroke={`url(#gold${uid})`} strokeWidth={0.18} />
        {Array.from({ length: 7 }, (_, i) => (
          <circle key={i} cx={55.8 + i * 0.4} cy={27.6} r={0.13} fill="#fff1c2" />
        ))}
      </motion.g>

      {/* Incense altar */}
      <motion.g {...fade(2.05)} {...hit('incense')}>
        <rect className="hit-ring" x={66.6} y={24.1} width={1.8} height={1.8} fill="transparent" stroke="transparent" vectorEffect="non-scaling-stroke" />
        <rect x={67} y={24.5} width={1} height={1} fill={`url(#gold${uid})`} />
        <circle cx={67.5} cy={25} r={0.22} fill="#e26a2c" />
      </motion.g>

      {/* Veil */}
      <motion.g {...fade(2.2)} {...hit('veil')}>
        <rect className="hit-ring" x={69.4} y={19.6} width={1.2} height={10.8} fill="transparent" stroke="transparent" vectorEffect="non-scaling-stroke" />
        {['#24497f', '#5b2a5f', '#9e2a2b', '#efe7d6'].map((c, i) => (
          <rect key={c} x={69.7 + i * 0.15} y={20} width={0.15} height={10} fill={c} />
        ))}
      </motion.g>

      {/* Shekinah and ark */}
      <motion.circle
        cx={75}
        cy={25}
        r={5}
        fill={`url(#glory${uid})`}
        initial={draw ? { opacity: 0, scale: 0.2 } : false}
        animate={reduce ? { opacity: 0.9 } : { opacity: [0.65, 1, 0.65], scale: 1 }}
        transition={
          reduce
            ? { duration: 0 }
            : { opacity: { delay: draw ? 2.6 : 0, duration: 5, repeat: Infinity, ease: 'easeInOut' }, scale: { delay: draw ? 2.6 : 0, duration: 1.6 } }
        }
        style={{ transformOrigin: '75px 25px', transformBox: 'view-box' }}
      />
      <motion.g {...fade(2.4)} {...hit(focus === 'mercyseat' ? 'mercyseat' : 'ark')}>
        <rect className="hit-ring" x={73.4} y={23.8} width={3.2} height={2.4} fill="transparent" stroke="transparent" vectorEffect="non-scaling-stroke" />
        <rect x={73.75} y={24.25} width={2.5} height={1.5} fill={`url(#gold${uid})`} />
        <path d="M73.9 24.4 q1.1 .6 1.1 .6 q0 0 1.1 -.6 M73.9 25.6 q1.1 -.6 1.1 -.6 q0 0 1.1 .6" stroke="#8a6a26" strokeWidth={0.12} fill="none" />
      </motion.g>

      {/* Route and markers (services / journey) */}
      {routeD && (
        <motion.path
          key={routeKey}
          d={routeD}
          fill="none"
          stroke={routeColor}
          strokeWidth={3}
          strokeOpacity={0.9}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduce ? 0 : 2.2, ease: 'easeInOut' }}
        />
      )}
      {markers?.map((m, i) => (
        <g key={i} opacity={m.active ? 1 : 0.55}>
          <circle cx={m.at[0]} cy={m.at[1]} r={m.active ? 2 : 1.3} fill={m.active ? '#9e2a2b' : '#0f1d33'} stroke="#f2c96b" strokeWidth={1.2} vectorEffect="non-scaling-stroke">
            {m.active && !reduce && <animate attributeName="r" values="1.6;2.3;1.6" dur="1.8s" repeatCount="indefinite" />}
          </circle>
          <text x={m.at[0]} y={m.at[1] + 0.7} fontSize={1.6} textAnchor="middle" className="tip-label" fill="#fff">
            {i + 1}
          </text>
        </g>
      ))}

      {/* Connection arc */}
      {focus && pair && spots[focus] && spots[pair] && spots[focus].c[0] !== spots[pair].c[0] && (() => {
        const [x1, y1] = spots[focus].c
        const [x2, y2] = spots[pair].c
        const mx = (x1 + x2) / 2
        const my = Math.min(y1, y2) - Math.abs(x2 - x1) * 0.35 - 3
        return (
          <motion.path
            key={`${focus}-${pair}`}
            d={`M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}`}
            fill="none"
            stroke="#f2c96b"
            strokeWidth={2}
            strokeDasharray="4 4"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: reduce ? 0 : 0.9, delay: reduce ? 0 : 0.5 }}
          />
        )
      })()}

      {/* Hover label */}
      {hovered && hp && (
        <g pointerEvents="none">
          <text
            x={hp.c[0]}
            y={hp.c[1] - (hover === 'gate' ? 12.5 : hover === 'tent' ? 6.5 : 3.4 * Math.max(scale * 1.6, 0.5))}
            fontSize={label(1.15)}
            textAnchor="middle"
            className="tip-label"
            fill="#fff"
            stroke="#0f1d33"
            strokeWidth={label(0.25)}
            paintOrder="stroke"
          >
            {hovered.name}
          </text>
        </g>
      )}
    </motion.svg>
  )
}
