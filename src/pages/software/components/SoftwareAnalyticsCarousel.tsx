import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
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
                  <img src={item.image} alt={item.alt} width={item.width} height={item.height} loading="lazy" decoding="async" />
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
