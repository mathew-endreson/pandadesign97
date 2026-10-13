import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { translations } from '../i18n/translations'

const STORAGE_KEY = 'panda-lang'

const LangContext = createContext({ lang: 'en', isAr: false, t: (key) => key, toggle: () => {} })

function initialLang() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved === 'en' || saved === 'ar') return saved
    } catch {
        // storage can be blocked (private mode) — fall through to the browser language
    }
    return typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('ar') ? 'ar' : 'en'
}

export function LangProvider({ children }) {
    const [lang, setLang] = useState(initialLang)

    // <html lang/dir> drives RTL layout, the Arabic font stack (index.css) and
    // screen readers.
    useEffect(() => {
        document.documentElement.lang = lang
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
        try {
            localStorage.setItem(STORAGE_KEY, lang)
        } catch {
            // ignore
        }
    }, [lang])

    const toggle = useCallback(() => setLang((current) => (current === 'ar' ? 'en' : 'ar')), [])

    const value = useMemo(() => {
        const t = (key, vars) => {
            const entry = translations[lang][key] ?? translations.en[key] ?? key
            if (typeof entry !== 'string' || !vars) return entry
            return entry.replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? '')
        }
        return { lang, isAr: lang === 'ar', t, toggle }
    }, [lang, toggle])

    return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
    return useContext(LangContext)
}
