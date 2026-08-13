import { createContext, useContext } from 'react'

const ScaleContext = createContext(1)

export function ScaleProvider({ scale, children }) {
    return <ScaleContext.Provider value={scale}>{children}</ScaleContext.Provider>
}

export function useScale() {
    return useContext(ScaleContext)
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
