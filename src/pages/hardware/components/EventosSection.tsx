import { useEffect, useState, useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import goRnPresentation from '../img/goRN_apresentação.jpg'
import goRnTeam from '../img/goRN_apresentação(1).jpg'
import goRnBooth from '../img/gorRN_apresentação.jpg'
import secitexPresentation from '../img/Apresentação_Secitex.jpg'
import secitexVisit from '../img/Apresentação_Secitex(1).jpg'
import secitexBooth from '../img/Apresentação_Secitex(2).jpg'
import secitexTeam from '../img/Apresentação_Secitex(3).jpg'
import secitexBanner from '../img/banner_secitex.jpg'
import secitexGroup from '../img/equipe_Secitex.jpg'
import expotecPresentation from '../img/apresentação_expotec.jpg'
import expotecDemo from '../img/Apresentação_expotec(1).jpg'

type EventItem = {
  name: string
  description: string
  videoUrl?: string
  photos?: Array<{ src: string; alt: string }>
}

const EVENTS: EventItem[] = [
  {
    name: 'goRN',
    description: 'Apresentação do SmartNose e troca de ideias com o público no goRN.',
    photos: [
      { src: goRnPresentation, alt: 'Demonstração do SmartNose durante o goRN' },
      { src: goRnTeam, alt: 'Equipe do SmartNose reunida no goRN' },
      { src: goRnBooth, alt: 'Apresentação do projeto ao público no goRN' },
    ],
  },
  {
    name: 'Secitex',
    description: 'Registros da participação do projeto na Secitex.',
    photos: [
      { src: secitexPresentation, alt: 'Equipe apresenta o SmartNose na Secitex' },
      { src: secitexGroup, alt: 'Integrantes da equipe no estande da Secitex' },
      { src: secitexBooth, alt: 'Apresentação do projeto no estande da Secitex' },
      { src: secitexTeam, alt: 'Equipe do SmartNose ao lado do estande na Secitex' },
      { src: secitexVisit, alt: 'Visitantes conhecem o projeto na Secitex' },
      { src: secitexBanner, alt: 'Protótipo SmartNose exposto na Secitex' },
    ],
  },
  {
    name: 'Expotec',
    description: 'Apresentação do projeto e demonstração do protótipo na Expotec.',
    photos: [
      { src: expotecPresentation, alt: 'Equipe apresenta o SmartNose na Expotec' },
      { src: expotecDemo, alt: 'Demonstração do SmartNose ao público na Expotec' },
    ],
  },
  {
    name: 'Entrevista',
    description: 'Entrevista especial detalhando o desenvolvimento, a proposta e as aplicações do SmartNose.',
    videoUrl: 'https://www.youtube-nocookie.com/embed/-rByeQeiA48?controls=1&rel=0&playsinline=1',
  },
]

export default function EventosSection() {
  const [eventIndex, setEventIndex] = useState(0)
  const [photoIndex, setPhotoIndex] = useState(0)
  const [isHolding, setIsHolding] = useState(false)
  const [isSectionVisible, setIsSectionVisible] = useState(false)
  const [isVideoPreloaded, setIsVideoPreloaded] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  const viewerRef = useRef<HTMLDivElement>(null)
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null)
  const holdTimerRef = useRef<number | null>(null)
  const preloadedImagesRef = useRef<HTMLImageElement[]>([])

  const event = EVENTS[eventIndex]
  const hasPhotos = Boolean(event.photos && event.photos.length > 0)
  const photo = hasPhotos ? event.photos![photoIndex] : null

  useEffect(() => {
    if (preloadedImagesRef.current.length > 0) return

    preloadedImagesRef.current = EVENTS.flatMap((item) =>
      item.photos?.map((photoItem) => {
        const image = new Image()
        image.src = photoItem.src
        image.decoding = 'async'
        return image
      }) || [],
    )
  }, [])

  function navigateStory(direction: number) {
    if (!hasPhotos) return
    if (direction > 0) {
      if (photoIndex + 1 < event.photos!.length) {
        setPhotoIndex((current) => current + 1)
      } else {
        const nextIndex = (eventIndex + 1) % EVENTS.length
        setEventIndex(nextIndex)
        setPhotoIndex(0)
      }
    } else {
      if (photoIndex - 1 >= 0) {
        setPhotoIndex((current) => current - 1)
      } else {
        const prevIndex = (eventIndex - 1 + EVENTS.length) % EVENTS.length
        setEventIndex(prevIndex)
        const prevPhotos = EVENTS[prevIndex].photos
        setPhotoIndex(prevPhotos && prevPhotos.length > 0 ? prevPhotos.length - 1 : 0)
      }
    }
  }

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting)
        if (entry.isIntersecting) {
          setIsVideoPreloaded(true)
        }
      },
      { threshold: 0.25, rootMargin: '100px 0px' },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    return () => {
      if (holdTimerRef.current) {
        window.clearTimeout(holdTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!hasPhotos || isHolding || !isSectionVisible) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setTimeout(() => {
      navigateStory(1)
    }, 6000)
    return () => window.clearTimeout(timer)
  }, [eventIndex, photoIndex, isHolding, hasPhotos, isSectionVisible])

  function selectEvent(index: number) {
    if (EVENTS[index].videoUrl) {
      setIsVideoPreloaded(true)
    }
    setEventIndex(index)
    setPhotoIndex(0)
  }

  function movePhoto(direction: number) {
    navigateStory(direction)
  }

  function handleTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    if (!hasPhotos) return
    const touch = e.touches[0]
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    }

    if (holdTimerRef.current) {
      window.clearTimeout(holdTimerRef.current)
    }

    holdTimerRef.current = window.setTimeout(() => {
      setIsHolding(true)
    }, 180)
  }

  function handleTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    if (!hasPhotos || !touchStartRef.current) return
    const touch = e.touches[0]
    const deltaX = touch.clientX - touchStartRef.current.x
    const deltaY = touch.clientY - touchStartRef.current.y

    if (Math.abs(deltaY) > 12 && Math.abs(deltaY) > Math.abs(deltaX)) {
      if (holdTimerRef.current) {
        window.clearTimeout(holdTimerRef.current)
        holdTimerRef.current = null
      }
      setIsHolding(false)
    }
  }

  function handleTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
    if (!hasPhotos) return

    if (holdTimerRef.current) {
      window.clearTimeout(holdTimerRef.current)
      holdTimerRef.current = null
    }

    const wasHolding = isHolding
    setIsHolding(false)

    if (!touchStartRef.current) return
    const touch = e.changedTouches[0]
    const deltaX = touch.clientX - touchStartRef.current.x
    const deltaY = touch.clientY - touchStartRef.current.y
    const elapsed = Date.now() - touchStartRef.current.time
    touchStartRef.current = null

    // Horizontal swipe gesture
    if (Math.abs(deltaX) >= 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX < 0) {
        navigateStory(1)
      } else {
        navigateStory(-1)
      }
      return
    }

    // Tap navigation
    if (elapsed < 250 && Math.abs(deltaX) < 15 && Math.abs(deltaY) < 15 && !wasHolding) {
      const rect = viewerRef.current?.getBoundingClientRect()
      if (rect) {
        const tapX = touch.clientX - rect.left
        if (tapX < rect.width * 0.35) {
          navigateStory(-1)
        } else {
          navigateStory(1)
        }
      }
    }
  }

  function handleTouchCancel() {
    if (holdTimerRef.current) {
      window.clearTimeout(holdTimerRef.current)
      holdTimerRef.current = null
    }
    setIsHolding(false)
    touchStartRef.current = null
  }

  return (
    <section
      ref={sectionRef}
      id="impacto"
      aria-labelledby="eventos-title"
      className="events-section border-b border-white/10 bg-[#070b14] px-6 py-20 sm:px-8 sm:py-24"
    >
      <div className="mx-auto w-full max-w-[1216px]">
        <header className="events-heading">
          <div>
            <p className="events-kicker"><span aria-hidden="true" /> PESQUISA EM MOVIMENTO</p>
            <h2 id="eventos-title" className="events-title">Ciência que sai do laboratório.</h2>
          </div>
          <p className="events-intro">
            Encontros, apresentações e experiências que aproximam o SmartNose de quem transforma conhecimento em novas possibilidades.
          </p>
        </header>

        <div className="events-showcase">
          <nav className="events-selector" aria-label="Selecionar evento">
            <p className="events-selector__eyebrow">
              EVENTOS <span>01 — {String(EVENTS.length).padStart(2, '0')}</span>
            </p>
            <div className="events-selector__options">
              {EVENTS.map((item, index) => (
                <button
                  className={`events-selector__button${index === eventIndex ? ' is-active' : ''}`}
                  type="button"
                  key={item.name}
                  onClick={() => selectEvent(index)}
                  aria-pressed={index === eventIndex}
                >
                  <span className="events-selector__number">0{index + 1}</span>
                  <span className="events-selector__name">{item.name}</span>
                  <span className="events-selector__count">
                    {item.videoUrl ? 'Vídeo' : `${String(item.photos?.length || 0).padStart(2, '0')} fotos`}
                  </span>
                  <ArrowRight className="events-selector__arrow" size={18} aria-hidden="true" />
                </button>
              ))}
            </div>
            <p className="events-selector__hint">Selecione um evento para explorar os registros.</p>
          </nav>

          <div
            ref={viewerRef}
            className={`events-gallery__viewer${
              hasPhotos && !isHolding ? '' : ' is-progress-paused'
            }${isHolding ? ' is-holding' : ''}`}
            role="region"
            aria-roledescription={event.videoUrl ? 'vídeo' : 'carrossel'}
            aria-label={`${event.videoUrl ? 'Vídeo' : 'Fotos'} do evento ${event.name}`}
            onMouseDown={() => setIsHolding(true)}
            onMouseUp={() => setIsHolding(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchCancel}
          >
            {hasPhotos && (
              <div className="events-gallery__progress" role="group" aria-label={`Selecionar foto do evento ${event.name}`}>
                {event.photos!.map((item, index) => (
                  <button
                    className={`events-gallery__progress-step${index === photoIndex ? ' is-current' : ''}${index < photoIndex ? ' is-complete' : ''}`}
                    type="button"
                    key={item.src}
                    onClick={() => setPhotoIndex(index)}
                    aria-label={`Mostrar foto ${index + 1} de ${event.photos!.length}: ${item.alt}`}
                    aria-current={index === photoIndex ? 'true' : undefined}
                  >
                    <span className="events-gallery__progress-track" aria-hidden="true">
                      <span className="events-gallery__progress-fill" key={`fill-${eventIndex}-${photoIndex}-${index}`} />
                    </span>
                  </button>
                ))}
              </div>
            )}

            <div
              className={`events-gallery__image-wrap${event.videoUrl ? ' has-video' : ''}`}
              aria-live={hasPhotos && !isHolding ? 'off' : 'polite'}
              aria-atomic="true"
            >
              {isVideoPreloaded && (
                <iframe
                  className="events-gallery__video"
                  data-active={event.videoUrl ? 'true' : 'false'}
                  src={EVENTS.find((item) => item.videoUrl)?.videoUrl}
                  title="Vídeo do evento Entrevista"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              )}
              {!event.videoUrl && photo && (
                <img
                  className="events-gallery__image"
                  src={photo.src}
                  alt={photo.alt}
                  key={photo.src}
                  loading="eager"
                  decoding="async"
                />
              )}

              <div className="events-gallery__caption">
                <span className="events-gallery__event-index">EVENTO 0{eventIndex + 1}</span>
                <h3>{event.name}</h3>
                <p>{event.description}</p>
                {hasPhotos && (
                  <span className="events-gallery__counter">
                    {String(photoIndex + 1).padStart(2, '0')} <span aria-hidden="true">/</span> {String(event.photos!.length).padStart(2, '0')}
                  </span>
                )}
              </div>

              {hasPhotos && (
                <div className="events-gallery__arrows" role="group" aria-label="Navegar pelas fotos">
                  <button className="events-arrow" type="button" onClick={() => movePhoto(-1)} aria-label="Foto anterior">
                    <ArrowLeft size={19} aria-hidden="true" />
                  </button>
                  <button className="events-arrow" type="button" onClick={() => movePhoto(1)} aria-label="Próxima foto">
                    <ArrowRight size={19} aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
