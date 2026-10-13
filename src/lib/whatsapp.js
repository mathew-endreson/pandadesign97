const WHATSAPP_NUMBER = '213778551997'

export const whatsappUrl = (message) =>
    `https://wa.me/${WHATSAPP_NUMBER}${message ? `?text=${encodeURIComponent(message)}` : ''}`

export function openWhatsApp(message) {
    window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer')
}
