import { useEffect, useMemo, useRef, useState } from 'react'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import Reveal from './Reveal'
import { useHitSlop, useIsMobile, useResponsiveSize } from '../context/ScaleContext'
import ProductCard from './ProductCard'
import { db } from '../lib/firebase'

const filters = [
    { label: 'all', width: 70 },
    { label: 'mirrors', width: 135 },
    { label: 'hangers', width: 147 },
    { label: 'frames', width: 134 },
    { label: 'posters', width: 136 },
    { label: 'lamps', width: 120 },
]

// Vertical space the fixed-pixel canvas originally budgets for this grid
// before the Contact section's anchor (top-[5880px] - top-[3591px]). The
// grid's real height varies with column count (2 on phone, 4 on desktop) and
// the active filter, so anything taller than this needs everything below it
// pushed down by the difference — see the ResizeObserver effect below.
const GRID_HEIGHT_BUDGET = 5880 - 3591
// Same idea for the space between the filter row's start and where the grid
// was originally positioned (top-[3591px] - top-[3490px]) — on mobile the
// filter pills wrap onto 2 rows instead of 1, so they need more room than
// the desktop-derived budget assumed, or they overlap the grid below them.
const FILTER_ROW_BUDGET = 3591 - 3490

function CollectionSection({ onGridHeightChange }) {
    const [activeFilter, setActiveFilter] = useState('all')
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [filterRowExtraHeight, setFilterRowExtraHeight] = useState(0)
    const [gridOwnExtraHeight, setGridOwnExtraHeight] = useState(0)
    const isMobile = useIsMobile()
    const pillHitSlop = useHitSlop(isMobile ? 6 : 15)
    const gridWrapRef = useRef(null)
    const filterRowRef = useRef(null)

    // Same real-mobile-size treatment as ProductCard — the heading and
    // filter pills otherwise shrink by the same factor as the canvas around
    // them, undefined on desktop leaves the original sizing untouched.
    const headingSize = useResponsiveSize(28)
    const headingWidth = useResponsiveSize(260)
    const pillTextSize = useResponsiveSize(14)
    const pillHeight = useResponsiveSize(40)
    const pillPaddingX = useResponsiveSize(16)
    const pillGap = useResponsiveSize(8)
    // `vw`-based Tailwind classes (e.g. max-w-[92vw]) resolve against the
    // real viewport too, same as px values do — and get shrunk a second
    // time by the canvas's own scale() once rendered, ending up far too
    // narrow. Needs the same counter-scale treatment as everything else here.
    const pillRowMaxWidth = useResponsiveSize(340)
    // A canvas-space constant buffer shrinks along with everything else, so
    // a flat number isn't enough breathing room at small real scale — needs
    // the same real-px counter-scale treatment.
    const filterRowBuffer = useResponsiveSize(16) ?? 0

    useEffect(() => {
        // A one-time fetch rather than a live onSnapshot listener — the shop
        // doesn't need to reflect admin edits mid-visit, and a static fetch
        // means each visitor costs one batch of reads instead of holding a
        // persistent connection open for their whole session, which matters
        // once concurrent traffic gets large. Admin's own product list still
        // uses onSnapshot, where live sync across staff sessions is worth it.
        let cancelled = false
        const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'))
        getDocs(q).then((snapshot) => {
            if (cancelled) return
            setProducts(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })))
            setLoading(false)
        })
        return () => {
            cancelled = true
        }
    }, [])

    const filteredProducts = useMemo(() => {
        return products.filter((product) => activeFilter === 'all' || product.category === activeFilter)
    }, [products, activeFilter])

    useEffect(() => {
        const el = filterRowRef.current
        if (!el) return undefined
        const observer = new ResizeObserver(() => {
            const extra = el.offsetHeight - FILTER_ROW_BUDGET
            setFilterRowExtraHeight(extra > 0 ? extra + filterRowBuffer : 0)
        })
        observer.observe(el)
        return () => observer.disconnect()
    }, [filterRowBuffer])

    useEffect(() => {
        const el = gridWrapRef.current
        if (!el) return undefined
        const observer = new ResizeObserver(() => {
            setGridOwnExtraHeight(Math.max(0, el.offsetHeight - GRID_HEIGHT_BUDGET))
        })
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        onGridHeightChange?.(filterRowExtraHeight + gridOwnExtraHeight)
    }, [filterRowExtraHeight, gridOwnExtraHeight, onGridHeightChange])

    return (
        <>
            <div id="shop" className="absolute left-0 top-[3220px]" aria-hidden="true" />

            <Reveal
                as="p"
                className="absolute left-[calc(50%-612px)] top-[3306px] h-[52px] w-[391px] whitespace-nowrap font-display text-[43px] font-extrabold uppercase leading-normal text-black"
                style={{
                    fontVariationSettings: '"opsz" 14, "wdth" 100',
                    fontSize: headingSize,
                    width: headingWidth,
                    height: isMobile ? 'auto' : undefined,
                }}
            >
                our collection
            </Reveal>

            <div
                ref={filterRowRef}
                className="absolute left-[calc(50%-0.5px)] top-[3490px] flex w-max -translate-x-1/2 flex-wrap items-center justify-center gap-[11px] md:w-auto md:max-w-none md:flex-nowrap"
                style={{ gap: pillGap, rowGap: pillGap, maxWidth: pillRowMaxWidth }}
            >
                {filters.map((filter, i) => {
                    const isActive = activeFilter === filter.label
                    return (
                        <Reveal
                            key={filter.label}
                            as="button"
                            type="button"
                            y={16}
                            delay={i * 0.05}
                            amount={0.6}
                            style={{
                                paddingTop: pillHitSlop,
                                paddingBottom: pillHitSlop,
                                marginTop: -pillHitSlop,
                                marginBottom: -pillHitSlop,
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.94 }}
                            onClick={() => setActiveFilter(filter.label)}
                            className="group flex items-center justify-center"
                        >
                            <span
                                style={{
                                    width: isMobile ? 'auto' : filter.width,
                                    height: pillHeight,
                                    fontSize: pillTextSize,
                                    paddingLeft: pillPaddingX,
                                    paddingRight: pillPaddingX,
                                }}
                                className={
                                    isActive
                                        ? 'flex h-[48px] items-center justify-center rounded-full bg-[#ce1a21] pl-[21px] pr-[20px] py-[8px] font-heading text-[24px] font-semibold capitalize text-white'
                                        : 'flex h-[48px] items-center justify-center rounded-full border border-solid border-black pl-[21px] pr-[20px] py-[8px] font-heading text-[24px] capitalize text-black transition-colors duration-300 group-hover:bg-black group-hover:text-white'
                                }
                            >
                                {filter.label}
                            </span>
                        </Reveal>
                    )
                })}
            </div>

            <div
                ref={gridWrapRef}
                className="absolute left-[38px] top-[3591px] w-[1364px]"
                style={{ top: 3591 + filterRowExtraHeight }}
            >
                {loading ? (
                    <p className="py-16 text-center font-heading text-[20px] capitalize text-ink/50">
                        loading products…
                    </p>
                ) : filteredProducts.length === 0 ? (
                    <p className="py-16 text-center font-heading text-[20px] capitalize text-ink/50">
                        {products.length === 0 ? 'no products yet.' : 'no products match this filter.'}
                    </p>
                ) : (
                    <div className="grid grid-cols-2 gap-x-[16px] gap-y-[35px] md:grid-cols-4">
                        {filteredProducts.map((product, i) => (
                            <ProductCard key={product.id} index={i} {...product} />
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default CollectionSection
