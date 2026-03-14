import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [toast, setToast] = useState({ show: false, title: '', msg: '' })

  const addToCart = (product) => {
    setCartItems(prev => {
      const exists = prev.find(i => i.id === product.id)
      if (exists) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, qty: 1 }]
    })
    showToast('Cart mein Add!', `${product.name} successfully add hua.`)
  }

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(i => i.id !== id))
  }

  const updateQty = (id, qty) => {
    if (qty < 1) return removeFromCart(id)
    setCartItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
  }

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(i => i.id === product.id)
      if (exists) return prev.filter(i => i.id !== product.id)
      showToast('Wishlist!', `${product.name} wishlist mein add hua.`)
      return [...prev, product]
    })
  }

  const isWishlisted = (id) => wishlist.some(i => i.id === id)

  const showToast = (title, msg) => {
    setToast({ show: true, title, msg })
    setTimeout(() => setToast({ show: false, title: '', msg: '' }), 3000)
  }

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0)
  const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0)

  return (
    <CartContext.Provider value={{
      cartItems, cartCount, cartTotal,
      addToCart, removeFromCart, updateQty,
      wishlist, toggleWishlist, isWishlisted,
      toast, showToast
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
