import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { KeyRound, Maximize2, Minus, MonitorCog, Plus, Radio, X } from 'lucide-react'
import adminPanel from '../img/painel de controle.png'

const adminFeatures = [
  {
    icon: KeyRound,
    title: 'Controle de acesso',
    description: 'Gerencie quem pode acessar a plataforma e mantenha as permissões organizadas em um só lugar.',
  },
  {
    icon: MonitorCog,
    title: 'Controle de dispositivo',
    description: 'Acompanhe os dispositivos cadastrados e mantenha suas configurações sempre sob controle.',
  },
  {
    icon: Radio,
    title: 'Controle de sensores',
    description: 'Visualize os sensores disponíveis e organize o monitoramento de cada ambiente.',
  },
]

export default function SoftwareAdminSection() {
  const [isPreviewExpanded, setIsPreviewExpanded] = useState(false)
  const [previewZoom, setPreviewZoom] = useState(1)
  const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 })
  const dragStartRef = useRef<{ x: number; y: number; positionX: number; positionY: number } | null>(null)
  const activePointersRef = useRef<Map<number, { x: number; y: number }>>(new Map())
  const pinchStartRef = useRef<{ distance: number; zoom: number } | null>(null)

  const clampPreviewPosition = useCallback((position: { x: number; y: number }, zoom: number) => {
    if (zoom <= 1) return { x: 0, y: 0 }
    const maxX = window.innerWidth * (zoom - 1) * 0.42
    const maxY = window.innerHeight * (zoom - 1) * 0.42
    return {
      x: Math.min(maxX, Math.max(-maxX, position.x)),
      y: Math.min(maxY, Math.max(-maxY, position.y)),
    }
  }, [])

  const changePreviewZoom = useCallback((amount: number) => {
    setPreviewZoom((currentZoom) => {
      const nextZoom = Math.min(4, Math.max(1, currentZoom + amount))
      setPreviewPosition((position) => clampPreviewPosition(position, nextZoom))
      return nextZoom
    })
  }, [clampPreviewPosition])

  const closePreview = useCallback(() => {
    setIsPreviewExpanded(false)
    setPreviewZoom(1)
    setPreviewPosition({ x: 0, y: 0 })
  }, [])

  useEffect(() => {
    if (!isPreviewExpanded) return

    const previousBodyOverflow = document.body.style.overflow
    const previousHtmlOverflow = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closePreview()
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousHtmlOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isPreviewExpanded, closePreview])

  const handlePreviewPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    activePointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY })

    const pointers = [...activePointersRef.current.values()]
    if (pointers.length === 2) {
      const distance = Math.hypot(pointers[0].x - pointers[1].x, pointers[0].y - pointers[1].y)
      pinchStartRef.current = { distance, zoom: previewZoom }
      dragStartRef.current = null
    } else {
      dragStartRef.current = {
        x: event.clientX,
        y: event.clientY,
        positionX: previewPosition.x,
        positionY: previewPosition.y,
      }
    }
  }

  const handlePreviewPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!activePointersRef.current.has(event.pointerId)) return
    activePointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY })

    const pointers = [...activePointersRef.current.values()]
    if (pointers.length === 2 && pinchStartRef.current) {
      const distance = Math.hypot(pointers[0].x - pointers[1].x, pointers[0].y - pointers[1].y)
      const nextZoom = Math.min(4, Math.max(1, pinchStartRef.current.zoom * distance / pinchStartRef.current.distance))
      setPreviewZoom(nextZoom)
      setPreviewPosition((position) => clampPreviewPosition(position, nextZoom))
      return
    }

    if (previewZoom <= 1 || !dragStartRef.current) return
    setPreviewPosition(clampPreviewPosition({
      x: dragStartRef.current.positionX + event.clientX - dragStartRef.current.x,
      y: dragStartRef.current.positionY + event.clientY - dragStartRef.current.y,
    }, previewZoom))
  }

  const handlePreviewPointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    activePointersRef.current.delete(event.pointerId)
    if (activePointersRef.current.size < 2) pinchStartRef.current = null
    if (activePointersRef.current.size === 0) dragStartRef.current = null
  }

  return (
    <section className="software-admin" id="administracao" aria-labelledby="software-admin-title">
      <div className="software-admin__inner">
        <header className="software-admin__header">
          <h2 id="software-admin-title">Gestão de usuários em um só lugar</h2>
          <p>O painel do administrador reúne os cadastros e as ferramentas para manter os acessos organizados.</p>
        </header>

        <figure className="software-admin__preview">
          <button
            className="software-admin__preview-trigger"
            type="button"
            aria-label="Ampliar imagem do painel do administrador"
            onClick={() => {
              setPreviewZoom(1)
              setPreviewPosition({ x: 0, y: 0 })
              setIsPreviewExpanded(true)
            }}
          >
          <img
            src={adminPanel}
            alt="Painel do administrador SmartNose com lista de usuários, busca por nome e ações para cada cadastro"
            width={1895}
            height={911}
            loading="lazy"
            decoding="async"
          />
          <span className="software-admin__preview-icon" aria-hidden="true">
            <Maximize2 size={20} strokeWidth={2} />
          </span>
          </button>
        </figure>

        {isPreviewExpanded && createPortal((
          <div
            className="software-admin__lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Imagem ampliada do painel do administrador"
            onWheel={(event) => {
              event.preventDefault()
              changePreviewZoom(event.deltaY < 0 ? 0.25 : -0.25)
            }}
            onPointerDown={handlePreviewPointerDown}
            onPointerMove={handlePreviewPointerMove}
            onPointerUp={handlePreviewPointerEnd}
            onPointerCancel={handlePreviewPointerEnd}
          >
            <button
              className="software-admin__lightbox-close"
              type="button"
              aria-label="Fechar imagem ampliada"
              onClick={closePreview}
              onPointerDown={(event) => event.stopPropagation()}
              autoFocus
            >
              <X size={22} strokeWidth={2} />
            </button>
            <div className="software-admin__lightbox-tools" role="group" aria-label="Controles de zoom" onPointerDown={(event) => event.stopPropagation()}>
              <button type="button" aria-label="Diminuir zoom" disabled={previewZoom <= 1} onClick={() => changePreviewZoom(-0.25)}>
                <Minus size={18} />
              </button>
              <span aria-live="polite">{Math.round(previewZoom * 100)}%</span>
              <button type="button" aria-label="Aumentar zoom" disabled={previewZoom >= 4} onClick={() => changePreviewZoom(0.25)}>
                <Plus size={18} />
              </button>
            </div>
            <div className="software-admin__lightbox-stage">
              <img
                className="software-admin__lightbox-image"
                src={adminPanel}
                alt="Painel do administrador SmartNose ampliado"
                draggable={false}
                style={{
                  transform: `translate3d(${previewPosition.x}px, ${previewPosition.y}px, 0) scale(${previewZoom})`,
                }}
              />
            </div>
          </div>
        ), document.body)}

        <div className="software-admin__features">
          {adminFeatures.map(({ icon: Icon, title, description }) => (
            <article className="software-admin__feature" key={title}>
              <span className="software-admin__feature-icon" aria-hidden="true"><Icon size={20} strokeWidth={1.8} /></span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
