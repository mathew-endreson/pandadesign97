import { createContext, useContext } from 'react'

const ScaleContext = createContext({ scale: 1, isMobile: false })

export function ScaleProvider({ scale, isMobile = false, children }) {
    return <ScaleContext.Provider value={{ scale, isMobile }}>{children}</ScaleContext.Provider>
}

export function useScale() {
    return useContext(ScaleContext).scale
}

export function useIsMobile() {
    return useContext(ScaleContext).isMobile
}

// The canvas this renders inside is shrunk with `transform: scale()`, which
// shrinks CSS padding right along with everything else. To give a small
// scaled-down control (a button, a pill) extra invisible tap area that
// actually measures `px` screen pixels once rendered, the padding has to be
// pre-inflated by 1/scale before the ancestor transform shrinks it back down.
export function useHitSlop(px) {
    const scale = useScale()
    return px / scale
}

// Same inverse-scale trick, generalized to any CSS length (font-size, a fixed
// box height, etc.) — not just padding. Text/controls inside the canvas
// inherit the exact same shrink factor as the decorative imagery around
// them, which is fine for a hero headline but makes dense text (product
// names, prices, descriptions) shrink down to genuinely unreadable sizes on
// small phones. Pass the size you actually want rendered, in real screen
// px, and only apply it where `isMobile` — desktop keeps its original
// Figma-derived scaled sizing untouched.
export function useResponsiveSize(mobilePx) {
    const { scale, isMobile } = useContext(ScaleContext)
    return isMobile ? mobilePx / scale : undefined
}
