import { useMemo, useState } from 'react'
import Reveal from './Reveal'
import { useHitSlop } from '../context/ScaleContext'
import ProductCard from './ProductCard'
import productEightBallCarpet from '../assets/landing/product-8ball-carpet.png'
import productAestheticPosters from '../assets/landing/product-aesthetic-posters.png'
import productIpodMirror from '../assets/landing/product-ipod-mirror.png'
import productCigaretteLamp from '../assets/landing/product-cigarette-lamp.png'
import productPaintMirror from '../assets/landing/product-paint-mirror.png'
import productAestheticPosters2 from '../assets/landing/product-aesthetic-posters-2.png'
import productSkateboards from '../assets/landing/product-skateboards.png'
import productOnePieceMirror from '../assets/landing/product-one-piece-mirror.png'
import productBasketballNet from '../assets/landing/product-basketball-net.png'
import productCornerMirror from '../assets/landing/product-corner-mirror.png'

const filters = [
    { label: 'all', width: 70 },
    { label: 'mirrors', width: 135 },
    { label: 'hangers', width: 147 },
    { label: 'frames', width: 134 },
    { label: 'posters', width: 136 },
    { label: 'lamps', width: 120 },
]

const products = [
    { image: productEightBallCarpet, name: '8 ball carpet', price: '2000 DA', amount: 2000, category: 'decor' },
    { image: productAestheticPosters, name: 'aesthetic posters', price: '1500 DA', amount: 1500, category: 'posters' },
    { image: productIpodMirror, name: 'ipod mirror', price: '3800 DA', amount: 3800, category: 'mirrors' },
    { image: productCigaretteLamp, name: 'cigarette lamp', price: '4000 DA', amount: 4000, category: 'lamps' },
    { image: productPaintMirror, name: 'paint mirror', price: '3000 DA', amount: 3000, category: 'mirrors' },
    { image: productAestheticPosters2, name: 'aesthetic posters', price: '1500 DA', amount: 1500, category: 'posters' },
    { image: productSkateboards, name: 'skateboards', price: '4500 DA', amount: 4500, category: 'decor' },
    { image: productCigaretteLamp, name: 'cigarette lamp', price: '2500 DA', amount: 2500, category: 'lamps' },
    { image: productOnePieceMirror, name: 'one piece mirror', price: '3000 DA', amount: 3000, category: 'mirrors' },
    { image: productBasketballNet, name: 'basketball net', price: '2500 DA', amount: 2500, category: 'decor' },
    { image: productCornerMirror, name: 'corner mirror', price: '3500 DA', amount: 3500, category: 'mirrors' },
    { image: productEightBallCarpet, name: '8 ball carpet', price: '2000 DA', amount: 2000, category: 'decor' },
    { image: productPaintMirror, name: 'paint mirror', price: '3000 DA', amount: 3000, category: 'mirrors' },
    { image: productAestheticPosters2, name: 'aesthetic posters', price: '1500 DA', amount: 1500, category: 'posters' },
    { image: productSkateboards, name: 'skateboards', price: '4500 DA', amount: 4500, category: 'decor' },
    { image: productCigaretteLamp, name: 'cigarette lamp', price: '2500 DA', amount: 2500, category: 'lamps' },
].map((product, i) => ({ ...product, id: i }))

function CollectionSection() {
    const [activeFilter, setActiveFilter] = useState('all')
    const pillHitSlop = useHitSlop(15)

    const filteredProducts = useMemo(() => {
        return products.filter((product) => activeFilter === 'all' || product.category === activeFilter)
    }, [activeFilter])

    return (
        <>
            <div id="shop" className="absolute left-0 top-[3220px]" aria-hidden="true" />

            <Reveal as="p" className="absolute left-[calc(50%-612px)] top-[3306px] h-[52px] w-[391px] font-display text-[43px] font-extrabold uppercase leading-normal text-black" style={{ fontVariationSettings: '"opsz" 14, "wdth" 100' }}>
                our collection
            </Reveal>

            <div className="absolute left-[calc(50%-0.5px)] top-[3490px] flex -translate-x-1/2 items-center gap-[11px]">
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
                                style={{ width: filter.width }}
                                className={
                                    isActive
                                        ? 'flex h-[48px] items-center justify-center rounded-[5px] bg-[#ce1a21] pl-[21px] pr-[20px] py-[8px] font-heading text-[24px] font-semibold capitalize text-white'
                                        : 'flex h-[48px] items-center justify-center rounded-[5px] border border-solid border-black pl-[21px] pr-[20px] py-[8px] font-heading text-[24px] capitalize text-black transition-colors duration-300 group-hover:bg-black group-hover:text-white'
                                }
                            >
                                {filter.label}
                            </span>
                        </Reveal>
                    )
                })}
            </div>

            <div className="absolute left-[38px] top-[3591px] w-[1364px]">
                {filteredProducts.length === 0 ? (
                    <p className="py-16 text-center font-heading text-[20px] capitalize text-ink/50">
                        no products match this filter.
                    </p>
                ) : (
                    <div className="grid grid-cols-4 gap-x-[16px] gap-y-[35px]">
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
