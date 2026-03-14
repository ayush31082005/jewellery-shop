import { Link } from 'react-router-dom'

export default function Footer() {
  const cols = [
    { title: 'Collections', links: ['Rings', 'Necklaces', 'Earrings', 'Bangles', 'Bridal Sets'] },
    { title: 'Customer Care', links: ['Size Guide', 'EMI Options', 'Returns Policy', 'Warranty', 'Track Order'] },
    { title: 'Company', links: ['About Us', 'Showrooms', 'Careers', 'Contact Us', 'Blog'] },
  ]
  return (
    <footer style={{ background: '#0A0A0A', borderTop: '1px solid rgba(212,175,55,0.12)', padding: '4rem 1.5rem 2rem' }}>
      <div className="container">
        <div className="footer-grid" style={{ marginBottom: '3rem' }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 600, letterSpacing: 4, color: '#fff', textTransform: 'uppercase', marginBottom: '1.2rem' }}>
              SRI NAKSHATRA <span style={{ color: 'var(--gold)' }}>JEWELLERS& FANCY</span>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', lineHeight: 2, fontWeight: 300 }}>
              India's most trusted fine jewellery brand. A part of your cherished moments since 1985. BIS Hallmark certified with a lifetime craftsmanship guarantee.
            </p>
            <div style={{ marginTop: '1.5rem', fontSize: 12, color: 'rgba(255,255,255,0.2)', lineHeight: 2 }}>
              <div>📍 123 Jewellers Lane, Karol Bagh, New Delhi</div>
              <div>📞 +91  81792 49718</div>
              <div class="youtube-icon">
                <a href="https://www.youtube.com/@SRINAKSHATRAJEWELLERY" target="_blank" rel="noopener noreferrer">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
                    alt="YouTube Channel"
                    width="30"
                  />
                </a>
              </div>
            </div>
          </div>
          {cols.map(col => (
            <div key={col.title}>
              <h4 style={{ fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.2rem' }}>{col.title}</h4>
              <ul style={{ listStyle: 'none' }}>
                {col.links.map(l => (
                  <li key={l} style={{ marginBottom: '0.7rem' }}>
                    <Link to="#" style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', textDecoration: 'none', fontWeight: 300, transition: 'color 0.2s' }}
                      onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                      onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.3)'}
                    >{l}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.8rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.15)' }}>© 2025 Swarna Fine Jewellers. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            {['fb', 'ig', 'yt', 'in'].map(s => (
              <div key={s} style={{ width: 34, height: 34, border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'rgba(255,255,255,0.3)', cursor: 'pointer', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.3)' }}
              >{s}</div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
