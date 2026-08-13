import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import './index.css'

// Deliberately no static `import App from './App.jsx'` here — App (via
// AuthContext) pulls in src/lib/firebase.js, which throws if env vars are
// missing. A static import would run that at module-load time, before this
// file's own code even executes, which is exactly how a misconfigured
// deploy used to white-screen with nothing on the page to explain why.
// Checking env vars first and only *dynamically* importing App keeps that
// failure inside a normal render, where the error boundary below can catch
// it and actually show something.
const REQUIRED_ENV_VARS = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID',
]

function ConfigError({ missing }) {
    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                padding: '24px',
                textAlign: 'center',
                fontFamily: 'sans-serif',
                background: '#fff',
                color: '#1c1c1c',
            }}
        >
            <h1 style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>Missing configuration</h1>
            <p style={{ fontSize: '14px', color: '#1c1c1c99', maxWidth: '480px', margin: 0 }}>
                This deployment is missing: {missing.join(', ')}. Set these environment variables for the
                deployment and redeploy.
            </p>
        </div>
    )
}

const missingVars = REQUIRED_ENV_VARS.filter((key) => !import.meta.env[key])
const root = ReactDOM.createRoot(document.getElementById('root'))

if (missingVars.length > 0) {
    root.render(<ConfigError missing={missingVars} />)
} else {
    import('./App.jsx').then(({ default: App }) => {
        root.render(
            <React.StrictMode>
                <ErrorBoundary>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </ErrorBoundary>
            </React.StrictMode>,
        )
    })
}
