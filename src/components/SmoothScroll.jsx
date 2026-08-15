import { createContext, useContext, useEffect, useRef } from 'react'
import Lenis from 'lenis'

const SmoothScrollContext = createContext({ scrollTo: () => {} })

export function SmoothScrollProvider({ children }) {
    const lenisRef = useRef(null)

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (prefersReducedMotion) return undefined

        // smoothWheel: false — wheel/trackpad scrolling now passes straight
        // through natively (instant, no easing lag), matching a plain
        // unmodified scroll feel. Lenis stays mounted purely so `scrollTo()`
        // (nav-link clicks, "back to top", etc.) still animates smoothly —
        // that's independent of smoothWheel and unaffected by this change.
        const lenis = new Lenis({
            duration: 1.1,
            easing: (t) => 1 - Math.pow(1 - t, 3),
            smoothWheel: false,
        })
        lenisRef.current = lenis

        let frameId
        const raf = (time) => {
            lenis.raf(time)
            frameId = requestAnimationFrame(raf)
        }
        frameId = requestAnimationFrame(raf)

        return () => {
            cancelAnimationFrame(frameId)
            lenis.destroy()
            lenisRef.current = null
        }
    }, [])

    const scrollTo = (target, options = {}) => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(target, options)
            return
        }

        if (typeof target === 'number') {
            window.scrollTo({ top: target, behavior: 'smooth' })
            return
        }

        const el = typeof target === 'string' ? document.querySelector(target) : target
        if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY + (options.offset || 0)
            window.scrollTo({ top, behavior: 'smooth' })
        }
    }

    return (
        <SmoothScrollContext.Provider value={{ scrollTo }}>
            {children}
        </SmoothScrollContext.Provider>
    )
}

export function useSmoothScroll() {
    return useContext(SmoothScrollContext)
}
