import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'motion/react'
import Carousel from '@/components/ui/carousel'
import heatmap from '../img/heatmap.png'
import pairplot from '../img/paiplot.png'
import timeSeries from '../img/serie atemporal.png'

const analysesSlides = [
  {
    title: 'Heatmap de correlação',
    src: heatmap,
    description: 'Identifique relações entre os sensores e compare como cada variável se comporta durante a análise.',
  },
  {
    title: 'Pairplot — relação entre sensores',
    src: pairplot,
    description: 'Explore a distribuição dos dados e as relações entre pares de sensores em uma única visualização.',
  },
  {
    title: 'Série temporal',
    src: timeSeries,
    description: 'Acompanhe a leitura dos sensores ao longo do tempo e compare os sinais original e filtrado.',
  },
]

export default function SoftwareAnalyticsCarousel() {
  const [hasEntered, setHasEntered] = useState(false)
  const [current, setCurrent] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const section = sectionRef.current
    if (!section || hasEntered) return
    if (!('IntersectionObserver' in window)) {
      setHasEntered(true)
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setHasEntered(true)
      observer.disconnect()
    }, { threshold: 0.18 })

    const revealIfVisible = () => {
      const bounds = section.getBoundingClientRect()
      if (bounds.top >= window.innerHeight || bounds.bottom <= 0) return
      setHasEntered(true)
      observer.disconnect()
      window.removeEventListener('scroll', revealIfVisible)
    }

    observer.observe(section)
    window.addEventListener('scroll', revealIfVisible, { passive: true })
    revealIfVisible()
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', revealIfVisible)
    }
  }, [hasEntered])

  const handlePrevious = () => {
    setCurrent(prev => (prev - 1 < 0 ? analysesSlides.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrent(prev => (prev + 1 === analysesSlides.length ? 0 : prev + 1))
  }

  const handleSlideClick = (index: number) => {
    if (current !== index) setCurrent(index)
  }

  const activeSlide = analysesSlides[current]

  return (
    <section ref={sectionRef} className="software-analytics" id="analises" aria-labelledby="software-analytics-title">
      <div className="software-analytics__inner">
        <motion.header className="software-analytics__header">
          <div>
            <motion.h2
              id="software-analytics-title"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
              animate={hasEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.58, ease: [0.16, 1, 0.3, 1] }}
            >
              Análises que revelam os dados
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
              animate={hasEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.52, delay: prefersReducedMotion ? 0 : 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Explore diferentes perspectivas sobre o comportamento dos sensores.
            </motion.p>
          </div>

          {/* Setas de navegação no header superior direito */}
          <motion.div
            className="software-analytics__controls"
            initial={{ opacity: 0 }}
            animate={hasEntered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : 0.2 }}
            aria-label="Controles do carrossel"
          >
            <button
              onClick={handlePrevious}
              aria-label="Slide anterior"
              title="Slide anterior"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              aria-label="Próximo slide"
              title="Próximo slide"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 19l7-7-7-7" />
              </svg>
            </button>
          </motion.div>
        </motion.header>

        {/* Carrossel de imagens — layout e animações preservados */}
        <motion.div
          className="relative overflow-hidden w-full py-6 md:py-10"
          initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.98 }}
          animate={hasEntered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: prefersReducedMotion ? 1 : 0.98 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.68, delay: prefersReducedMotion ? 0 : 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <Carousel
            slides={analysesSlides}
            current={current}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSlideClick={handleSlideClick}
          />
        </motion.div>

        {/* Área descritiva abaixo do carrossel */}
        <motion.div
          className="software-analytics__details"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
          animate={hasEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.52, delay: prefersReducedMotion ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          <AnimatePresence mode="wait">
            <motion.h3
              key={`title-${current}`}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -4 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              {activeSlide.title}
            </motion.h3>
            <motion.p
              key={`desc-${current}`}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -3 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.32, delay: prefersReducedMotion ? 0 : 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              {activeSlide.description}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Barra de progresso / paginação */}
        <motion.div
          className="software-analytics__pagination"
          initial={{ opacity: 0 }}
          animate={hasEntered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.45, delay: prefersReducedMotion ? 0 : 0.35 }}
          role="tablist"
          aria-label="Navegação por slides"
        >
          {analysesSlides.map((_, index) => (
            <button
              key={index}
              className={index === current ? 'is-active' : ''}
              onClick={() => setCurrent(index)}
              role="tab"
              aria-selected={index === current}
              aria-label={`Slide ${index + 1}: ${analysesSlides[index].title}`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
