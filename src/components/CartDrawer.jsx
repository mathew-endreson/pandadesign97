import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import IconClose from '../icons/IconClose'

function CartDrawer({ isOpen, onClose }) {
    const { items, removeItem, updateQty, subtotal } = useCart()

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="pointer-events-auto fixed inset-0 z-40 bg-black/40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    <motion.div
                        className="pointer-events-auto fixed right-0 top-0 z-50 flex h-full w-full max-w-[400px] flex-col bg-white shadow-[-8px_0_24px_rgba(0,0,0,0.12)]"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 320, damping: 34 }}
                    >
                        <div className="flex items-center justify-between border-b border-black/10 px-6 py-5">
                            <p className="font-heading text-[22px] font-semibold capitalize text-ink">your cart</p>
                            <button
                                type="button"
                                aria-label="Close cart"
                                onClick={onClose}
                                className="size-[22px] text-ink transition-opacity hover:opacity-60"
                            >
                                <IconClose />
                            </button>
                        </div>

                        {items.length === 0 ? (
                            <div className="flex flex-1 items-center justify-center px-8 text-center">
                                <p className="font-body text-[15px] text-ink/50">Your cart is empty.</p>
                            </div>
                        ) : (
                            <div className="flex-1 overflow-y-auto px-6 py-4">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4 border-b border-black/5 py-4 first:pt-0">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="h-[76px] w-[76px] shrink-0 rounded-[5px] object-cover"
                                        />
                                        <div className="flex flex-1 flex-col gap-2">
                                            <div className="flex items-start justify-between gap-2">
                                                <div>
                                                    <p className="font-heading text-[16px] font-semibold capitalize leading-tight text-ink">
                                                        {item.name}
                                                    </p>
                                                    {item.size && (
                                                        <p className="font-body text-[12px] text-ink/40">{item.size}</p>
                                                    )}
                                                </div>
                                                <button
                                                    type="button"
                                                    aria-label={`Remove ${item.name}`}
                                                    onClick={() => removeItem(item.id)}
                                                    className="size-[16px] shrink-0 text-ink/40 transition-colors hover:text-ink"
                                                >
                                                    <IconClose />
                                                </button>
                                            </div>
                                            <p className="font-heading text-[14px] font-medium text-brand-red">
                                                {item.price}
                                            </p>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    type="button"
                                                    aria-label="Decrease quantity"
                                                    onClick={() => updateQty(item.id, item.qty - 1)}
                                                    className="flex size-[24px] items-center justify-center rounded-full border border-black/20 text-ink transition-colors hover:border-black"
                                                >
                                                    −
                                                </button>
                                                <span className="w-4 text-center font-body text-[14px] text-ink">{item.qty}</span>
                                                <button
                                                    type="button"
                                                    aria-label="Increase quantity"
                                                    onClick={() => updateQty(item.id, item.qty + 1)}
                                                    className="flex size-[24px] items-center justify-center rounded-full border border-black/20 text-ink transition-colors hover:border-black"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {items.length > 0 && (
                            <div className="border-t border-black/10 px-6 py-5">
                                <div className="mb-4 flex items-center justify-between font-heading text-[18px] font-semibold text-ink">
                                    <span className="capitalize">subtotal</span>
                                    <span>{subtotal.toLocaleString()} DA</span>
                                </div>
                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                                    <Link
                                        to="/checkout"
                                        onClick={onClose}
                                        className="flex w-full items-center justify-center rounded-full bg-ink py-3 font-heading text-[18px] font-medium capitalize text-white"
                                    >
                                        checkout
                                    </Link>
                                </motion.div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    )
}

export default CartDrawer
