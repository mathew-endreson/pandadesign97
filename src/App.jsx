import { useEffect } from 'react'
import LandingPage from './pages/LandingPage'
import ScrollProgress from './components/ScrollProgress'
import CursorFollower from './components/CursorFollower'
import { SmoothScrollProvider } from './components/SmoothScroll'
import { initMetaPixel, trackEvent } from './lib/metaPixel'
import { LangProvider } from './context/LangContext'

function App() {
    useEffect(() => {
        initMetaPixel()
        trackEvent('PageView')
    }, [])

    return (
        <LangProvider>
            <SmoothScrollProvider>
                <ScrollProgress />
                <CursorFollower />
                <LandingPage />
            </SmoothScrollProvider>
        </LangProvider>
    )
}

export default App
