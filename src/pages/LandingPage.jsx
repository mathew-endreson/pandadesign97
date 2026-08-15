import { useEffect, useState } from 'react'
import { ScaleProvider } from '../context/ScaleContext'
import Navbar from '../components/Navbar'
import MarqueeBanner from '../components/MarqueeBanner'
import Hero from '../components/Hero'
import VisionSection from '../components/VisionSection'
import CollectionSection from '../components/CollectionSection'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'

const DESIGN_WIDTH = 1440
const DESIGN_HEIGHT = 7606
// Navbar's own breakpoint (must match its `md:` classes) and its real,
// unscaled content heights on each side of it — desktop nav lives inside the
// canvas's own `scale`, mobile nav is a flat real 44px (h-11). Used below to
// push the whole canvas down by whichever one is actually showing, so it
// stops sitting directly on top of MarqueeBanner.
const NAV_BREAKPOINT = 768
const DESKTOP_NAV_HEIGHT = 69
const MOBILE_NAV_HEIGHT = 44

function LandingPage() {
    const [scale, setScale] = useState(
        () => (typeof window !== 'undefined' ? window.innerWidth / DESIGN_WIDTH : 1)
    )
    const [isMobileNav, setIsMobileNav] = useState(
        () => (typeof window !== 'undefined' ? window.innerWidth < NAV_BREAKPOINT : false)
    )
    // How much taller the shop grid is than the fixed canvas budgets for it
    // (e.g. 2 columns on phone vs. 4 on desktop) — everything below it has to
    // shift down by this amount, or it overlaps. See CollectionSection.
    const [gridExtraHeight, setGridExtraHeight] = useState(0)

    useEffect(() => {
        const update = () => {
            setScale(window.innerWidth / DESIGN_WIDTH)
            setIsMobileNav(window.innerWidth < NAV_BREAKPOINT)
        }
        update()
        window.addEventListener('resize', update)
        return () => window.removeEventListener('resize', update)
    }, [])

    const canvasHeight = DESIGN_HEIGHT + gridExtraHeight
    const navRealHeight = isMobileNav ? MOBILE_NAV_HEIGHT : DESKTOP_NAV_HEIGHT * scale

    return (
        <div className="relative w-full overflow-hidden bg-white" style={{ height: canvasHeight * scale + navRealHeight }}>
            <div
                className="absolute left-0 w-[1440px] bg-white"
                style={{ top: navRealHeight, height: canvasHeight, transform: `scale(${scale})`, transformOrigin: 'top left' }}
            >
                <ScaleProvider scale={scale} isMobile={isMobileNav}>
                    <MarqueeBanner />
                    <Hero />
                    <VisionSection />
                    <CollectionSection onGridHeightChange={setGridExtraHeight} />
                    <ContactSection offsetY={gridExtraHeight} />
                    <Footer offsetY={gridExtraHeight} />
                </ScaleProvider>
            </div>

            {/* Rendered as a sibling of the scaled canvas (not a descendant) — a
                `transform` on an ancestor becomes the containing block for
                `position: fixed` descendants, which silently breaks true
                viewport-fixed positioning. Navbar applies the same scale
                itself so it still lines up pixel-for-pixel with the canvas. */}
            <Navbar scale={scale} />
        </div>
    )
}

export default LandingPage
