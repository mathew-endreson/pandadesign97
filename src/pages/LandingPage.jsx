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

function LandingPage() {
    const [scale, setScale] = useState(
        () => (typeof window !== 'undefined' ? window.innerWidth / DESIGN_WIDTH : 1)
    )

    useEffect(() => {
        const updateScale = () => setScale(window.innerWidth / DESIGN_WIDTH)
        updateScale()
        window.addEventListener('resize', updateScale)
        return () => window.removeEventListener('resize', updateScale)
    }, [])

    return (
        <div className="relative w-full overflow-hidden bg-white" style={{ height: DESIGN_HEIGHT * scale }}>
            <div
                className="absolute left-0 top-0 h-[7606px] w-[1440px] bg-white"
                style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}
            >
                <ScaleProvider scale={scale}>
                    <MarqueeBanner />
                    <Hero />
                    <VisionSection />
                    <CollectionSection />
                    <ContactSection />
                    <Footer />
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
