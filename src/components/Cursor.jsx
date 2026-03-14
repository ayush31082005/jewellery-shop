import { useEffect, useRef } from 'react'

export default function Cursor() {
  const curRef = useRef()
  const ringRef = useRef()

  useEffect(() => {
    const move = (e) => {
      curRef.current.style.left = e.clientX + 'px'
      curRef.current.style.top = e.clientY + 'px'
      ringRef.current.style.left = e.clientX + 'px'
      ringRef.current.style.top = e.clientY + 'px'
    }

    const hoverIn = () => ringRef.current?.classList.add('hover')
    const hoverOut = () => ringRef.current?.classList.remove('hover')

    document.addEventListener('mousemove', move)
    document.querySelectorAll('a,button,[data-hover]').forEach(el => {
      el.addEventListener('mouseenter', hoverIn)
      el.addEventListener('mouseleave', hoverOut)
    })

    return () => document.removeEventListener('mousemove', move)
  }, [])

  return (
    <>
      <div className="cursor" ref={curRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  )
}
