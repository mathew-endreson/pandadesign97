import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSmoothScroll } from './SmoothScroll'
import { useLang } from '../context/LangContext'
import { openWhatsApp } from '../lib/whatsapp'
import pandaLogo from '../assets/landing/panda-logo.svg'

const links = [
    { id: 'home', target: 0 },
    { id: 'services', target: '#services' },
    { id: 'about', target: '#about' },
]

// Phones have no room for four items, and the logo already means "home".
const mobileLinks = [
    { id: 'services', target: '#services' },
    { id: 'about', target: '#about' },
    { id: 'contact', target: 'whatsapp' },
]

function LangToggle({ className = '' }) {
    const { t, toggle } = useLang()
    return (
        <motion.button
            type="button"
            onClick={toggle}
            aria-label="Switch language / تغيير اللغة"
            className={`flex shrink-0 items-center justify-center rounded-full border-2 border-solid border-black font-heading font-bold transition-colors duration-300 hover:bg-black hover:text-white ${className}`}
            whileTap={{ scale: 0.92 }}
        >
            {t('lang.switch')}
        </motion.button>
    )
}

function Navbar({ scale = 1 }) {
    const { scrollTo } = useSmoothScroll()
    const { t } = useLang()
    const [activeLink, setActiveLink] = useState('home')

    const handleNavClick = (e, link) => {
        e.preventDefault()
        if (link.target === 'whatsapp') {
            openWhatsApp(t('wa.services'))
            return
        }
        setActiveLink(link.id)
        scrollTo(link.target, link.target === 0 ? undefined : { offset: -80 })
    }

    const hrefFor = (link) => (typeof link.target === 'string' && link.target.startsWith('#') ? link.target : '#')

    return (
        <>
            {/* Desktop: the pixel-perfect canvas nav, scaled down to match the
                rest of the design. Below `md` this shrinks past readable/tappable
                sizes, so phones get a real, independently-sized bar instead.
                Kept `ltr` in both languages so the canvas geometry never flips. */}
            <div
                dir="ltr"
                className="fixed left-0 top-0 z-30 hidden md:block"
                style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}
            >
                <div className="flex w-[1440px] items-center justify-between bg-white/80 py-[10px] pl-[37px] pr-[67px] backdrop-blur-[10.5px]">
                    <motion.button
                        type="button"
                        aria-label="Scroll to top"
                        onClick={(e) => handleNavClick(e, { id: 'home', target: 0 })}
                        className="h-[49px] w-[63px] shrink-0 overflow-clip pointer-events-auto"
                        whileHover={{ scale: 1.08, rotate: -4 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    >
                        <img src={pandaLogo} alt="Panda Design" className="block h-full w-full" />
                    </motion.button>

                    <nav className="flex shrink-0 items-center gap-[35px] whitespace-nowrap font-heading text-[20px] font-bold uppercase leading-normal pointer-events-auto">
                        {links.map((link) => {
                            const isActive = activeLink === link.id
                            return (
                                <a
                                    key={link.id}
                                    href={hrefFor(link)}
                                    onClick={(e) => handleNavClick(e, link)}
                                    className={
                                        isActive
                                            ? 'relative text-black transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-black after:content-[""]'
                                            : 'relative text-black/30 transition-colors duration-300 hover:text-black after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 after:content-[""] hover:after:w-full'
                                    }
                                >
                                    {t(`nav.${link.id}`)}
                                </a>
                            )
                        })}
                    </nav>

                    <div className="pointer-events-auto flex shrink-0 items-center gap-[14px]">
                        <LangToggle className="h-[40px] min-w-[52px] px-[14px] text-[18px]" />
                        <motion.button
                            type="button"
                            onClick={() => openWhatsApp(t('wa.services'))}
                            className="flex h-[40px] shrink-0 items-center rounded-full border-2 border-solid border-black px-[22px] font-heading text-[18px] font-bold uppercase transition-colors duration-300 hover:bg-black hover:text-white"
                            whileHover={{ scale: 1.06 }}
                            whileTap={{ scale: 0.94 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                        >
                            {t('nav.talk')}
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Phone: normal-flow bar at real (unscaled) sizes — readable text,
                44px+ tap targets — instead of shrinking along with the canvas. */}
            <div className="fixed inset-x-0 top-0 z-30 flex items-center justify-between bg-white/80 px-2 backdrop-blur-[10.5px] md:hidden">
                <motion.button
                    type="button"
                    aria-label="Scroll to top"
                    onClick={(e) => handleNavClick(e, { id: 'home', target: 0 })}
                    className="flex h-11 w-11 shrink-0 items-center justify-center"
                    whileTap={{ scale: 0.92 }}
                >
                    <img src={pandaLogo} alt="Panda Design" className="h-8 w-auto" />
                </motion.button>

                <nav className="flex shrink-0 items-center gap-4 whitespace-nowrap font-heading text-[13px] font-bold uppercase leading-normal">
                    {mobileLinks.map((link) => {
                        const isActive = activeLink === link.id
                        return (
                            <a
                                key={link.id}
                                href={hrefFor(link)}
                                onClick={(e) => handleNavClick(e, link)}
                                className={
                                    isActive
                                        ? 'relative flex h-11 items-center text-black after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:bg-black after:content-[""]'
                                        : 'relative flex h-11 items-center text-black/30 after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-0 after:bg-black after:content-[""]'
                                }
                            >
                                {t(`nav.${link.id}`)}
                            </a>
                        )
                    })}
                </nav>

                <LangToggle className="h-9 min-w-[44px] px-2 text-[13px]" />
            </div>
        </>
    )
}

export default Navbar
