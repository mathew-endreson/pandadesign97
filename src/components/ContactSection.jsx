import { useState } from 'react'
import { useIsMobile } from '../context/ScaleContext'
import { motion } from 'framer-motion'
import Reveal from './Reveal'
import contactImage from '../assets/landing/contact-image.webp'
import dividerLine from '../assets/landing/divider-line.svg'
import { openWhatsApp } from '../lib/whatsapp'
import { useLang } from '../context/LangContext'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function Divider({ top }) {
    return (
        <div className="absolute left-[653px] h-0 w-[704px]" style={{ top }}>
            <motion.div
                className="absolute inset-[-2px_0_0_0]"
                style={{ transformOrigin: 'left' }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.9 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <img alt="" src={dividerLine} className="block size-full max-w-none" />
            </motion.div>
        </div>
    )
}

function MobileContact({ form, status, handleChange, handleSubmit }) {
    const { t } = useLang()
    return (
        <section className="flex flex-col w-full px-5 py-16 gap-8 overflow-hidden bg-white shrink-0">
            <div id="contact" className="h-0 w-0 relative -top-20" aria-hidden="true" />

            <Reveal as="h2" className="font-display text-[44px] font-extrabold uppercase leading-none text-black text-center">
                {t('c.title')}
            </Reveal>

            <Reveal as="div" className="w-full h-[360px] rounded-[3px] mt-2">
                <img alt="Curated corner decor" src={contactImage} className="w-full h-full object-cover rounded-[3px]" />
            </Reveal>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8 w-full mt-6">
                <div className="flex flex-col gap-2 relative">
                    <Reveal as="label" delay={0.05} htmlFor="mobile-contact-name" className="font-heading text-[22px] font-semibold capitalize text-[#1c1c1c]">
                        {t('c.name')}
                    </Reveal>
                    <input
                        id="mobile-contact-name"
                        type="text"
                        value={form.name}
                        onChange={handleChange('name')}
                        className="h-[40px] w-full bg-transparent font-body text-[16px] outline-none border-b border-black/20 focus:border-black transition-colors rounded-none"
                    />
                </div>

                <div className="flex flex-col gap-2 relative">
                    <Reveal as="label" delay={0.1} htmlFor="mobile-contact-email" className="font-heading text-[22px] font-semibold capitalize text-[#1c1c1c]">
                        {t('c.email')}
                    </Reveal>
                    <input
                        id="mobile-contact-email"
                        type="email"
                        value={form.email}
                        onChange={handleChange('email')}
                        className="h-[40px] w-full bg-transparent font-body text-[16px] outline-none border-b border-black/20 focus:border-black transition-colors rounded-none"
                    />
                </div>

                <div className="flex flex-col gap-2 relative">
                    <Reveal as="label" delay={0.15} htmlFor="mobile-contact-message" className="font-heading text-[22px] font-semibold capitalize text-[#1c1c1c]">
                        {t('c.message')}
                    </Reveal>
                    <textarea
                        id="mobile-contact-message"
                        rows={3}
                        value={form.message}
                        onChange={handleChange('message')}
                        className="w-full bg-transparent font-body text-[16px] outline-none border-b border-black/20 focus:border-black transition-colors resize-none py-2 rounded-none"
                    />
                </div>

                {status === 'error' && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-body text-[14px] text-brand-red">
                        {t('c.error')}
                    </motion.p>
                )}
                {status === 'sent' && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-body text-[14px] text-[#1c1c1c]">
                        {t('c.sent')}
                    </motion.p>
                )}

                <Reveal as="button" type="submit" delay={0.2} className="mt-4 flex h-[50px] w-[140px] self-end items-center justify-center rounded-full border-2 border-solid border-black bg-white transition-colors active:bg-black active:text-white" whileTap={{ scale: 0.95 }}>
                    <p className="font-heading text-[20px] font-medium capitalize text-[#1c1c1c] active:text-white">
                        {t('c.submit')}
                    </p>
                </Reveal>
            </form>
        </section>
    )
}

function ContactSection({ offsetY = 0 }) {
    const { t } = useLang()
    const [form, setForm] = useState({ name: '', email: '', message: '' })
    const [status, setStatus] = useState('idle')

    const handleChange = (field) => (e) => {
        setForm((current) => ({ ...current, [field]: e.target.value }))
        if (status === 'error') setStatus('idle')
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const name = form.name.trim()
        const email = form.email.trim()
        const message = form.message.trim()

        if (!name || !email || !message || !EMAIL_PATTERN.test(email)) {
            setStatus('error')
            return
        }

        const text = `${t('wa.contact', { name, email })}\n\n${message}`
        openWhatsApp(text)

        setStatus('sent')
        setForm({ name: '', email: '', message: '' })
    }

    const isMobile = useIsMobile()
    if (isMobile) {
        return <MobileContact form={form} status={status} handleChange={handleChange} handleSubmit={handleSubmit} />
    }

    return (
        // Shifted down by `offsetY` so it clears the shop grid above it — that
        // grid's height varies with column count (2 cols on phone vs 4 on
        // desktop) and active filter, which the fixed-pixel canvas this whole
        // page is built on can't account for on its own. `translateY` on this
        // wrapper moves every absolutely-positioned child below at once,
        // since it becomes their containing block without touching each
        // hardcoded `top-[...]` value individually.
        <div style={{ transform: `translateY(${offsetY}px)` }}>
            <div id="contact" className="absolute left-0 top-[5880px]" aria-hidden="true" />

            <Reveal as="p" className="absolute left-[calc(50%-67px)] top-[5972px] h-[52px] w-[352px] font-display text-[43px] font-extrabold uppercase leading-normal text-black" style={{ fontVariationSettings: '"opsz" 14, "wdth" 100' }}>
                {t('c.title')}
            </Reveal>

            <Reveal as="div" x={-32} y={0} amount={0.2} className="absolute left-[37px] top-[5958px] h-[625px] w-[562px] rounded-[3px]">
                <img alt="Curated corner decor" src={contactImage} className="absolute inset-0 size-full max-w-none rounded-[3px] object-cover" />
            </Reveal>

            <form onSubmit={handleSubmit} noValidate>
                <Reveal as="label" delay={0.05} htmlFor="contact-name" className="absolute left-[653px] top-[6145px] h-[32px] w-[275px] font-heading text-[26px] font-semibold capitalize leading-normal text-[#1c1c1c]">
                    {t('c.name')}
                </Reveal>
                <input
                    id="contact-name"
                    type="text"
                    value={form.name}
                    onChange={handleChange('name')}
                    className="absolute left-[653px] top-[6177px] h-[50px] w-[704px] bg-transparent font-body text-[18px] outline-none"
                />
                <Divider top={6235} />

                <Reveal as="label" delay={0.1} htmlFor="contact-email" className="absolute left-[653px] top-[6319px] h-[32px] w-[275px] font-heading text-[26px] font-semibold capitalize leading-normal text-[#1c1c1c]">
                    {t('c.email')}
                </Reveal>
                <input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={handleChange('email')}
                    className="absolute left-[653px] top-[6351px] h-[50px] w-[704px] bg-transparent font-body text-[18px] outline-none"
                />
                <Divider top={6409} />

                <Reveal as="label" delay={0.15} htmlFor="contact-message" className="absolute left-[653px] top-[6493px] h-[32px] w-[275px] font-heading text-[26px] font-semibold capitalize leading-normal text-[#1c1c1c]">
                    {t('c.message')}
                </Reveal>
                <textarea
                    id="contact-message"
                    rows={2}
                    value={form.message}
                    onChange={handleChange('message')}
                    className="absolute left-[653px] top-[6525px] h-[50px] w-[704px] resize-none bg-transparent font-body text-[18px] outline-none"
                />
                <Divider top={6583} />

                {status === 'error' && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute left-[653px] top-[6650px] w-[500px] font-body text-[15px] text-brand-red"
                    >
                        {t('c.error')}
                    </motion.p>
                )}
                {status === 'sent' && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute left-[653px] top-[6650px] w-[500px] font-body text-[15px] text-[#1c1c1c]"
                    >
                        {t('c.sent')}
                    </motion.p>
                )}

                <Reveal
                    as="button"
                    type="submit"
                    delay={0.2}
                    className="group absolute left-[1201px] top-[6637px] flex h-[56px] w-[156px] items-center justify-center rounded-full border-2 border-solid border-black bg-white transition-colors duration-300 hover:bg-black"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <p className="whitespace-nowrap font-heading text-[26px] font-medium capitalize text-[#1c1c1c] transition-colors duration-300 group-hover:text-white">
                        {t('c.submit')}
                    </p>
                </Reveal>
            </form>
        </div>
    )
}

export default ContactSection
