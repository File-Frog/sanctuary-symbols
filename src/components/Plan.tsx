import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { symbols } from '../data/symbols'
import planUrl from '../assets/plan.webp'

/*
  Top-down painting of the tabernacle (src/assets/plan.webp, 1536 × 1024).
  Coordinates here are image pixels ÷ 10, so the picture spans 153.6 × 102.4 units.
  The gate (east) is on the left and the most holy place on the right.
*/

type Pt = [number, number]

const IMG = { w: 153.6, h: 102.4 }
const FULL = { x: 3, y: 16, w: 147, h: 72 }

export const spots: Record<string, { c: Pt; w: number }> = {
  gate: { c: [8, 51], w: 40 },
  altar: { c: [30.5, 52], w: 40 },
  laver: { c: [53, 53], w: 40 },
  tent: { c: [104, 51.5], w: 80 },
  table: { c: [88.5, 58.5], w: 28 },
  lampstand: { c: [88, 44], w: 28 },
  incense: { c: [107.2, 52], w: 24 },
  veil: { c: [116, 49.5], w: 26 },
  ark: { c: [128.5, 52], w: 24 },
  mercyseat: { c: [128.5, 50], w: 18 },
}

// Clickable areas over each piece in the painting: x, y, width, height.
const HITS: Record<string, [number, number, number, number]> = {
  gate: [4.5, 37, 7.5, 28],
  altar: [21.5, 40, 18, 24],
  laver: [46.5, 45, 13, 17],
  tent: [66.2, 35.5, 5.6, 33],
  lampstand: [79.5, 37, 17, 13],
  table: [79, 54, 19, 10],
  incense: [104, 45.5, 7, 13],
  veil: [113.8, 36, 4.6, 28],
  ark: [119.5, 44.5, 19, 15],
}

/*
  Service routes and markers are written in cubits (x: east 0 → west 100, y: north 0 → south 50).
  These anchors map that layout onto the painting.
*/
const XA: Pt[] = [[-6, 3.5], [0, 8], [22, 30.5], [36, 53], [50, 67], [57, 88], [67.5, 107.2], [70, 116], [75, 128.5], [100, 147]]
export function toImg([cx, cy]: Pt): Pt {
  const c = Math.max(cx, XA[0][0])
  let x = XA[XA.length - 1][1]
  for (let i = 0; i < XA.length - 1; i++) {
    const [a, ax] = XA[i]
    const [b, bx] = XA[i + 1]
    if (c <= b) {
      x = ax + ((c - a) / (b - a)) * (bx - ax)
      break
    }
  }
  return [x, 52 + (cy - 25) * 1.27]
}

const clampBox = (x: number, y: number, w: number, h: number) =>
  `${Math.min(Math.max(x, 0), IMG.w - w)} ${Math.min(Math.max(y, 0), IMG.h - h)} ${w} ${h}`

export function viewFor(focus?: string, pair?: string, zoom = 1) {
  const base = focus ? spots[focus] : undefined
  if (!base) return `${FULL.x} ${FULL.y} ${FULL.w} ${FULL.h}`
  const w0 = Math.min(base.w * zoom, FULL.w)
  const p = pair ? spots[pair] : undefined
  if (p && p !== base) {
    const minX = Math.min(base.c[0], p.c[0])
    const maxX = Math.max(base.c[0], p.c[0])
    const w = Math.min(Math.max(maxX - minX + 30, 42), FULL.w)
    const h = w * 0.55
    return clampBox((minX + maxX) / 2 - w / 2, 52 - h / 2, w, h)
  }
  const h = w0 * 0.55
  return clampBox(base.c[0] - w0 / 2, base.c[1] - h / 2, w0, h)
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
  zoom?: number
}

export default function Plan({ focus, onSelect, route, routeColor = '#f2c96b', routeKey, markers, intro, dimOutside, pair, zoom = 1 }: Props) {
  const reduce = useReducedMotion()
  const [hover, setHover] = useState<string | null>(null)
  const vb = viewFor(focus, pair, zoom)
  const scale = Number(vb.split(' ')[2]) / FULL.w
  const label = (s: number) => 2.8 * Math.max(scale, 0.2) * s

  const name = (id: string) => symbols.find((s) => s.id === id)?.name
  const targetFor = (id: string) => (id === 'ark' && focus === 'mercyseat' ? 'mercyseat' : id)

  const routeD = route?.map(toImg).map((p, i) => `${i ? 'L' : 'M'}${p[0]} ${p[1]}`).join(' ')
  const hp = hover ? spots[hover] : undefined
  const hb = hover ? HITS[hover === 'mercyseat' ? 'ark' : hover] : undefined

  const dimmed = (id: string) =>
    dimOutside && focus && focus !== id && pair !== id && !(id === 'ark' && (focus === 'mercyseat' || pair === 'mercyseat'))

  return (
    <motion.svg
      className="stage-svg"
      viewBox={vb}
      initial={false}
      animate={{ viewBox: vb }}
      transition={{ duration: reduce ? 0 : 1.1, ease: [0.65, 0, 0.2, 1] }}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Top-down view of the tabernacle and its court"
    >
      <motion.image
        href={planUrl}
        x={0}
        y={0}
        width={IMG.w}
        height={IMG.h}
        preserveAspectRatio="none"
        initial={intro && !reduce ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />

      {/* Dim everything except the focused piece */}
      {dimOutside && focus && (
        <g pointerEvents="none">
          {Object.entries(HITS).map(([id, [x, y, w, h]]) =>
            dimmed(id) ? <rect key={id} x={x} y={y} width={w} height={h} fill="#0f1d33" opacity={0.35} rx={1} /> : null,
          )}
        </g>
      )}

      {/* Clickable furniture */}
      {Object.entries(HITS).map(([id, [x, y, w, h]]) => {
        const target = targetFor(id)
        return (
          <rect
            key={id}
            className="hit plan-hit"
            x={x}
            y={y}
            width={w}
            height={h}
            rx={1.2}
            fill="transparent"
            stroke={hover === id || hover === target ? '#f2c96b' : 'transparent'}
            strokeWidth={1.5}
            vectorEffect="non-scaling-stroke"
            role={onSelect ? 'link' : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-label={name(target)}
            onClick={() => onSelect?.(target)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onSelect?.(target)
              }
            }}
            onMouseEnter={() => setHover(target)}
            onMouseLeave={() => setHover(null)}
            onFocus={() => setHover(target)}
            onBlur={() => setHover(null)}
          />
        )
      })}

      {/* Connection arc */}
      {focus && pair && spots[focus] && spots[pair] && spots[focus].c[0] !== spots[pair].c[0] && (() => {
        const [x1, y1] = spots[focus].c
        const [x2, y2] = spots[pair].c
        const mx = (x1 + x2) / 2
        const my = Math.min(y1, y2) - Math.abs(x2 - x1) * 0.35 - 4
        return (
          <motion.path
            key={`${focus}-${pair}`}
            d={`M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}`}
            fill="none"
            stroke="#f2c96b"
            strokeWidth={2.5}
            strokeDasharray="5 5"
            vectorEffect="non-scaling-stroke"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.5 }}
          />
        )
      })()}

      {/* Service route */}
      {routeD && (
        <motion.path
          key={routeKey}
          d={routeD}
          fill="none"
          stroke={routeColor}
          strokeWidth={4}
          strokeOpacity={0.95}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          style={{ filter: 'drop-shadow(0 0 3px rgba(0,0,0,.6))' }}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduce ? 0 : 2.2, ease: 'easeInOut' }}
        />
      )}
      {markers?.map((m, i) => {
        const [x, y] = toImg(m.at)
        return (
          <g key={i} opacity={m.active ? 1 : 0.7} pointerEvents="none">
            <circle cx={x} cy={y} r={m.active ? 2.8 : 2} fill={m.active ? '#9e2a2b' : '#0f1d33'} stroke="#f2c96b" strokeWidth={1.5} vectorEffect="non-scaling-stroke">
              {m.active && !reduce && <animate attributeName="r" values="2.3;3.2;2.3" dur="1.8s" repeatCount="indefinite" />}
            </circle>
            <text x={x} y={y + 0.9} fontSize={2.4} textAnchor="middle" className="tip-label" fill="#fff">
              {i + 1}
            </text>
          </g>
        )
      })}

      {/* Hover label */}
      {hover && hp && hb && (
        <text
          x={hp.c[0]}
          y={hb[1] - 1.4}
          fontSize={label(1)}
          textAnchor="middle"
          className="tip-label"
          fill="#fff"
          stroke="#0f1d33"
          strokeWidth={label(0.28)}
          paintOrder="stroke"
          pointerEvents="none"
        >
          {name(hover)}
        </text>
      )}
    </motion.svg>
  )
}
