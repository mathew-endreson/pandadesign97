import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { ScaleProvider } from '../context/ScaleContext'
import Navbar from '../components/Navbar'
import MarqueeBanner from '../components/MarqueeBanner'
import Hero from '../components/Hero'
import VisionSection from '../components/VisionSection'
import ServicesSection from '../components/ServicesSection'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'
import Intro from '../components/Intro'

const DESIGN_WIDTH = 1440
// The fixed-pixel Figma canvas now only holds what is still laid out in
// absolute coordinates: marquee + hero + vision on top (0 – 3220), and
// contact + footer at the bottom (originally 5880 – 7606). Services sit
// between the two as a normal responsive section, which is what lets their
// cards use `position: sticky` (impossible inside a scaled, clipped canvas).
const TOP_HEIGHT = 3220
const BOTTOM_START = 5880
const BOTTOM_HEIGHT = 7606 - BOTTOM_START
// Navbar's own breakpoint (must match its `md:` classes) and its real,
// unscaled content heights on each side of it — desktop nav lives inside the
// canvas's own `scale`, mobile nav is a flat real 44px (h-11).
const NAV_BREAKPOINT = 768
const DESKTOP_NAV_HEIGHT = 69
const MOBILE_NAV_HEIGHT = 44

function LandingPage() {
    const reduce = useReducedMotion()
    const [scale, setScale] = useState(
        () => (typeof window !== 'undefined' ? window.innerWidth / DESIGN_WIDTH : 1)
    )
    const [isMobileNav, setIsMobileNav] = useState(
        () => (typeof window !== 'undefined' ? window.innerWidth < NAV_BREAKPOINT : false)
    )
    const [lifted, setLifted] = useState(false)
    const [introDone, setIntroDone] = useState(false)

    useEffect(() => {
        const update = () => {
            setScale(window.innerWidth / DESIGN_WIDTH)
            setIsMobileNav(window.innerWidth < NAV_BREAKPOINT)
        }
        update()
        window.addEventListener('resize', update)
        return () => window.removeEventListener('resize', update)
    }, [])

    useEffect(() => {
        if (reduce) return undefined
        // Page mounts as the curtain starts to lift (see Intro's delay).
        const lift = setTimeout(() => setLifted(true), 950)
        const done = setTimeout(() => setIntroDone(true), 2100)
        return () => {
            clearTimeout(lift)
            clearTimeout(done)
        }
    }, [reduce])

    const showPage = reduce || lifted
    const navRealHeight = isMobileNav ? MOBILE_NAV_HEIGHT : DESKTOP_NAV_HEIGHT * scale

    return (
        <div className="relative w-full bg-white">
            {!reduce && !introDone && <Intro />}

            {showPage && (
                <>
                    {isMobileNav ? (
                        <div className="flex w-full flex-col bg-white pt-[44px]">
                            <ScaleProvider scale={1} isMobile={true}>
                                <MarqueeBanner />
                                <Hero />
                                <VisionSection />
                            </ScaleProvider>
                            <ServicesSection />
                            <ScaleProvider scale={1} isMobile={true}>
                                <ContactSection />
                                <Footer />
                            </ScaleProvider>
                        </div>
                    ) : (
                        <>
                            <div dir="ltr" className="relative w-full overflow-hidden" style={{ height: TOP_HEIGHT * scale + navRealHeight }}>
                                <div
                                    className="absolute left-0 w-[1440px] bg-white"
                                    style={{ top: navRealHeight, height: TOP_HEIGHT, transform: `scale(${scale})`, transformOrigin: 'top left' }}
                                >
                                    <ScaleProvider scale={scale} isMobile={false}>
                                        <MarqueeBanner />
                                        <Hero />
                                        <VisionSection />
                                    </ScaleProvider>
                                </div>
                            </div>

                            <ServicesSection />

                            <div dir="ltr" className="relative w-full overflow-hidden" style={{ height: BOTTOM_HEIGHT * scale }}>
                                <div
                                    className="absolute left-0 top-0 w-[1440px] bg-white"
                                    style={{ height: BOTTOM_HEIGHT, transform: `scale(${scale})`, transformOrigin: 'top left' }}
                                >
                                    <ScaleProvider scale={scale} isMobile={false}>
                                        {/* Contact + Footer keep their original absolute tops; this
                                            wrapper pulls that coordinate space up so 5880 lands at 0. */}
                                        <div className="absolute left-0 w-[1440px]" style={{ top: -BOTTOM_START, height: 7606 }}>
                                            <ContactSection />
                                            <Footer />
                                        </div>
                                    </ScaleProvider>
                                </div>
                            </div>
                        </>
                    )}
                    <Navbar scale={scale} />
                </>
            )}
        </div>
    )
}

export default LandingPage
