import { useEffect, useRef, useState } from 'react'
import {
    motion,
    useAnimationFrame,
    useMotionValue,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
    useVelocity,
} from 'framer-motion'
import SplitText from './SplitText'
import Reveal from './Reveal'
import { TshirtArt, PlaqueArt, PackagingArt, VitrineArt, DecorArt } from './ServiceArt'
import { openWhatsApp } from '../lib/whatsapp'
import { useLang } from '../context/LangContext'

// Visual config only — all wording lives in src/i18n/translations.js (en + ar).
const SERVICES = [
    {
        id: 'tshirt',
        Art: TshirtArt,
        theme: { card: 'bg-[#1c1c1c] text-white', muted: 'text-white/65', tag: 'border-white/30', panel: '#2c2c2c', dots: 'rgba(255,255,255,0.16)', cta: 'bg-white text-black' },
    },
    {
        id: 'plaque',
        Art: PlaqueArt,
        theme: { card: 'bg-[#d21720] text-white', muted: 'text-white/85', tag: 'border-white/40', panel: '#a8121a', dots: 'rgba(255,255,255,0.2)', cta: 'bg-white text-black' },
    },
    {
        id: 'packaging',
        Art: PackagingArt,
        theme: { card: 'bg-[#f3f1ed] text-[#1c1c1c]', muted: 'text-black/60', tag: 'border-black/25', panel: '#e3dfd6', dots: 'rgba(0,0,0,0.12)', cta: 'bg-black text-white' },
    },
    {
        id: 'vitrine',
        Art: VitrineArt,
        theme: { card: 'bg-[#1c1c1c] text-white', muted: 'text-white/65', tag: 'border-white/30', panel: '#2c2c2c', dots: 'rgba(255,255,255,0.16)', cta: 'bg-white text-black' },
    },
    {
        id: 'decor',
        Art: DecorArt,
        theme: { card: 'bg-[#d21720] text-white', muted: 'text-white/85', tag: 'border-white/40', panel: '#a8121a', dots: 'rgba(255,255,255,0.2)', cta: 'bg-white text-black' },
    },
]

const STEPS = [{ n: '01' }, { n: '02' }, { n: '03' }, { n: '04' }]
const EASE = [0.16, 1, 0.3, 1]

function useNarrow(query = '(max-width: 767px)') {
    const [narrow, setNarrow] = useState(() => (typeof window !== 'undefined' ? window.matchMedia(query).matches : false))
    useEffect(() => {
        const mq = window.matchMedia(query)
        const onChange = () => setNarrow(mq.matches)
        onChange()
        mq.addEventListener('change', onChange)
        return () => mq.removeEventListener('change', onChange)
    }, [query])
    return narrow
}

const wrap = (min, max, v) => {
    const range = max - min
    return ((((v - min) % range) + range) % range) + min
}

function PlusMark({ className = '' }) {
    return (
        <motion.span
            aria-hidden
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-bl-[15px] rounded-br-[15px] rounded-tr-[15px] bg-brand-red text-2xl font-semibold text-white ${className}`}
            initial={{ scale: 0, rotate: -40 }}
            whileInView={{ scale: 1, rotate: 12 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 260, damping: 14 }}
            whileHover={{ rotate: 192 }}
        >
            +
        </motion.span>
    )
}

// Endless ticker whose speed — and direction — is pushed around by scroll
// velocity, with a skew that leans into the scroll.
function VelocityMarquee({ base = -2.2, className = '' }) {
    const { t } = useLang()
    const words = t('s.marquee')
    const reduce = useReducedMotion()
    const baseX = useMotionValue(0)
    const { scrollY } = useScroll()
    const velocity = useVelocity(scrollY)
    const smooth = useSpring(velocity, { damping: 50, stiffness: 400 })
    const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false })
    const skewX = useTransform(smooth, [-2000, 0, 2000], [reduce ? 0 : 14, 0, reduce ? 0 : -14])
    const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`)
    const direction = useRef(1)

    useAnimationFrame((_, delta) => {
        if (reduce) return
        const f = factor.get()
        if (f < 0) direction.current = -1
        else if (f > 0) direction.current = 1
        let move = direction.current * base * (delta / 1000)
        move += direction.current * move * f
        baseX.set(baseX.get() + move)
    })

    const strip = (
        <div className="flex shrink-0 items-center">
            {words.map((word) => (
                <span key={word} className="flex items-center">
                    <span className="px-6 md:px-10">{word}</span>
                    <span className="inline-block text-[0.7em] leading-none text-white/70">+</span>
                </span>
            ))}
        </div>
    )

    return (
        <motion.div dir="ltr" style={{ skewX }} className="overflow-hidden">
            <motion.div style={{ x }} className={`flex w-max whitespace-nowrap font-display font-extrabold uppercase leading-none ${className}`}>
                {strip}
                {strip}
                {strip}
                {strip}
            </motion.div>
        </motion.div>
    )
}

function TiltPanel({ theme, children }) {
    const reduce = useReducedMotion()
    const ref = useRef(null)
    const px = useMotionValue(0)
    const py = useMotionValue(0)
    const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-12, 12]), { stiffness: 180, damping: 18 })
    const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [10, -10]), { stiffness: 180, damping: 18 })
    const artX = useSpring(useTransform(px, [-0.5, 0.5], [-14, 14]), { stiffness: 140, damping: 20 })
    const artY = useSpring(useTransform(py, [-0.5, 0.5], [-10, 10]), { stiffness: 140, damping: 20 })

    const onMove = (e) => {
        if (reduce || !ref.current) return
        const rect = ref.current.getBoundingClientRect()
        px.set((e.clientX - rect.left) / rect.width - 0.5)
        py.set((e.clientY - rect.top) / rect.height - 0.5)
    }
    const onLeave = () => {
        px.set(0)
        py.set(0)
    }

    return (
        <div className="relative h-[210px] w-full md:h-full md:w-[46%]" style={{ perspective: 1000 }}>
            <motion.div
                ref={ref}
                onPointerMove={onMove}
                onPointerLeave={onLeave}
                className="absolute inset-0 overflow-hidden rounded-[14px]"
                style={{
                    rotateX,
                    rotateY,
                    backgroundColor: theme.panel,
                    backgroundImage: `radial-gradient(${theme.dots} 1.5px, transparent 1.5px)`,
                    backgroundSize: '22px 22px',
                }}
            >
                <motion.div className="absolute inset-0 flex items-center justify-center p-3 md:p-6" style={{ x: artX, y: artY }}>
                    {children}
                </motion.div>
            </motion.div>
        </div>
    )
}

function ServiceCard({ service, index, total, progress, narrow }) {
    const { t, isAr } = useLang()
    const reduce = useReducedMotion()
    const last = index === total - 1
    const targetScale = 1 - (total - 1 - index) * 0.045
    const scale = useTransform(progress, [index / total, 1], [1, reduce ? 1 : targetScale])
    const top = (narrow ? 64 : 92) + index * (narrow ? 12 : 24)
    const { Art, theme } = service

    return (
        <div className={`sticky top-0 flex items-start justify-center ${last ? 'pb-16' : 'h-[100svh]'}`}>
            <motion.article
                style={{ scale, top, transformOrigin: 'top center' }}
                className={`relative flex w-full max-w-[1364px] flex-col gap-4 overflow-hidden rounded-[20px] p-4 shadow-[0_-12px_40px_rgba(0,0,0,0.12)] md:h-[min(70svh,520px)] md:flex-row md:gap-8 md:p-6 ${theme.card}`}
            >
                <div className="flex min-h-0 flex-1 flex-col justify-between gap-3 md:gap-0 md:py-2 md:ps-4">
                    <div className="flex items-start justify-between gap-4">
                        <motion.span
                            className="font-display text-[44px] font-extrabold leading-none md:text-[72px]"
                            style={{ color: 'transparent', WebkitTextStroke: '2px currentColor' }}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.8, ease: EASE }}
                        >
                            {String(index + 1).padStart(2, '0')}
                        </motion.span>
                        <span className={`mt-2 rounded-full border px-3 py-1 font-heading text-[12px] font-semibold uppercase tracking-wider md:text-[13px] ${theme.tag}`}>
                            {t('s.badge')}
                        </span>
                    </div>

                    <div className="flex flex-col gap-2 md:gap-3">
                        <SplitText
                            as="h3"
                            text={t(`svc.${service.id}.title`)}
                            amount={0.6}
                            className="font-display text-[40px] font-extrabold uppercase leading-[0.95] md:text-[68px]"
                            style={{ fontVariationSettings: '"opsz" 14, "wdth" 100' }}
                        />
                        <SplitText
                            as="p"
                            by="word"
                            text={t(`svc.${service.id}.sub`)}
                            delay={0.25}
                            amount={0.6}
                            dir={isAr ? 'ltr' : 'rtl'}
                            lang={isAr ? 'en' : 'ar'}
                            className={
                                isAr
                                    ? 'self-start font-display text-[18px] font-bold uppercase leading-tight opacity-80 md:text-[22px]'
                                    : 'self-start font-arabic text-[22px] font-extrabold leading-tight md:text-[30px]'
                            }
                        />
                        <Reveal as="p" y={16} delay={0.3} amount={0.6} className={`max-w-[520px] font-body text-[15px] leading-relaxed md:text-[17px] ${theme.muted}`}>
                            {t(`svc.${service.id}.blurb`)}
                        </Reveal>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <ul className="flex flex-wrap gap-2">
                            {t(`svc.${service.id}.tags`).map((tag, i) => (
                                <motion.li
                                    key={tag}
                                    className={`rounded-full border px-3 py-1 font-heading text-[12px] capitalize md:text-[14px] ${theme.tag}`}
                                    initial={{ opacity: 0, y: 14 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.8 }}
                                    transition={{ duration: 0.6, delay: 0.35 + i * 0.08, ease: EASE }}
                                    whileHover={{ y: -3, rotate: -2 }}
                                >
                                    {tag}
                                </motion.li>
                            ))}
                        </ul>
                        <motion.button
                            type="button"
                            data-cursor="quote"
                            onClick={() => openWhatsApp(t('wa.quote', { service: t(`svc.${service.id}.title`) }))}
                            className={`group flex h-11 items-center gap-2 rounded-full ps-5 pe-2 font-heading text-[14px] font-semibold capitalize md:text-[15px] ${theme.cta}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.96 }}
                        >
                            {t('s.quote')}
                            <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-brand-red text-white">
                                <span className="transition-transform duration-300 ease-out group-hover:translate-x-[140%] rtl:group-hover:-translate-x-[140%]">{isAr ? '←' : '→'}</span>
                                <span className="absolute -translate-x-[140%] transition-transform duration-300 ease-out group-hover:translate-x-0 rtl:translate-x-[140%] rtl:group-hover:translate-x-0">{isAr ? '←' : '→'}</span>
                            </span>
                        </motion.button>
                    </div>
                </div>

                <TiltPanel theme={theme}>
                    <Art />
                </TiltPanel>
            </motion.article>
        </div>
    )
}

function ProcessStep({ step, index, progress }) {
    const { t } = useLang()
    const threshold = index / (STEPS.length - 1)
    const bg = useTransform(progress, [Math.max(0, threshold - 0.08), threshold + 0.001], ['#ffffff', '#d21720'])
    const fg = useTransform(progress, [Math.max(0, threshold - 0.08), threshold + 0.001], ['#1c1c1c', '#ffffff'])

    return (
        <li className="relative flex gap-5 md:flex-col md:gap-6">
            <motion.span
                className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-solid border-black font-display text-[18px] font-extrabold"
                style={{ backgroundColor: bg, color: fg }}
            >
                {step.n}
            </motion.span>
            <div dir="auto" className="flex flex-col gap-1">
                <SplitText as="h3" dir="auto" text={t(`step.${index + 1}.title`)} amount={0.8} className="font-display text-[28px] font-extrabold uppercase leading-none md:text-[34px]" />
                <Reveal as="p" y={12} delay={0.15} amount={0.8} className="max-w-[260px] font-body text-[15px] leading-relaxed text-black/60">
                    {t(`step.${index + 1}.text`)}
                </Reveal>
            </div>
        </li>
    )
}

function Process() {
    const { t } = useLang()
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.7'] })
    const line = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })

    return (
        <div ref={ref} className="px-4 pb-10 pt-24 md:px-[37px] md:pt-36">
            <div className="mb-12 flex items-center gap-4 md:mb-16">
                <PlusMark />
                <Reveal as="h3" className="font-heading text-[22px] font-medium capitalize text-[#1c1c1c] md:text-[26px]">{t('s.how')}</Reveal>
            </div>
            <div dir="ltr" className="relative">
                <div className="absolute bottom-7 left-7 top-7 w-px -translate-x-1/2 bg-black/15 md:hidden">
                    <motion.div className="h-full w-full origin-top bg-brand-red" style={{ scaleY: line }} />
                </div>
                <div className="absolute left-7 right-[calc(25%-28px)] top-7 hidden h-px bg-black/15 md:block">
                    <motion.div className="h-full w-full origin-left bg-brand-red" style={{ scaleX: line }} />
                </div>
                <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
                    {STEPS.map((step, i) => (
                        <ProcessStep key={step.n} step={step} index={i} progress={scrollYProgress} />
                    ))}
                </ol>
            </div>
        </div>
    )
}

function MagneticButton({ children, onClick }) {
    const ref = useRef(null)
    const mx = useMotionValue(0)
    const my = useMotionValue(0)
    const x = useSpring(mx, { stiffness: 220, damping: 14 })
    const y = useSpring(my, { stiffness: 220, damping: 14 })

    const onMove = (e) => {
        const rect = ref.current.getBoundingClientRect()
        mx.set((e.clientX - (rect.left + rect.width / 2)) * 0.35)
        my.set((e.clientY - (rect.top + rect.height / 2)) * 0.5)
    }
    const onLeave = () => {
        mx.set(0)
        my.set(0)
    }

    return (
        <motion.button
            ref={ref}
            type="button"
            onClick={onClick}
            onPointerMove={onMove}
            onPointerLeave={onLeave}
            style={{ x, y }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex h-[64px] items-center overflow-hidden rounded-full border-2 border-solid border-black bg-white px-10 md:h-[72px]"
        >
            <span className="absolute inset-0 origin-bottom scale-y-0 rounded-full bg-black transition-transform duration-500 ease-out group-hover:scale-y-100" />
            <span className="relative whitespace-nowrap font-heading text-[22px] font-medium capitalize text-[#1c1c1c] transition-colors duration-300 group-hover:text-white md:text-[26px]">
                {children}
            </span>
        </motion.button>
    )
}

function ServicesSection() {
    const { t } = useLang()
    const stackRef = useRef(null)
    const narrow = useNarrow()
    const { scrollYProgress } = useScroll({ target: stackRef, offset: ['start start', 'end end'] })

    return (
        <section id="services" className="relative w-full bg-white pt-24 md:pt-32">
            {/* heading */}
            <div className="px-4 md:px-[37px]">
                <div className="mb-6 flex items-center gap-4 md:mb-10">
                    <PlusMark />
                    <Reveal as="h2" className="font-heading text-[22px] font-medium capitalize text-[#1c1c1c] md:text-[26px]">{t('s.what')}</Reveal>
                </div>
                <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                    <div className="font-display text-[clamp(56px,11.5vw,176px)] font-extrabold uppercase leading-[0.9] text-black" style={{ fontVariationSettings: '"opsz" 14, "wdth" 100' }}>
                        <SplitText as="div" text={t('s.h1')} amount={0.5} />
                        <SplitText as="div" text={t('s.h2')} delay={0.3} amount={0.5} className="text-brand-red" />
                    </div>
                    <Reveal as="p" delay={0.4} className="max-w-[360px] font-body text-[17px] leading-relaxed text-black/65 md:pb-4 md:text-[19px]">
                        {t('s.intro')}
                    </Reveal>
                </div>
            </div>

            {/* scroll-reactive ticker bands */}
            <div className="relative my-16 overflow-hidden py-10 md:my-24 md:py-16">
                <div className="-rotate-2 bg-[#1c1c1c] py-3 text-white md:py-5">
                    <VelocityMarquee base={-2.4} className="text-[40px] md:text-[72px]" />
                </div>
                <div className="-mt-3 rotate-[1.5deg] bg-brand-red py-3 text-white md:-mt-5 md:py-5">
                    <VelocityMarquee base={2.4} className="text-[40px] md:text-[72px]" />
                </div>
            </div>

            {/* stacked service cards */}
            <div ref={stackRef} className="relative px-3 md:px-6">
                {SERVICES.map((service, i) => (
                    <ServiceCard key={service.id} service={service} index={i} total={SERVICES.length} progress={scrollYProgress} narrow={narrow} />
                ))}
            </div>

            <Process />

            {/* call to action */}
            <div className="flex flex-col items-center gap-8 px-4 pb-24 pt-16 text-center md:pb-36 md:pt-24">
                <SplitText
                    as="h3"
                    text={t('s.cta')}
                    amount={0.6}
                    className="font-display text-[clamp(44px,8.5vw,128px)] font-extrabold uppercase leading-[0.95] text-black"
                    style={{ fontVariationSettings: '"opsz" 14, "wdth" 100' }}
                />
                <MagneticButton onClick={() => openWhatsApp(t('wa.talk'))}>{t('nav.talk')}</MagneticButton>
            </div>
        </section>
    )
}

export default ServicesSection
