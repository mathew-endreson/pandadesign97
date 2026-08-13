import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)

const STORAGE_KEY = 'panda-design-cart'

function readStoredCart() {
    if (typeof window === 'undefined') return []
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY)
        return raw ? JSON.parse(raw) : []
    } catch {
        return []
    }
}

export function CartProvider({ children }) {
    const [items, setItems] = useState(readStoredCart)

    useEffect(() => {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    }, [items])

    const addItem = (product) => {
        setItems((current) => {
            const existing = current.find((item) => item.id === product.id)
            if (existing) {
                return current.map((item) =>
                    item.id === product.id ? { ...item, qty: item.qty + 1 } : item
                )
            }
            return [...current, { ...product, qty: 1 }]
        })
    }

    const removeItem = (id) => {
        setItems((current) => current.filter((item) => item.id !== id))
    }

    const updateQty = (id, qty) => {
        if (qty < 1) {
            removeItem(id)
            return
        }
        setItems((current) => current.map((item) => (item.id === id ? { ...item, qty } : item)))
    }

    const clearCart = () => setItems([])

    const count = useMemo(() => items.reduce((sum, item) => sum + item.qty, 0), [items])
    const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.amount * item.qty, 0), [items])

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, count, subtotal }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const ctx = useContext(CartContext)
    if (!ctx) throw new Error('useCart must be used within a CartProvider')
    return ctx
}
