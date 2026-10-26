import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import dashboardExperiment from '../img/grafico_dashBoard(2).jpg'
import dashboardSensors from '../img/grafico_dashboard.jpg'
import dashboardComparison from '../img/grafico_dashboard(1).jpg'

// ─── Minimalist Cohesive Icons ────────────────────────────────────────────────

function SemColetaIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="text-primary transition-transform duration-300 group-hover:scale-110"
    >
      {/* Fermenter tank outline */}
      <rect
        x="6"
        y="5"
        width="16"
        height="18"
        rx="3"
        stroke="#00CFAA"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Sealed top valve */}
      <path d="M11 5V3H17V5" stroke="#00CFAA" strokeWidth="1.5" strokeLinecap="round" />
      {/* Internal continuous aroma sensor beam (no opening needed) */}
      <path
        d="M14 9V17"
        stroke="#00E5C0"
        strokeWidth="1.5"
        strokeDasharray="2 2"
        strokeLinecap="round"
      />
      {/* Continuous vapor indicator */}
      <circle cx="14" cy="18" r="1.5" fill="#00E5C0" />
      <circle cx="10" cy="12" r="1" fill="#00CFAA" opacity="0.6" />
      <circle cx="18" cy="13" r="1" fill="#0099CC" opacity="0.6" />
    </svg>
  )
}

function AcessoRemotoIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="text-primary transition-transform duration-300 group-hover:scale-110"
    >
      {/* Remote broadcast origin */}
      <circle cx="14" cy="17" r="2" fill="#00CFAA" />
      {/* Pulse transmission arcs */}
      <path
        d="M9.5 12.5C12 10 16 10 18.5 12.5"
        stroke="#00CFAA"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M6.5 9.5C10.5 5.5 17.5 5.5 21.5 9.5"
        stroke="#0099CC"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.8"
      />
      {/* Telemetric cloud/device node */}
      <path
        d="M8 22H20"
        stroke="#00CFAA"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M14 19V22"
        stroke="#00CFAA"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function RastreabilidadeIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="text-primary transition-transform duration-300 group-hover:scale-110"
    >
      {/* Comparative batch curves */}
      <path
        d="M5 21L10 14L15 17L23 7"
        stroke="#00CFAA"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Historical reference curve */}
      <path
        d="M5 18L10 12L16 14L23 9"
        stroke="#0099CC"
        strokeWidth="1.3"
        strokeDasharray="2.5 2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.65"
      />
      {/* Key data tracking point */}
      <circle cx="23" cy="7" r="2" fill="#00E5C0" />
      <circle cx="15" cy="17" r="1.5" fill="#00CFAA" />
      {/* Time axis line */}
      <line x1="5" y1="23" x2="23" y2="23" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeLinecap="round" />
    </svg>
  )
}

// ─── Data Specification ───────────────────────────────────────────────────────

interface BenefitItem {
  number: string
  title: string
  text: string
  icon: React.ReactNode
}

const BENEFITS: BenefitItem[] = [
  {
    number: '01',
    title: 'Sem coleta manual',
    text: 'O SmartNose acompanha os gases liberados durante a fermentação sem a necessidade de retirar amostras manualmente ou abrir o fermentador repetidamente.',
    icon: <SemColetaIcon />,
  },
  {
    number: '02',
    title: 'Acesso remoto e contínuo',
    text: 'Os dados podem ser acompanhados remotamente, permitindo observar a evolução da fermentação sem estar próximo do equipamento.',
    icon: <AcessoRemotoIcon />,
  },
  {
    number: '03',
    title: 'Rastreabilidade dos dados',
    text: 'Os dados registrados permitem acompanhar e comparar diferentes bateladas, facilitando a análise do processo e a geração de registros técnicos.',
    icon: <RastreabilidadeIcon />,
  },
]

// ─── Integrated Dashboard Demonstration ───────────────────────────────────────

// ─── Image Carousel Demonstration ───────────────────────────────────────────────

const CAROUSEL_SLIDES = [
  {
    title: 'Visualização gráfica do experimento',
    description: 'Curvas de resposta dos sensores MQ, temperatura e umidade registradas durante o experimento.',
    image: dashboardExperiment,
    alt: 'Gráfico do experimento com curvas de sensores MQ, temperatura e umidade.',
  },
  {
    title: 'Respostas em diferentes ensaios',
    description: 'Dois registros gráficos mostram as respostas dos sensores em configurações distintas do experimento.',
    image: dashboardSensors,
    alt: 'Dois gráficos de respostas dos sensores em ensaios com configurações distintas.',
  },
  {
    title: 'Leitura das curvas dos sensores',
    description: 'Acompanhe no painel as variações percentuais registradas ao longo do experimento.',
    image: dashboardComparison,
    alt: 'Painel gráfico com as curvas percentuais dos sensores ao longo do experimento.',
  },
]

function DashboardDemonstration() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => setIsPlaying(!motionPreference.matches)
    updateMotionPreference()
    motionPreference.addEventListener('change', updateMotionPreference)
    return () => motionPreference.removeEventListener('change', updateMotionPreference)
  }, [])

  useEffect(() => {
    if (!isPlaying || isHovered || isFocused) return
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % CAROUSEL_SLIDES.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [isPlaying, isHovered, isFocused])

  const nextSlide = () => setActiveIndex((current) => (current + 1) % CAROUSEL_SLIDES.length)
  const prevSlide = () => setActiveIndex((current) => (current - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length)
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      nextSlide()
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      prevSlide()
    }
  }

  return (
    <div
      className="w-full mt-16 sm:mt-20"
      role="region"
      aria-roledescription="carrossel"
      aria-label="Imagens do sistema SmartNose"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsFocused(false)
      }}
      onKeyDown={handleKeyDown}
    >
      
    </div>
  )
}

// ─── Main Section Component ───────────────────────────────────────────────────

export default function VantagensSection() {
  return (
    <section
      id="vantagens"
      aria-labelledby="vantagens-title"
      className="vantagens-section relative isolate overflow-hidden border-b border-white/10 bg-brand-dark px-6 py-20 sm:px-8 sm:py-28"
    >
      {/* Anchor alias for existing #solucao link in Header */}
      <span id="solucao" className="sr-only" aria-hidden="true" />

      {/* Atmospheric radial cyan glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 -z-10 h-[450px] w-[650px] rounded-full blur-[110px] opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(0,207,170,0.2) 0%, rgba(0,153,204,0.08) 50%, transparent 80%)',
        }}
      />

      <div className="mx-auto w-full max-w-[1216px]">
        {/* ── Section Header ────────────────────────────────────────────── */}
        <header className="max-w-[760px]">
          <h2
            id="vantagens-title"
            className="font-jakarta text-[36px] font-extrabold leading-[1.06] tracking-[-0.035em] text-white sm:text-5xl sm:leading-[1.08]"
          >
            Por que o SmartNose?
          </h2>
          <p className="mt-4 font-inter text-base leading-[1.65] text-slate-300 sm:text-lg">
            Monitoramento contínuo sem interromper o processo de fermentação.
          </p>
        </header>

        {/* ── Connected Editorial Flow of 3 Benefits ───────────────────── */}
        <div className="vantagens-flow mt-14 sm:mt-18" aria-label="Principais benefícios do SmartNose">
          {/* Connecting track line for desktop (connected visual narrative) */}
          <div className="vantagens-track" aria-hidden="true">
            <div className="vantagens-track__line" />
          </div>

          <div className="vantagens-grid">
            {BENEFITS.map((item) => (
              <article key={item.number} className="vantagens-item group">
                {/* Node marker with discreet number */}
                <div className="vantagens-item__node">
                  <span className="vantagens-item__number font-mono">{item.number}</span>
                  <div className="vantagens-item__dot" aria-hidden="true" />
                </div>

                {/* Icon */}
                <div className="vantagens-item__icon-wrapper mb-3">
                  {item.icon}
                </div>

                {/* Title */}
                <h3 className="font-jakarta text-lg sm:text-xl font-bold leading-snug text-white group-hover:text-primary transition-colors duration-200">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="mt-2.5 font-inter text-sm sm:text-[15px] leading-[1.65] text-slate-300/90 max-w-[38ch]">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* ── System Demonstration (Dashboard) ─────────────────────────── */}
        <DashboardDemonstration />
      </div>
    </section>
  )
}


