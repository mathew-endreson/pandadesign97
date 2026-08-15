import { motion, useReducedMotion, useAnimation } from 'framer-motion'

const tags = {
    div: motion.div,
    p: motion.p,
    span: motion.span,
    img: motion.img,
    button: motion.button,
    section: motion.section,
    form: motion.form,
    label: motion.label,
    h1: motion.h1,
    h2: motion.h2,
}

const EASE = [0.16, 1, 0.3, 1]

// Polymorphic scroll-reveal wrapper: renders `as` directly (no extra DOM node),
// so it's safe to drop onto absolutely-positioned Figma-derived markup.
// Use `fadeOnly` for elements that already rely on a Tailwind translate-x/y
// utility (e.g. `-translate-y-1/2` centering) — animating `y`/`x` there would
// stomp that transform since Framer Motion writes the full inline `transform`.
function Reveal({
    as = 'div',
    className,
    children,
    y = 28,
    x = 0,
    scale,
    delay = 0,
    duration = 0.7,
    amount = 0.3,
    fadeOnly = false,
    float = false,
    floatDistance = 10,
    floatDuration = 4,
    wobble = 0,
    ...props
}) {
    const shouldReduceMotion = useReducedMotion()
    const Component = tags[as] || motion.div
    const controls = useAnimation()

    const offset = fadeOnly ? {} : { y, x, ...(scale !== undefined ? { scale } : {}) }
    const settled = fadeOnly ? {} : { y: 0, x: 0, ...(scale !== undefined ? { scale: 1 } : {}) }

    // `float` swaps whileInView for an imperative controls sequence so the
    // one-shot entrance and the infinite bob afterward don't fight over the
    // same `y` value the way whileInView (held forever once `once: true`
    // triggers) would if we tried to layer a loop on top of it.
    if (!float) {
        return (
            <Component
                className={className}
                initial={shouldReduceMotion ? false : { opacity: 0, ...offset }}
                whileInView={{ opacity: 1, ...settled }}
                viewport={{ once: true, amount }}
                transition={{ duration, delay, ease: EASE }}
                {...props}
            >
                {children}
            </Component>
        )
    }

    const handleViewportEnter = () => {
        if (shouldReduceMotion) return
        controls
            .start({ opacity: 1, ...settled, transition: { duration, delay, ease: EASE } })
            .then(() => controls.start({
                y: [0, -floatDistance, 0],
                ...(wobble ? { rotate: [-wobble, wobble, -wobble] } : {}),
                transition: { duration: floatDuration, ease: 'easeInOut', repeat: Infinity },
            }))
    }

    return (
        <Component
            className={className}
            initial={shouldReduceMotion ? false : { opacity: 0, ...offset }}
            animate={controls}
            viewport={{ once: true, amount }}
            onViewportEnter={handleViewportEnter}
            {...props}
        >
            {children}
        </Component>
    )
}

export default Reveal
