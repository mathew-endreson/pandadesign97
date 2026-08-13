import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import CheckoutPage from './pages/CheckoutPage'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import RequireAuth from './components/RequireAuth'
import { SmoothScrollProvider } from './components/SmoothScroll'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'

function App() {
    return (
        <AuthProvider>
            <SmoothScrollProvider>
                <CartProvider>
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
