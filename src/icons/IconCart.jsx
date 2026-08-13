function IconCart({ className = 'size-full' }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
            <path
                d="M3 4H5L5.68 7M5.68 7L7 15H18L20 8H6M5.68 7L6 8"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle cx="9" cy="19" r="1.4" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="17" cy="19" r="1.4" stroke="currentColor" strokeWidth="1.6" />
        </svg>
    )
}

export default IconCart
