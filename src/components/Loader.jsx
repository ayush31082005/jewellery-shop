import { useState, useEffect } from 'react'

export default function Loader() {
  const [done, setDone] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 2400)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#0F0F0F', zIndex: 9000,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      transition: 'opacity 0.9s, visibility 0.9s',
      opacity: done ? 0 : 1, visibility: done ? 'hidden' : 'visible',
      pointerEvents: done ? 'none' : 'all',
    }}>
      {/* Gold diamond */}
      <div style={{
        width: 60, height: 60, marginBottom: '2rem',
        background: 'conic-gradient(from 0deg, #A07820, #F0D060, #D4AF37, #F0D060, #A07820)',
        clipPath: 'polygon(50% 0%, 100% 35%, 75% 100%, 25% 100%, 0% 35%)',
        animation: 'spin 3s linear infinite',
      }} />
      <div className="gold-shimmer" style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 48, fontWeight: 300, letterSpacing: 10,
      }}>SRI NAKSHATRA JEWELLERS& FANCY</div>
      <div style={{ width: 100, height: 1, background: 'rgba(212,175,55,0.2)', marginTop: '1.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'var(--gold)', transform: 'translateX(-100%)', animation: 'load 2s ease forwards 0.4s' }} />
      </div>
      <div style={{ fontSize: 10, letterSpacing: 5, textTransform: 'uppercase', color: 'rgba(212,175,55,0.45)', marginTop: '1rem', animation: 'fadein 1s ease 0.6s both' }}>
        Fine Jewellery · Est. 1985
      </div>
    </div>
  )
}
