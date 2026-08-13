import Reveal from './Reveal'
import visionStore from '../assets/landing/vision-store.png'
import visionLivingRoom from '../assets/landing/vision-living-room.png'
import visionRoom from '../assets/landing/vision-room.png'
import visionSpecialPlace from '../assets/landing/vision-special-place.png'
import visionWorkspace from '../assets/landing/vision-workspace.png'

function VisionSection() {
    return (
        <>
            <div id="about" className="absolute left-0 top-[1870px]" aria-hidden="true" />

            <Reveal
                as="div"
                className="absolute left-[calc(50%-683px)] top-[1966px] h-[97px] w-[304px] whitespace-pre-wrap font-display text-[46px] font-extrabold uppercase leading-none text-black"
                style={{ fontVariationSettings: '"opsz" 14, "wdth" 100' }}
            >
                <p className="mb-0 leading-normal">we see </p>
                <p className="leading-normal">your vision</p>
            </Reveal>

            <Reveal as="div" delay={0} amount={0.4} float floatDistance={10} floatDuration={5} className="absolute left-[469px] top-[1955px] h-[324px] w-[242px] rounded-[5px]">
                <img alt="" src={visionStore} className="absolute inset-0 size-full max-w-none rounded-[5px] object-cover" />
            </Reveal>
            <Reveal as="div" delay={0.08} amount={0.4} float floatDistance={12} floatDuration={5.6} className="absolute left-[1070px] top-[1954px] h-[435px] w-[331px] overflow-hidden rounded-[5px]">
                <img alt="" src={visionLivingRoom} className="absolute left-[-0.06%] top-0 h-[135.4%] w-[100.11%] max-w-none" />
            </Reveal>
            <Reveal as="div" delay={0.16} amount={0.4} float floatDistance={12} floatDuration={6.2} className="absolute left-[38px] top-[2321px] h-[439px] w-[329px] rounded-[5px]">
                <img alt="" src={visionRoom} className="absolute inset-0 size-full max-w-none rounded-[5px] object-cover" />
            </Reveal>
            <Reveal as="div" delay={0.08} amount={0.4} float floatDistance={9} floatDuration={4.8} className="absolute left-[825px] top-[2321px] h-[346px] w-[231px] rounded-[5px]">
                <img alt="" src={visionSpecialPlace} className="absolute inset-0 size-full max-w-none rounded-[5px] object-cover" />
            </Reveal>
            <Reveal as="div" delay={0.16} amount={0.4} float floatDistance={10} floatDuration={5.4} className="absolute left-[1121px] top-[2687px] h-[349px] w-[280px] rounded-[5px]">
                <img alt="" src={visionWorkspace} className="absolute inset-0 size-full max-w-none rounded-[5px] object-cover" />
            </Reveal>

            <Reveal as="p" delay={0.1} className="absolute left-[38px] top-[2779px] h-[32px] w-[303px] font-heading text-[26px] font-semibold capitalize text-[#1c1c1c]">
                for your working space ,
            </Reveal>
            <Reveal as="p" delay={0.1} className="absolute left-[469px] top-[2289px] h-[32px] w-[226px] font-heading text-[26px] font-semibold capitalize text-[#1c1c1c]">
                for your room ,
            </Reveal>
            <Reveal as="p" delay={0.18} className="absolute left-[825px] top-[2671px] h-[96px] w-[226px] font-heading text-[26px] font-semibold capitalize text-[#1c1c1c]">
                for your special place ,
            </Reveal>
            <Reveal as="p" delay={0.18} className="absolute left-[1070px] top-[2403px] h-[32px] w-[226px] font-heading text-[26px] font-semibold capitalize text-[#1c1c1c]">
                for your store ,
            </Reveal>
            <Reveal as="p" delay={0.24} className="absolute left-[1123px] top-[3051px] h-[96px] w-[226px] font-heading text-[26px] font-semibold capitalize text-[#1c1c1c]">
                and even for your living room!
            </Reveal>

            <Reveal fadeOnly as="p" delay={0.18} className="absolute left-[381px] top-[2721px] h-[68px] w-[241px] -translate-y-1/2 capitalize leading-normal text-[20px] font-normal text-[#1c1c1c]" style={{ fontVariationSettings: '"wdth" 100' }}>
                lamps and the best decorations for your desk.
            </Reveal>
            <Reveal fadeOnly as="p" delay={0.26} className="absolute left-[825px] top-[2818px] h-[46px] w-[241px] -translate-y-1/2 capitalize leading-normal text-[20px] font-normal text-[#1c1c1c]" style={{ fontVariationSettings: '"wdth" 100' }}>
                bghit ga3da khlwi? khaliha 3lina.
            </Reveal>
            <Reveal fadeOnly as="p" delay={0.18} className="absolute left-[38px] top-[2178.5px] h-[91px] w-[241px] -translate-y-1/2 capitalize leading-normal text-[20px] font-normal text-[#1c1c1c]" style={{ fontVariationSettings: '"wdth" 100' }}>
                our store is the only store in algeria that will bring your pintrest board to life...
            </Reveal>
            <Reveal fadeOnly as="p" delay={0.1} className="absolute left-[720px] top-[2023.5px] h-[115px] w-[241px] -translate-y-1/2 capitalize leading-normal text-[20px] font-normal text-[#1c1c1c]" style={{ fontVariationSettings: '"wdth" 100' }}>
                never keep your walls bare while we provide the best posters that will make your room more like YOU...
            </Reveal>
        </>
    )
}

export default VisionSection
