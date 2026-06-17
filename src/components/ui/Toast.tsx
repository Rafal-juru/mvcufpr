import { useEffect, useState } from 'react'

interface ToastProps {
  message: string
  detail?: string
  onClose: () => void
  duration?: number
}

export default function Toast({ message, detail, onClose, duration = 4500 }: ToastProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
    const hide = setTimeout(() => setVisible(false), duration - 400)
    const close = setTimeout(onClose, duration)
    return () => { clearTimeout(hide); clearTimeout(close) }
  }, [duration, onClose])

  return (
    <div
      role="status"
      aria-live="polite"
      className={`
        fixed bottom-6 left-1/2 -translate-x-1/2 z-50
        flex items-start gap-3
        bg-cesmvc-blue text-white
        px-5 py-4 rounded-2xl shadow-xl shadow-black/25
        max-w-sm w-[calc(100vw-2rem)]
        transition-all duration-400
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
    >
      {/* ícone de check */}
      <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </span>

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm leading-snug">{message}</p>
        {detail && <p className="text-white/70 text-xs mt-0.5 leading-snug">{detail}</p>}
      </div>

      <button
        onClick={() => { setVisible(false); setTimeout(onClose, 400) }}
        aria-label="Fechar notificação"
        className="flex-shrink-0 text-white/50 hover:text-white transition-colors mt-0.5"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}
