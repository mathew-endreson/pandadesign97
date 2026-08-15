const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID

// Unlike Firebase, a missing pixel ID should never take the site down —
// analytics is allowed to just not run. Every export here is a no-op if
// the pixel was never initialized (no ID configured, or running server-side).
let initialized = false

export function initMetaPixel() {
    if (initialized || !PIXEL_ID || typeof window === 'undefined') return
    initialized = true

    /* eslint-disable */
    !function (f, b, e, v, n, t, s) {
        if (f.fbq) return
        n = f.fbq = function () {
            n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
        }
        if (!f._fbq) f._fbq = n
        n.push = n
        n.loaded = true
        n.version = '2.0'
        n.queue = []
        t = b.createElement(e)
        t.async = true
        t.src = v
        s = b.getElementsByTagName(e)[0]
        s.parentNode.insertBefore(t, s)
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
    /* eslint-enable */

    window.fbq('init', PIXEL_ID)
    // No `fbq('track', 'PageView')` here — the router-driven tracker fires
    // the first PageView on mount too, so calling it here would double-count.
}

export function trackEvent(name, params) {
    if (typeof window === 'undefined' || typeof window.fbq !== 'function') return
    window.fbq('track', name, params)
}
