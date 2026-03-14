import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { cartCount, wishlist } = useCart()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [location])

  const links = [
    { label: 'Collection', to: '/shop' },
    { label: 'Rings', to: '/shop?cat=rings' },
    { label: 'Necklaces', to: '/shop?cat=necklaces' },
    { label: 'Bridal', to: '/shop?cat=bridal' },
    { label: 'Custom', to: '/contact' },
  ]

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
        padding: '0 1.5rem',
        background: menuOpen
          ? '#0F0F0F'
          : scrolled
            ? 'rgba(15,15,15,0.97)'
            : 'linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, transparent 100%)',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: (scrolled || menuOpen) ? '1px solid rgba(212,175,55,0.15)' : 'none',
        transition: 'all 0.4s',
      }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 70 }}>

          {/* Logo */}
          <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <img
              src="/logo.png"
              alt="Sri Nakshatra Jewellers"
              style={{ height: 45 }}
            />
          </Link>

          {/* Desktop Nav */}
          <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: '0 auto' }} className="desktop-nav">
            {links.map(l => (
              <li key={l.label}>
                <Link to={l.to} style={{
                  fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase',
                  color: location.pathname === l.to ? 'var(--gold)' : 'rgba(255,255,255,0.75)',
                  textDecoration: 'none', fontWeight: 400, transition: 'color 0.3s',
                }}
                  onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                  onMouseLeave={e => e.target.style.color = location.pathname === l.to ? 'var(--gold)' : 'rgba(255,255,255,0.75)'}
                >{l.label}</Link>
              </li>
            ))}
          </ul>

          {/* Right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <Link to="/wishlist" style={{ color: 'rgba(255,255,255,0.75)', fontSize: 20, textDecoration: 'none', padding: '8px 6px', position: 'relative', lineHeight: 1, transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.75)'}
            >
              ♡
              {wishlist.length > 0 && (
                <span style={{ position: 'absolute', top: 2, right: 0, width: 14, height: 14, borderRadius: '50%', background: 'var(--gold)', color: '#000', fontSize: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{wishlist.length}</span>
              )}
            </Link>

            <Link to="/cart" style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'var(--gold)', color: '#000', padding: '9px 18px', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', textDecoration: 'none', fontWeight: 600, transition: 'all 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--gold2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--gold)'}
            >
              <span className="hide-xs">Cart</span>
              <span style={{ background: '#000', color: 'var(--gold)', width: 18, height: 18, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700 }}>{cartCount}</span>
            </Link>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="hamburger"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'none', flexDirection: 'column', gap: 5, alignItems: 'center', justifyContent: 'center' }}
            >
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  display: 'block', width: 22, height: 1.5,
                  background: '#fff', borderRadius: 2,
                  transition: 'all 0.3s',
                  transform: menuOpen
                    ? i === 0 ? 'rotate(45deg) translate(4.5px, 4.5px)'
                      : i === 2 ? 'rotate(-45deg) translate(4.5px, -4.5px)'
                        : 'scaleX(0)'
                    : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }} />
              ))}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div style={{
          maxHeight: menuOpen ? 400 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.4s ease',
          borderTop: menuOpen ? '1px solid rgba(212,175,55,0.1)' : 'none',
        }} className="mobile-menu">
          {links.map((l, i) => (
            <Link key={l.label} to={l.to} style={{
              display: 'block', padding: '1rem 0',
              fontSize: 12, letterSpacing: '2px', textTransform: 'uppercase',
              color: location.pathname === l.to ? 'var(--gold)' : 'rgba(255,255,255,0.7)',
              textDecoration: 'none', fontWeight: 400,
              borderBottom: i < links.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              animation: menuOpen ? `fadein 0.3s ease ${i * 0.05}s both` : 'none',
            }}>{l.label}</Link>
          ))}
        </div>
      </nav>

      {/* Responsive Styles injected via style tag */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
          .hide-xs { display: none !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu { display: none !important; }
        }
      `}</style>
    </>
  )
}
