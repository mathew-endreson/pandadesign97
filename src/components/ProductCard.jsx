import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { useHitSlop } from '../context/ScaleContext'

function ProductCard({ image, name, price, amount, category, size, index = 0 }) {
    const shouldReduceMotion = useReducedMotion()
    const { addItem } = useCart()
    const [justAdded, setJustAdded] = useState(false)
    const columnDelay = (index % 4) * 0.06
    const addToCartHitSlop = useHitSlop(15)

    useEffect(() => {
        if (!justAdded) return undefined
        const timeout = setTimeout(() => setJustAdded(false), 1400)
        return () => clearTimeout(timeout)
    }, [justAdded])

    const handleAddToCart = () => {
        const id = `${name}-${amount}`.toLowerCase().replace(/\s+/g, '-')
        addItem({ id, name, price, amount, image, category, size })
        setJustAdded(true)
    }

    return (
        <motion.div
            className="group flex w-full flex-col items-start gap-[17px] md:w-[329px]"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: columnDelay, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6 }}
        >
            <div className="aspect-[329/350] w-full overflow-hidden rounded-[5px] md:aspect-auto md:h-[350px]">
                <img
                    src={image}
                    alt={name}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
            </div>
            <div className="flex w-full flex-col items-start gap-[38px] capitalize">
                <div className="flex w-full items-center gap-[17px]">
                    <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
                        <p className="font-heading text-[26px] font-semibold leading-normal text-[#1c1c1c]">
                            {name}
                        </p>
                        {size && (
                            <p className="font-body text-[13px] font-normal leading-none text-[#1c1c1c]/50">{size}</p>
                        )}
                    </div>
                    <div className="flex h-[32px] w-[107px] flex-col justify-center font-heading text-[22px] font-medium leading-none text-[#d21720]">
                        <p className="leading-normal">{price}</p>
                    </div>
                </div>
                <div className="flex w-full flex-col items-start gap-[14px]">
                    <div className="flex h-[39px] w-full flex-col justify-center font-body text-[16px] font-light leading-none text-[#1c1c1c]" style={{ fontVariationSettings: '"wdth" 100' }}>
                        <p className="leading-normal">Timeless d&eacute;cor, carefully curated to help you create ...</p>
                    </div>
                    <motion.button
                        type="button"
                        onClick={handleAddToCart}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.96 }}
                        style={{
                            paddingTop: addToCartHitSlop,
                            paddingBottom: addToCartHitSlop,
                            marginTop: -addToCartHitSlop,
                            marginBottom: -addToCartHitSlop,
                        }}
                        className="group flex w-full items-center justify-center"
                    >
                        <span
                            className={
                                justAdded
                                    ? 'flex h-[38px] w-full items-center justify-center rounded-[4px] bg-[#1c1c1c] font-heading text-[15px] font-medium capitalize text-white transition-colors'
                                    : 'flex h-[38px] w-full items-center justify-center rounded-[4px] border border-black font-heading text-[15px] font-medium capitalize text-[#1c1c1c] transition-colors group-hover:bg-[#1c1c1c] group-hover:text-white'
                            }
                        >
                            {justAdded ? 'added ✓' : 'add to cart'}
                        </span>
                    </motion.button>
                </div>
            </div>
        </motion.div>
    )
}

export default ProductCard
