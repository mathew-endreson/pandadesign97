import { motion } from 'framer-motion'
import pandaLogo from '../assets/landing/panda-logo.svg'

// Red curtain that holds for a beat on first load, then lifts off the top.
// LandingPage mounts the page as the curtain starts to lift, so its entrance
// animations play in view instead of behind the cover.
function Intro() {
    return (
        <motion.div
            aria-hidden
            className="fixed inset-0 z-[80] flex items-center justify-center bg-brand-red"
            initial={{ y: 0 }}
            animate={{ y: '-101%' }}
            transition={{ duration: 0.9, delay: 1, ease: [0.76, 0, 0.24, 1] }}
            style={{ borderBottomLeftRadius: '50% 8%', borderBottomRightRadius: '50% 8%' }}
        >
            <motion.img
                src={pandaLogo}
                alt=""
                className="h-[72px] w-auto brightness-0 invert"
                initial={{ scale: 0.6, opacity: 0, rotate: -12 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.15 }}
            />
        </motion.div>
    )
}

export default Intro
