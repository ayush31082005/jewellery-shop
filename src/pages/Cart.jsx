import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { cartItems, cartTotal, removeFromCart, updateQty } = useCart()

  if (cartItems.length === 0) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: 70, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '70px 1.5rem 2rem' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: '1.2rem' }}>🛒</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(26px,5vw,36px)', fontWeight: 300, color: 'var(--text)', marginBottom: '1rem' }}>Your cart is empty</h2>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: '2rem' }}>Discover something beautiful</p>
        <Link to="/shop" style={{ display: 'inline-block', background: 'var(--gold)', color: '#000', padding: '13px 28px', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', textDecoration: 'none', fontFamily: 'Jost, sans-serif', fontWeight: 600 }}>Shop Now</Link>
      </div>
    </div>
  )

  const tax = Math.round(cartTotal * 0.03)
  const shipping = cartTotal > 50000 ? 0 : 499
  const total = cartTotal + tax + shipping

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: 70 }}>
      <div className="container" style={{ padding: '3rem 1.5rem' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <span style={{ fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '0.6rem' }}>Your Selection</span>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px,5vw,48px)', fontWeight: 300, color: 'var(--text)' }}>Shopping Cart</h1>
        </div>

        {/* Responsive cart layout */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Items */}
          <div>
            {cartItems.map(item => (
              <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '1rem', alignItems: 'start', padding: '1.2rem 0', borderBottom: '1px solid var(--border2)' }}>
                <div style={{ background: 'var(--bg3)', height: 80, overflow: 'hidden', flexShrink: 0 }}>
                  {item.image ? <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.display = 'none'} /> : <span style={{ fontSize: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>{item.emoji}</span>}
                </div>
                <div>
                  <div style={{ fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.3rem' }}>{item.metal}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(16px,2.5vw,20px)', color: 'var(--text)', marginBottom: '0.6rem' }}>{item.name}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border2)' }}>
                      <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ width: 30, height: 30, background: 'none', border: 'none', color: 'var(--text)', cursor: 'pointer', fontSize: 16 }}>−</button>
                      <span style={{ width: 28, textAlign: 'center', fontSize: 13, color: 'var(--text)' }}>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ width: 30, height: 30, background: 'none', border: 'none', color: 'var(--text)', cursor: 'pointer', fontSize: 16 }}>+</button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: 'var(--gold)' }}>₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
                      <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: 'var(--muted)', fontSize: 11, cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#e74c3c'} onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}>✕</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border2)', padding: '1.8rem' }}>
            <div style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.3rem' }}>Order Summary</div>
            {[['Subtotal', `₹${cartTotal.toLocaleString('en-IN')}`], ['GST (3%)', `₹${tax.toLocaleString('en-IN')}`], ['Delivery', shipping === 0 ? 'Free' : `₹${shipping}`]].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', fontSize: 13, borderBottom: '1px solid var(--border2)' }}>
                <span style={{ color: 'var(--muted)' }}>{k}</span>
                <span style={{ color: v === 'Free' ? '#27ae60' : 'var(--text)' }}>{v}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0' }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: 'var(--text)' }}>Total</span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: 'var(--gold)' }}>₹{total.toLocaleString('en-IN')}</span>
            </div>
            {shipping === 0 && <div style={{ fontSize: 10, color: '#27ae60', marginBottom: '1rem' }}>✓ Free delivery applied</div>}
            <div style={{ display: 'flex', border: '1px solid var(--border2)', marginBottom: '1rem', background: 'var(--bg3)' }}>
              <input type="text" placeholder="Coupon code..." style={{ flex: 1, background: 'transparent', border: 'none', color: 'var(--text)', padding: '10px 12px', fontSize: 12, fontFamily: 'Jost, sans-serif', outline: 'none', minWidth: 0 }} />
              <button style={{ background: 'none', border: 'none', color: 'var(--gold)', padding: '10px 14px', fontSize: 11, cursor: 'pointer', fontFamily: 'Jost, sans-serif' }}>Apply</button>
            </div>
            <button style={{ width: '100%', background: 'var(--gold)', color: '#000', border: 'none', padding: '15px', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'Jost, sans-serif', fontWeight: 600, marginBottom: '0.8rem', transition: 'background 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--gold2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--gold)'}
            >Proceed to Checkout →</button>
            <Link to="/shop" style={{ display: 'block', textAlign: 'center', fontSize: 11, letterSpacing: 1, color: 'var(--muted)', textDecoration: 'none', marginTop: '0.5rem' }}>← Continue Shopping</Link>
          </div>
        </div>

        <style>{`
          @media (min-width: 900px) {
            .cart-layout { display: grid !important; grid-template-columns: 1fr 360px; gap: 3rem; }
          }
        `}</style>
      </div>
    </div>
  )
}
