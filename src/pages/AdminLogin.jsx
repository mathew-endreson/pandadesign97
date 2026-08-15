import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import pandaLogo from '../assets/landing/panda-logo.svg'

const inputClass =
    'w-full border-b border-black/20 bg-transparent py-2 font-body text-[15px] text-ink outline-none transition-colors focus:border-black'
const labelClass = 'font-heading text-[13px] font-semibold uppercase tracking-wide text-ink/50'

function AdminLogin() {
    const { login, user } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false)

    if (user) {
        return <Navigate to="/admin" replace />
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSubmitting(true)
        try {
            await login(email, password)
            navigate(location.state?.from?.pathname || '/admin', { replace: true })
        } catch {
            setError('Invalid email or password.')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-white px-6">
            <form onSubmit={handleSubmit} noValidate className="flex w-full max-w-[360px] flex-col gap-6">
                <div className="flex flex-col items-center gap-3">
                    <img src={pandaLogo} alt="Panda Design" className="h-10 w-auto" />
                    <h1 className="font-display text-[24px] font-extrabold uppercase text-ink">admin login</h1>
                </div>

                <label className="flex flex-col gap-1.5">
                    <span className={labelClass}>email</span>
                    <input
                        type="email"
                        autoComplete="username"
                        className={inputClass}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@pandadesign.com"
                    />
                </label>

                <label className="flex flex-col gap-1.5">
                    <span className={labelClass}>password</span>
                    <input
                        type="password"
                        autoComplete="current-password"
                        className={inputClass}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                    />
                </label>

                {error && <p className="font-body text-[13px] text-brand-red">{error}</p>}

                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-full bg-brand-red py-3 font-heading text-[16px] font-semibold capitalize text-white transition-colors hover:bg-black disabled:opacity-50"
                >
                    {submitting ? 'signing in…' : 'sign in'}
                </button>
            </form>
        </div>
    )
}

export default AdminLogin
