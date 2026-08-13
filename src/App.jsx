import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import CheckoutPage from './pages/CheckoutPage'
import { SmoothScrollProvider } from './components/SmoothScroll'
import { CartProvider } from './context/CartContext'

function App() {
    return (
        <SmoothScrollProvider>
            <CartProvider>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                </Routes>
            </CartProvider>
        </SmoothScrollProvider>
    )
}

export default App
