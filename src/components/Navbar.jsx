import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSmoothScroll } from './SmoothScroll'
import { useCart } from '../context/CartContext'
import CartDrawer from './CartDrawer'
import IconCart from '../icons/IconCart'
import pandaLogo from '../assets/landing/panda-logo.svg'

const links = [
    { label: 'home', target: 0 },
    { label: 'shop', target: '#shop' },
    { label: 'about', target: '#about' },
]

function Navbar({ scale = 1 }) {
    const { scrollTo } = useSmoothScroll()
    const { count } = useCart()
    const [activeLink, setActiveLink] = useState('home')
    const [cartOpen, setCartOpen] = useState(false)

    const handleNavClick = (e, link) => {
        e.preventDefault()
        setActiveLink(link.label)
        scrollTo(link.target, link.target === 0 ? undefined : { offset: -80 })
    }

    return (
        <>
            {/* Desktop: the pixel-perfect canvas nav, scaled down to match the
                rest of the design. Below `md` this shrinks past readable/tappable
                sizes, so phones get a real, independently-sized bar instead. */}
            <div
                className="fixed left-0 top-0 z-30 hidden md:block"
                style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}
            >
                <div className="flex w-[1440px] items-center gap-[487px] bg-white/80 py-[10px] pl-[37px] pr-[67px] backdrop-blur-[10.5px]">
                    <motion.button
                        type="button"
                        aria-label="Scroll to top"
                        onClick={(e) => handleNavClick(e, { label: 'home', target: 0 })}
                        className="h-[49px] w-[63px] shrink-0 overflow-clip pointer-events-auto"
                        whileHover={{ scale: 1.08, rotate: -4 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    >
                        <img src={pandaLogo} alt="Panda Design" className="block h-full w-full" />
                    </motion.button>

                    <nav className="flex shrink-0 items-center gap-[35px] whitespace-nowrap font-heading text-[20px] font-bold uppercase leading-normal pointer-events-auto">
                        {links.map((link) => {
                            const isActive = activeLink === link.label
                            return (
                                <a
                                    key={link.label}
                                    href={typeof link.target === 'string' ? link.target : '#'}
                                    onClick={(e) => handleNavClick(e, link)}
                                    className={
                                        isActive
                                            ? 'relative text-black transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-black after:content-[""]'
                                            : 'relative text-black/30 transition-colors duration-300 hover:text-black after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 after:content-[""] hover:after:w-full'
                                    }
                                >
                                    {link.label}
                                </a>
                            )
                        })}
                    </nav>

                    <div className="relative flex shrink-0 items-center gap-[20px] pointer-events-auto">
                        <motion.button
                            type="button"
                            aria-label="Open cart"
                            onClick={() => setCartOpen(true)}
                            className="relative size-[26px] shrink-0 text-ink"
                            whileHover={{ scale: 1.12 }}
                            whileTap={{ scale: 0.92 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                        >
                            <IconCart />
                            {count > 0 && (
                                <span className="absolute -right-1.5 -top-1.5 flex size-[16px] items-center justify-center rounded-full bg-brand-red font-body text-[10px] font-semibold leading-none text-white">
                                    {count}
                                </span>
                            )}
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
                    onClick={(e) => handleNavClick(e, { label: 'home', target: 0 })}
                    className="flex h-11 w-11 shrink-0 items-center justify-center"
                    whileTap={{ scale: 0.92 }}
                >
                    <img src={pandaLogo} alt="Panda Design" className="h-8 w-auto" />
                </motion.button>

                <nav className="flex shrink-0 items-center gap-4 whitespace-nowrap font-heading text-[13px] font-bold uppercase leading-normal">
                    {links.map((link) => {
                        const isActive = activeLink === link.label
                        return (
                            <a
                                key={link.label}
                                href={typeof link.target === 'string' ? link.target : '#'}
                                onClick={(e) => handleNavClick(e, link)}
                                className={
                                    isActive
                                        ? 'relative flex h-11 items-center text-black after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:bg-black after:content-[""]'
                                        : 'relative flex h-11 items-center text-black/30 after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-0 after:bg-black after:content-[""]'
                                }
                            >
                                {link.label}
                            </a>
                        )
                    })}
                </nav>

                <motion.button
                    type="button"
                    aria-label="Open cart"
                    onClick={() => setCartOpen(true)}
                    className="relative flex h-11 w-11 shrink-0 items-center justify-center text-ink"
                    whileTap={{ scale: 0.92 }}
                >
                    <IconCart className="h-6 w-6" />
                    {count > 0 && (
                        <span className="absolute right-1 top-1 flex size-[16px] items-center justify-center rounded-full bg-brand-red font-body text-[10px] font-semibold leading-none text-white">
                            {count}
                        </span>
                    )}
                </motion.button>
            </div>

            <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        </>
    )
}

export default Navbar
