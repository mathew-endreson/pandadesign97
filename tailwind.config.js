/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'brand-red': '#d21720',
                'brand-crimson': '#ce1a21',
                ink: '#1c1c1c',
                'footer-muted': '#3c403c',
                'footer-text': '#adb3ab',
                'footer-light': '#eceeec',
            },
            fontFamily: {
                display: ['"Bricolage Grotesque"', 'sans-serif'],
                heading: ['Montserrat', 'sans-serif'],
                body: ['Roboto', 'sans-serif'],
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
            },
            animation: {
                marquee: 'marquee 22s linear infinite',
            },
        },
    },
    plugins: [],
}
