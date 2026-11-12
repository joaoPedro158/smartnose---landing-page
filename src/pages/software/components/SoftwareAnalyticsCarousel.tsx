import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react'
import heatmap from '../img/heatmap.png'
import pairplot from '../img/paiplot.png'
import timeSeries from '../img/serie atemporal.png'

const analytics = [
  {
    title: 'Correlação entre sensores',
    description: 'Compare as leituras dos sensores e identifique relações entre os sinais, temperatura e umidade.',
    image: heatmap,
    alt: 'Heatmap de correlação entre os sensores MQ135, MQ2, MQ3, MQ8, temperatura e umidade.',
    width: 918,
    height: 762,
  },
  {
    title: 'Relação entre variáveis',
    description: 'Explore a distribuição dos dados e observe como as variáveis se comportam em conjunto.',
    image: pairplot,
    alt: 'Pairplot com gráficos de dispersão que comparam leituras de sensores, temperatura e umidade.',
    width: 1036,
    height: 704,
  },
  {
    title: 'Série temporal e filtragem',
    description: 'Acompanhe a evolução dos sinais, compare experimentos e avalie o efeito do filtro aplicado.',
    image: timeSeries,
    alt: 'Gráfico de série temporal do sensor MQ3 com sinais original e filtrado e comparação entre testes.',
    width: 1040,
    height: 728,
  },
]

const DESKTOP_QUERY = '(min-width: 768px)'

export default function SoftwareAnalyticsCarousel() {
  const railRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isInteracting, setIsInteracting] = useState(false)

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
    if (!isDesktop || isPaused || isInteracting || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(() => goTo(activeIndex + 1), 6000)
    return () => window.clearInterval(timer)
  }, [activeIndex, goTo, isDesktop, isInteracting, isPaused])

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
            <h2 id="software-analytics-title">Dados que revelam padrões</h2>
            <p>Explore as análises que ajudam a interpretar o comportamento dos sensores.</p>
          </div>
          <div className="software-analytics__controls" aria-label="Controles do carrossel">
            {isDesktop && (
              <button
                className="software-analytics__autoplay"
                type="button"
                onClick={() => setIsPaused((paused) => !paused)}
                aria-label={isPaused ? 'Retomar reprodução automática' : 'Pausar reprodução automática'}
              >
                {isPaused ? <Play size={17} /> : <Pause size={17} />}
                <span>{isPaused ? 'Reproduzir' : 'Pausar'}</span>
              </button>
            )}
            <button type="button" onClick={() => goTo(activeIndex - 1)} aria-label="Ver análise anterior">
              <ArrowLeft size={19} aria-hidden="true" />
            </button>
            <button type="button" onClick={() => goTo(activeIndex + 1)} aria-label="Ver próxima análise">
              <ArrowRight size={19} aria-hidden="true" />
            </button>
          </div>
        </header>

        <div
          className="software-analytics__rail"
          ref={railRef}
          onScroll={handleScroll}
          onMouseEnter={() => isDesktop && setIsInteracting(true)}
          onMouseLeave={() => isDesktop && setIsInteracting(false)}
          onFocus={() => isDesktop && setIsInteracting(true)}
          onBlur={(event) => {
            if (isDesktop && !event.currentTarget.contains(event.relatedTarget as Node | null)) setIsInteracting(false)
          }}
          role="region"
          aria-roledescription="carrossel"
          aria-label="Telas de análise de dados"
          tabIndex={0}
        >
          {analytics.map((item, index) => (
            <article className="software-analytics__slide" key={item.title} aria-label={`${index + 1} de ${analytics.length}: ${item.title}`}>
              <figure className="software-analytics__image">
                <img src={item.image} alt={item.alt} width={item.width} height={item.height} loading="lazy" decoding="async" />
              </figure>
              <div className="software-analytics__caption">
                <div>
                  <span className="software-analytics__index">0{index + 1} / 0{analytics.length}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="software-analytics__pagination" aria-label="Selecionar análise">
          {analytics.map((item, index) => (
            <button
              key={item.title}
              type="button"
              className={index === activeIndex ? 'is-active' : ''}
              onClick={() => goTo(index)}
              aria-label={`Ir para ${item.title}`}
              aria-current={index === activeIndex ? 'true' : undefined}
            />
          ))}
        </div>
        <p className="software-analytics__hint">{isDesktop ? 'Use as setas para explorar as análises' : 'Deslize para ver as análises'}</p>
      </div>
    </section>
  )
}
