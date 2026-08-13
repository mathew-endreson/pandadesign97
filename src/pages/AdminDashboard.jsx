import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, writeBatch } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useAuth } from '../context/AuthContext'
import starterProducts from '../data/starterProducts'
import pandaLogo from '../assets/landing/panda-logo.svg'

const CATEGORIES = ['decor', 'mirrors', 'hangers', 'frames', 'posters', 'lamps']

const inputClass =
    'w-full rounded-[4px] border border-black/20 bg-transparent px-3 py-2 font-body text-[15px] text-ink outline-none transition-colors focus:border-black'
const labelClass = 'font-heading text-[13px] font-semibold uppercase tracking-wide text-ink/50'

function TabButton({ active, onClick, children }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={
                active
                    ? 'rounded-[4px] bg-ink px-5 py-2 font-heading text-[14px] font-semibold capitalize text-white'
                    : 'rounded-[4px] border border-black/15 px-5 py-2 font-heading text-[14px] font-semibold capitalize text-ink/60 transition-colors hover:border-black/40'
            }
        >
            {children}
        </button>
    )
}

function OrdersTab({ orders, loading }) {
    if (loading) return <p className="font-body text-[15px] text-ink/50">Loading orders…</p>
    if (orders.length === 0) return <p className="font-body text-[15px] text-ink/50">No orders yet.</p>

    return (
        <div className="flex flex-col gap-4">
            {orders.map((order) => (
                <div key={order.id} className="rounded-[8px] border border-black/10 p-5">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                            <p className="font-heading text-[16px] font-semibold text-ink">
                                #{order.orderNumber ?? order.id.slice(0, 6)}
                            </p>
                            <p className="font-body text-[13px] text-ink/50">
                                {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleString() : 'just now'}
                            </p>
                        </div>
                        <p className="font-heading text-[18px] font-semibold text-ink">
                            {order.total?.toLocaleString()} DA
                        </p>
                    </div>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        <div className="font-body text-[14px] leading-relaxed text-ink/70">
                            <p className="font-semibold text-ink">{order.name}</p>
                            <p>{order.phone}</p>
                            <p>{order.commune}, {order.wilaya}</p>
                            {order.address && <p>{order.address}</p>}
                            <p className="mt-1 capitalize text-ink/50">
                                {order.shippingMethod === 'home' ? 'Home delivery' : 'Stop desk pickup'}
                            </p>
                        </div>
                        <div className="font-body text-[14px] text-ink/70">
                            {order.items?.map((item, i) => (
                                <div key={i} className="flex items-center justify-between gap-3">
                                    <span className="capitalize">
                                        {item.name}
                                        {item.size ? ` (${item.size})` : ''} × {item.qty}
                                    </span>
                                    <span className="whitespace-nowrap">{(item.amount * item.qty).toLocaleString()} DA</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

function ProductsTab({ products, loading }) {
    const [name, setName] = useState('')
    const [size, setSize] = useState('')
    const [amount, setAmount] = useState('')
    const [category, setCategory] = useState(CATEGORIES[0])
    const [imageUrl, setImageUrl] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [seeding, setSeeding] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        if (!name.trim() || !size.trim() || !amount || !imageUrl.trim()) {
            setError('Fill in a name, size, price, and an image link.')
            return
        }
        setSubmitting(true)
        try {
            await addDoc(collection(db, 'products'), {
                name: name.trim(),
                size: size.trim(),
                amount: Number(amount),
                price: `${Number(amount).toLocaleString()} DA`,
                category,
                image: imageUrl.trim(),
                createdAt: serverTimestamp(),
            })
            setName('')
            setSize('')
            setAmount('')
            setCategory(CATEGORIES[0])
            setImageUrl('')
        } catch {
            setError('Could not save the product. Try again.')
        } finally {
            setSubmitting(false)
        }
    }

    const handleSeed = async () => {
        setSeeding(true)
        try {
            const batch = writeBatch(db)
            starterProducts.forEach((product) => {
                batch.set(doc(collection(db, 'products')), { ...product, createdAt: serverTimestamp() })
            })
            await batch.commit()
        } finally {
            setSeeding(false)
        }
    }

    return (
        <div className="flex flex-col gap-8">
            <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-4 rounded-[8px] border border-black/10 p-5">
                <label className="flex min-w-[180px] flex-1 flex-col gap-1.5">
                    <span className={labelClass}>name</span>
                    <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. wall clock" />
                </label>
                <label className="flex w-[130px] flex-col gap-1.5">
                    <span className={labelClass}>size</span>
                    <input className={inputClass} value={size} onChange={(e) => setSize(e.target.value)} placeholder="e.g. 40×60cm" />
                </label>
                <label className="flex w-[120px] flex-col gap-1.5">
                    <span className={labelClass}>price (DA)</span>
                    <input type="number" min="0" className={inputClass} value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="2500" />
                </label>
                <label className="flex w-[150px] flex-col gap-1.5">
                    <span className={labelClass}>category</span>
                    <select className={`${inputClass} appearance-none`} value={category} onChange={(e) => setCategory(e.target.value)}>
                        {CATEGORIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </label>
                <label className="flex min-w-[220px] flex-1 flex-col gap-1.5">
                    <span className={labelClass}>image url</span>
                    <input
                        type="url"
                        className={inputClass}
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="https://…"
                    />
                </label>
                <button
                    type="submit"
                    disabled={submitting}
                    className="rounded-[4px] bg-brand-red px-6 py-2.5 font-heading text-[14px] font-semibold capitalize text-white transition-colors hover:bg-black disabled:opacity-50"
                >
                    {submitting ? 'adding…' : 'add product'}
                </button>
                {error && <p className="w-full font-body text-[13px] text-brand-red">{error}</p>}
            </form>

            {!loading && products.length === 0 && (
                <button
                    type="button"
                    onClick={handleSeed}
                    disabled={seeding}
                    className="self-start rounded-[4px] border border-black/20 px-5 py-2.5 font-heading text-[14px] font-medium capitalize text-ink/70 transition-colors hover:border-black disabled:opacity-50"
                >
                    {seeding ? 'importing…' : 'import starter catalog (16 products)'}
                </button>
            )}

            {loading ? (
                <p className="font-body text-[15px] text-ink/50">Loading products…</p>
            ) : (
                <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
                    {products.map((product) => (
                        <div key={product.id} className="flex flex-col gap-2">
                            <img src={product.image} alt={product.name} className="h-[140px] w-full rounded-[5px] object-cover" />
                            <p className="font-heading text-[14px] font-medium capitalize leading-tight text-ink">{product.name}</p>
                            <p className="font-heading text-[13px] font-semibold text-brand-red">{product.price}</p>
                            <p className="font-body text-[12px] capitalize text-ink/40">{product.category} · {product.size}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

function AdminDashboard() {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const [tab, setTab] = useState('orders')
    const [orders, setOrders] = useState([])
    const [ordersLoading, setOrdersLoading] = useState(true)
    const [products, setProducts] = useState([])
    const [productsLoading, setProductsLoading] = useState(true)

    useEffect(() => {
        const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'))
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setOrders(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })))
            setOrdersLoading(false)
        })
        return unsubscribe
    }, [])

    useEffect(() => {
        const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'))
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setProducts(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })))
            setProductsLoading(false)
        })
        return unsubscribe
    }, [])

    const handleLogout = async () => {
        await logout()
        navigate('/admin/login')
    }

    return (
        <div className="min-h-screen bg-white">
            <header className="sticky top-0 z-10 flex items-center justify-between border-b border-black/10 bg-white/90 px-4 py-3 backdrop-blur-sm sm:px-8">
                <div className="flex items-center gap-3">
                    <img src={pandaLogo} alt="Panda Design" className="h-8 w-auto" />
                    <span className="font-heading text-[15px] font-semibold uppercase tracking-wide text-ink/60">admin</span>
                </div>
                <button
                    type="button"
                    onClick={handleLogout}
                    className="font-heading text-[13px] font-semibold uppercase tracking-wide text-ink/60 transition-colors hover:text-ink"
                >
                    log out
                </button>
            </header>

            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8">
                <div className="mb-8 flex gap-2">
                    <TabButton active={tab === 'orders'} onClick={() => setTab('orders')}>
                        orders{orders.length > 0 ? ` (${orders.length})` : ''}
                    </TabButton>
                    <TabButton active={tab === 'products'} onClick={() => setTab('products')}>
                        products{products.length > 0 ? ` (${products.length})` : ''}
                    </TabButton>
                </div>

                {tab === 'orders' ? (
                    <OrdersTab orders={orders} loading={ordersLoading} />
                ) : (
                    <ProductsTab products={products} loading={productsLoading} />
                )}
            </div>
        </div>
    )
}

export default AdminDashboard
