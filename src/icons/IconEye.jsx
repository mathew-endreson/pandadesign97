function IconEye({ className = 'size-full', open = true }) {
    if (open) {
        return (
            <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M2 12C2 12 5.5 5.5 12 5.5C18.5 5.5 22 12 22 12C22 12 18.5 18.5 12 18.5C5.5 18.5 2 12 2 12Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                />
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
            </svg>
        )
    }

    return (
        <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
            <path
                d="M3.5 3.5L20.5 20.5M9.88 5.68C10.56 5.56 11.27 5.5 12 5.5C18.5 5.5 22 12 22 12C21.4 13.12 20.53 14.32 19.4 15.4M14.12 14.12C13.52 14.66 12.8 15 12 15C10.34 15 9 13.66 9 12C9 11.2 9.34 10.48 9.88 9.88M6.6 6.6C4.4 8.05 2.9 10.2 2 12C2 12 5.5 18.5 12 18.5C13.6 18.5 14.98 18.1 16.15 17.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default IconEye
