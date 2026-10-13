import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import Reveal from './Reveal'
import SplitText from './SplitText'
import ScrubText from './ScrubText'
import { useHitSlop, useIsMobile } from '../context/ScaleContext'
import collageRight from '../assets/landing/collage-image-21.webp'
import collageLeft from '../assets/landing/collage-image-16.webp'
import collageMask from '../assets/landing/collage-mask.svg'
import accentRecord from '../assets/landing/accent-record.webp'
import accentClock from '../assets/landing/accent-clock.webp'
import decorRecord from '../assets/landing/decor-record.webp'
import decorHeadphones from '../assets/landing/decor-headphones.webp'
import { openWhatsApp } from '../lib/whatsapp'
import { useLang } from '../context/LangContext'

function PlusBadge({ left, top, size, fontSize, glyphLeft, glyphTop, glyphW, glyphH, rotated, scaled, floatDelay = 0 }) {
    const spin = [rotated && 'rotate-180', scaled && '-scale-y-100'].filter(Boolean).join(' ') || undefined

    const badgeRef = useRef(null)
    const shouldReduceMotion = useReducedMotion()
    const { scrollYProgress } = useScroll({ target: badgeRef, offset: ['start end', 'end start'] })
    const parallaxRotate = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [-25, 25])
    const floatDistance = Math.max(4, size * 0.12)

    return (
        <>
            <div
                className="absolute flex items-center justify-center"
                style={{ left, top, width: size, height: size }}
            >
                <div className={spin ? `flex-none ${spin}` : 'flex-none'}>
                    <motion.div
                        ref={badgeRef}
                        style={{ width: size, height: size, rotate: parallaxRotate }}
                        animate={{ y: [0, -floatDistance, 0] }}
                        transition={{
                            duration: 3.5,
                            delay: floatDelay,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    >
                        <motion.div
                            className="relative rounded-bl-[30px] rounded-br-[30px] rounded-tr-[30px] bg-[#d21720] backdrop-blur-[2px]"
                            style={{ width: size, height: size }}
                            initial={{ scale: 0, rotate: -30 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            viewport={{ once: true, amount: 0.6 }}
                            transition={{ type: 'spring', stiffness: 260, damping: 16 }}
                            whileHover={{ rotate: 12 }}
                        />
                    </motion.div>
                </div>
            </div>
            <div
                className="absolute flex -translate-y-1/2 items-center justify-center"
                style={{ left: glyphLeft, top: glyphTop, width: glyphW, height: glyphH }}
            >
                <div className={spin ? `flex-none ${spin}` : 'flex-none'}>
                    <div
                        className="relative flex flex-col justify-center font-['Inter'] font-normal not-italic leading-[0] text-white"
                        style={{ width: glyphW, height: glyphH, fontSize }}
                    >
                        <p className="leading-normal">+</p>
                    </div>
                </div>
            </div>
        </>
    )
}

function MobileHero() {
    const { t } = useLang()
    const { scrollY } = useScroll()
    const shouldReduceMotion = useReducedMotion()

    // Parallax logic for collage images
    const rightY = useTransform(scrollY, [0, 800], [0, shouldReduceMotion ? 0 : -60])
    const leftY = useTransform(scrollY, [0, 800], [0, shouldReduceMotion ? 0 : 40])

    // Photo frames, badge and record are sized in vw so the collage keeps the
    // same proportions on a 320px phone and a 430px one.
    const frame = 'absolute overflow-hidden rounded-[4px] border-[5px] border-solid border-white bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.15),0_6px_18px_rgba(0,0,0,0.12)]'

    return (
        <section className="relative flex w-full shrink-0 flex-col gap-8 overflow-hidden px-5 pb-14 pt-8">
            {/* Header section */}
            <div className="relative z-10 flex w-full flex-col items-start">
                <SplitText
                    as="h1"
                    text={t('hero.headline')}
                    amount={0.3}
                    className="w-full font-display text-[clamp(40px,12.6vw,56px)] font-bold uppercase leading-[1.04] text-black"
                    style={{ fontVariationSettings: '"opsz" 14, "wdth" 100' }}
                />
                <Reveal
                    as="button"
                    type="button"
                    delay={0.15}
                    onClick={() => openWhatsApp(t('wa.project'))}
                    className="group mt-6 flex items-center justify-center"
                    whileTap={{ scale: 0.96 }}
                >
                    <span className="flex h-[52px] items-center rounded-full border-2 border-solid border-black bg-white px-8 transition-colors duration-300 group-active:bg-black group-hover:bg-black">
                        <span className="whitespace-nowrap font-heading text-[18px] font-medium capitalize text-[#1c1c1c] transition-colors duration-300 group-active:text-white group-hover:text-white">
                            {t('hero.cta')}
                        </span>
                    </span>
                </Reveal>
            </div>

            {/* Collage section */}
            <div dir="ltr" className="relative mx-auto h-[min(108vw,470px)] w-full max-w-[430px]">
                <Reveal
                    as="div"
                    x={30}
                    float
                    alwaysFloat
                    floatDistance={8}
                    floatDuration={6}
                    className={`${frame} right-0 top-0 z-10 h-[min(76vw,330px)] w-[min(58vw,250px)]`}
                >
                    <motion.div style={{ y: rightY, height: '125%', width: '100%', position: 'absolute', top: 0, left: 0 }}>
                        <img src={collageRight} alt="" decoding="async" className="h-full w-full rounded-[2px] object-cover" />
                    </motion.div>
                </Reveal>
                <Reveal
                    as="div"
                    x={-30}
                    delay={0.1}
                    float
                    alwaysFloat
                    floatDistance={8}
                    floatDuration={6.5}
                    className={`${frame} left-0 top-[min(30vw,128px)] z-0 h-[min(80vw,350px)] w-[min(58vw,250px)]`}
                >
                    <motion.div style={{ y: leftY, height: '120%', width: '100%', position: 'absolute', top: '-10%', left: 0 }}>
                        <img src={collageLeft} alt="" decoding="async" className="h-full w-full rounded-[2px] object-cover" />
                    </motion.div>
                </Reveal>

                {/* spinning record, tucked into the corner like the desktop one */}
                <Reveal
                    as="div"
                    y={0}
                    scale={0.8}
                    delay={0.2}
                    float
                    alwaysFloat
                    floatDistance={6}
                    floatDuration={4}
                    className="pointer-events-none absolute bottom-0 right-1 z-20 h-[min(31vw,134px)] w-[min(30vw,130px)] overflow-hidden"
                >
                    <motion.img
                        alt=""
                        src={accentRecord}
                        className="absolute left-0 top-[-18.29%] h-[136.59%] w-full max-w-none"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                    />
                </Reveal>

                {/* floating red badge */}
                <motion.div
                    aria-hidden
                    className="absolute left-[44vw] top-[min(2vw,8px)] z-20 flex h-[min(12vw,52px)] w-[min(12vw,52px)] items-center justify-center rounded-bl-[16px] rounded-br-[16px] rounded-tr-[16px] bg-[#d21720] text-[min(8vw,34px)] font-semibold leading-none text-white max-md:left-[min(44vw,190px)]"
                    initial={{ scale: 0, rotate: -30 }}
                    whileInView={{ scale: 1, rotate: 12 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 260, damping: 16 }}
                >
                    <motion.span animate={{ y: [0, -4, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}>+</motion.span>
                </motion.div>
            </div>

            {/* Quote section */}
            <div className="relative mt-2 flex w-full flex-col items-center text-center">
                <ScrubText
                    text={`${t('hero.quoteA')} ${t('hero.quoteB')}`}
                    className="font-display text-[clamp(24px,7.4vw,32px)] font-extrabold uppercase leading-[1.2] text-black"
                    style={{ fontVariationSettings: '"opsz" 14, "wdth" 100' }}
                />
            </div>

            {/* Word from our store section */}
            <div className="relative flex w-full items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 rotate-[12deg] items-center justify-center rounded-bl-[15px] rounded-br-[15px] rounded-tr-[15px] bg-[#d21720] text-2xl font-semibold text-white">+</div>
                <Reveal as="h2" delay={0.1} className="font-heading text-[22px] font-medium capitalize text-[#1c1c1c]">
                    {t('hero.label')}
                </Reveal>
            </div>
        </section>
    )
}

function Hero() {
    const isMobile = useIsMobile()
    const { t, isAr } = useLang()
    const ctaHitSlop = useHitSlop(14)
    const shouldReduceMotion = useReducedMotion()

    // Collage drifts against the pointer for a bit of depth (desktop only).
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const collageX = useSpring(useTransform(mouseX, [-0.5, 0.5], [22, -22]), { stiffness: 70, damping: 18 })
    const collageY = useSpring(useTransform(mouseY, [-0.5, 0.5], [14, -14]), { stiffness: 70, damping: 18 })

    useEffect(() => {
        if (isMobile || shouldReduceMotion) return undefined
        const onMove = (e) => {
            mouseX.set(e.clientX / window.innerWidth - 0.5)
            mouseY.set(e.clientY / window.innerHeight - 0.5)
        }
        window.addEventListener('mousemove', onMove)
        return () => window.removeEventListener('mousemove', onMove)
    }, [isMobile, shouldReduceMotion, mouseX, mouseY])

    if (isMobile) return <MobileHero />

    const maskStyle = (position) => ({
        maskImage: `url(${collageMask})`,
        WebkitMaskImage: `url(${collageMask})`,
        maskSize: '1406px 851px',
        WebkitMaskSize: '1406px 851px',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: position,
        WebkitMaskPosition: position,
    })

    return (
        <>
            {/* headline */}
            <SplitText
                as="p"
                text={t('hero.headline')}
                amount={0.3}
                className="absolute left-[37px] top-[189px] w-[627px] font-display text-[60px] font-bold uppercase leading-normal text-black"
                style={{ fontVariationSettings: '"opsz" 14, "wdth" 100' }}
            />

            {/* explore now CTA — the visible pill stays the original 248x56,
                but the button's actual hit area is inflated by `ctaHitSlop`
                (in pre-scale px, so it lands at a fixed real size once the
                canvas transform shrinks it) so it stays tappable on phones. */}
            <Reveal
                as="button"
                type="button"
                delay={0.15}
                onClick={() => openWhatsApp(t('wa.project'))}
                className="group absolute flex items-center justify-center"
                style={{
                    left: 37 - ctaHitSlop,
                    top: 353 - ctaHitSlop,
                    width: 248 + ctaHitSlop * 2,
                    height: 56 + ctaHitSlop * 2,
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
                <span className="relative flex h-[56px] w-[248px] items-center rounded-full border-2 border-solid border-black bg-white text-left transition-colors duration-300 group-hover:bg-black">
                    <p className="absolute left-[27px] top-[12px] whitespace-nowrap font-heading text-[26px] font-medium capitalize text-[#1c1c1c] transition-colors duration-300 group-hover:text-white">
                        {t('hero.cta')}
                    </p>
                </span>
            </Reveal>

            {/* rotated plus badge near CTA */}
            <PlusBadge
                left={794} top={361} size={62} fontSize={51}
                glyphLeft={807.61} glyphTop={389.46} glyphW={33.268} glyphH={37.805}
                rotated scaled floatDelay={0}
            />

            {/* collage collage (masked diagonal photo panels) */}
            <motion.div className="absolute left-[17px] top-[146px]" style={{ x: collageX, y: collageY }}>
                <Reveal
                    as="div"
                    x={48}
                    y={0}
                    duration={0.9}
                    amount={0.15}
                    float
                    alwaysFloat
                    floatDistance={12}
                    floatDuration={6}
                    className="absolute left-[763px] top-[157px] h-[790px] w-[631px] rounded-[4px] border-8 border-solid border-white shadow-[0px_0px_0px_1px_rgba(0,0,0,0.2),0px_0px_2px_0px_rgba(0,0,0,0.08),0px_2px_6px_0px_rgba(0,0,0,0.1)]"
                    style={maskStyle('-746px -11px')}
                >
                    <div aria-hidden className="absolute inset-0 rounded-[4px]">
                        <div className="absolute inset-0 rounded-[4px] bg-white" />
                        <div className="absolute inset-0 overflow-hidden rounded-[4px]">
                            <img alt="" src={collageRight} className="absolute left-0 top-0 size-full max-w-none object-cover" />
                        </div>
                    </div>
                </Reveal>
                <Reveal
                    as="div"
                    x={-48}
                    y={0}
                    delay={0.1}
                    duration={0.9}
                    amount={0.15}
                    float
                    alwaysFloat
                    floatDistance={12}
                    floatDuration={6.5}
                    className="absolute left-[17px] top-[281px] h-[966px] w-[725px] rounded-[4px] border-8 border-solid border-white shadow-[0px_0px_0px_1px_rgba(0,0,0,0.2),0px_0px_2px_0px_rgba(0,0,0,0.08),0px_2px_6px_0px_rgba(0,0,0,0.1)]"
                    style={maskStyle('0px -135px')}
                >
                    <div aria-hidden className="absolute inset-0 rounded-[4px]">
                        <div className="absolute inset-0 rounded-[4px] bg-white" />
                        <div className="absolute inset-0 overflow-hidden rounded-[4px]">
                            <img alt="" src={collageLeft} className="absolute left-0 top-0 size-full max-w-none object-cover" />
                        </div>
                    </div>
                </Reveal>
            </motion.div>

            {/* plus badge floating on collage */}
            <PlusBadge
                left={1369} top={825} size={62} fontSize={51}
                glyphLeft={1384.12} glyphTop={853.46} glyphW={33.268} glyphH={37.805}
                floatDelay={0.7}
            />

            {/* decorative cutouts flanking the quote */}
            <Reveal
                as="div"
                scale={0.85}
                y={0}
                amount={0.5}
                float
                alwaysFloat
                floatDistance={8}
                floatDuration={4}
                className="absolute left-[1241px] top-[1062px] h-[292px] w-[285px] overflow-hidden pointer-events-none"
            >
                <motion.img
                    alt=""
                    src={accentRecord}
                    className="absolute left-0 top-[-18.29%] h-[136.59%] w-full max-w-none"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                />
            </Reveal>
            <Reveal
                as="div"
                scale={0.85}
                y={0}
                delay={0.1}
                amount={0.5}
                float
                alwaysFloat
                floatDistance={8}
                floatDuration={4.5}
                wobble={4}
                className="absolute left-[468px] top-[1241px] h-[177px] w-[231px]"
            >
                <img alt="" src={accentClock} className="absolute inset-0 size-full max-w-none object-cover" />
            </Reveal>

            {/* pull quote */}
            {isAr ? (
                <ScrubText
                    dir="rtl"
                    text={`${t('hero.quoteA')} ${t('hero.quoteB')}`}
                    className="absolute left-[170px] top-[1440px] w-[1100px] text-center font-display text-[40px] font-extrabold leading-[1.5] text-black"
                />
            ) : (
                <ScrubText
                    text={`${t('hero.quoteA')}                     ${t('hero.quoteB')}`}
                    className="absolute left-[calc(50%-612px)] top-[1355px] h-[97px] w-[1261px] whitespace-pre-wrap font-display text-[42px] font-extrabold uppercase leading-normal text-black"
                    style={{ fontVariationSettings: '"opsz" 14, "wdth" 100' }}
                />
            )}

            {/* small plus badge + label */}
            <PlusBadge
                left={37} top={1127} size={39.481} fontSize={34}
                glyphLeft={45.67} glyphTop={1148.36} glyphW={21.185} glyphH={24.074}
                rotated floatDelay={1.4}
            />
            <Reveal as="p" delay={0.1} className="absolute left-[95px] top-[1141px] whitespace-nowrap font-heading text-[26px] font-medium capitalize text-[#1c1c1c]">
                {t('hero.label')}
            </Reveal>

            <Reveal as="div" y={0} x={-24} amount={0.4} float alwaysFloat floatDistance={10} floatDuration={5} wobble={3} className="absolute left-[-109px] top-[1324px] h-[377px] w-[252px] overflow-hidden pointer-events-none">
                <img alt="" src={decorRecord} className="absolute left-[-29.28%] top-[-2.28%] h-[104.32%] w-[158.56%] max-w-none" />
            </Reveal>
            <Reveal as="div" y={0} scale={0.8} delay={0.15} amount={0.4} float alwaysFloat floatDistance={6} floatDuration={4.2} wobble={5} className="absolute left-[75px] top-[1582px] h-[116px] w-[118px] overflow-hidden pointer-events-none">
                <img alt="" src={decorHeadphones} className="absolute left-[-11.9%] top-[-13.11%] h-[123.39%] w-[121.52%] max-w-none" />
            </Reveal>
        </>
    )
}

export default Hero
