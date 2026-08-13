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
const starterProducts = [
    { image: productEightBallCarpet, name: '8 ball carpet', size: 'Ø120cm', price: '2000 DA', amount: 2000, category: 'decor' },
    { image: productAestheticPosters, name: 'aesthetic posters', size: '30×40cm', price: '1500 DA', amount: 1500, category: 'posters' },
    { image: productIpodMirror, name: 'ipod mirror', size: '50×70cm', price: '3800 DA', amount: 3800, category: 'mirrors' },
    { image: productCigaretteLamp, name: 'cigarette lamp', size: '60×15cm', price: '4000 DA', amount: 4000, category: 'lamps' },
    { image: productPaintMirror, name: 'paint mirror', size: '40×60cm', price: '3000 DA', amount: 3000, category: 'mirrors' },
    { image: productAestheticPosters2, name: 'aesthetic posters', size: '30×40cm', price: '1500 DA', amount: 1500, category: 'posters' },
    { image: productSkateboards, name: 'skateboards', size: '80×20cm', price: '4500 DA', amount: 4500, category: 'decor' },
    { image: productCigaretteLamp, name: 'cigarette lamp', size: '40×10cm', price: '2500 DA', amount: 2500, category: 'lamps' },
    { image: productOnePieceMirror, name: 'one piece mirror', size: '50×70cm', price: '3000 DA', amount: 3000, category: 'mirrors' },
    { image: productBasketballNet, name: 'basketball net', size: 'Ø45cm', price: '2500 DA', amount: 2500, category: 'decor' },
    { image: productCornerMirror, name: 'corner mirror', size: '60×60cm', price: '3500 DA', amount: 3500, category: 'mirrors' },
    { image: productEightBallCarpet, name: '8 ball carpet', size: 'Ø120cm', price: '2000 DA', amount: 2000, category: 'decor' },
    { image: productPaintMirror, name: 'paint mirror', size: '40×60cm', price: '3000 DA', amount: 3000, category: 'mirrors' },
    { image: productAestheticPosters2, name: 'aesthetic posters', size: '30×40cm', price: '1500 DA', amount: 1500, category: 'posters' },
    { image: productSkateboards, name: 'skateboards', size: '80×20cm', price: '4500 DA', amount: 4500, category: 'decor' },
    { image: productCigaretteLamp, name: 'cigarette lamp', size: '40×10cm', price: '2500 DA', amount: 2500, category: 'lamps' },
]

export default starterProducts
