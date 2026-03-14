import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'

const tabs = ['All', 'Rings', 'Necklaces', 'Earrings', 'Bangles', 'Bridal']
const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Highest Rated']

export default function Shop() {
  const [searchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState('All')
  const [sort, setSort] = useState('Featured')
  const [priceRange, setPriceRange] = useState(300000)
  const [filterOpen, setFilterOpen] = useState(false)

  useEffect(() => {
    const cat = searchParams.get('cat')
    if (cat) setActiveTab(cat.charAt(0).toUpperCase() + cat.slice(1))
  }, [searchParams])

  let filtered = activeTab === 'All' ? [...products] : products.filter(p => p.category === activeTab.toLowerCase())
  filtered = filtered.filter(p => p.price <= priceRange)
  if (sort === 'Price: Low to High') filtered.sort((a, b) => a.price - b.price)
  if (sort === 'Price: High to Low') filtered.sort((a, b) => b.price - a.price)
  if (sort === 'Highest Rated') filtered.sort((a, b) => b.rating - a.rating)

  const Sidebar = () => (
    <div style={{ padding: '2rem 1.5rem', background: 'var(--bg2)', borderRight: '1px solid var(--border2)' }}>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>Categories</div>
        {tabs.map(t => (
          <div key={t} onClick={() => { setActiveTab(t); setFilterOpen(false) }} style={{ padding: '8px 0 8px 12px', fontSize: 13, cursor: 'pointer', color: activeTab === t ? 'var(--text)' : 'var(--muted)', borderLeft: activeTab === t ? '2px solid var(--gold)' : '2px solid transparent', fontWeight: activeTab === t ? 500 : 300, transition: 'all 0.2s' }}>{t}</div>
        ))}
      </div>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>Max Budget</div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: 'var(--gold)', marginBottom: '0.7rem' }}>₹{priceRange.toLocaleString('en-IN')}</div>
        <input type="range" min={20000} max={300000} step={5000} value={priceRange} onChange={e => setPriceRange(+e.target.value)} style={{ width: '100%', accentColor: 'var(--gold)' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--muted)', marginTop: 4 }}><span>₹20K</span><span>₹3L</span></div>
      </div>
      <div>
        <div style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>Sort By</div>
        {sortOptions.map(s => (
          <div key={s} onClick={() => setSort(s)} style={{ padding: '6px 0', fontSize: 12, cursor: 'pointer', color: sort === s ? 'var(--text)' : 'var(--muted)', fontWeight: sort === s ? 500 : 300, transition: 'color 0.2s' }}>{s}</div>
        ))}
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: 70 }}>
      {/* Header */}
      <div style={{ padding: '3rem 1.5rem 1.5rem', borderBottom: '1px solid var(--border2)', background: 'var(--bg2)' }}>
        <div className="container">
          <span style={{ fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '0.6rem' }}>Discover</span>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px,5vw,52px)', fontWeight: 300, color: 'var(--text)' }}>Our Collections</h1>
            {/* Mobile Filter Toggle */}
            <button onClick={() => setFilterOpen(o => !o)} className="mobile-filter-btn" style={{ background: filterOpen ? 'var(--gold)' : 'var(--bg3)', color: filterOpen ? '#000' : 'var(--text)', border: '1px solid var(--border2)', padding: '9px 18px', fontSize: 11, letterSpacing: 1, cursor: 'pointer', fontFamily: 'Jost, sans-serif', display: 'none', transition: 'all 0.2s' }}>
              {filterOpen ? '✕ Close' : '⚙ Filters'}
            </button>
          </div>
          {/* Mobile category pills */}
          <div className="mobile-tabs" style={{ display: 'none', gap: '0.4rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            {tabs.map(t => (
              <button key={t} onClick={() => setActiveTab(t)} style={{ background: activeTab === t ? 'var(--gold)' : 'var(--bg3)', border: '1px solid var(--border2)', color: activeTab === t ? '#000' : 'var(--muted)', padding: '6px 14px', fontSize: 10, letterSpacing: 1, cursor: 'pointer', fontFamily: 'Jost, sans-serif', fontWeight: activeTab === t ? 600 : 400 }}>{t}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile filter panel */}
      <div className="mobile-filter-panel" style={{ display: 'none', overflow: 'hidden', maxHeight: filterOpen ? 600 : 0, transition: 'max-height 0.4s ease' }}>
        <Sidebar />
      </div>

      {/* Desktop Layout */}
      <div style={{ display: 'flex', maxWidth: 1400, margin: '0 auto' }}>
        {/* Desktop Sidebar */}
        <div className="desktop-sidebar" style={{ width: 220, flexShrink: 0 }}>
          <Sidebar />
        </div>

        {/* Products */}
        <div style={{ flex: 1, padding: '2.5rem 1.5rem', minWidth: 0 }}>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: '1.5rem' }}>{filtered.length} products found</div>
          {filtered.length > 0 ? (
            <div className="product-grid">
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--muted)' }}>
              <div style={{ fontSize: 48, marginBottom: '1rem' }}>💎</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: 'var(--text)' }}>No products found in this category</div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-sidebar { display: none !important; }
          .mobile-filter-btn { display: block !important; }
          .mobile-filter-panel { display: block !important; }
          .mobile-tabs { display: flex !important; }
        }
      `}</style>
    </div>
  )
}
