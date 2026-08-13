import { useState } from 'react'
import { motion } from 'framer-motion'
import Reveal from './Reveal'
import contactImage from '../assets/landing/contact-image.png'
import dividerLine from '../assets/landing/divider-line.svg'

const CONTACT_EMAIL = 'hello@logoipsum.com'
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

function ContactSection() {
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

        const subject = `New message from ${name}`
        const body = `${message}\n\n— ${name} (${email})`
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

        setStatus('sent')
        setForm({ name: '', email: '', message: '' })
    }

    return (
        <>
            <div id="contact" className="absolute left-0 top-[5880px]" aria-hidden="true" />

            <Reveal as="p" className="absolute left-[calc(50%-67px)] top-[5972px] h-[52px] w-[352px] font-display text-[43px] font-extrabold uppercase leading-normal text-black" style={{ fontVariationSettings: '"opsz" 14, "wdth" 100' }}>
                contact us
            </Reveal>

            <Reveal as="div" x={-32} y={0} amount={0.2} className="absolute left-[37px] top-[5958px] h-[625px] w-[562px] rounded-[3px]">
                <img alt="Curated corner decor" src={contactImage} className="absolute inset-0 size-full max-w-none rounded-[3px] object-cover" />
            </Reveal>

            <form onSubmit={handleSubmit} noValidate>
                <Reveal as="label" delay={0.05} htmlFor="contact-name" className="absolute left-[653px] top-[6145px] h-[32px] w-[275px] font-heading text-[26px] font-semibold capitalize leading-normal text-[#1c1c1c]">
                    your name
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
                    e-mail
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
                    your message
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
                        Please fill in your name, a valid e-mail, and a message.
                    </motion.p>
                )}
                {status === 'sent' && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute left-[653px] top-[6650px] w-[500px] font-body text-[15px] text-[#1c1c1c]"
                    >
                        Opening your e-mail app to send this along…
                    </motion.p>
                )}

                <Reveal
                    as="button"
                    type="submit"
                    delay={0.2}
                    className="group absolute left-[1201px] top-[6637px] flex h-[56px] w-[156px] items-center justify-center rounded-[4px] border-2 border-solid border-black bg-white transition-colors duration-300 hover:bg-black"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <p className="whitespace-nowrap font-heading text-[26px] font-medium capitalize text-[#1c1c1c] transition-colors duration-300 group-hover:text-white">
                        submit
                    </p>
                </Reveal>
            </form>
        </>
    )
}

export default ContactSection
