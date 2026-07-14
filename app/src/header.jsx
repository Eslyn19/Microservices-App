import React from 'react'
import SpecularButton from './components/SpecularButton'
import shoppingCartIcon from './assets/shopping-cart.png'
import './header.css'

// Shootout to : https://www.flaticon.com/free-icons/"
export default function Header({cartCount=0, onCheckout, onGetToken, checkoutDisabled=false}){
  return (
    <header className="header">
      <div className="header-actions">
        <div className="header-cart">
          <img src={shoppingCartIcon} width="36" height="36" alt="Shopping cart" className="cart-icon" />
          <div className="cart-badge">{cartCount}</div>
        </div>
        <SpecularButton size="md" radius={12} onClick={onGetToken}>Sign In</SpecularButton>
        <SpecularButton size="md" radius={12} onClick={onCheckout} disabled={checkoutDisabled || cartCount===0}>Checkout</SpecularButton>
      </div>
    </header>
  )
}
