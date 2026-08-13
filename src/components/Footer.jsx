import { motion } from 'framer-motion'
import Reveal from './Reveal'
import { useSmoothScroll } from './SmoothScroll'
import footerLogo from '../assets/landing/footer-side-logo.png'
import madeByMark from '../assets/landing/made-by-mark.svg'
import iconArrowUp from '../assets/landing/icon-arrow-up.svg'

const fv = { fontVariationSettings: '"opsz" 14, "wdth" 100' }

function Footer() {
    const { scrollTo } = useSmoothScroll()

    return (
        <div className="absolute left-0 top-[6882px] h-[724px] w-[1440px]">
            <div className="absolute inset-0 bg-[#1c1c1c]" />

            <Reveal as="div" amount={0.4} className="absolute left-[24px] top-[160px] flex w-[464px] flex-wrap content-start items-start gap-[4px_24px] whitespace-nowrap pr-[48px] font-display text-[20px] leading-[1.2]">
                <div className="flex shrink-0 items-center gap-[25px]">
                    <button type="button" onClick={() => scrollTo(0)} className="shrink-0 font-medium tracking-[-0.4px] text-[#adb3ab] transition-colors hover:text-white" style={fv}>Home</button>
                    <p className="shrink-0 font-extralight text-[#3c403c]" style={fv}>/</p>
                </div>
                <div className="flex shrink-0 items-center gap-[25px]">
                    <p className="shrink-0 font-medium tracking-[-0.4px] text-[#adb3ab]" style={fv}>Special Offers</p>
                    <p className="shrink-0 font-extralight text-[#3c403c]" style={fv}>/</p>
                </div>
                <div className="flex shrink-0 items-center gap-[25px]">
                    <p className="shrink-0 font-medium tracking-[-0.4px] text-[#adb3ab]" style={fv}>Payment &amp; Delivery</p>
                    <p className="shrink-0 font-extralight text-[#3c403c]" style={fv}>/</p>
                </div>
                <button type="button" onClick={() => scrollTo('#contact', { offset: -40 })} className="shrink-0 font-medium tracking-[-0.4px] text-[#adb3ab] transition-colors hover:text-white" style={fv}>Contacts</button>
            </Reveal>

            <Reveal fadeOnly as="p" amount={0.4} className="absolute inset-[13.81%_29.17%_82.6%_57.71%] whitespace-nowrap font-display text-[22px] font-normal tracking-[-0.44px] leading-[1.2] text-[#eceeec]" style={fv}>
                +213-000-000-000
            </Reveal>
            <Reveal fadeOnly as="p" amount={0.4} className="absolute inset-[13.26%_42.5%_82.04%_56.94%] whitespace-nowrap font-display text-[28px] font-extralight leading-[1.2] text-[#3c403c]" style={fv}>(</Reveal>
            <Reveal fadeOnly as="p" amount={0.4} className="absolute inset-[13.26%_28.19%_82.04%_71.32%] whitespace-nowrap font-display text-[28px] font-extralight leading-[1.2] text-[#3c403c]" style={fv}>)</Reveal>

            <Reveal fadeOnly as="div" delay={0.05} amount={0.4} className="absolute bottom-[51.93%] left-[calc(62.5%+4px)] top-[40.06%] flex -translate-x-1/2 flex-col items-start gap-[8px] whitespace-nowrap">
                <p className="shrink-0 font-display text-[12px] font-medium leading-[1.3] text-[#3c403c]" style={fv}>Mo—Fr</p>
                <p className="shrink-0 font-display text-[28px] font-normal leading-[1.2] text-[#adb3ab]" style={fv}>9am—6pm</p>
            </Reveal>

            <Reveal as="div" delay={0.1} amount={0.4} className="absolute inset-[24.86%_32.71%_69.06%_58.06%] flex flex-col items-start gap-[8px] whitespace-nowrap">
                <p className="shrink-0 font-display text-[12px] font-medium leading-[1.3] text-[#3c403c]" style={fv}>Location</p>
                <p className="shrink-0 font-display text-[14px] font-normal leading-[1.4] text-[#adb3ab]" style={fv}>somewhere in djelfa</p>
            </Reveal>

            <Reveal fadeOnly as="div" delay={0.15} amount={0.4} className="absolute bottom-[69.06%] left-[calc(87.5%-6.5px)] top-[24.86%] flex -translate-x-1/2 flex-col items-start gap-[8px] whitespace-nowrap">
                <p className="shrink-0 font-display text-[12px] font-medium leading-[1.3] text-[#3c403c]" style={fv}>Email</p>
                <p className="shrink-0 font-display text-[14px] font-normal leading-[1.4] text-[#adb3ab]" style={fv}>hello@logoipsum.com</p>
            </Reveal>

            <Reveal as="p" amount={0.6} className="absolute inset-[70.17%_33.89%_27.62%_58.06%] whitespace-nowrap font-display text-[12px] font-medium leading-[1.3] text-[#3c403c]" style={fv}>© 2026 — Copyright</Reveal>
            <Reveal
                as="button"
                type="button"
                onClick={() => scrollTo('#contact', { offset: -40 })}
                amount={0.6}
                className="absolute inset-[8.84%_37.71%_88.95%_58.06%] whitespace-nowrap font-display text-[12px] font-medium leading-[1.3] text-[#3c403c] transition-colors hover:text-white"
                style={fv}
            >
                Contact Us
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
                        <p className="mb-0 whitespace-pre leading-[1.3]">made by </p>
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
