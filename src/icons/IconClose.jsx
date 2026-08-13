function IconClose({ className = 'size-full' }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
            <path
                d="M5 5L19 19M19 5L5 19"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    )
}

export default IconClose
