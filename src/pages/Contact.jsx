import { useState } from 'react'
import { useCart } from '../context/CartContext'

export default function Contact() {
  const { showToast } = useCart()
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', type: 'Custom Order' })

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) { showToast('Error', 'Please fill in all required fields.'); return }
    showToast('Thank You!', 'Your message has been received. We will contact you within 24 hours.')
    setForm({ name: '', email: '', phone: '', message: '', type: 'Custom Order' })
  }

  const inputStyle = { width: '100%', background: 'var(--bg3)', border: '1px solid var(--border2)', color: 'var(--text)', padding: '13px 14px', fontSize: 13, fontFamily: 'Jost, sans-serif', outline: 'none', marginBottom: '1rem', transition: 'border-color 0.3s' }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: 70 }}>
      <div className="container" style={{ padding: '3rem 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{ fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '0.7rem' }}>Get In Touch</span>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px,5vw,52px)', fontWeight: 300, color: 'var(--text)' }}>Let's Talk</h1>
          <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: '0.8rem', lineHeight: 1.8, maxWidth: 460, margin: '0.8rem auto 0' }}>Custom designs, bulk orders, or any query — our team is here to help.</p>
        </div>

        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }}>
          {/* Form */}
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '0.7rem' }}>Inquiry Type</label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['Custom Order', 'Product Query', 'Bulk Order', 'Other'].map(t => (
                  <button key={t} onClick={() => setForm(f => ({ ...f, type: t }))} style={{ padding: '8px 14px', fontSize: 11, letterSpacing: 1, border: '1px solid', borderColor: form.type === t ? 'var(--gold)' : 'var(--border2)', background: form.type === t ? 'var(--gold)' : 'var(--bg2)', color: form.type === t ? '#000' : 'var(--muted)', cursor: 'pointer', fontFamily: 'Jost, sans-serif', transition: 'all 0.2s' }}>{t}</button>
                ))}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
              <div>
                <label style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: '0.4rem' }}>Full Name *</label>
                <input style={inputStyle} placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} onFocus={e => e.target.style.borderColor = 'var(--gold)'} onBlur={e => e.target.style.borderColor = 'var(--border2)'} />
              </div>
              <div>
                <label style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: '0.4rem' }}>Phone</label>
                <input style={inputStyle} placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} onFocus={e => e.target.style.borderColor = 'var(--gold)'} onBlur={e => e.target.style.borderColor = 'var(--border2)'} />
              </div>
            </div>
            <label style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: '0.4rem' }}>Email *</label>
            <input style={inputStyle} placeholder="your@email.com" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} onFocus={e => e.target.style.borderColor = 'var(--gold)'} onBlur={e => e.target.style.borderColor = 'var(--border2)'} />
            <label style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: '0.4rem' }}>Message *</label>
            <textarea style={{ ...inputStyle, height: 140, resize: 'vertical' }} placeholder="Describe your query or custom design requirements..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} onFocus={e => e.target.style.borderColor = 'var(--gold)'} onBlur={e => e.target.style.borderColor = 'var(--border2)'} />
            <button onClick={handleSubmit} style={{ background: 'var(--gold)', color: '#000', border: 'none', padding: '14px 36px', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'Jost, sans-serif', fontWeight: 600, transition: 'background 0.3s', width: '100%' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--gold2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--gold)'}
            >Send Message →</button>
          </div>

          {/* Info */}
          <div>
            {[{ icon: '📍', title: 'Main Showroom', detail: '123 Jewellers Lane, Karol Bagh\nNew Delhi - 110005' }, { icon: '📞', title: 'Phone', detail: '+91 98765 43210\n+91 11 2345 6789' }, { icon: '✉', title: 'Email', detail: 'info@swarnajewellers.com\ncustom@swarnajewellers.com' }, { icon: '🕐', title: 'Store Hours', detail: 'Monday – Saturday: 10am – 8pm\nSunday: 11am – 6pm' }].map(item => (
              <div key={item.title} style={{ display: 'flex', gap: '1.2rem', padding: '1.2rem 0', borderBottom: '1px solid var(--border2)' }}>
                <div style={{ fontSize: 20, width: 32, flexShrink: 0, paddingTop: 2 }}>{item.icon}</div>
                <div>
                  <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.4rem' }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>{item.detail}</div>
                </div>
              </div>
            ))}
            <div style={{ marginTop: '1.8rem', padding: '1.5rem', border: '1px solid var(--border2)', background: 'var(--bg2)' }}>
              <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>Custom Design Process</div>
              {['Consultation & Design Brief', 'CAD Preview & Approval', 'Master Craftsman Execution', 'Quality Check & Delivery'].map((step, i) => (
                <div key={step} style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
                  <span style={{ width: 22, height: 22, border: '1px solid var(--gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'var(--gold)', flexShrink: 0 }}>{i + 1}</span>
                  <span style={{ fontSize: 13, color: 'var(--muted)', paddingTop: 1 }}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .contact-grid { grid-template-columns: 1fr 1fr !important; gap: 5rem !important; }
        }
      `}</style>
    </div>
  )
}
