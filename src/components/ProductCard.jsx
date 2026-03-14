import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useCart()
  const [hovered, setHovered] = useState(false)
  const [imgError, setImgError] = useState(false)
  const wishlisted = isWishlisted(product.id)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--bg2)',
        border: '1px solid',
        borderColor: hovered ? 'rgba(212,175,55,0.4)' : 'var(--border2)',
        overflow: 'hidden',
        transition: 'all 0.35s',
        transform: hovered ? 'translateY(-5px)' : 'none',
        boxShadow: hovered ? '0 16px 40px rgba(0,0,0,0.5)' : 'none',
      }}
    >
      {/* Image */}
      <div style={{ aspectRatio: '1', position: 'relative', overflow: 'hidden', background: 'var(--bg3)' }}>
        {!imgError ? (
          <img src={product.image} alt={product.name} onError={() => setImgError(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transform: hovered ? 'scale(1.07)' : 'scale(1)', transition: 'transform 0.5s ease', display: 'block' }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, var(--bg3), var(--surface))' }}>
            <span style={{ fontSize: 60, filter: 'drop-shadow(0 4px 12px rgba(212,175,55,0.3))' }}>{product.emoji}</span>
          </div>
        )}
        <div style={{ position: 'absolute', inset: 0, background: hovered ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0)', transition: 'background 0.35s' }} />
        {product.badge && (
          <div style={{ position: 'absolute', top: 10, left: 10, background: product.badge === 'Limited' ? '#8B0000' : product.badge === 'Sale' ? '#1a472a' : product.badge === 'Bestseller' ? 'var(--gold)' : 'var(--bg)', color: product.badge === 'Bestseller' ? '#000' : '#fff', border: product.badge === 'Bestseller' ? 'none' : '1px solid rgba(255,255,255,0.15)', fontSize: 9, letterSpacing: '1.5px', textTransform: 'uppercase', padding: '4px 10px', fontWeight: 600 }}>{product.badge}</div>
        )}
        <button onClick={() => toggleWishlist(product)} style={{ position: 'absolute', top: 10, right: 10, width: 34, height: 34, border: '1px solid rgba(255,255,255,0.2)', background: wishlisted ? 'var(--gold)' : 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, cursor: 'pointer', transition: 'all 0.3s', color: wishlisted ? '#000' : '#fff', backdropFilter: 'blur(4px)' }}>{wishlisted ? '♥' : '♡'}</button>
      </div>

      {/* Info */}
      <div style={{ padding: '1rem 1.1rem' }}>
        <div style={{ fontSize: 9, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.3rem', opacity: 0.9 }}>{product.metal}</div>
        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(16px,2vw,20px)', color: 'var(--text)', marginBottom: '0.5rem', lineHeight: 1.2, transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = 'var(--gold)'}
            onMouseLeave={e => e.target.style.color = 'var(--text)'}
          >{product.name}</div>
        </Link>
        <div style={{ color: 'var(--gold)', fontSize: 11, letterSpacing: 1, marginBottom: '0.8rem' }}>
          {'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}
          <span style={{ fontSize: 10, color: 'var(--muted)', marginLeft: 4 }}>({product.reviews})</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
          <div style={{ minWidth: 0 }}>
            <span style={{ fontSize: 'clamp(15px,2vw,18px)', color: 'var(--gold)', fontWeight: 500 }}>₹{product.price.toLocaleString('en-IN')}</span>
            {product.oldPrice && <span style={{ fontSize: 11, color: 'var(--muted)', textDecoration: 'line-through', marginLeft: 6 }}>₹{product.oldPrice.toLocaleString('en-IN')}</span>}
          </div>
          <button onClick={() => addToCart(product)} style={{ background: 'none', border: '1px solid rgba(212,175,55,0.3)', color: 'var(--muted)', width: 34, height: 34, cursor: 'pointer', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s', flexShrink: 0 }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = '#000'; e.currentTarget.style.borderColor = 'var(--gold)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)' }}
          >+</button>
        </div>
      </div>
    </div>
  )
}
