import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { useHitSlop, useIsMobile, useResponsiveSize } from '../context/ScaleContext'
import { trackEvent } from '../lib/metaPixel'

const FALLBACK_DESCRIPTION = 'Timeless décor, carefully curated to help you create ...'

function ProductCard({ image, name, price, amount, category, size, description, index = 0 }) {
    const shouldReduceMotion = useReducedMotion()
    const { addItem } = useCart()
    const [justAdded, setJustAdded] = useState(false)
    const isMobile = useIsMobile()
    // Stagger follows the actual column count so the reveal sweeps left to
    // right per row — 2 columns on phone, 4 on desktop (see CollectionSection).
    const columnDelay = (index % (isMobile ? 2 : 4)) * 0.08
    // The button's already a real 46px tall on mobile (see buttonHeight
    // below), so it doesn't need much invisible hit-slop on top of that —
    // unlike desktop, where the visible pill stays at its small Figma size.
    const addToCartHitSlop = useHitSlop(isMobile ? 4 : 15)

    // Real, independently-sized mobile type — text inside the scaled canvas
    // otherwise inherits the same shrink factor as the decorative imagery
    // around it, which crushes product names/prices/descriptions down to
    // genuinely unreadable sizes on small phones. undefined on desktop
    // leaves the original Figma-derived scaled sizing untouched.
    const nameSize = useResponsiveSize(17)
    const sizeLabelSize = useResponsiveSize(12)
    const priceSize = useResponsiveSize(16)
    const priceBoxHeight = useResponsiveSize(26)
    const descSize = useResponsiveSize(13)
    const descHeight = useResponsiveSize(36)
    const buttonTextSize = useResponsiveSize(14)
    const buttonHeight = useResponsiveSize(46)
    const rowGap = useResponsiveSize(10)
    const stackGap = useResponsiveSize(12)
    const detailsGap = useResponsiveSize(8)

    useEffect(() => {
        if (!justAdded) return undefined
        const timeout = setTimeout(() => setJustAdded(false), 1400)
        return () => clearTimeout(timeout)
    }, [justAdded])

    const handleAddToCart = () => {
        const id = `${name}-${amount}`.toLowerCase().replace(/\s+/g, '-')
        addItem({ id, name, price, amount, image, category, size })
        setJustAdded(true)
        trackEvent('AddToCart', {
            content_ids: [id],
            content_name: name,
            content_type: 'product',
            value: amount,
            currency: 'DZD',
        })
    }

    const shownDescription = description?.trim() || FALLBACK_DESCRIPTION

    return (
        <motion.div
            className="group flex w-full flex-col items-start gap-[17px] md:w-[329px]"
            initial={shouldReduceMotion ? false : { opacity: 0, y: isMobile ? 20 : 28, scale: isMobile ? 0.96 : 1 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: columnDelay, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
        >
            <div className="aspect-[329/350] w-full overflow-hidden rounded-[5px] md:aspect-auto md:h-[350px]">
                <img
                    src={image}
                    alt={name}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
            </div>
            <div className="flex w-full flex-col items-start gap-[38px] capitalize" style={{ gap: stackGap }}>
                <div className="flex w-full items-center gap-[17px]" style={{ gap: rowGap }}>
                    <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
                        <p
                            className="truncate font-heading text-[26px] font-semibold leading-normal text-[#1c1c1c]"
                            style={{ fontSize: nameSize }}
                        >
                            {name}
                        </p>
                        {size && (
                            <p
                                className="font-body text-[13px] font-normal leading-none text-[#1c1c1c]/50"
                                style={{ fontSize: sizeLabelSize }}
                            >
                                {size}
                            </p>
                        )}
                    </div>
                    <div
                        className="flex h-[32px] w-[90px] shrink-0 flex-col justify-center font-heading text-[22px] font-medium leading-none text-[#d21720]"
                        style={{ fontSize: priceSize, height: priceBoxHeight, width: isMobile ? 'auto' : undefined }}
                    >
                        <p className="whitespace-nowrap leading-normal">{price}</p>
                    </div>
                </div>
                <div className="flex w-full flex-col items-start gap-[14px]" style={{ gap: detailsGap }}>
                    <div
                        className="flex h-[44px] w-full flex-col justify-center font-body text-[16px] font-light leading-snug text-[#1c1c1c]"
                        style={{ fontVariationSettings: '"wdth" 100', fontSize: descSize, height: descHeight }}
                    >
                        <p className="line-clamp-2">{shownDescription}</p>
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
                            style={{ fontSize: buttonTextSize, height: buttonHeight }}
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
