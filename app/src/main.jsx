import React, {useState} from 'react'
import { createRoot } from 'react-dom/client'
import Header from './header.jsx'
import Catalog from './catalog.jsx'
import './main.css'

function App(){
  const [cart, setCart] = useState([])
  const [token, setToken] = useState(null)
  const [checkoutDisabled, setCheckoutDisabled] = useState(false)

  const addToCart = (item, shouldAdd = true) => {
    setCart(prev => {
      if (shouldAdd) {
        return [...prev, item]
      }
      return prev.filter(i => i.id !== item.id)
    })
  }

  const getToken = async () => {
    try {
      const res = await fetch('http://localhost:3000/auth/token')
      const data = await res.json()

      if (data && data.token){
        setToken(data.token)
        localStorage.setItem('ms_token', data.token)
        alert('Signed in')
      }
    } catch (e){
      alert('Token request failed')
    }
  }

  const checkout = async () => {
    const t = token || localStorage.getItem('ms_token')
    
    if(!t) { 
        alert('Sign in first'); 
        return 
    }
    
    setCheckoutDisabled(true)
    try {
      const res = await fetch('http://localhost:3000/orders', {
        method:'POST',
        headers:{
            'Access-Control-Allow-Headers' : 'Content-Type',
            "Access-Control-Allow-Origin": "*",
            'Content-Type':'application/json',
             "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
            'Authorization':`Bearer ${t}`
        },
        body: JSON.stringify({items: cart.map(i=>({id:i.id,price:i.price||0}))})
      })

      if(res.status === 429) { 
        alert('Rate limit exceeded — try again later') 
      }
      else if (!res.ok) { 
        const txt = await res.text(); 
        alert('Checkout failed: ' + txt) 
      }
      else { 
        alert('Order placed'); 
        setCart([]) 
      }
    }catch(e) { 
        alert('Checkout error') 
    }
    
    setTimeout(()=>setCheckoutDisabled(false),2000)
  }

  return (
    <div className="app">
      <Header cartCount={cart.length} onCheckout={checkout} onGetToken={getToken} checkoutDisabled={checkoutDisabled} />
      <div className="container" style={{justifyContent:'center'}}>
        <div className="right" style={{maxWidth:1200,margin:'0 auto'}}>
          <div className="front">
            <Catalog onAddToCart={addToCart} />
          </div>
        </div>
      </div>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
