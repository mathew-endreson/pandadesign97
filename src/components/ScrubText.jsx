import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

function Word({ children, progress, start, end }) {
    const opacity = useTransform(progress, [start, end], [0.12, 1])
    return <motion.span style={{ opacity }}>{children}</motion.span>
}

// Words light up one after another as the paragraph scrolls through the
// viewport. Whitespace tokens are kept verbatim so layouts that rely on
// `whitespace-pre-wrap` gaps (like the hero pull quote) are unchanged.
function ScrubText({ text, className, style, dir }) {
    const ref = useRef(null)
    const reduce = useReducedMotion()
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.92', 'start 0.35'] })

    if (reduce) return <p ref={ref} dir={dir} className={className} style={style}>{text}</p>

    const tokens = text.split(/(\s+)/)
    const wordCount = tokens.filter((t) => t.trim()).length
    let index = 0

    return (
        <p ref={ref} dir={dir} className={className} style={style}>
            {tokens.map((token, i) => {
                if (!token.trim()) return token
                const start = index / wordCount
                const end = (index + 1) / wordCount
                index += 1
                return <Word key={i} progress={scrollYProgress} start={start} end={end}>{token}</Word>
            })}
        </p>
    )
}

export default ScrubText
