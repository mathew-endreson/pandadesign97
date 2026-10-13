import { Fragment } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const tags = {
    p: motion.p,
    h1: motion.h1,
    h2: motion.h2,
    h3: motion.h3,
    div: motion.div,
    span: motion.span,
}

const EASE = [0.16, 1, 0.3, 1]

// Masked text reveal: every word is clipped by its own line-box and its
// characters (or the whole word, for scripts that shape — Arabic must not be
// split per character) rise out of it with a stagger. Renders `as` directly so
// it can replace a Reveal on absolutely-positioned markup.
function SplitText({
    as = 'p',
    text,
    by = 'char',
    delay = 0,
    stagger,
    amount = 0.4,
    className,
    style,
    ...props
}) {
    const reduce = useReducedMotion()
    const Component = tags[as] || motion.p
    // Arabic joins letters, so splitting it per character would break the shaping.
    const mode = /[\u0600-\u06FF]/.test(text) ? 'word' : by
    const step = stagger ?? (mode === 'char' ? 0.028 : 0.07)

    const container = {
        hidden: {},
        show: { transition: { staggerChildren: step, delayChildren: delay } },
    }
    const piece = {
        hidden: { y: '115%', rotate: 7, opacity: 0 },
        show: { y: '0%', rotate: 0, opacity: 1, transition: { duration: 0.85, ease: EASE } },
    }

    if (reduce) {
        return <Component className={className} style={style} {...props}>{text}</Component>
    }

    const words = text.split(' ')

    return (
        <Component
            aria-label={text}
            className={className}
            style={style}
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount }}
            {...props}
        >
            {words.map((word, wi) => (
                <Fragment key={wi}>
                <span aria-hidden className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]">
                    {mode === 'char'
                        ? [...word].map((char, ci) => (
                            <motion.span key={ci} variants={piece} className="inline-block origin-bottom-left will-change-transform">
                                {char}
                            </motion.span>
                        ))
                        : (
                            <motion.span variants={piece} className="inline-block origin-bottom-left will-change-transform">
                                {word}
                            </motion.span>
                        )}
                </span>
                {wi < words.length - 1 ? ' ' : null}
                </Fragment>
            ))}
        </Component>
    )
}

export default SplitText
