import React from 'react'

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

function DashboardDemonstration() {
  return (
    <div className="w-full mt-16 sm:mt-20">
      {/* Ambient background glow */}
      <div className="relative mx-auto max-w-[1100px] rounded-2xl p-[1px] bg-gradient-to-b from-white/15 via-white/5 to-transparent shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {/* Soft cyan aura behind the dashboard */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-2 rounded-2xl blur-2xl opacity-20 bg-gradient-to-r from-primary via-secondary to-accent-mint"
        />

        {/* Dashboard Frame */}
        <div className="relative overflow-hidden rounded-2xl bg-[#070b14]/95 backdrop-blur-xl border border-white/10 p-5 sm:p-7 md:p-8">
          {/* Dashboard Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div className="flex items-center gap-3">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-mint opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-mint" />
              </span>
              <div>
                <p className="font-mono text-xs font-semibold tracking-wider text-primary uppercase">
                  Batelada #042-B • Em andamento
                </p>
                <p className="text-xs text-slate-400 font-inter">
                  Monitoramento contínuo dos compostos voláteis
                </p>
              </div>
            </div>

            {/* Telemetry pill */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300">
              <span className="text-accent-mint font-semibold">T+ 48h 12m</span>
              <span className="text-white/20">|</span>
              <span className="text-slate-400">Leitura remota estável</span>
            </div>
          </div>

          {/* Metric cards summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 my-6">
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
              <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Voláteis Totais</p>
              <p className="text-lg sm:text-xl font-bold font-jakarta text-white mt-1">94.2 <span className="text-xs font-mono text-primary font-normal">ppm</span></p>
              <p className="text-[10px] text-accent-mint mt-0.5">Estágio vigoroso</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
              <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Taxa de CO₂</p>
              <p className="text-lg sm:text-xl font-bold font-jakarta text-white mt-1">1.84 <span className="text-xs font-mono text-secondary font-normal">L/min</span></p>
              <p className="text-[10px] text-slate-400 mt-0.5">Pico estabilizado</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
              <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Desvio da Batelada</p>
              <p className="text-lg sm:text-xl font-bold font-jakarta text-white mt-1">&lt; 0.4%</p>
              <p className="text-[10px] text-accent-mint mt-0.5">Padrão idêntico #041</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
              <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Abertura de Tanque</p>
              <p className="text-lg sm:text-xl font-bold font-jakarta text-white mt-1">0 <span className="text-xs font-mono text-primary font-normal">intervenções</span></p>
              <p className="text-[10px] text-accent-mint mt-0.5">Processo 100% selado</p>
            </div>
          </div>

          {/* SVG Fermentation Curve Graph */}
          <div className="relative rounded-xl bg-[#04060a] border border-white/5 p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                Evolução Cinética da Fermentação (Tempo Real vs. Histórico)
              </span>
              <div className="flex items-center gap-4 text-[11px] font-mono">
                <span className="inline-flex items-center gap-1.5 text-primary">
                  <span className="w-2.5 h-0.5 bg-primary rounded-full inline-block" /> Batelada Atual (#042-B)
                </span>
                <span className="inline-flex items-center gap-1.5 text-slate-400">
                  <span className="w-2.5 h-0.5 bg-slate-500 rounded-full inline-block border-t border-dashed" /> Batelada Anterior (#041)
                </span>
              </div>
            </div>

            {/* Vector graph simulation */}
            <div className="relative h-44 sm:h-52 w-full">
              <svg
                viewBox="0 0 800 200"
                className="w-full h-full overflow-visible"
                preserveAspectRatio="none"
                aria-label="Gráfico de fermentação em tempo real"
              >
                <defs>
                  {/* Cyan curve gradient fill */}
                  <linearGradient id="cyanFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00CFAA" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#00CFAA" stopOpacity="0.0" />
                  </linearGradient>
                  {/* Subtle grid pattern */}
                  <pattern id="graphGrid" width="80" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 80 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                  </pattern>
                </defs>

                {/* Grid */}
                <rect width="800" height="200" fill="url(#graphGrid)" />

                {/* Previous batch baseline (dashed white/gray curve) */}
                <path
                  d="M0,180 Q150,175 240,130 T450,65 T650,45 T800,42"
                  fill="none"
                  stroke="rgba(148,163,184,0.4)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />

                {/* Shaded area under active curve */}
                <path
                  d="M0,180 Q150,170 240,120 T450,55 T650,38 T800,35 L800,200 L0,200 Z"
                  fill="url(#cyanFill)"
                />

                {/* Active batch primary curve (Cyan) */}
                <path
                  d="M0,180 Q150,170 240,120 T450,55 T650,38 T800,35"
                  fill="none"
                  stroke="#00CFAA"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Secondary aroma volatile trajectory (Deep Electric Blue) */}
                <path
                  d="M0,195 Q200,190 320,160 T560,110 T720,80 T800,75"
                  fill="none"
                  stroke="#0099CC"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  opacity="0.85"
                />

                {/* Current real-time scan point marker */}
                <circle cx="680" cy="37" r="4.5" fill="#00E5C0" className="animate-pulse" />
                <circle cx="680" cy="37" r="10" stroke="#00E5C0" strokeWidth="1" opacity="0.4" />
                <line x1="680" y1="0" x2="680" y2="200" stroke="#00E5C0" strokeWidth="1" strokeDasharray="2 2" opacity="0.3" />
              </svg>
            </div>

            {/* Time labels axis */}
            <div className="flex justify-between text-[10px] font-mono text-slate-500 pt-2 border-t border-white/5">
              <span>Início (0h)</span>
              <span>12h</span>
              <span>24h</span>
              <span>36h</span>
              <span className="text-primary font-semibold">Tempo Atual (48h)</span>
              <span>60h (Projeção)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subdued descriptive caption */}
      <p className="mt-3 text-center font-inter text-xs tracking-wide text-slate-400/80">
        Visualização dos dados de fermentação em tempo real.
      </p>
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
