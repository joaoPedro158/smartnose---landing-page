import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import Carousel from '@/components/ui/carousel'
import heatmap from '../img/heatmap.png'
import pairplot from '../img/paiplot.png'
import timeSeries from '../img/serie atemporal.png'

const analysesSlides = [
  {
    title: 'Heatmap de correlação',
    button: 'Ver detalhes',
    src: heatmap,
    description: 'Identifique relações entre os sensores e compare como cada variável se comporta durante a análise.',
  },
  {
    title: 'Pairplot — relação entre sensores',
    button: 'Ver detalhes',
    src: pairplot,
    description: 'Explore a distribuição dos dados e as relações entre pares de sensores em uma única visualização.',
  },
  {
    title: 'Série temporal',
    button: 'Ver detalhes',
    src: timeSeries,
    description: 'Acompanhe a leitura dos sensores ao longo do tempo e compare os sinais original e filtrado.',
  },
]

export default function SoftwareAnalyticsCarousel() {
  const [hasEntered, setHasEntered] = useState(false)
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
              Explore diferentes perspectivas sobre o comportamento dos sensores com rotação e paralaxe 3D interativo.
            </motion.p>
          </div>
        </motion.header>

        <motion.div
          className="relative overflow-hidden w-full py-6 md:py-10"
          initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.98 }}
          animate={hasEntered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: prefersReducedMotion ? 1 : 0.98 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.68, delay: prefersReducedMotion ? 0 : 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <Carousel slides={analysesSlides} />
        </motion.div>
      </div>
    </section>
  )
}
