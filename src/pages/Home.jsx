import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { products, categories, testimonials, heroSlides } from '../data/products'
import ProductCard from '../components/ProductCard'

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

function useCounter() {
  const [counted, setCounted] = useState(false)
  const ref = useRef()
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !counted) {
        setCounted(true)
        document.querySelectorAll('[data-val]').forEach(el => {
          const target = +el.dataset.val; let cur = 0; const step = target / 70
          const iv = setInterval(() => {
            cur = Math.min(cur + step, target)
            el.textContent = (target >= 1000 ? Math.round(cur).toLocaleString('en-IN') : Math.round(cur)) + '+'
            if (cur >= target) clearInterval(iv)
          }, 20)
        })
      }
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [counted])
  return ref
}

function useTimer() {
  const [secs, setSecs] = useState(8 * 3600 + 34 * 60 + 22)
  useEffect(() => {
    const t = setInterval(() => setSecs(s => Math.max(0, s - 1)), 1000)
    return () => clearInterval(t)
  }, [])
  return {
    h: String(Math.floor(secs / 3600)).padStart(2, '0'),
    m: String(Math.floor((secs % 3600) / 60)).padStart(2, '0'),
    s: String(secs % 60).padStart(2, '0'),
  }
}

function HeroSlider() {
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % heroSlides.length), 5000)
    return () => clearInterval(t)
  }, [])
  const slide = heroSlides[current]

  return (
    <section style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', background: '#0A0A0A' }}>
      {heroSlides.map((s, i) => (
        <div key={s.id} style={{ position: 'absolute', inset: 0, opacity: i === current ? 1 : 0, transition: 'opacity 1s ease' }}>
          <img src={s.image} alt={s.italic} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} onError={e => { e.target.style.display = 'none' }} />
        </div>
      ))}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.25) 100%)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(to right, transparent, var(--gold), transparent)', opacity: 0.35 }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1300, margin: '0 auto', padding: '0 1.5rem', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div key={`tag-${current}`} style={{ fontSize: 10, letterSpacing: 5, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: 12, animation: 'fadeSlide 0.8s ease both' }}>
          <div style={{ width: 28, height: 1, background: 'var(--gold)', flexShrink: 0 }} />
          {slide.tag}
        </div>
        <h1 key={`h1-${current}`} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(40px, 7vw, 82px)', fontWeight: 300, lineHeight: 1.08, color: '#fff', marginBottom: '1.2rem', animation: 'fadeSlide 0.9s ease 0.1s both' }}>
          {slide.title[0]}<br />{slide.title[1]}<br />
          <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>{slide.italic}</em>
        </h1>
        <p key={`sub-${current}`} style={{ fontSize: 'clamp(12px, 1.5vw, 14px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.9, maxWidth: 420, fontWeight: 300, marginBottom: '2.5rem', animation: 'fadeSlide 0.9s ease 0.2s both' }}>{slide.sub}</p>
        <div key={`cta-${current}`} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', animation: 'fadeSlide 0.9s ease 0.3s both' }}>
          <Link to="/shop" style={{ background: 'var(--gold)', color: '#000', padding: '13px 32px', fontSize: 11, letterSpacing: '2.5px', textTransform: 'uppercase', textDecoration: 'none', fontFamily: 'Jost, sans-serif', fontWeight: 600, transition: 'all 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--gold2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--gold)'}
          >Explore Collection</Link>
          <Link to="/contact" style={{ background: 'transparent', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.3)', padding: '12px 28px', fontSize: 11, letterSpacing: '2.5px', textTransform: 'uppercase', textDecoration: 'none', fontFamily: 'Jost, sans-serif', fontWeight: 400, transition: 'all 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
          >Custom Order</Link>
        </div>
      </div>

      {/* Indicators */}
      <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.6rem', zIndex: 3 }}>
        {heroSlides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} style={{ width: i === current ? 28 : 8, height: 8, background: i === current ? 'var(--gold)' : 'rgba(255,255,255,0.3)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.4s', borderRadius: 4 }} />
        ))}
      </div>
      <div style={{ position: 'absolute', bottom: '2.2rem', right: '1.5rem', zIndex: 3, fontSize: 12, color: 'rgba(255,255,255,0.3)', letterSpacing: 2 }}>
        <span style={{ color: 'var(--gold)', fontSize: 18, fontFamily: "'Cormorant Garamond', serif" }}>{String(current + 1).padStart(2, '0')}</span> / {String(heroSlides.length).padStart(2, '0')}
      </div>
    </section>
  )
}

function CollectionCard({ cat, span }) {
  const [hov, setHov] = useState(false)
  const [imgErr, setImgErr] = useState(false)
  return (
    <div style={{ gridRow: span ? '1/3' : 'auto', position: 'relative', overflow: 'hidden', cursor: 'pointer', minHeight: 200 }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      {!imgErr
        ? <img src={cat.image} alt={cat.name} onError={() => setImgErr(true)} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: hov ? 'scale(1.07)' : 'scale(1)', transition: 'transform 0.65s ease' }} />
        : <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #1a1208, #2d2010)' }} />
      }
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, rgba(0,0,0,${hov ? 0.88 : 0.72}) 0%, rgba(0,0,0,${hov ? 0.2 : 0.05}) 60%)`, transition: 'all 0.4s' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem', transform: hov ? 'translateY(0)' : 'translateY(10px)', transition: 'transform 0.4s' }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: span ? 28 : 20, fontWeight: 300, color: '#fff', marginBottom: '0.3rem' }}>{cat.name}</div>
        <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>{cat.count} Designs</div>
        <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)', marginTop: '0.6rem', opacity: hov ? 1 : 0, transition: 'opacity 0.3s' }}>Explore →</div>
      </div>
    </div>
  )
}

export default function Home() {
  useReveal()
  const statsRef = useCounter()
  const timer = useTimer()
  const [activeTab, setActiveTab] = useState('All')
  const tabs = ['All', 'Rings', 'Necklaces', 'Earrings', 'Bridal']
  const filtered = activeTab === 'All' ? products : products.filter(p => p.category === activeTab.toLowerCase())

  return (
    <div style={{ background: 'var(--bg)' }}>
      <HeroSlider />

      {/* MARQUEE */}
      <div style={{ background: 'var(--gold)', padding: '12px 0', overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', top:0,bottom:0,left:0,width:60, background:'linear-gradient(to right,var(--gold),transparent)',zIndex:2}} />
        <div style={{ position: 'absolute', top:0,bottom:0,right:0,width:60, background:'linear-gradient(to left,var(--gold),transparent)',zIndex:2}} />
        <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'marquee 25s linear infinite' }}>
          {[...Array(2)].map((_, ri) =>
            ['22K Gold Certified','BIS Hallmark','Lifetime Exchange','Free Delivery','No-Cost EMI','Certified Diamonds','1000+ Designs','Handcrafted Heritage'].map((t,i) => (
              <span key={`${ri}-${i}`} style={{ display:'inline-flex',alignItems:'center',gap:'1.5rem',padding:'0 1.5rem' }}>
                <span style={{ fontSize:10,letterSpacing:3,textTransform:'uppercase',color:'#000',fontWeight:600 }}>{t}</span>
                <span style={{ color:'rgba(0,0,0,0.35)',fontSize:7 }}>◆</span>
              </span>
            ))
          )}
        </div>
      </div>

      {/* STATS */}
      <div className="reveal stats-grid" ref={statsRef} style={{ borderBottom:'1px solid var(--border2)', background:'var(--bg2)' }}>
        {[{val:40,label:'Years of Craftsmanship'},{val:1200,label:'Unique Designs'},{val:50000,label:'Happy Customers'},{val:12,label:'Showrooms Across India'}].map((s,i,arr) => (
          <div key={s.label} style={{ padding:'2.5rem 1.5rem', textAlign:'center', borderRight: i<arr.length-1 ? '1px solid var(--border2)' : 'none', transition:'background 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.background='var(--bg3)'}
            onMouseLeave={e => e.currentTarget.style.background='transparent'}
          >
            <div data-val={s.val} style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(36px,4vw,52px)', fontWeight:300, color:'var(--gold)', lineHeight:1, marginBottom:'0.4rem' }}>0</div>
            <div style={{ fontSize:10,letterSpacing:'2px',textTransform:'uppercase',color:'var(--muted)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* COLLECTIONS */}
      <section className="sec-pad reveal">
        <div className="container">
          <span style={{ fontSize:10,letterSpacing:4,textTransform:'uppercase',color:'var(--gold)',display:'block',marginBottom:'0.8rem' }}>Our Collections</span>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(32px,4vw,50px)', fontWeight:300, color:'var(--text)', lineHeight:1.1, marginBottom:'2.5rem' }}>
            Something Special<br /><em style={{ fontStyle:'italic',color:'var(--muted)' }}>For Every Occasion</em>
          </h2>
          <div className="collection-grid">
            {categories.map((cat,i) => <CollectionCard key={cat.id} cat={cat} span={i===0} />)}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="sec-pad reveal" id="products" style={{ background:'var(--bg2)' }}>
        <div className="container">
          <div style={{ display:'flex',alignItems:'flex-end',justifyContent:'space-between',flexWrap:'wrap',gap:'1.2rem',marginBottom:'2rem' }}>
            <div>
              <span style={{ fontSize:10,letterSpacing:4,textTransform:'uppercase',color:'var(--gold)',display:'block',marginBottom:'0.6rem' }}>Handpicked for You</span>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(28px,3.5vw,42px)', fontWeight:300, color:'var(--text)' }}>Bestsellers</h2>
            </div>
            <div style={{ display:'flex',gap:'0.4rem',flexWrap:'wrap' }}>
              {tabs.map(t => (
                <button key={t} onClick={() => setActiveTab(t)} style={{ background:activeTab===t?'var(--gold)':'none', border:'1px solid', borderColor:activeTab===t?'var(--gold)':'var(--border2)', color:activeTab===t?'#000':'var(--muted)', padding:'7px 16px', fontSize:10, letterSpacing:2, textTransform:'uppercase', cursor:'pointer', fontFamily:'Jost,sans-serif', fontWeight:activeTab===t?600:400, transition:'all 0.3s' }}>{t}</button>
              ))}
            </div>
          </div>
          <div className="product-grid">
            {(filtered.length ? filtered : products).slice(0,8).map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          <div style={{ textAlign:'center',marginTop:'2.5rem' }}>
            <Link to="/shop" style={{ display:'inline-block',background:'transparent',border:'1px solid var(--gold)',color:'var(--gold)',padding:'13px 36px',fontSize:11,letterSpacing:'2.5px',textTransform:'uppercase',textDecoration:'none',fontFamily:'Jost,sans-serif',transition:'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.background='var(--gold)'; e.currentTarget.style.color='#000' }}
              onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='var(--gold)' }}
            >View Full Collection</Link>
          </div>
        </div>
      </section>

      {/* OFFER BANNER */}
      <section className="sec-pad reveal" style={{ background:'#0A0A0A', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute',inset:0, background:'radial-gradient(ellipse at center,rgba(212,175,55,0.06) 0%,transparent 70%)' }} />
        <div style={{ maxWidth:700,margin:'0 auto',textAlign:'center',position:'relative',zIndex:2,padding:'0 1rem' }}>
          <div style={{ display:'flex',alignItems:'center',justifyContent:'center',gap:'1rem',marginBottom:'1.8rem' }}>
            <div style={{ flex:1,maxWidth:70,height:1,background:'linear-gradient(to right,transparent,var(--gold))' }} />
            <span style={{ color:'var(--gold)',fontSize:14 }}>◆</span>
            <div style={{ flex:1,maxWidth:70,height:1,background:'linear-gradient(to left,transparent,var(--gold))' }} />
          </div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(30px,5vw,56px)', fontWeight:300, color:'#fff', lineHeight:1.1, marginBottom:'1.2rem' }}>
            Festive Season <em style={{ fontStyle:'italic',color:'var(--gold)' }}>Special</em><br />Offer Ending Soon
          </h2>
          <p style={{ fontSize:'clamp(12px,1.5vw,13px)',color:'rgba(255,255,255,0.45)',lineHeight:1.9,marginBottom:'2.5rem',fontWeight:300 }}>
            Celebrate this festive season with the gift of gold. Get 20% extra off on all gold jewellery plus complimentary luxury packaging.
          </p>
          {/* Timer */}
          <div style={{ display:'flex',justifyContent:'center',gap:'1rem',marginBottom:'2.5rem',alignItems:'flex-start',flexWrap:'wrap' }}>
            {[{val:timer.h,label:'Hours'},{val:timer.m,label:'Minutes'},{val:timer.s,label:'Seconds'}].map((t,i,arr) => (
              <div key={t.label} style={{ display:'flex',alignItems:'flex-start',gap:'1rem' }}>
                <div style={{ textAlign:'center' }}>
                  <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(36px,5vw,56px)', fontWeight:300, color:'var(--gold)', display:'block', lineHeight:1 }}>{t.val}</span>
                  <div style={{ fontSize:9,letterSpacing:3,textTransform:'uppercase',color:'rgba(255,255,255,0.25)',marginTop:5 }}>{t.label}</div>
                </div>
                {i<arr.length-1 && <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:36, color:'var(--gold)', opacity:0.35, paddingTop:6 }}>:</span>}
              </div>
            ))}
          </div>
          <div style={{ display:'inline-block',border:'1px solid rgba(212,175,55,0.3)',padding:'12px 28px',marginBottom:'2rem' }}>
            <span style={{ fontSize:10,letterSpacing:3,textTransform:'uppercase',color:'rgba(255,255,255,0.35)' }}>Use Code</span>
            <strong style={{ fontSize:22,letterSpacing:7,color:'var(--gold)',fontWeight:400,display:'block',marginTop:4 }}>FESTIVE20</strong>
          </div>
          <br />
          <Link to="/shop" style={{ display:'inline-block',background:'var(--gold)',color:'#000',padding:'14px 36px',fontSize:11,letterSpacing:'2.5px',textTransform:'uppercase',textDecoration:'none',fontFamily:'Jost,sans-serif',fontWeight:600,transition:'all 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.background='var(--gold2)'}
            onMouseLeave={e => e.currentTarget.style.background='var(--gold)'}
          >Shop Now</Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="sec-pad reveal" style={{ background:'var(--bg2)' }}>
        <div className="container">
          <div style={{ textAlign:'center',marginBottom:'3rem' }}>
            <span style={{ fontSize:10,letterSpacing:4,textTransform:'uppercase',color:'var(--gold)',display:'block',marginBottom:'0.8rem' }}>Customer Stories</span>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(28px,4vw,50px)', fontWeight:300, color:'var(--text)', lineHeight:1.1 }}>
              Their Joy,<br /><em style={{ fontStyle:'italic',color:'var(--muted)' }}>Our Greatest Pride</em>
            </h2>
          </div>
          <div className="testi-grid">
            {testimonials.map(t => (
              <div key={t.id} style={{ border:'1px solid var(--border2)',padding:'2rem',background:'var(--bg3)',transition:'all 0.4s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(212,175,55,0.25)'; e.currentTarget.style.background='var(--surface)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border2)'; e.currentTarget.style.background='var(--bg3)' }}
              >
                <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:48,color:'var(--gold)',opacity:0.18,lineHeight:1,marginBottom:'0.8rem' }}>"</div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontStyle:'italic',color:'rgba(255,255,255,0.75)',lineHeight:1.75,marginBottom:'1.2rem' }}>{t.text}</div>
                <div style={{ color:'var(--gold)',fontSize:13,letterSpacing:2,marginBottom:'0.6rem' }}>{'★'.repeat(t.rating)}</div>
                <div style={{ fontSize:10,letterSpacing:2,textTransform:'uppercase',color:'var(--muted)' }}>— {t.author}, {t.city}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <div className="sec-pad reveal" style={{ background:'#0A0A0A',borderTop:'1px solid var(--border2)',paddingTop:'4rem',paddingBottom:'4rem' }}>
        <div style={{ maxWidth:520,margin:'0 auto',textAlign:'center',padding:'0 1rem' }}>
          <h3 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(26px,4vw,38px)',fontWeight:300,color:'var(--text)',marginBottom:'0.8rem' }}>Get Exclusive Offers First</h3>
          <p style={{ fontSize:13,color:'var(--muted)',marginBottom:'2rem',lineHeight:1.9 }}>Join our newsletter and be the first to discover new designs, special offers and bridal lookbooks.</p>
          <div style={{ display:'flex',border:'1px solid var(--border2)',background:'var(--bg2)' }}>
            <input type="email" placeholder="Your email address..." style={{ flex:1,background:'transparent',border:'none',color:'var(--text)',padding:'14px 16px',fontSize:13,fontFamily:'Jost,sans-serif',outline:'none',minWidth:0 }} />
            <button style={{ background:'var(--gold)',color:'#000',border:'none',padding:'14px 20px',fontSize:10,letterSpacing:2,textTransform:'uppercase',cursor:'pointer',fontFamily:'Jost,sans-serif',fontWeight:600,transition:'background 0.3s',flexShrink:0 }}
              onMouseEnter={e => e.currentTarget.style.background='var(--gold2)'}
              onMouseLeave={e => e.currentTarget.style.background='var(--gold)'}
            >Subscribe →</button>
          </div>
        </div>
      </div>
    </div>
  )
}
