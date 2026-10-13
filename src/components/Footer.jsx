import { motion } from 'framer-motion'
import Reveal from './Reveal'
import { useSmoothScroll } from './SmoothScroll'
import { useIsMobile } from '../context/ScaleContext'
import footerLogo from '../assets/landing/footer-side-logo.webp'
import madeByMark from '../assets/landing/made-by-mark.svg'
import iconArrowUp from '../assets/landing/icon-arrow-up.svg'
import { openWhatsApp } from '../lib/whatsapp'
import { useLang } from '../context/LangContext'

const fv = { fontVariationSettings: '"opsz" 14, "wdth" 100' }

function MobileFooter() {
    const { scrollTo } = useSmoothScroll()
    const { t } = useLang()

    return (
        <section className="flex flex-col w-full bg-[#1c1c1c] text-white px-5 py-12 gap-8 shrink-0">
            {/* Logo */}
            <Reveal as="div" className="w-[80px]">
                <img alt="Panda Design" src={footerLogo} className="w-full object-contain" />
            </Reveal>

            {/* Links */}
            <Reveal as="div" className="flex flex-col gap-4 font-display text-[22px] font-medium text-[#adb3ab] mt-4">
                <button type="button" onClick={() => scrollTo(0)} className="text-left py-1 transition-colors hover:text-white" style={fv}>{t('f.home')}</button>
                <div className="h-[1px] w-full bg-white/10" />
                <button type="button" onClick={() => scrollTo('#services', { offset: -80 })} className="text-left py-1 transition-colors hover:text-white" style={fv}>{t('f.services')}</button>
                <div className="h-[1px] w-full bg-white/10" />
                <button type="button" onClick={() => scrollTo('#about', { offset: -80 })} className="text-left py-1 transition-colors hover:text-white" style={fv}>{t('f.about')}</button>
                <div className="h-[1px] w-full bg-white/10" />
                <button type="button" onClick={() => openWhatsApp()} className="text-left py-1 transition-colors hover:text-white" style={fv}>{t('f.contacts')}</button>
            </Reveal>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-y-8 gap-x-4 mt-6">
                <Reveal as="div" className="flex flex-col gap-2">
                    <p className="font-display text-[14px] font-medium text-[#3c403c] uppercase" style={fv}>{t('f.days')}</p>
                    <p className="font-display text-[20px] font-normal text-[#adb3ab]" style={fv}>{t('f.hours')}</p>
                </Reveal>

                <Reveal as="div" className="flex flex-col gap-2">
                    <p className="font-display text-[14px] font-medium text-[#3c403c] uppercase" style={fv}>{t('f.location')}</p>
                    <p className="font-display text-[16px] font-normal text-[#adb3ab]" style={fv}>{t('f.place')}</p>
                </Reveal>

                <Reveal as="div" className="flex flex-col gap-2">
                    <p className="font-display text-[14px] font-medium text-[#3c403c] uppercase" style={fv}>{t('f.email')}</p>
                    <a href="mailto:cttpub@gmail.com" className="font-display text-[16px] font-normal text-[#adb3ab] hover:text-white" style={fv}>cttpub@gmail.com</a>
                </Reveal>
            </div>

            {/* Social Header */}
            <div className="flex flex-col gap-4 mt-4">
                <Reveal as="a" href="tel:+213792559277" className="font-display text-[26px] font-normal text-[#eceeec] hover:text-white/70" style={fv}>
                    (+213-792-559-277)
                </Reveal>
            </div>

            {/* Social Links */}
            <div className="flex flex-col gap-6 mt-4">
                <Reveal as="div" className="flex flex-col gap-1">
                    <p className="font-display text-[14px] font-medium text-[#3c403c]" style={fv}>{t('f.instagram')}</p>
                    <a href="https://www.instagram.com/pandadesign_dz" target="_blank" rel="noopener noreferrer" className="font-display text-[16px] font-normal text-[#adb3ab] hover:text-white break-all" style={fv}>
                        www.instagram.com/pandadesign_dz
                    </a>
                </Reveal>
                <Reveal as="div" className="flex flex-col gap-1">
                    <p className="font-display text-[14px] font-medium text-[#3c403c]" style={fv}>{t('f.facebook')}</p>
                    <a href="https://www.facebook.com/pandadesigndz" target="_blank" rel="noopener noreferrer" className="font-display text-[16px] font-normal text-[#adb3ab] hover:text-white break-all" style={fv}>
                        www.facebook.com/pandadesigndz
                    </a>
                </Reveal>
            </div>

            {/* Made By Badge */}
            <Reveal as="div" className="flex items-center justify-between rounded-[8px] bg-[#ce1a21] px-5 py-4 mt-6">
                <div className="font-display text-[18px] font-bold leading-tight tracking-tight text-[#d1d5db]" style={fv}>
                    <span className="block text-[14px] font-normal opacity-80" style={fv}>{t('f.madeby')}</span>
                    Blux tech
                </div>
                <div className="h-[60px] w-[70px] shrink-0">
                    <img alt="" src={madeByMark} className="block size-full object-contain" />
                </div>
            </Reveal>

            {/* Bottom Bar */}
            <div className="flex items-center justify-between mt-6 font-display text-[14px] font-medium text-[#3c403c]" style={fv}>
                <Reveal as="p">{t('f.copy')}</Reveal>

                <motion.button
                    type="button"
                    aria-label="Back to top"
                    onClick={() => scrollTo(0, { duration: 1.4 })}
                    className="flex h-[40px] w-[40px] items-center justify-center rounded-full border border-solid border-[#3c403c]"
                    whileHover={{ scale: 1.1, borderColor: '#adb3ab' }}
                    whileTap={{ scale: 0.9 }}
                >
                    <img alt="" src={iconArrowUp} className="w-[14px] h-[16px]" />
                </motion.button>
            </div>
        </section>
    )
}

function Footer({ offsetY = 0 }) {
    const { scrollTo } = useSmoothScroll()
    const { t } = useLang()
    const isMobile = useIsMobile()

    if (isMobile) return <MobileFooter />

    return (
        <div className="absolute left-0 h-[724px] w-[1440px]" style={{ top: 6882 + offsetY }}>
            <div className="absolute inset-0 bg-[#1c1c1c]" />

            <Reveal as="div" amount={0.4} className="absolute left-[24px] top-[160px] flex w-[464px] flex-wrap content-start items-start gap-[4px_24px] whitespace-nowrap pr-[48px] font-display text-[20px] leading-[1.2]">
                <div className="flex shrink-0 items-center gap-[25px]">
                    <button type="button" onClick={() => scrollTo(0)} className="shrink-0 font-medium tracking-[-0.4px] text-[#adb3ab] transition-colors hover:text-white" style={fv}>{t('f.home')}</button>
                    <p className="shrink-0 font-extralight text-[#3c403c]" style={fv}>/</p>
                </div>
                <div className="flex shrink-0 items-center gap-[25px]">
                    <button type="button" onClick={() => scrollTo('#services', { offset: -80 })} className="shrink-0 font-medium tracking-[-0.4px] text-[#adb3ab] transition-colors hover:text-white" style={fv}>{t('f.services')}</button>
                    <p className="shrink-0 font-extralight text-[#3c403c]" style={fv}>/</p>
                </div>
                <div className="flex shrink-0 items-center gap-[25px]">
                    <button type="button" onClick={() => scrollTo('#about', { offset: -80 })} className="shrink-0 font-medium tracking-[-0.4px] text-[#adb3ab] transition-colors hover:text-white" style={fv}>{t('f.about')}</button>
                    <p className="shrink-0 font-extralight text-[#3c403c]" style={fv}>/</p>
                </div>
                <button type="button" onClick={() => openWhatsApp()} className="shrink-0 font-medium tracking-[-0.4px] text-[#adb3ab] transition-colors hover:text-white" style={fv}>{t('f.contacts')}</button>
            </Reveal>

            <Reveal
                fadeOnly
                as="a"
                href="tel:+213792559277"
                amount={0.4}
                className="absolute inset-[13.81%_29.17%_82.6%_57.71%] whitespace-nowrap font-display text-[22px] font-normal tracking-[-0.44px] leading-[1.2] text-[#eceeec] transition-colors hover:text-white/70"
                style={fv}
            >
                +213-792-559-277
            </Reveal>
            <Reveal fadeOnly as="p" amount={0.4} className="absolute inset-[13.26%_42.5%_82.04%_56.94%] whitespace-nowrap font-display text-[28px] font-extralight leading-[1.2] text-[#3c403c]" style={fv}>(</Reveal>
            <Reveal fadeOnly as="p" amount={0.4} className="absolute inset-[13.26%_28.19%_82.04%_71.32%] whitespace-nowrap font-display text-[28px] font-extralight leading-[1.2] text-[#3c403c]" style={fv}>)</Reveal>

            <Reveal fadeOnly as="div" delay={0.05} amount={0.4} className="absolute bottom-[51.93%] left-[calc(62.5%+4px)] top-[40.06%] flex -translate-x-1/2 flex-col items-start gap-[8px] whitespace-nowrap">
                <p className="shrink-0 font-display text-[12px] font-medium leading-[1.3] text-[#3c403c]" style={fv}>{t('f.days')}</p>
                <p className="shrink-0 font-display text-[28px] font-normal leading-[1.2] text-[#adb3ab]" style={fv}>{t('f.hours')}</p>
            </Reveal>

            <Reveal as="div" delay={0.1} amount={0.4} className="absolute inset-[24.86%_32.71%_69.06%_58.06%] flex flex-col items-start gap-[8px] whitespace-nowrap">
                <p className="shrink-0 font-display text-[12px] font-medium leading-[1.3] text-[#3c403c]" style={fv}>{t('f.location')}</p>
                <p className="shrink-0 font-display text-[14px] font-normal leading-[1.4] text-[#adb3ab]" style={fv}>{t('f.place')}</p>
            </Reveal>

            <Reveal fadeOnly as="div" delay={0.15} amount={0.4} className="absolute bottom-[69.06%] left-[calc(87.5%-6.5px)] top-[24.86%] flex -translate-x-1/2 flex-col items-start gap-[8px] whitespace-nowrap">
                <p className="shrink-0 font-display text-[12px] font-medium leading-[1.3] text-[#3c403c]" style={fv}>{t('f.email')}</p>
                <a href="mailto:cttpub@gmail.com" className="shrink-0 font-display text-[14px] font-normal leading-[1.4] text-[#adb3ab] transition-colors hover:text-white" style={fv}>cttpub@gmail.com</a>
            </Reveal>

            <Reveal as="div" delay={0.2} amount={0.4} className="absolute left-[836px] top-[392px] flex flex-col items-start gap-[8px] whitespace-nowrap">
                <p className="shrink-0 font-display text-[12px] font-medium leading-[1.3] text-[#3c403c]" style={fv}>{t('f.instagram')}</p>
                <a
                    href="https://www.instagram.com/pandadesign_dz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 font-display text-[14px] font-normal leading-[1.4] text-[#adb3ab] transition-colors hover:text-white"
                    style={fv}
                >
                    www.instagram.com/pandadesign_dz
                </a>
            </Reveal>

            <Reveal fadeOnly as="div" delay={0.25} amount={0.4} className="absolute left-[1253.5px] top-[392px] flex -translate-x-1/2 flex-col items-start gap-[8px] whitespace-nowrap">
                <p className="shrink-0 font-display text-[12px] font-medium leading-[1.3] text-[#3c403c]" style={fv}>{t('f.facebook')}</p>
                <a
                    href="https://www.facebook.com/pandadesigndz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 font-display text-[14px] font-normal leading-[1.4] text-[#adb3ab] transition-colors hover:text-white"
                    style={fv}
                >
                    www.facebook.com/pandadesigndz
                </a>
            </Reveal>

            <Reveal as="p" amount={0.6} className="absolute inset-[70.17%_33.89%_27.62%_58.06%] whitespace-nowrap font-display text-[12px] font-medium leading-[1.3] text-[#3c403c]" style={fv}>{t('f.copy')}</Reveal>
            <Reveal
                as="button"
                type="button"
                onClick={() => openWhatsApp()}
                amount={0.6}
                className="absolute inset-[8.84%_37.71%_88.95%_58.06%] whitespace-nowrap font-display text-[12px] font-medium leading-[1.3] text-[#3c403c] transition-colors hover:text-white"
                style={fv}
            >
                {t('f.contactUs')}
            </Reveal>

            <motion.button
                type="button"
                aria-label="Back to top"
                onClick={() => scrollTo(0, { duration: 1.4 })}
                className="absolute inset-[65.75%_95.28%_28.18%_1.67%] rounded-[48px] border border-solid border-[#3c403c]"
                whileHover={{ scale: 1.15, borderColor: '#adb3ab' }}
                whileTap={{ scale: 0.9 }}
            >
                <div className="absolute left-1/2 top-1/2 h-[14px] w-[12px] -translate-x-1/2 -translate-y-1/2">
                    <motion.img
                        alt=""
                        src={iconArrowUp}
                        className="block size-full max-w-none"
                        whileHover={{ y: -3 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                    />
                </div>
            </motion.button>

            <Reveal as="div" y={0} scale={0.97} amount={0.3} className="absolute left-[24px] top-[540px] flex items-start rounded-[16px] bg-[#ce1a21]">
                <div className="flex h-[160px] w-[1212px] items-center px-[64px] py-[10px]">
                    <div className="font-display text-[23px] font-bold leading-[0] tracking-[-0.23px] text-[#d1d5db]" style={fv}>
                        <p className="mb-0 whitespace-pre leading-[1.3]">{t('f.madeby')} </p>
                        <p className="whitespace-pre leading-[1.3]">Blux tech</p>
                    </div>
                </div>
                <div className="h-[160px] w-[180px] shrink-0">
                    <img alt="" src={madeByMark} className="absolute block size-full max-w-none" />
                </div>
            </Reveal>

            <Reveal as="div" y={0} scale={0.9} amount={0.6} className="absolute left-[24px] top-[42px] h-[51px] w-[66px]">
                <img alt="Panda Design" src={footerLogo} className="absolute inset-0 size-full max-w-none object-cover" />
            </Reveal>
        </div>
    )
}

export default Footer
