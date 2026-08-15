import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import IconEye from '../icons/IconEye'
import pandaLogo from '../assets/landing/panda-logo.svg'

const AUTH_ERROR_MESSAGES = {
    'auth/invalid-email': 'That email address looks invalid.',
    'auth/user-not-found': 'No account with that email.',
    'auth/wrong-password': 'Incorrect password.',
    'auth/invalid-credential': 'Incorrect email or password.',
    'auth/too-many-requests': 'Too many attempts — wait a bit and try again.',
    'auth/network-request-failed': "Can't reach Firebase — check your connection.",
}

const inputClass =
    'w-full border-b border-black/20 bg-transparent py-2 font-body text-[15px] text-ink outline-none transition-colors focus:border-black'
const labelClass = 'font-heading text-[13px] font-semibold uppercase tracking-wide text-ink/50'

function AdminLogin() {
    const { login, user } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
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
        } catch (err) {
            setError(AUTH_ERROR_MESSAGES[err.code] || `Sign-in failed: ${err.code || err.message}`)
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
                    <span className="flex items-center gap-2">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            className={`${inputClass} flex-1`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((v) => !v)}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                            className="shrink-0 text-ink/40 transition-colors hover:text-ink"
                        >
                            <IconEye className="size-5" open={!showPassword} />
                        </button>
                    </span>
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
