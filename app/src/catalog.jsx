import React from 'react'
import Masonry from './components/Masonry'
import Image1 from './assets/Image1.jpg'
import Image2 from './assets/Image2.jpg'
import Image3 from './assets/Image3.jpg'
import Image4 from './assets/Image4.jpg'
import Image5 from './assets/Image5.jpg'
import Image6 from './assets/Image6.jpg'
import Image7 from './assets/Image7.jpg'
import Image8 from './assets/Image8.jpg'
import Image9 from './assets/Image9.jpg'
import Image10 from './assets/Image10.jpg'

const items = [
  { id: '1', img: Image1, height: 420 },
  { id: '2', img: Image2, height: 360 },
  { id: '3', img: Image3, height: 500 },
  { id: '4', img: Image4, height: 380 },
  { id: '5', img: Image5, height: 460 },
  { id: '6', img: Image6, height: 300 },
  { id: '7', img: Image7, height: 520 },
  { id: '8', img: Image8, height: 420 },
  { id: '9', img: Image9, height: 380 },
  { id: '10', img: Image10, height: 360 }
]

export default function Catalog({onAddToCart}){
  return (
    <div className="card">
        <Masonry 
            items={items} 
            ease="power3.out" 
            duration={0.6} 
            stagger={0.05} 
            animateFrom="bottom" 
            scaleOnHover 
            hoverScale={0.95} 
            blurToFocus colorShiftOnHover={false} 
            onAddToCart={onAddToCart} 
        />
    </div>
  )
}
