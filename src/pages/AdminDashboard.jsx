import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc, writeBatch } from 'firebase/firestore'
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

const thClass = 'px-4 py-3 font-heading text-[12px] font-semibold uppercase tracking-wide text-ink/50'
const tdClass = 'px-4 py-3 align-top font-body text-[13px] text-ink/70'

function OrdersTab({ orders, loading }) {
    if (loading) return <p className="font-body text-[15px] text-ink/50">Loading orders…</p>
    if (orders.length === 0) return <p className="font-body text-[15px] text-ink/50">No orders yet.</p>

    return (
        <div className="overflow-x-auto rounded-[8px] border border-black/10">
            <table className="w-full min-w-[880px] border-collapse text-left">
                <thead>
                    <tr className="border-b border-black/10 bg-black/[0.02]">
                        <th className={thClass}>Order</th>
                        <th className={thClass}>Date</th>
                        <th className={thClass}>Customer</th>
                        <th className={thClass}>Delivery</th>
                        <th className={thClass}>Items</th>
                        <th className={`${thClass} text-right`}>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id} className="border-b border-black/10 last:border-b-0">
                            <td className={`${tdClass} font-heading text-[14px] font-semibold text-ink`}>
                                #{order.orderNumber ?? order.id.slice(0, 6)}
                            </td>
                            <td className={tdClass}>
                                {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleString() : 'just now'}
                            </td>
                            <td className={tdClass}>
                                <p className="font-semibold text-ink">{order.name}</p>
                                <p>{order.phone}</p>
                            </td>
                            <td className={tdClass}>
                                <p>{order.commune}, {order.wilaya}</p>
                                {order.address && <p>{order.address}</p>}
                                <p className="capitalize text-ink/50">
                                    {order.shippingMethod === 'home' ? 'Home delivery' : 'Stop desk pickup'}
                                </p>
                            </td>
                            <td className={tdClass}>
                                {order.items?.map((item, i) => (
                                    <p key={i} className="capitalize">
                                        {item.name}
                                        {item.size ? ` (${item.size})` : ''} × {item.qty}
                                    </p>
                                ))}
                            </td>
                            <td className={`${tdClass} text-right font-heading text-[14px] font-semibold text-ink`}>
                                {order.total?.toLocaleString()} DA
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

const emptyForm = { name: '', size: '', amount: '', category: CATEGORIES[0], imageUrl: '', description: '' }

function ProductsTab({ products, loading }) {
    const [form, setForm] = useState(emptyForm)
    const [editingId, setEditingId] = useState(null)
    const [submitting, setSubmitting] = useState(false)
    const [seeding, setSeeding] = useState(false)
    const [deletingId, setDeletingId] = useState(null)
    const [error, setError] = useState('')

    const updateField = (field) => (e) => setForm((current) => ({ ...current, [field]: e.target.value }))

    const startEdit = (product) => {
        setEditingId(product.id)
        setForm({
            name: product.name || '',
            size: product.size || '',
            amount: product.amount != null ? String(product.amount) : '',
            category: product.category || CATEGORIES[0],
            imageUrl: product.image || '',
            description: product.description || '',
        })
        setError('')
    }

    const cancelEdit = () => {
        setEditingId(null)
        setForm(emptyForm)
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        if (!form.name.trim() || !form.size.trim() || !form.amount || !form.imageUrl.trim()) {
            setError('Fill in a name, size, price, and an image link.')
            return
        }
        setSubmitting(true)
        try {
            const data = {
                name: form.name.trim(),
                size: form.size.trim(),
                amount: Number(form.amount),
                price: `${Number(form.amount).toLocaleString()} DA`,
                category: form.category,
                image: form.imageUrl.trim(),
                description: form.description.trim(),
            }
            if (editingId) {
                await updateDoc(doc(db, 'products', editingId), data)
            } else {
                await addDoc(collection(db, 'products'), { ...data, createdAt: serverTimestamp() })
            }
            cancelEdit()
        } catch {
            setError('Could not save the product. Try again.')
        } finally {
            setSubmitting(false)
        }
    }

    const handleDelete = async (product) => {
        if (!window.confirm(`Delete "${product.name}"? This can't be undone.`)) return
        setDeletingId(product.id)
        try {
            await deleteDoc(doc(db, 'products', product.id))
            if (editingId === product.id) cancelEdit()
        } catch {
            setError('Could not delete the product. Try again.')
        } finally {
            setDeletingId(null)
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
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-[8px] border border-black/10 p-5">
                {editingId && (
                    <p className="font-heading text-[13px] font-semibold uppercase tracking-wide text-brand-red">
                        editing product
                    </p>
                )}
                <div className="flex flex-wrap items-end gap-4">
                    <label className="flex min-w-[180px] flex-1 flex-col gap-1.5">
                        <span className={labelClass}>name</span>
                        <input className={inputClass} value={form.name} onChange={updateField('name')} placeholder="e.g. wall clock" />
                    </label>
                    <label className="flex w-[130px] flex-col gap-1.5">
                        <span className={labelClass}>size</span>
                        <input className={inputClass} value={form.size} onChange={updateField('size')} placeholder="e.g. 40×60cm" />
                    </label>
                    <label className="flex w-[120px] flex-col gap-1.5">
                        <span className={labelClass}>price (DA)</span>
                        <input type="number" min="0" className={inputClass} value={form.amount} onChange={updateField('amount')} placeholder="2500" />
                    </label>
                    <label className="flex w-[150px] flex-col gap-1.5">
                        <span className={labelClass}>category</span>
                        <select className={`${inputClass} appearance-none`} value={form.category} onChange={updateField('category')}>
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
                            value={form.imageUrl}
                            onChange={updateField('imageUrl')}
                            placeholder="https://…"
                        />
                    </label>
                </div>

                <label className="flex flex-col gap-1.5">
                    <span className={labelClass}>description</span>
                    <textarea
                        rows={2}
                        className={`${inputClass} resize-none`}
                        value={form.description}
                        onChange={updateField('description')}
                        placeholder="Shown on the product's shop card…"
                    />
                </label>

                <div className="flex items-center gap-3">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="rounded-[4px] bg-brand-red px-6 py-2.5 font-heading text-[14px] font-semibold capitalize text-white transition-colors hover:bg-black disabled:opacity-50"
                    >
                        {submitting ? 'saving…' : editingId ? 'save changes' : 'add product'}
                    </button>
                    {editingId && (
                        <button
                            type="button"
                            onClick={cancelEdit}
                            className="rounded-[4px] border border-black/20 px-5 py-2.5 font-heading text-[14px] font-medium capitalize text-ink/70 transition-colors hover:border-black"
                        >
                            cancel
                        </button>
                    )}
                    {error && <p className="font-body text-[13px] text-brand-red">{error}</p>}
                </div>
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
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => startEdit(product)}
                                    className="flex-1 rounded-[4px] border border-black/20 py-1.5 font-heading text-[12px] font-medium capitalize text-ink/70 transition-colors hover:border-black"
                                >
                                    edit
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleDelete(product)}
                                    disabled={deletingId === product.id}
                                    className="flex-1 rounded-[4px] border border-brand-red/30 py-1.5 font-heading text-[12px] font-medium capitalize text-brand-red transition-colors hover:border-brand-red disabled:opacity-50"
                                >
                                    {deletingId === product.id ? '…' : 'delete'}
                                </button>
                            </div>
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
