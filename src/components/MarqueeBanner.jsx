import { useIsMobile } from '../context/ScaleContext'
import { useLang } from '../context/LangContext'

function MobileMarquee({ items, message }) {
    return (
        <div dir="ltr" className="relative w-full overflow-hidden shrink-0">
            <div className="h-[48px] w-full bg-[#d21720]" />
            <div className="absolute left-0 top-[12px] w-full">
                <div className="flex w-max animate-marquee items-center gap-6 whitespace-nowrap font-heading text-[16px] font-medium capitalize text-white">
                    {[...items, ...items].map((_, i) => (
                        <p key={i} className="shrink-0">{message}</p>
                    ))}
                </div>
            </div>
        </div>
    )
}

function MarqueeBanner() {
    const items = Array.from({ length: 12 })
    const isMobile = useIsMobile()
    const { t } = useLang()
    const message = t('marquee')

    if (isMobile) return <MobileMarquee items={items} message={message} />

    return (
        <>
            <div className="absolute left-0 top-0 h-[61px] w-[1440px] bg-[#d21720] backdrop-blur-[2px]" />
            <div dir="ltr" className="absolute left-0 top-[19px] w-[1440px] overflow-clip">
                <div className="flex w-max animate-marquee items-center gap-[31px] whitespace-nowrap font-heading text-[20px] font-medium capitalize text-white">
                    {[...items, ...items].map((_, i) => (
                        <p key={i} className="shrink-0">{message}</p>
                    ))}
                </div>
            </div>
        </>
    )
}

export default MarqueeBanner
