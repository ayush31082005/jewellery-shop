import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'

export default function ProductDetail() {
  const { id } = useParams()
  const product = products.find(p => p.id === +id)
  const { addToCart, toggleWishlist, isWishlisted } = useCart()
  const [qty, setQty] = useState(1)
  const [imgErr, setImgErr] = useState(false)
  const related = products.filter(p => p.id !== +id && p.category === product?.category).slice(0, 4)

  if (!product) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', paddingTop: 70 }}>
      <div style={{ textAlign: 'center', padding: '0 1.5rem' }}>
        <div style={{ fontSize: 56, marginBottom: '1rem' }}>💎</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: 'var(--text)' }}>Product not found</h2>
        <Link to="/shop" style={{ display: 'inline-block', marginTop: '1.5rem', color: 'var(--gold)', fontSize: 12, letterSpacing: 2 }}>← Back to Shop</Link>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: 70 }}>
      <div className="container" style={{ padding: '3rem 1.5rem' }}>
        {/* Breadcrumb */}
        <div style={{ fontSize: 11, letterSpacing: 1, color: 'var(--muted)', marginBottom: '2.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
          <span>→</span>
          <Link to="/shop" style={{ color: 'inherit', textDecoration: 'none' }}>Shop</Link>
          <span>→</span>
          <span style={{ color: 'var(--gold)' }}>{product.name}</span>
        </div>

        {/* Product layout — stacked on mobile, side-by-side on desktop */}
        <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem' }}>
          {/* Image */}
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border2)', aspectRatio: '1', position: 'relative', overflow: 'hidden', maxHeight: 500 }}>
            {!imgErr
              ? <img src={product.image} alt={product.name} onError={() => setImgErr(true)} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg3)' }}>
                  <span style={{ fontSize: 120, filter: 'drop-shadow(0 0 30px rgba(212,175,55,0.4))' }}>{product.emoji}</span>
                </div>
            }
            {product.badge && <div style={{ position: 'absolute', top: 14, left: 14, background: 'var(--gold)', color: '#000', fontSize: 9, letterSpacing: '1.5px', textTransform: 'uppercase', padding: '5px 12px', fontWeight: 600 }}>{product.badge}</div>}
          </div>

          {/* Info */}
          <div>
            <div style={{ fontSize: 10, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.7rem' }}>{product.metal}</div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(30px,5vw,42px)', fontWeight: 300, color: 'var(--text)', lineHeight: 1.1, marginBottom: '0.8rem' }}>{product.name}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.2rem' }}>
              <span style={{ color: 'var(--gold)', fontSize: 14, letterSpacing: 2 }}>{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}</span>
              <span style={{ fontSize: 12, color: 'var(--muted)' }}>({product.reviews} reviews)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1.8rem' }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px,4vw,40px)', color: 'var(--gold)' }}>₹{product.price.toLocaleString('en-IN')}</span>
              {product.oldPrice && <span style={{ fontSize: 15, color: 'var(--muted)', textDecoration: 'line-through' }}>₹{product.oldPrice.toLocaleString('en-IN')}</span>}
            </div>
            <div style={{ borderTop: '1px solid var(--border2)', borderBottom: '1px solid var(--border2)', padding: '1.2rem 0', marginBottom: '1.8rem' }}>
              {[['Metal', '22K BIS Hallmark Gold'], ['Design', 'Handcrafted by master artisans'], ['Size', 'Customizable on request'], ['Delivery', 'Free in 5–7 days'], ['Warranty', 'Lifetime exchange']].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 13 }}>
                  <span style={{ color: 'var(--muted)' }}>{k}</span>
                  <span style={{ color: 'var(--text)' }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border2)', background: 'var(--bg2)' }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: 38, height: 44, background: 'none', border: 'none', color: 'var(--text)', fontSize: 18, cursor: 'pointer' }}>−</button>
                <span style={{ width: 40, textAlign: 'center', fontSize: 14, color: 'var(--text)' }}>{qty}</span>
                <button onClick={() => setQty(q => q + 1)} style={{ width: 38, height: 44, background: 'none', border: 'none', color: 'var(--text)', fontSize: 18, cursor: 'pointer' }}>+</button>
              </div>
              <button onClick={() => addToCart(product)} style={{ flex: 1, minWidth: 160, background: 'var(--gold)', color: '#000', border: 'none', padding: '13px 20px', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'Jost, sans-serif', fontWeight: 600, transition: 'background 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--gold2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--gold)'}
              >Add to Cart</button>
              <button onClick={() => toggleWishlist(product)} style={{ width: 44, height: 44, background: 'var(--bg2)', border: '1px solid var(--border2)', color: isWishlisted(product.id) ? 'var(--gold)' : 'var(--muted)', fontSize: 20, cursor: 'pointer', transition: 'all 0.3s' }}>
                {isWishlisted(product.id) ? '♥' : '♡'}
              </button>
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.9 }}>🔒 Secure payment · 📦 Free delivery · 🔄 30-day returns</div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div style={{ marginTop: '4rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span style={{ fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '0.7rem' }}>You May Also Like</span>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(24px,4vw,36px)', fontWeight: 300, color: 'var(--text)' }}>Related Products</h2>
            </div>
            <div className="product-grid">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (min-width: 768px) {
          .detail-grid { grid-template-columns: 1fr 1fr !important; gap: 4rem !important; }
        }
      `}</style>
    </div>
  )
}
