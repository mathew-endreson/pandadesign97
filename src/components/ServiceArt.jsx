import { motion } from 'framer-motion'

// Hand-built, looping SVG scenes — one per service. They share a fixed palette
// (paper / ink / accent) and sit on a tinted panel supplied by the card, so a
// scene reads the same on a dark, red or light card.
const PAPER = '#ffffff'
const INK = '#1c1c1c'
const ACCENT = '#d21720'

const loop = (duration, extra = {}) => ({ duration, repeat: Infinity, ease: 'easeInOut', ...extra })
const svgProps = { viewBox: '0 0 400 360', className: 'h-full w-full', fill: 'none', 'aria-hidden': true }

function Shadow({ cx = 200, cy = 326, rx = 110 }) {
    return (
        <motion.ellipse
            cx={cx}
            cy={cy}
            ry={9}
            fill="#000"
            opacity={0.22}
            animate={{ rx: [rx, rx - 12, rx], opacity: [0.22, 0.14, 0.22] }}
            transition={loop(4)}
        />
    )
}

export function TshirtArt() {
    const tee = 'M150 55 L95 80 L55 140 L95 165 L120 140 L120 300 L280 300 L280 140 L305 165 L345 140 L305 80 L250 55 Q200 95 150 55 Z'
    const cycle = { duration: 5.5, times: [0, 0.45, 0.8, 1], repeat: Infinity, ease: 'easeInOut' }

    return (
        <svg {...svgProps}>
            <defs>
                <clipPath id="tee-print">
                    <motion.rect x="120" y="100" height="200" initial={{ width: 0 }} animate={{ width: [0, 160, 160, 0] }} transition={cycle} />
                </clipPath>
            </defs>
            <Shadow />
            <motion.g animate={{ y: [0, -9, 0], rotate: [-1.5, 1.5, -1.5] }} transition={loop(5)} style={{ transformOrigin: '200px 200px' }}>
                <path d={tee} fill={PAPER} stroke={INK} strokeWidth="4" strokeLinejoin="round" />
                <path d="M150 55 Q200 95 250 55" stroke={INK} strokeWidth="4" strokeLinecap="round" />
                <path d="M120 140 L95 165 M280 140 L305 165" stroke={INK} strokeWidth="3" opacity="0.25" />
                <g clipPath="url(#tee-print)">
                    <circle cx="200" cy="198" r="52" fill={ACCENT} />
                    <circle cx="200" cy="198" r="52" stroke={INK} strokeWidth="4" />
                    <path d="M176 198 L196 218 L228 176" stroke={PAPER} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M140 270 H260" stroke={INK} strokeWidth="6" strokeLinecap="round" />
                    <path d="M158 284 H242" stroke={ACCENT} strokeWidth="5" strokeLinecap="round" />
                </g>
                <motion.rect
                    x="118"
                    y="96"
                    width="5"
                    height="208"
                    rx="2.5"
                    fill={ACCENT}
                    animate={{ x: [0, 160, 160, 0], opacity: [1, 1, 0, 0] }}
                    transition={cycle}
                />
            </motion.g>
            <motion.g animate={{ rotate: 360 }} transition={{ duration: 14, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '344px 64px' }}>
                <path d="M344 46 L349 59 L362 64 L349 69 L344 82 L339 69 L326 64 L339 59 Z" fill={PAPER} />
            </motion.g>
        </svg>
    )
}

export function PlaqueArt() {
    return (
        <svg {...svgProps}>
            <Shadow cy={338} rx={120} />
            <rect x="52" y="40" width="296" height="12" rx="6" fill={PAPER} stroke={INK} strokeWidth="3" />
            <motion.g
                animate={{ rotate: [-4, 4, -4] }}
                transition={loop(4.2)}
                style={{ transformOrigin: '200px 52px' }}
            >
                <path d="M130 52 L130 126 M270 52 L270 126" stroke={PAPER} strokeWidth="5" strokeDasharray="2 9" strokeLinecap="round" />
                <rect x="70" y="124" width="260" height="170" rx="16" fill={PAPER} stroke={INK} strokeWidth="4" />
                <rect x="84" y="138" width="232" height="142" rx="8" stroke={INK} strokeWidth="2" strokeDasharray="6 7" opacity="0.35" />
                {[[92, 146], [308, 146], [92, 272], [308, 272]].map(([cx, cy]) => (
                    <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" fill={INK} opacity="0.5" />
                ))}
                <text x="200" y="206" textAnchor="middle" fontFamily="'Bricolage Grotesque', sans-serif" fontWeight="800" fontSize="58" fill={INK} letterSpacing="2">
                    PANDA
                </text>
                <motion.rect
                    x="104"
                    y="222"
                    height="7"
                    rx="3.5"
                    fill={ACCENT}
                    initial={{ width: 0 }}
                    animate={{ width: [0, 192, 192, 0] }}
                    transition={{ duration: 4.2, times: [0, 0.35, 0.8, 1], repeat: Infinity, ease: 'easeInOut' }}
                />
                <text x="200" y="258" textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight="700" fontSize="17" fill={INK} letterSpacing="7">
                    DESIGN · PRINT
                </text>
            </motion.g>
        </svg>
    )
}

export function PackagingArt() {
    return (
        <svg {...svgProps}>
            <Shadow rx={104} />
            <motion.g animate={{ y: [0, -12, 0] }} transition={loop(4.6)}>
                {/* what pops out of the box */}
                <motion.g
                    animate={{ y: [30, -28, 30], scale: [0.6, 1, 0.6], rotate: [0, 18, 0] }}
                    transition={loop(4.6, { times: [0, 0.5, 1] })}
                    style={{ transformOrigin: '200px 150px' }}
                >
                    <path d="M200 100 L212 134 L248 138 L220 160 L229 196 L200 176 L171 196 L180 160 L152 138 L188 134 Z" fill={ACCENT} stroke={INK} strokeWidth="4" strokeLinejoin="round" />
                </motion.g>
                {/* box */}
                <path d="M110 190 H290 V312 Q290 318 284 318 H116 Q110 318 110 312 Z" fill={PAPER} stroke={INK} strokeWidth="4" strokeLinejoin="round" />
                <rect x="188" y="190" width="24" height="128" fill={ACCENT} stroke={INK} strokeWidth="3" />
                <path d="M110 232 H290" stroke={INK} strokeWidth="2" opacity="0.15" />
                {/* lid */}
                <motion.g
                    animate={{ y: [0, -46, 0], rotate: [0, -9, 0] }}
                    transition={loop(4.6, { times: [0, 0.5, 1] })}
                    style={{ transformOrigin: '110px 180px' }}
                >
                    <rect x="100" y="156" width="200" height="38" rx="8" fill={PAPER} stroke={INK} strokeWidth="4" />
                    <rect x="188" y="156" width="24" height="38" fill={ACCENT} stroke={INK} strokeWidth="3" />
                </motion.g>
                {/* swinging tag */}
                <motion.g animate={{ rotate: [-14, 12, -14] }} transition={loop(3)} style={{ transformOrigin: '290px 226px' }}>
                    <path d="M290 226 Q318 244 316 270" stroke={INK} strokeWidth="3" />
                    <rect x="298" y="268" width="38" height="52" rx="6" fill={ACCENT} stroke={INK} strokeWidth="3" />
                    <circle cx="317" cy="280" r="4" fill={PAPER} />
                    <path d="M306 298 H328 M306 308 H322" stroke={PAPER} strokeWidth="3" strokeLinecap="round" />
                </motion.g>
            </motion.g>
            {[[70, 120, 0], [338, 150, 0.8], [62, 250, 1.6]].map(([cx, cy, d]) => (
                <motion.circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="6" fill={PAPER} animate={{ y: [0, -14, 0], opacity: [0.3, 1, 0.3] }} transition={loop(3, { delay: d })} />
            ))}
        </svg>
    )
}

export function VitrineArt() {
    return (
        <svg {...svgProps}>
            <defs>
                <clipPath id="vitrine-glass">
                    <rect x="96" y="56" width="208" height="248" rx="6" />
                </clipPath>
                <linearGradient id="vitrine-beam" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor={PAPER} stopOpacity="0.55" />
                    <stop offset="1" stopColor={PAPER} stopOpacity="0" />
                </linearGradient>
            </defs>
            <Shadow rx={124} cy={332} />
            <rect x="80" y="304" width="240" height="26" rx="6" fill={PAPER} stroke={INK} strokeWidth="4" />
            <rect x="96" y="56" width="208" height="248" rx="6" fill={PAPER} fillOpacity="0.14" stroke={PAPER} strokeWidth="5" />
            <motion.path
                d="M150 58 L250 58 L300 300 L100 300 Z"
                fill="url(#vitrine-beam)"
                animate={{ opacity: [0.35, 0.9, 0.35] }}
                transition={loop(3.6)}
                clipPath="url(#vitrine-glass)"
            />
            {[142, 222].map((y) => (
                <rect key={y} x="96" y={y} width="208" height="6" fill={PAPER} stroke={INK} strokeWidth="2" />
            ))}
            {/* shelf 1 */}
            <motion.circle cx="150" cy="118" r="20" fill={ACCENT} stroke={INK} strokeWidth="3.5" animate={{ y: [0, -7, 0] }} transition={loop(2.6)} />
            <motion.rect x="196" y="98" width="38" height="44" rx="5" fill={PAPER} stroke={INK} strokeWidth="3.5" animate={{ y: [0, -5, 0] }} transition={loop(3, { delay: 0.5 })} />
            <motion.path d="M254 142 L266 100 L278 142 Z" fill={INK} animate={{ y: [0, -6, 0] }} transition={loop(2.8, { delay: 0.9 })} />
            {/* shelf 2 */}
            <motion.path d="M118 222 L124 178 H156 L162 222 Z" fill={PAPER} stroke={INK} strokeWidth="3.5" strokeLinejoin="round" animate={{ y: [0, -5, 0] }} transition={loop(3.2)} />
            <motion.rect x="190" y="190" width="46" height="32" rx="5" fill={ACCENT} stroke={INK} strokeWidth="3.5" animate={{ y: [0, -6, 0] }} transition={loop(2.7, { delay: 0.7 })} />
            <motion.circle cx="268" cy="204" r="17" fill={PAPER} stroke={INK} strokeWidth="3.5" animate={{ y: [0, -7, 0] }} transition={loop(3.4, { delay: 0.3 })} />
            {/* shelf 3 */}
            <motion.path d="M124 304 L124 262 L148 250 L172 262 L172 304 Z" fill={ACCENT} stroke={INK} strokeWidth="3.5" strokeLinejoin="round" animate={{ y: [0, -4, 0] }} transition={loop(3)} />
            <motion.rect x="206" y="262" width="76" height="42" rx="6" fill={PAPER} stroke={INK} strokeWidth="3.5" animate={{ y: [0, -4, 0] }} transition={loop(3.3, { delay: 0.6 })} />
            {/* glass shine sweeping across */}
            <g clipPath="url(#vitrine-glass)">
                <motion.g animate={{ x: [-260, 420] }} transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.4 }}>
                    <path d="M120 40 H170 L120 330 H70 Z" fill={PAPER} opacity="0.35" />
                    <path d="M190 40 H206 L156 330 H140 Z" fill={PAPER} opacity="0.35" />
                </motion.g>
            </g>
        </svg>
    )
}

export function DecorArt() {
    const stripes = Array.from({ length: 7 })

    return (
        <svg {...svgProps}>
            <Shadow rx={150} cy={336} />
            {/* shop front */}
            <rect x="70" y="100" width="260" height="228" fill={PAPER} stroke={INK} strokeWidth="4" />
            <rect x="150" y="200" width="100" height="128" fill={INK} />
            <rect x="162" y="212" width="76" height="116" fill={PAPER} fillOpacity="0.16" />
            <circle cx="228" cy="272" r="4" fill={PAPER} />
            {/* awning */}
            <g>
                {stripes.map((_, i) => {
                    const w = 280 / stripes.length
                    const x = 60 + i * w
                    return (
                        <g key={i}>
                            <rect x={x} y="58" width={w} height="42" fill={i % 2 ? PAPER : ACCENT} stroke={INK} strokeWidth="3" />
                            <motion.path
                                d={`M${x} 100 a${w / 2} ${w / 2} 0 0 0 ${w} 0 Z`}
                                fill={i % 2 ? PAPER : ACCENT}
                                stroke={INK}
                                strokeWidth="3"
                                animate={{ y: [0, 4, 0] }}
                                transition={loop(2.2, { delay: i * 0.18 })}
                            />
                        </g>
                    )
                })}
            </g>
            {/* pendant lamp */}
            <motion.g animate={{ rotate: [-9, 9, -9] }} transition={loop(3.4)} style={{ transformOrigin: '200px 112px' }}>
                <path d="M200 112 V150" stroke={INK} strokeWidth="3" />
                <path d="M178 176 Q200 140 222 176 Z" fill={ACCENT} stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
                <motion.path d="M184 180 L150 250 H250 L216 180 Z" fill={PAPER} animate={{ opacity: [0.1, 0.5, 0.1] }} transition={loop(2.4)} />
            </motion.g>
            {/* open sign */}
            <motion.g animate={{ rotate: [-8, 8, -8] }} transition={loop(3.8, { delay: 0.4 })} style={{ transformOrigin: '200px 212px' }}>
                <rect x="180" y="214" width="40" height="22" rx="4" fill={ACCENT} stroke={INK} strokeWidth="2.5" />
                <path d="M188 225 H212" stroke={PAPER} strokeWidth="3" strokeLinecap="round" />
            </motion.g>
            {/* plant */}
            <path d="M92 328 L98 290 H128 L134 328 Z" fill={ACCENT} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
            <motion.g animate={{ rotate: [-6, 6, -6] }} transition={loop(3)} style={{ transformOrigin: '113px 290px' }}>
                <path d="M113 290 Q92 262 100 232 Q122 252 113 290 Z" fill={INK} />
                <path d="M113 290 Q134 258 128 226 Q104 248 113 290 Z" fill={INK} opacity="0.75" />
                <path d="M113 290 Q113 250 113 214 Q126 250 113 290 Z" fill={INK} opacity="0.5" />
            </motion.g>
            {/* shelf */}
            <rect x="268" y="236" width="48" height="6" fill={INK} />
            <motion.rect x="276" y="212" width="14" height="24" rx="2" fill={ACCENT} animate={{ y: [0, -4, 0] }} transition={loop(2.8)} />
            <motion.circle cx="304" cy="224" r="10" fill={PAPER} stroke={INK} strokeWidth="3" animate={{ y: [0, -4, 0] }} transition={loop(3.1, { delay: 0.5 })} />
        </svg>
    )
}
