import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function RequireAuth({ children }) {
    const { user, loading } = useAuth()
    const location = useLocation()

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white">
                <p className="font-body text-[15px] text-ink/50">Loading…</p>
            </div>
        )
    }

    if (!user) {
        return <Navigate to="/admin/login" state={{ from: location }} replace />
    }

    return children
}

export default RequireAuth
