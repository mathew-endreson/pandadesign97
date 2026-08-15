import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import CheckoutPage from './pages/CheckoutPage'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import RequireAuth from './components/RequireAuth'
import { SmoothScrollProvider } from './components/SmoothScroll'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import { initMetaPixel, trackEvent } from './lib/metaPixel'

// A plain copy of Meta's snippet only ever fires one PageView, on the initial
// full page load — it has no idea this is a single-page app that changes
// "pages" via client-side routing. This fires one on mount (the first view)
// and one again on every subsequent route change, so /checkout etc. actually
// register as pixel events, not just the very first landing.
function PixelTracking() {
    const location = useLocation()

    useEffect(() => {
        initMetaPixel()
    }, [])

    useEffect(() => {
        trackEvent('PageView')
    }, [location.pathname])

    return null
}

function App() {
    return (
        <AuthProvider>
            <SmoothScrollProvider>
                <CartProvider>
                    <PixelTracking />
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/checkout" element={<CheckoutPage />} />
                        <Route path="/admin/login" element={<AdminLogin />} />
                        <Route
                            path="/admin"
                            element={
                                <RequireAuth>
                                    <AdminDashboard />
                                </RequireAuth>
                            }
                        />
                    </Routes>
                </CartProvider>
            </SmoothScrollProvider>
        </AuthProvider>
    )
}

export default App
