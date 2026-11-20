import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowLeft, ArrowRight, Maximize2, Minus, Plus, X } from 'lucide-react'
import heatmap from '../img/heatmap.png'
import pairplot from '../img/paiplot.png'
import timeSeries from '../img/serie atemporal.png'

const analytics = [
  { title: 'Correla\u00e7\u00e3o entre sensores', description: 'Compare as leituras dos sensores e identifique rela\u00e7\u00f5es entre os sinais, temperatura e umidade.', image: heatmap, alt: 'Heatmap de correla\u00e7\u00e3o entre os sensores MQ135, MQ2, MQ3, MQ8, temperatura e umidade.', width: 918, height: 762 },
  { title: 'Rela\u00e7\u00e3o entre vari\u00e1veis', description: 'Explore a distribui\u00e7\u00e3o dos dados e observe como as vari\u00e1veis se comportam em conjunto.', image: pairplot, alt: 'Pairplot com gr\u00e1ficos de dispers\u00e3o que comparam leituras de sensores, temperatura e umidade.', width: 1036, height: 704 },
  { title: 'S\u00e9rie temporal e filtragem', description: 'Acompanhe a evolu\u00e7\u00e3o dos sinais, compare experimentos e avalie o efeito do filtro aplicado.', image: timeSeries, alt: 'Gr\u00e1fico de s\u00e9rie temporal do sensor MQ3 com sinais original e filtrado e compara\u00e7\u00e3o entre testes.', width: 1040, height: 728 },
]

const DESKTOP_QUERY = '(min-width: 1024px)'

export default function SoftwareAnalyticsCarousel() {
  const railRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
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

  const closeExpandedImage = useCallback(() => {
    setExpandedIndex(null)
    setPreviewZoom(1)
    setPreviewPosition({ x: 0, y: 0 })
  }, [])

  const openExpandedImage = (index: number) => {
    setActiveIndex(index)
    setPreviewZoom(1)
    setPreviewPosition({ x: 0, y: 0 })
    setExpandedIndex(index)
  }

  const goTo = useCallback((index: number) => {
    const rail = railRef.current
    if (!rail) return
    const nextIndex = (index + analytics.length) % analytics.length
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
    rail.scrollTo({ left: rail.clientWidth * nextIndex, behavior })
    setActiveIndex(nextIndex)
  }, [])

  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY)
    const updateViewport = () => setIsDesktop(query.matches)
    updateViewport()
    query.addEventListener('change', updateViewport)
    return () => query.removeEventListener('change', updateViewport)
  }, [])

  useEffect(() => {
    if (expandedIndex === null) return

    const previousBodyOverflow = document.body.style.overflow
    const previousHtmlOverflow = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeExpandedImage()
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousHtmlOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [expandedIndex, closeExpandedImage])

  const handleLightboxPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
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

  const handleLightboxPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
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
    const nextPosition = {
      x: dragStartRef.current.positionX + event.clientX - dragStartRef.current.x,
      y: dragStartRef.current.positionY + event.clientY - dragStartRef.current.y,
    }
    setPreviewPosition(clampPreviewPosition(nextPosition, previewZoom))
  }

  const handleLightboxPointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    activePointersRef.current.delete(event.pointerId)
    if (activePointersRef.current.size < 2) pinchStartRef.current = null
    if (activePointersRef.current.size === 0) dragStartRef.current = null
  }

  const handleScroll = () => {
    const rail = railRef.current
    if (!rail) return
    const nextIndex = Math.round(rail.scrollLeft / rail.clientWidth)
    setActiveIndex(Math.max(0, Math.min(analytics.length - 1, nextIndex)))
  }

  return (
    <section className="software-analytics" id="analises" aria-labelledby="software-analytics-title">
      <div className="software-analytics__inner">
        <header className="software-analytics__header">
          <div>
            <h2 id="software-analytics-title">Dados que revelam padr&otilde;es</h2>
            <p>Explore as an&aacute;lises que ajudam a interpretar o comportamento dos sensores.</p>
          </div>
        </header>

        <div className="software-analytics__carousel">
          <button className="software-analytics__arrow software-analytics__arrow--previous" type="button" onClick={() => goTo(activeIndex - 1)} aria-label="Ver an&aacute;lise anterior"><ArrowLeft size={19} aria-hidden="true" /></button>
          <div className="software-analytics__rail" ref={railRef} onScroll={handleScroll} role="region" aria-roledescription="carrossel" aria-label="Telas de an&aacute;lise de dados" tabIndex={0}>
            {analytics.map((item, index) => (
              <article className="software-analytics__slide" key={item.title} aria-label={`${index + 1} de ${analytics.length}: ${item.title}`}>
                <figure className="software-analytics__image">
                  <button
                    className="software-analytics__expand"
                    type="button"
                    aria-label={`Ampliar ${item.title}`}
                    onClick={() => openExpandedImage(index)}
                  >
                    <img src={item.image} alt={item.alt} width={item.width} height={item.height} loading="lazy" decoding="async" />
                    <span className="software-analytics__expand-icon" aria-hidden="true">
                      <Maximize2 size={20} strokeWidth={2} />
                    </span>
                  </button>
                </figure>
                <div className="software-analytics__caption">
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <button className="software-analytics__arrow software-analytics__arrow--next" type="button" onClick={() => goTo(activeIndex + 1)} aria-label="Ver pr&oacute;xima an&aacute;lise"><ArrowRight size={19} aria-hidden="true" /></button>
        </div>

        {expandedIndex !== null && createPortal((
          <div
            className="software-analytics__lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`Imagem ampliada: ${analytics[expandedIndex].title}`}
            onWheel={(event) => {
              event.preventDefault()
              changePreviewZoom(event.deltaY < 0 ? 0.25 : -0.25)
            }}
            onPointerDown={handleLightboxPointerDown}
            onPointerMove={handleLightboxPointerMove}
            onPointerUp={handleLightboxPointerEnd}
            onPointerCancel={handleLightboxPointerEnd}
          >
            <button
              className="software-analytics__lightbox-close"
              type="button"
              aria-label="Fechar imagem ampliada"
              onClick={closeExpandedImage}
              onPointerDown={(event) => event.stopPropagation()}
              autoFocus
            >
              <X size={22} strokeWidth={2} />
            </button>
            <div className="software-analytics__lightbox-tools" role="group" aria-label="Controles de zoom" onPointerDown={(event) => event.stopPropagation()}>
              <button type="button" aria-label="Diminuir zoom" disabled={previewZoom <= 1} onClick={() => changePreviewZoom(-0.25)}>
                <Minus size={18} />
              </button>
              <span aria-live="polite">{Math.round(previewZoom * 100)}%</span>
              <button type="button" aria-label="Aumentar zoom" disabled={previewZoom >= 4} onClick={() => changePreviewZoom(0.25)}>
                <Plus size={18} />
              </button>
            </div>
            <div className="software-analytics__lightbox-stage">
              <img
                className="software-analytics__lightbox-image"
                src={analytics[expandedIndex].image}
                alt={`${analytics[expandedIndex].alt} - imagem ampliada`}
                draggable={false}
                style={{
                  transform: `translate3d(${previewPosition.x}px, ${previewPosition.y}px, 0) scale(${previewZoom})`,
                }}
              />
            </div>
          </div>
        ), document.body)}

        <div className="software-analytics__pagination" aria-label="Selecionar an&aacute;lise">
          {analytics.map((item, index) => (
            <button key={item.title} type="button" className={index === activeIndex ? 'is-active' : ''} onClick={() => goTo(index)} aria-label={`Ir para ${item.title}`} aria-current={index === activeIndex ? 'true' : undefined} />
          ))}
        </div>
        <p className="software-analytics__hint">{isDesktop ? 'Use as setas para explorar as an\u00e1lises' : 'Deslize para ver as an\u00e1lises'}</p>
      </div>
    </section>
  )
}
