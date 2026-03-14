import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'

export default function Wishlist() {
  const { wishlist } = useCart()
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: 70 }}>
      <div className="container" style={{ padding: '3rem 1.5rem' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <span style={{ fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '0.6rem' }}>Saved Items</span>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(30px,5vw,48px)', fontWeight: 300, color: 'var(--text)' }}>My Wishlist</h1>
        </div>
        {wishlist.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 1rem' }}>
            <div style={{ fontSize: 64, marginBottom: '1.2rem' }}>♡</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(22px,4vw,30px)', fontWeight: 300, color: 'var(--text)', marginBottom: '1rem' }}>No items saved yet</h2>
            <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: '2rem' }}>Save your favourite jewellery pieces here</p>
            <Link to="/shop" style={{ display: 'inline-block', background: 'var(--gold)', color: '#000', padding: '13px 28px', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', textDecoration: 'none', fontFamily: 'Jost, sans-serif', fontWeight: 600 }}>Explore Collection</Link>
          </div>
        ) : (
          <div className="product-grid">
            {wishlist.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  )
}
