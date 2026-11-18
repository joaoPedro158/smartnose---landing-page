import { useEffect, useState } from 'react'
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
    videoUrl: 'https://www.youtube-nocookie.com/embed/-rByeQeiA48?autoplay=1&controls=1&rel=0&playsinline=1',
  },
]

export default function EventosSection() {
  const [eventIndex, setEventIndex] = useState(0)
  const [photoIndex, setPhotoIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const event = EVENTS[eventIndex]
  const hasPhotos = Boolean(event.photos && event.photos.length > 0)
  const photo = hasPhotos ? event.photos![photoIndex] : null

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => setIsPlaying(!motionPreference.matches)
    updateMotionPreference()
    motionPreference.addEventListener('change', updateMotionPreference)
    return () => motionPreference.removeEventListener('change', updateMotionPreference)
  }, [])

  useEffect(() => {
    if (!isPlaying || isHovered || isFocused || !hasPhotos) return
    const timer = window.setTimeout(() => {
      setPhotoIndex((current) => (current + 1) % event.photos!.length)
    }, 6000)
    return () => window.clearTimeout(timer)
  }, [event.photos, hasPhotos, isFocused, isHovered, isPlaying])

  function selectEvent(index: number) {
    setEventIndex(index)
    setPhotoIndex(0)
  }

  function movePhoto(direction: number) {
    if (!hasPhotos) return
    setPhotoIndex((current) => (current + direction + event.photos!.length) % event.photos!.length)
  }

  return (
    <section
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

        <div
          className="events-showcase"
          onFocusCapture={() => setIsFocused(true)}
          onBlurCapture={(focusEvent) => {
            if (!focusEvent.currentTarget.contains(focusEvent.relatedTarget as Node | null)) setIsFocused(false)
          }}
        >
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
            className={`events-gallery__viewer${isPlaying && !isHovered && !isFocused && hasPhotos ? '' : ' is-progress-paused'}`}
            role="region"
            aria-roledescription={event.videoUrl ? 'vídeo' : 'carrossel'}
            aria-label={`${event.videoUrl ? 'Vídeo' : 'Fotos'} do evento ${event.name}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
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
                      <span className="events-gallery__progress-fill" key={`${item.src}-${index === photoIndex ? photoIndex : 'idle'}`} />
                    </span>
                  </button>
                ))}
              </div>
            )}

            <div
              className={`events-gallery__image-wrap${event.videoUrl ? ' has-video' : ''}`}
              aria-live={isPlaying && !isHovered && !isFocused && hasPhotos ? 'off' : 'polite'}
              aria-atomic="true"
            >
              {event.videoUrl ? (
                <iframe
                  className="events-gallery__video"
                  src={event.videoUrl}
                  title={`Vídeo do evento ${event.name}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                photo && <img className="events-gallery__image" src={photo.src} alt={photo.alt} key={photo.src} />
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


