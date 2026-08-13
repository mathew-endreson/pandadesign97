import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import noestDeskData from '../data/noestDesks'
import pandaLogo from '../assets/landing/panda-logo.svg'

const SHIPPING_METHODS = [
    { id: 'home', label: 'Home delivery', description: 'Delivered to your door by the courier', price: 600 },
    { id: 'stopdesk', label: 'Stop desk pickup', description: 'Pick up yourself at the nearest delivery office', price: 400 },
]

const inputClass =
    'w-full border-b border-black/20 bg-transparent py-2 font-body text-[15px] text-ink outline-none transition-colors focus:border-black'
const labelClass = 'font-heading text-[13px] font-semibold uppercase tracking-wide text-ink/50'

function Field({ label, error, children }) {
    return (
        <label className="flex flex-col gap-1.5">
            <span className={labelClass}>{label}</span>
            {children}
            {error && <span className="font-body text-[13px] text-brand-red">{error}</span>}
        </label>
    )
}

function CheckoutPage() {
    const { items, subtotal, clearCart } = useCart()
    const [shippingMethod, setShippingMethod] = useState('home')
    const [form, setForm] = useState({ name: '', phone: '', wilaya: '', commune: '', address: '' })
    const [errors, setErrors] = useState({})
    const [order, setOrder] = useState(null)

    const shippingCost = SHIPPING_METHODS.find((m) => m.id === shippingMethod)?.price ?? 0
    const total = subtotal + shippingCost
    const desksForWilaya = noestDeskData.find((w) => w.wilaya === form.wilaya)?.desks ?? []

    const handleChange = (field) => (e) => {
        setForm((current) => ({ ...current, [field]: e.target.value }))
        setErrors((current) => ({ ...current, [field]: undefined }))
    }

    const handleWilayaChange = (e) => {
        const wilaya = e.target.value
        const desks = noestDeskData.find((w) => w.wilaya === wilaya)?.desks ?? []
        setForm((current) => ({ ...current, wilaya, commune: desks.length === 1 ? desks[0] : '' }))
        setErrors((current) => ({ ...current, wilaya: undefined, commune: undefined }))
    }

    const validate = () => {
        const next = {}
        if (!form.name.trim()) next.name = 'Enter your full name.'
        if (form.phone.replace(/\D/g, '').length < 9) next.phone = 'Enter a valid phone number.'
        if (!form.wilaya) next.wilaya = 'Select your wilaya.'
        if (!form.commune.trim()) next.commune = 'Select your commune.'
        if (shippingMethod === 'home' && !form.address.trim()) next.address = 'Enter your delivery address.'
        setErrors(next)
        return Object.keys(next).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!validate()) return
        setOrder({
            number: Math.floor(100000 + Math.random() * 900000),
            name: form.name.trim(),
            total,
        })
        clearCart()
    }

    if (order) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 py-16 text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                    className="flex size-16 items-center justify-center rounded-full bg-brand-red text-white"
                >
                    <svg viewBox="0 0 24 24" fill="none" className="size-8" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 12.5L9.5 18L20 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </motion.div>
                <h1 className="mt-6 font-display text-[32px] font-extrabold uppercase text-ink">order confirmed</h1>
                <p className="mt-2 max-w-[420px] font-body text-[16px] text-ink/60">
                    Thanks {order.name.split(' ')[0]}! Your order <span className="font-semibold text-ink">#{order.number}</span> for{' '}
                    <span className="font-semibold text-ink">{order.total.toLocaleString()} DA</span> is on its way to being prepared.
                    We&apos;ll call you shortly to confirm delivery details.
                </p>
                <p className="mt-3 font-body text-[13px] text-ink/40">
                    This is a demo checkout — no payment was processed and no order was placed.
                </p>
                <Link
                    to="/"
                    className="mt-8 rounded-[4px] border-2 border-black px-8 py-3 font-heading text-[16px] font-medium capitalize text-ink transition-colors duration-300 hover:bg-black hover:text-white"
                >
                    back to store
                </Link>
            </div>
        )
    }

    if (items.length === 0) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 py-16 text-center">
                <h1 className="font-display text-[28px] font-extrabold uppercase text-ink">your cart is empty</h1>
                <p className="mt-2 font-body text-[16px] text-ink/60">Add something you love before checking out.</p>
                <Link
                    to="/"
                    className="mt-8 rounded-[4px] border-2 border-black px-8 py-3 font-heading text-[16px] font-medium capitalize text-ink transition-colors duration-300 hover:bg-black hover:text-white"
                >
                    back to store
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white">
            <header className="sticky top-0 z-10 flex items-center justify-between border-b border-black/10 bg-white/90 px-4 py-3 backdrop-blur-sm sm:px-8">
                <Link to="/" className="flex h-11 items-center gap-2">
                    <img src={pandaLogo} alt="Panda Design" className="h-8 w-auto" />
                </Link>
                <Link to="/" className="font-heading text-[13px] font-semibold uppercase tracking-wide text-ink/60 transition-colors hover:text-ink">
                    ← back to store
                </Link>
            </header>

            <div className="mx-auto grid max-w-6xl gap-10 px-4 py-8 sm:px-8 sm:py-12 lg:grid-cols-[1fr_400px] lg:items-start">
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-10 lg:order-1">
                    <div>
                        <h1 className="font-display text-[32px] font-extrabold uppercase text-ink sm:text-[40px]">checkout</h1>
                        <p className="mt-1 font-body text-[15px] text-ink/50">cash on delivery — pay when your order arrives.</p>
                    </div>

                    <section className="flex flex-col gap-5">
                        <h2 className="font-heading text-[18px] font-semibold capitalize text-ink">contact information</h2>
                        <div className="grid gap-5 sm:grid-cols-2">
                            <Field label="full name" error={errors.name}>
                                <input className={inputClass} value={form.name} onChange={handleChange('name')} placeholder="Amine Benali" />
                            </Field>
                            <Field label="phone number" error={errors.phone}>
                                <input
                                    className={inputClass}
                                    type="tel"
                                    value={form.phone}
                                    onChange={handleChange('phone')}
                                    placeholder="05XX XX XX XX"
                                />
                            </Field>
                        </div>
                    </section>

                    <section className="flex flex-col gap-5">
                        <h2 className="font-heading text-[18px] font-semibold capitalize text-ink">delivery address</h2>
                        <div className="grid gap-5 sm:grid-cols-2">
                            <Field label="wilaya" error={errors.wilaya}>
                                <select className={`${inputClass} appearance-none`} value={form.wilaya} onChange={handleWilayaChange}>
                                    <option value="" disabled>
                                        select your wilaya
                                    </option>
                                    {noestDeskData.map(({ wilaya }) => (
                                        <option key={wilaya} value={wilaya}>
                                            {wilaya}
                                        </option>
                                    ))}
                                </select>
                            </Field>
                            <Field label="commune" error={errors.commune}>
                                <select
                                    className={`${inputClass} appearance-none disabled:text-ink/30`}
                                    value={form.commune}
                                    onChange={handleChange('commune')}
                                    disabled={!form.wilaya}
                                >
                                    <option value="" disabled>
                                        {form.wilaya ? 'select your commune' : 'select a wilaya first'}
                                    </option>
                                    {desksForWilaya.map((desk) => (
                                        <option key={desk} value={desk}>
                                            {desk}
                                        </option>
                                    ))}
                                </select>
                            </Field>
                        </div>
                        {shippingMethod === 'home' && (
                            <Field label="address" error={errors.address}>
                                <input
                                    className={inputClass}
                                    value={form.address}
                                    onChange={handleChange('address')}
                                    placeholder="Street, building, floor…"
                                />
                            </Field>
                        )}
                    </section>

                    <section className="flex flex-col gap-4">
                        <h2 className="font-heading text-[18px] font-semibold capitalize text-ink">shipping method</h2>
                        <div className="flex flex-col gap-3">
                            {SHIPPING_METHODS.map((method) => {
                                const isActive = shippingMethod === method.id
                                return (
                                    <label
                                        key={method.id}
                                        className={
                                            isActive
                                                ? 'flex cursor-pointer items-center justify-between gap-4 rounded-[6px] border-2 border-black px-4 py-3 transition-colors'
                                                : 'flex cursor-pointer items-center justify-between gap-4 rounded-[6px] border border-black/15 px-4 py-3 transition-colors hover:border-black/40'
                                        }
                                    >
                                        <span className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="shipping"
                                                className="size-[18px] accent-black"
                                                checked={isActive}
                                                onChange={() => setShippingMethod(method.id)}
                                            />
                                            <span className="flex flex-col">
                                                <span className="font-heading text-[15px] font-medium capitalize text-ink">{method.label}</span>
                                                <span className="font-body text-[13px] text-ink/50">{method.description}</span>
                                            </span>
                                        </span>
                                        <span className="whitespace-nowrap font-heading text-[15px] font-semibold text-ink">
                                            {method.price.toLocaleString()} DA
                                        </span>
                                    </label>
                                )
                            })}
                        </div>
                    </section>

                    <section className="flex flex-col gap-4">
                        <h2 className="font-heading text-[18px] font-semibold capitalize text-ink">payment method</h2>
                        <div className="flex items-center gap-3 rounded-[6px] border-2 border-black px-4 py-3">
                            <input type="radio" name="payment" checked readOnly className="size-[18px] accent-black" />
                            <span className="font-heading text-[15px] font-medium capitalize text-ink">cash on delivery</span>
                        </div>
                    </section>
                </form>

                <aside className="flex flex-col gap-5 rounded-[8px] border border-black/10 bg-white p-5 shadow-[0_2px_16px_rgba(0,0,0,0.06)] lg:sticky lg:top-24 lg:order-2">
                    <h2 className="font-heading text-[18px] font-semibold capitalize text-ink">order summary</h2>

                    <div className="flex max-h-[320px] flex-col gap-4 overflow-y-auto">
                        {items.map((item) => (
                            <div key={item.id} className="flex items-center gap-3">
                                <div className="relative shrink-0">
                                    <img src={item.image} alt={item.name} className="size-14 rounded-[5px] object-cover" />
                                    <span className="absolute -right-1.5 -top-1.5 flex size-[18px] items-center justify-center rounded-full bg-ink font-body text-[11px] font-semibold text-white">
                                        {item.qty}
                                    </span>
                                </div>
                                <p className="flex-1 font-heading text-[14px] font-medium capitalize leading-tight text-ink">{item.name}</p>
                                <p className="whitespace-nowrap font-heading text-[14px] font-semibold text-ink">
                                    {(item.amount * item.qty).toLocaleString()} DA
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col gap-2 border-t border-black/10 pt-4 font-body text-[15px] text-ink/70">
                        <div className="flex items-center justify-between">
                            <span>Subtotal</span>
                            <span>{subtotal.toLocaleString()} DA</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span>Shipping</span>
                            <span>{shippingCost.toLocaleString()} DA</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-black/10 pt-4 font-heading text-[20px] font-semibold text-ink">
                        <span className="capitalize">total</span>
                        <span>{total.toLocaleString()} DA</span>
                    </div>

                    <motion.button
                        type="button"
                        onClick={handleSubmit}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full rounded-[4px] bg-brand-red py-3.5 font-heading text-[17px] font-semibold capitalize text-white transition-colors hover:bg-black"
                    >
                        confirm order
                    </motion.button>
                </aside>
            </div>
        </div>
    )
}

export default CheckoutPage
