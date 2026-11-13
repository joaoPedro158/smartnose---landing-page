import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import gsap from 'gsap'
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
  const stageRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<(HTMLElement | null)[]>([])
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const pointerStartRef = useRef<number | null>(null)
  const skipClickUntilRef = useRef(0)
  const isFirstRender = useRef(true)

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

  const goTo = (index: number) => {
    setActiveIndex((current) => {
      const nextIndex = (index + analyses.length) % analyses.length
      return nextIndex === current ? current : nextIndex
    })
  }

  const goNext = () => setActiveIndex((current) => (current + 1) % analyses.length)
  const goPrevious = () => setActiveIndex((current) => (current - 1 + analyses.length) % analyses.length)

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStartRef.current === null) return
    const distance = event.clientX - pointerStartRef.current
    if (Math.abs(distance) > 48) {
      skipClickUntilRef.current = Date.now() + 500
      if (distance < 0) {
        goNext()
      } else {
        goPrevious()
      }
    }
    pointerStartRef.current = null
  }

  // GSAP animation on activeIndex or hasEntered change
  useEffect(() => {
    if (!hasEntered) return

    const ctx = gsap.context(() => {
      // 1. Animação dos slides - transição cinematográfica mais cadenciada
      analyses.forEach((_, index) => {
        const slide = slideRefs.current[index]
        if (!slide) return

        const relativeIndex = (index - activeIndex + analyses.length) % analyses.length
        const isActive = relativeIndex === 0
        const isNext = relativeIndex === 1
        const isPrev = relativeIndex === 2

        let xPercent = -50
        let scale = 1
        let z = 0
        let rotateY = 0
        let opacity = 1
        let zIndex = 3
        let filter = 'blur(0px)'

        if (isNext) {
          xPercent = 24
          scale = 0.82
          z = -140
          rotateY = -9
          opacity = 0.45
          zIndex = 1
          filter = 'blur(2px)'
        } else if (isPrev) {
          xPercent = -124
          scale = 0.82
          z = -140
          rotateY = 9
          opacity = 0.45
          zIndex = 1
          filter = 'blur(2px)'
        }

        if (prefersReducedMotion) {
          gsap.to(slide, {
            xPercent,
            scale,
            z: 0,
            rotateY: 0,
            opacity,
            zIndex,
            filter: 'none',
            duration: 0.3,
            overwrite: 'auto',
          })
          return
        }

        if (isFirstRender.current) {
          gsap.fromTo(
            slide,
            {
              xPercent,
              scale: scale * 0.88,
              z: z - 90,
              rotateY,
              opacity: 0,
              filter,
            },
            {
              xPercent,
              scale,
              z,
              rotateY,
              opacity,
              zIndex,
              filter,
              duration: 1.25,
              ease: 'power3.out',
              delay: isActive ? 0.05 : 0.2,
            }
          )
        } else {
          gsap.to(slide, {
            xPercent,
            scale,
            z,
            rotateY,
            opacity,
            zIndex,
            filter,
            duration: 1.15,
            ease: 'power3.out',
            overwrite: 'auto',
          })
        }
      })

      // 2. Animação no texto com efeito elegante de entrada (stagger de título e descrição)
      if (titleRef.current && descRef.current) {
        if (prefersReducedMotion) {
          gsap.set([titleRef.current, descRef.current], { opacity: 1, y: 0, filter: 'none' })
        } else if (isFirstRender.current) {
          gsap.fromTo(
            [titleRef.current, descRef.current],
            { opacity: 0, y: 18, filter: 'blur(4px)' },
            {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 1.1,
              stagger: 0.15,
              ease: 'power3.out',
              delay: 0.25,
            }
          )
        } else {
          const tl = gsap.timeline()
          tl.fromTo(
            titleRef.current,
            { opacity: 0, y: 14, filter: 'blur(4px)' },
            {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.95,
              ease: 'power3.out',
            }
          ).fromTo(
            descRef.current,
            { opacity: 0, y: 12, filter: 'blur(3px)' },
            {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.85,
              ease: 'power3.out',
            },
            '-=0.75' // sobreposição com o título para ficar contínuo e suave
          )
        }
      }

      if (isFirstRender.current) {
        isFirstRender.current = false
      }
    }, stageRef)

    return () => ctx.revert()
  }, [activeIndex, hasEntered, prefersReducedMotion])

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
          <div className="software-analytics__controls" aria-label="Controles do carrossel">
            <button type="button" onClick={goPrevious} aria-label="Mostrar análise anterior"><ArrowLeft size={19} /></button>
            <button type="button" onClick={goNext} aria-label="Mostrar próxima análise"><ArrowRight size={19} /></button>
          </div>
        </motion.header>

        <motion.div
          ref={stageRef}
          className="software-analytics__stage"
          initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.975 }}
          animate={hasEntered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: prefersReducedMotion ? 1 : 0.975 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.68, delay: prefersReducedMotion ? 0 : 0.12, ease: [0.16, 1, 0.3, 1] }}
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
                  ref={(el) => { slideRefs.current[index] = el }}
                  className={`software-analytics__slide ${position}`}
                  key={analysis.title}
                  aria-roledescription="slide"
                  aria-label={`${index + 1} de ${analyses.length}: ${analysis.title}`}
                  aria-hidden={!isActive}
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
                    tabIndex={isActive ? 0 : -1}
                    aria-label={isActive ? `Análise selecionada: ${analysis.title}` : `Mostrar ${analysis.title}`}
                  >
                    <img src={analysis.image} alt={analysis.alt} loading="lazy" decoding="async" draggable={false} />
                  </button>
                </article>
              )
            })}
          </div>
        </motion.div>

        <div className="software-analytics__details" aria-live="polite">
          <h3 ref={titleRef}>{analyses[activeIndex].title}</h3>
          <p ref={descRef}>{analyses[activeIndex].description}</p>
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
