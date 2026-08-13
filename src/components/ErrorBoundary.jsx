import { Component } from 'react'

// A blank white screen with an error only in the console is invisible to
// anyone who isn't a developer with devtools open — this turns any crash
// (Firebase misconfiguration, a bad render, anything) into a message that's
// actually readable on the page itself.
class ErrorBoundary extends Component {
    state = { error: null }

    static getDerivedStateFromError(error) {
        return { error }
    }

    componentDidCatch(error, info) {
        console.error('Uncaught error:', error, info)
    }

    render() {
        if (this.state.error) {
            return (
                <div style={{
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
                }}>
                    <h1 style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>Something went wrong</h1>
                    <p style={{ fontSize: '14px', color: '#1c1c1c99', maxWidth: '480px', margin: 0 }}>
                        {this.state.error.message}
                    </p>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
