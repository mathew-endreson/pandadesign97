import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

// A ring that trails the pointer and swells over anything tagged
// `data-cursor="label"` (showing the label) or any link/button. Fine-pointer
// devices only — touch screens never see it.
function CursorFollower() {
    const reduce = useReducedMotion()
    const [enabled, setEnabled] = useState(false)
    const [label, setLabel] = useState('')
    const [hot, setHot] = useState(false)
    const [visible, setVisible] = useState(false)
    const x = useMotionValue(-100)
    const y = useMotionValue(-100)
    const sx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.5 })
    const sy = useSpring(y, { stiffness: 380, damping: 32, mass: 0.5 })

    useEffect(() => {
        setEnabled(window.matchMedia('(pointer: fine)').matches)
    }, [])

    useEffect(() => {
        if (!enabled || reduce) return undefined

        const onMove = (e) => {
            x.set(e.clientX)
            y.set(e.clientY)
            setVisible(true)
            const target = e.target instanceof Element ? e.target : null
            const tagged = target?.closest('[data-cursor]')
            const interactive = target?.closest('a, button, input, textarea')
            setLabel(tagged?.getAttribute('data-cursor') || '')
            setHot(Boolean(tagged || interactive))
        }
        const onLeave = () => setVisible(false)

        window.addEventListener('mousemove', onMove)
        document.documentElement.addEventListener('mouseleave', onLeave)
        return () => {
            window.removeEventListener('mousemove', onMove)
            document.documentElement.removeEventListener('mouseleave', onLeave)
        }
    }, [enabled, reduce, x, y])

    if (!enabled || reduce) return null

    const size = label ? 92 : hot ? 56 : 14

    return (
        <motion.div
            aria-hidden
            className="pointer-events-none fixed left-0 top-0 z-[70] flex items-center justify-center rounded-full"
            style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
            animate={{
                width: size,
                height: size,
                opacity: visible ? 1 : 0,
                backgroundColor: label ? '#d21720' : hot ? 'rgba(210,23,32,0.18)' : '#d21720',
            }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
        >
            {label && (
                <span className="font-heading text-[13px] font-semibold lowercase tracking-wide text-white">
                    {label}
                </span>
            )}
        </motion.div>
    )
}

export default CursorFollower
