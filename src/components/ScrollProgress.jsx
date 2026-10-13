import { motion, useScroll, useSpring } from 'framer-motion'

function ScrollProgress() {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 24, restDelta: 0.001 })

    return (
        <motion.div
            aria-hidden
            className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-brand-red"
            style={{ scaleX }}
        />
    )
}

export default ScrollProgress
