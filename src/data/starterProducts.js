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

// The catalog this storefront originally shipped with, before products moved
// to Firestore — kept here only so the admin dashboard can seed a fresh,
// empty `products` collection with a starting catalog in one click.
const DESCRIPTIONS = {
    '8 ball carpet': 'A bold, oversized floor piece that turns any corner into a lounge.',
    'aesthetic posters': 'Timeless décor, carefully curated to help you create a room with character.',
    'ipod mirror': 'A playful, colour-block mirror that doubles as a statement piece.',
    'cigarette lamp': 'A slim accent lamp with a warm, moody glow for any shelf or corner.',
    'paint mirror': 'A hand-finished mirror with a splattered edge — no two quite alike.',
    'skateboards': 'Deck-mounted wall art for a room that leans more street than studio.',
    'one piece mirror': 'A single-panel mirror with clean lines and a wide reflective face.',
    'basketball net': 'A functional hoop and net set, ready to mount straight out of the box.',
    'corner mirror': 'A wide mirror built to fit tight corners without losing reflection.',
}

const starterProducts = [
    { image: productEightBallCarpet, name: '8 ball carpet', size: 'Ø120cm', price: '2000 DA', amount: 2000, category: 'decor', description: DESCRIPTIONS['8 ball carpet'] },
    { image: productAestheticPosters, name: 'aesthetic posters', size: '30×40cm', price: '1500 DA', amount: 1500, category: 'posters', description: DESCRIPTIONS['aesthetic posters'] },
    { image: productIpodMirror, name: 'ipod mirror', size: '50×70cm', price: '3800 DA', amount: 3800, category: 'mirrors', description: DESCRIPTIONS['ipod mirror'] },
    { image: productCigaretteLamp, name: 'cigarette lamp', size: '60×15cm', price: '4000 DA', amount: 4000, category: 'lamps', description: DESCRIPTIONS['cigarette lamp'] },
    { image: productPaintMirror, name: 'paint mirror', size: '40×60cm', price: '3000 DA', amount: 3000, category: 'mirrors', description: DESCRIPTIONS['paint mirror'] },
    { image: productAestheticPosters2, name: 'aesthetic posters', size: '30×40cm', price: '1500 DA', amount: 1500, category: 'posters', description: DESCRIPTIONS['aesthetic posters'] },
    { image: productSkateboards, name: 'skateboards', size: '80×20cm', price: '4500 DA', amount: 4500, category: 'decor', description: DESCRIPTIONS['skateboards'] },
    { image: productCigaretteLamp, name: 'cigarette lamp', size: '40×10cm', price: '2500 DA', amount: 2500, category: 'lamps', description: DESCRIPTIONS['cigarette lamp'] },
    { image: productOnePieceMirror, name: 'one piece mirror', size: '50×70cm', price: '3000 DA', amount: 3000, category: 'mirrors', description: DESCRIPTIONS['one piece mirror'] },
    { image: productBasketballNet, name: 'basketball net', size: 'Ø45cm', price: '2500 DA', amount: 2500, category: 'decor', description: DESCRIPTIONS['basketball net'] },
    { image: productCornerMirror, name: 'corner mirror', size: '60×60cm', price: '3500 DA', amount: 3500, category: 'mirrors', description: DESCRIPTIONS['corner mirror'] },
    { image: productEightBallCarpet, name: '8 ball carpet', size: 'Ø120cm', price: '2000 DA', amount: 2000, category: 'decor', description: DESCRIPTIONS['8 ball carpet'] },
    { image: productPaintMirror, name: 'paint mirror', size: '40×60cm', price: '3000 DA', amount: 3000, category: 'mirrors', description: DESCRIPTIONS['paint mirror'] },
    { image: productAestheticPosters2, name: 'aesthetic posters', size: '30×40cm', price: '1500 DA', amount: 1500, category: 'posters', description: DESCRIPTIONS['aesthetic posters'] },
    { image: productSkateboards, name: 'skateboards', size: '80×20cm', price: '4500 DA', amount: 4500, category: 'decor', description: DESCRIPTIONS['skateboards'] },
    { image: productCigaretteLamp, name: 'cigarette lamp', size: '40×10cm', price: '2500 DA', amount: 2500, category: 'lamps', description: DESCRIPTIONS['cigarette lamp'] },
]

export default starterProducts
