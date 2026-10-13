import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Reveal from './Reveal'
import { useIsMobile } from '../context/ScaleContext'
import visionStore from '../assets/landing/vision-store.webp'
import visionLivingRoom from '../assets/landing/vision-living-room.webp'
import visionRoom from '../assets/landing/vision-room.webp'
import visionSpecialPlace from '../assets/landing/vision-special-place.webp'
import visionWorkspace from '../assets/landing/vision-workspace.webp'
import { useLang } from '../context/LangContext'

function ParallaxImage({ src, alt = "", yOffset = 40, className = "" }) {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
    const shouldReduceMotion = useReducedMotion()
    // Move from negative offset (up) to positive offset (down) as we scroll down
    const y = useTransform(scrollYProgress, [0, 1], [-yOffset, yOffset])

    if (shouldReduceMotion) return <img loading="lazy" decoding="async" alt={alt} src={src} className={`w-full h-full object-cover ${className}`} />

    return (
        <motion.div
            ref={ref}
            className="w-full h-full relative overflow-hidden"
            initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
        >
            <motion.div style={{ y, height: `calc(100% + ${yOffset * 2}px)`, top: -yOffset }} className="absolute left-0 w-full">
                <motion.img
                    loading="lazy"
                    decoding="async"
                    alt={alt}
                    src={src}
                    className={`w-full h-full object-cover ${className}`}
                    initial={{ scale: 1.35 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ scale: 1.06 }}
                />
            </motion.div>
        </motion.div>
    )
}

function MobileVision() {
    const { t } = useLang()
    return (
        <section className="flex flex-col w-full px-5 py-16 gap-16 overflow-hidden bg-white shrink-0">
            <div id="about" className="h-0 w-0 relative -top-20" aria-hidden="true" />

            <Reveal as="div" className="flex flex-col mb-2">
                <p className="font-display text-[44px] font-extrabold uppercase leading-none text-black">{t('v.see')}</p>
                <p className="font-display text-[44px] font-extrabold uppercase leading-none text-black">{t('v.vision')}</p>
            </Reveal>

            {/* Store */}
            <div className="flex flex-col gap-4">
                <Reveal as="div" className="w-full h-[320px] rounded-[5px] overflow-hidden">
                    <ParallaxImage src={visionStore} />
                </Reveal>
                <Reveal as="p" className="font-heading text-[24px] font-semibold capitalize text-[#1c1c1c]">{t('v.store')}</Reveal>
                <Reveal fadeOnly as="p" className="capitalize leading-relaxed text-[17px] font-normal text-[#1c1c1c]">
                    {t('v.storeText')}
                </Reveal>
            </div>

            {/* Living Room */}
            <div className="flex flex-col gap-4 mt-8">
                <Reveal as="div" className="w-full h-[280px] rounded-[5px] overflow-hidden">
                    <ParallaxImage src={visionLivingRoom} className="object-[center_20%]" />
                </Reveal>
                <Reveal as="p" className="font-heading text-[24px] font-semibold capitalize text-[#1c1c1c]">{t('v.living')}</Reveal>
            </div>

            {/* Room */}
            <div className="flex flex-col gap-4 mt-8">
                <Reveal as="div" className="w-full h-[340px] rounded-[5px] self-end overflow-hidden">
                    <ParallaxImage src={visionRoom} yOffset={50} />
                </Reveal>
                <Reveal as="p" className="font-heading text-[24px] font-semibold capitalize text-[#1c1c1c] text-right">{t('v.room')}</Reveal>
                <Reveal fadeOnly as="p" className="capitalize leading-relaxed text-[17px] font-normal text-[#1c1c1c] text-right">
                    {t('v.roomText')}
                </Reveal>
            </div>

            {/* Special Place */}
            <div className="flex flex-col gap-4 mt-8">
                <Reveal as="div" className="w-[90%] h-[280px] rounded-[5px] overflow-hidden">
                    <ParallaxImage src={visionSpecialPlace} />
                </Reveal>
                <Reveal as="p" className="font-heading text-[24px] font-semibold capitalize text-[#1c1c1c]">{t('v.special')}</Reveal>
                <Reveal fadeOnly as="p" className="capitalize leading-relaxed text-[17px] font-normal text-[#1c1c1c]">
                    {t('v.specialText')}
                </Reveal>
            </div>

            {/* Workspace */}
            <div className="flex flex-col gap-4 mt-8">
                <Reveal as="div" className="w-[90%] h-[280px] rounded-[5px] self-end overflow-hidden">
                    <ParallaxImage src={visionWorkspace} yOffset={35} />
                </Reveal>
                <Reveal as="p" className="font-heading text-[24px] font-semibold capitalize text-[#1c1c1c] text-right">{t('v.work')}</Reveal>
                <Reveal fadeOnly as="p" className="capitalize leading-relaxed text-[17px] font-normal text-[#1c1c1c] text-right">
                    {t('v.workText')}
                </Reveal>
            </div>
        </section>
    )
}

function VisionSection() {
    const isMobile = useIsMobile()
    const { t } = useLang()
    if (isMobile) return <MobileVision />

    return (
        <>
            <div id="about" className="absolute left-0 top-[1870px]" aria-hidden="true" />

            <Reveal
                as="div"
                className="absolute left-[calc(50%-683px)] top-[1966px] h-[97px] w-[304px] whitespace-pre-wrap font-display text-[46px] font-extrabold uppercase leading-none text-black"
                style={{ fontVariationSettings: '"opsz" 14, "wdth" 100' }}
            >
                <p className="mb-0 leading-normal">{t('v.see')}</p>
                <p className="leading-normal">{t('v.vision')}</p>
            </Reveal>

            <Reveal as="div" delay={0} amount={0.4} className="absolute left-[469px] top-[1955px] h-[324px] w-[242px] rounded-[5px]">
                <ParallaxImage src={visionStore} yOffset={30} className="absolute inset-0 size-full max-w-none rounded-[5px] object-cover" />
            </Reveal>
            <Reveal as="div" delay={0.08} amount={0.4} className="absolute left-[1070px] top-[1954px] h-[435px] w-[331px] overflow-hidden rounded-[5px]">
                <ParallaxImage src={visionLivingRoom} yOffset={40} className="absolute left-[0] top-0 h-[100%] w-[100%] max-w-none object-cover" />
            </Reveal>
            <Reveal as="div" delay={0.16} amount={0.4} className="absolute left-[38px] top-[2321px] h-[439px] w-[329px] rounded-[5px]">
                <ParallaxImage src={visionRoom} yOffset={45} className="absolute inset-0 size-full max-w-none rounded-[5px] object-cover" />
            </Reveal>
            <Reveal as="div" delay={0.08} amount={0.4} className="absolute left-[825px] top-[2321px] h-[346px] w-[231px] rounded-[5px]">
                <ParallaxImage src={visionSpecialPlace} yOffset={35} className="absolute inset-0 size-full max-w-none rounded-[5px] object-cover" />
            </Reveal>
            <Reveal as="div" delay={0.16} amount={0.4} className="absolute left-[1121px] top-[2687px] h-[349px] w-[280px] rounded-[5px]">
                <ParallaxImage src={visionWorkspace} yOffset={50} className="absolute inset-0 size-full max-w-none rounded-[5px] object-cover" />
            </Reveal>

            <Reveal as="p" delay={0.1} className="absolute left-[38px] top-[2779px] h-[32px] w-[303px] font-heading text-[26px] font-semibold capitalize text-[#1c1c1c]">
                {t('v.work')}
            </Reveal>
            <Reveal as="p" delay={0.1} className="absolute left-[469px] top-[2289px] h-[32px] w-[226px] font-heading text-[26px] font-semibold capitalize text-[#1c1c1c]">
                {t('v.room')}
            </Reveal>
            <Reveal as="p" delay={0.18} className="absolute left-[825px] top-[2671px] h-[96px] w-[226px] font-heading text-[26px] font-semibold capitalize text-[#1c1c1c]">
                {t('v.special')}
            </Reveal>
            <Reveal as="p" delay={0.18} className="absolute left-[1070px] top-[2403px] h-[32px] w-[226px] font-heading text-[26px] font-semibold capitalize text-[#1c1c1c]">
                {t('v.store')}
            </Reveal>
            <Reveal as="p" delay={0.24} className="absolute left-[1123px] top-[3051px] h-[96px] w-[226px] font-heading text-[26px] font-semibold capitalize text-[#1c1c1c]">
                {t('v.living')}
            </Reveal>

            <Reveal fadeOnly as="p" delay={0.18} className="absolute left-[381px] top-[2721px] h-[68px] w-[241px] -translate-y-1/2 capitalize leading-normal text-[20px] font-normal text-[#1c1c1c]" style={{ fontVariationSettings: '"wdth" 100' }}>
                {t('v.workText')}
            </Reveal>
            <Reveal fadeOnly as="p" delay={0.26} className="absolute left-[825px] top-[2818px] h-[46px] w-[241px] -translate-y-1/2 capitalize leading-normal text-[20px] font-normal text-[#1c1c1c]" style={{ fontVariationSettings: '"wdth" 100' }}>
                {t('v.specialText')}
            </Reveal>
            <Reveal fadeOnly as="p" delay={0.18} className="absolute left-[38px] top-[2178.5px] h-[91px] w-[241px] -translate-y-1/2 capitalize leading-normal text-[20px] font-normal text-[#1c1c1c]" style={{ fontVariationSettings: '"wdth" 100' }}>
                {t('v.storeText')}
            </Reveal>
            <Reveal fadeOnly as="p" delay={0.1} className="absolute left-[720px] top-[2023.5px] h-[115px] w-[241px] -translate-y-1/2 capitalize leading-normal text-[20px] font-normal text-[#1c1c1c]" style={{ fontVariationSettings: '"wdth" 100' }}>
                {t('v.roomText')}
            </Reveal>
        </>
    )
}

export default VisionSection
