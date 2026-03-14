import { useCart } from '../context/CartContext'

export default function Toast() {
  const { toast } = useCart()
  return (
    <div style={{
      position: 'fixed', bottom: '2.5rem', right: '2.5rem',
      background: 'var(--bg2)', color: 'var(--text)',
      padding: '1.2rem 1.8rem',
      borderLeft: '3px solid var(--gold)',
      fontSize: 13, letterSpacing: '0.3px',
      boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
      transform: toast.show ? 'translateX(0)' : 'translateX(150%)',
      transition: 'transform 0.45s cubic-bezier(0.34,1.56,0.64,1)',
      zIndex: 999, minWidth: 240, border: '1px solid var(--border2)',
      borderLeft: '3px solid var(--gold)',
    }}>
      <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 5 }}>
        {toast.title}
      </div>
      <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 12 }}>{toast.msg}</div>
    </div>
  )
}
