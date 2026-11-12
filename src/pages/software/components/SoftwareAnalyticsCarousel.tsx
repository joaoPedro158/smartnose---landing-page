import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import heatmap from '../img/heatmap.png'
import pairplot from '../img/paiplot.png'
import timeSeries from '../img/serie atemporal.png'

const analyses = [
  {
    title: 'Heatmap de correlação',
    description: 'Identifique relações entre os sensores e compare como cada variável se comporta durante a análise.',
    image: heatmap,
    alt: 'Heatmap de correlação entre os sensores MQ135, MQ2, MQ3, MQ8, temperatura e umidade.',
  },
  {
    title: 'Pairplot — relação entre sensores',
    description: 'Explore a distribuição dos dados e as relações entre pares de sensores em uma única visualização.',
    image: pairplot,
    alt: 'Matriz de gráficos de dispersão comparando as leituras dos sensores e as condições ambientais.',
  },
  {
    title: 'Série temporal',
    description: 'Acompanhe a leitura dos sensores ao longo do tempo e compare os sinais original e filtrado.',
    image: timeSeries,
    alt: 'Gráfico de série temporal com sinais originais e filtrados de um sensor.',
  },
]

export default function SoftwareAnalyticsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [hasEntered, setHasEntered] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const pointerStartRef = useRef<number | null>(null)
  const skipClickUntilRef = useRef(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section || hasEntered) return

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setHasEntered(true)
      observer.disconnect()
    }, { threshold: 0.18 })

    observer.observe(section)
    return () => observer.disconnect()
  }, [hasEntered])

  const goTo = (index: number) => setActiveIndex((current) => {
    const nextIndex = (index + analyses.length) % analyses.length
    return nextIndex === current ? current : nextIndex
  })
  const goNext = () => setActiveIndex((current) => (current + 1) % analyses.length)
  const goPrevious = () => setActiveIndex((current) => (current - 1 + analyses.length) % analyses.length)

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStartRef.current === null) return
    const distance = event.clientX - pointerStartRef.current
    if (Math.abs(distance) > 48) {
      skipClickUntilRef.current = Date.now() + 500
      distance < 0 ? goNext() : goPrevious()
    }
    pointerStartRef.current = null
  }

  return (
    <section ref={sectionRef} className={`software-analytics${hasEntered ? ' is-visible' : ''}`} id="analises" aria-labelledby="software-analytics-title">
      <div className="software-analytics__inner">
        <header className="software-analytics__header">
          <div>
            <h2 id="software-analytics-title">Análises que revelam os dados</h2>
            <p>Explore diferentes perspectivas sobre o comportamento dos sensores.</p>
          </div>
          <div className="software-analytics__controls" aria-label="Controles do carrossel">
            <button type="button" onClick={goPrevious} aria-label="Mostrar análise anterior"><ArrowLeft size={19} /></button>
            <button type="button" onClick={goNext} aria-label="Mostrar próxima análise"><ArrowRight size={19} /></button>
          </div>
        </header>

        <div
          className="software-analytics__stage"
          role="region"
          aria-roledescription="carrossel"
          aria-label="Análises de dados dos sensores"
          onPointerDown={(event) => {
            pointerStartRef.current = event.clientX
          }}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => { pointerStartRef.current = null }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft') goPrevious()
            if (event.key === 'ArrowRight') goNext()
          }}
          tabIndex={0}
        >
          <div className="software-analytics__rail">
            {analyses.map((analysis, index) => {
              const isActive = index === activeIndex
              const relativeIndex = (index - activeIndex + analyses.length) % analyses.length
              const position = relativeIndex === 0 ? 'is-active' : relativeIndex === 1 ? 'is-next' : 'is-previous'
              return (
                <article
                  className={`software-analytics__slide ${position}`}
                  key={analysis.title}
                  aria-roledescription="slide"
                  aria-label={`${index + 1} de ${analyses.length}: ${analysis.title}`}
                  aria-hidden="false"
                >
                  <button
                    className="software-analytics__image-button"
                    type="button"
                    onClick={(event) => {
                      if (Date.now() < skipClickUntilRef.current) {
                        event.preventDefault()
                        event.stopPropagation()
                        return
                      }
                      goTo(index)
                    }}
                    tabIndex={0}
                    aria-label={isActive ? `Análise selecionada: ${analysis.title}` : `Mostrar ${analysis.title}`}
                  >
                    <img src={analysis.image} alt={analysis.alt} loading="lazy" decoding="async" draggable={false} />
                  </button>
                </article>
              )
            })}
          </div>
        </div>

        <div className="software-analytics__details" key={activeIndex} aria-live="polite">
          <h3>{analyses[activeIndex].title}</h3>
          <p>{analyses[activeIndex].description}</p>
        </div>

        <div className="software-analytics__pagination" aria-label="Escolher análise">
          {analyses.map((analysis, index) => (
            <button
              key={analysis.title}
              type="button"
              className={index === activeIndex ? 'is-active' : ''}
              onClick={() => goTo(index)}
              aria-label={`Ir para ${analysis.title}`}
              aria-current={index === activeIndex ? 'step' : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
