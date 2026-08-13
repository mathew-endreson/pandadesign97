const MESSAGE = '-20% for limted time -'

function MarqueeBanner() {
    const items = Array.from({ length: 12 })

    return (
        <>
            <div className="absolute left-0 top-0 h-[61px] w-[1440px] bg-[#d21720] backdrop-blur-[2px]" />
            <div className="absolute left-0 top-[19px] w-[1440px] overflow-clip">
                <div className="flex w-max animate-marquee items-center gap-[31px] whitespace-nowrap font-heading text-[20px] font-medium capitalize text-white">
                    {[...items, ...items].map((_, i) => (
                        <p key={i} className="shrink-0">{MESSAGE}</p>
                    ))}
                </div>
            </div>
        </>
    )
}

export default MarqueeBanner
