import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Reveal from './Reveal'
import { useSmoothScroll } from './SmoothScroll'
import { useHitSlop } from '../context/ScaleContext'
import collageRight from '../assets/landing/collage-image-21.png'
import collageLeft from '../assets/landing/collage-image-16.png'
import collageMask from '../assets/landing/collage-mask.svg'
import accentRecord from '../assets/landing/accent-record.png'
import accentClock from '../assets/landing/accent-clock.png'
import decorRecord from '../assets/landing/decor-record.png'
import decorHeadphones from '../assets/landing/decor-headphones.png'

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
                        animate={shouldReduceMotion ? undefined : { y: [0, -floatDistance, 0] }}
                        transition={shouldReduceMotion ? undefined : {
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

function Hero() {
    const { scrollTo } = useSmoothScroll()
    const ctaHitSlop = useHitSlop(14)
    const shouldReduceMotion = useReducedMotion()
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
            <Reveal
                as="p"
                className="absolute left-[37px] top-[189px] w-[627px] font-display text-[60px] font-bold uppercase leading-normal text-black"
                style={{ fontVariationSettings: '"opsz" 14, "wdth" 100' }}
            >
                where the aesthetic is born.
            </Reveal>

            {/* explore now CTA — the visible pill stays the original 248x56,
                but the button's actual hit area is inflated by `ctaHitSlop`
                (in pre-scale px, so it lands at a fixed real size once the
                canvas transform shrinks it) so it stays tappable on phones. */}
            <Reveal
                as="button"
                type="button"
                delay={0.15}
                onClick={() => scrollTo('#shop', { offset: -80 })}
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
                <span className="relative flex h-[56px] w-[248px] items-center rounded-[4px] border-2 border-solid border-black bg-white text-left transition-colors duration-300 group-hover:bg-black">
                    <p className="absolute left-[27px] top-[12px] whitespace-nowrap font-heading text-[26px] font-medium capitalize text-[#1c1c1c] transition-colors duration-300 group-hover:text-white">
                        explore now !
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
            <div className="absolute left-[17px] top-[146px]">
                <Reveal
                    as="div"
                    x={48}
                    y={0}
                    duration={0.9}
                    amount={0.15}
                    float
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
            </div>

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
                floatDistance={8}
                floatDuration={4}
                className="absolute left-[1241px] top-[1062px] h-[292px] w-[285px] overflow-hidden pointer-events-none"
            >
                <motion.img
                    alt=""
                    src={accentRecord}
                    className="absolute left-0 top-[-18.29%] h-[136.59%] w-full max-w-none"
                    animate={shouldReduceMotion ? undefined : { rotate: 360 }}
                    transition={shouldReduceMotion ? undefined : { duration: 12, repeat: Infinity, ease: 'linear' }}
                />
            </Reveal>
            <Reveal
                as="div"
                scale={0.85}
                y={0}
                delay={0.1}
                amount={0.5}
                float
                floatDistance={8}
                floatDuration={4.5}
                wobble={4}
                className="absolute left-[468px] top-[1241px] h-[177px] w-[231px]"
            >
                <img alt="" src={accentClock} className="absolute inset-0 size-full max-w-none object-cover" />
            </Reveal>

            {/* pull quote */}
            <Reveal
                as="p"
                className="absolute left-[calc(50%-612px)] top-[1355px] h-[97px] w-[1261px] whitespace-pre-wrap font-display text-[42px] font-extrabold uppercase leading-normal text-black"
                style={{ fontVariationSettings: '"opsz" 14, "wdth" 100' }}
            >{`"Timeless décor                     thoughtfully curated for spaces with character and lasting style."`}</Reveal>

            {/* small plus badge + label */}
            <PlusBadge
                left={37} top={1127} size={39.481} fontSize={34}
                glyphLeft={45.67} glyphTop={1148.36} glyphW={21.185} glyphH={24.074}
                rotated floatDelay={1.4}
            />
            <Reveal as="p" delay={0.1} className="absolute left-[95px] top-[1141px] whitespace-nowrap font-heading text-[26px] font-medium capitalize text-[#1c1c1c]">
                word from our store
            </Reveal>

            <Reveal as="div" y={0} x={-24} amount={0.4} float floatDistance={10} floatDuration={5} wobble={3} className="absolute left-[-109px] top-[1324px] h-[377px] w-[252px] overflow-hidden pointer-events-none">
                <img alt="" src={decorRecord} className="absolute left-[-29.28%] top-[-2.28%] h-[104.32%] w-[158.56%] max-w-none" />
            </Reveal>
            <Reveal as="div" y={0} scale={0.8} delay={0.15} amount={0.4} float floatDistance={6} floatDuration={4.2} wobble={5} className="absolute left-[75px] top-[1582px] h-[116px] w-[118px] overflow-hidden pointer-events-none">
                <img alt="" src={decorHeadphones} className="absolute left-[-11.9%] top-[-13.11%] h-[123.39%] w-[121.52%] max-w-none" />
            </Reveal>
        </>
    )
}

export default Hero
