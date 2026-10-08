// ─── SVG Icons ─────────────────────────────────────────────────────────────────

function AmostraIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Erlenmeyer flask */}
      <path
        d="M17 9h6v7l7 16a2 2 0 01-2 2H12a2 2 0 01-2-2l7-16V9z"
        stroke="#00CFAA"
        strokeWidth="1.2"
        fill="rgba(0,207,170,0.05)"
        strokeLinejoin="round"
      />
      {/* Neck rim */}
      <line
        x1="16"
        y1="9"
        x2="24"
        y2="9"
        stroke="#00CFAA"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Gas particles rising */}
      <circle cx="17" cy="5" r="1.3" fill="#00CFAA" opacity="0.55" />
      <circle cx="20" cy="2.5" r="1" fill="#00E5C0" opacity="0.35" />
      <circle cx="23.5" cy="4.5" r="0.9" fill="#0099CC" opacity="0.45" />
    </svg>
  )
}

function SensoresIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Board / substrate */}
      <rect
        x="5"
        y="8"
        width="30"
        height="22"
        rx="3"
        stroke="#00CFAA"
        strokeWidth="1"
        fill="rgba(0,207,170,0.03)"
      />
      {/* Sensor chips — 3×2 grid */}
      <rect x="8" y="11" width="6" height="6" rx="1.5" fill="#00CFAA" opacity="0.3" />
      <rect x="17" y="11" width="6" height="6" rx="1.5" fill="#0099CC" opacity="0.35" />
      <rect x="26" y="11" width="6" height="6" rx="1.5" fill="#00CFAA" opacity="0.25" />
      <rect x="8" y="20" width="6" height="6" rx="1.5" fill="#0099CC" opacity="0.25" />
      <rect x="17" y="20" width="6" height="6" rx="1.5" fill="#00E5C0" opacity="0.3" />
      <rect x="26" y="20" width="6" height="6" rx="1.5" fill="#00CFAA" opacity="0.35" />
      {/* Connection pins */}
      <line x1="11" y1="30" x2="11" y2="35" stroke="#00CFAA" strokeWidth="0.8" opacity="0.35" strokeLinecap="round" />
      <line x1="20" y1="30" x2="20" y2="35" stroke="#00CFAA" strokeWidth="0.8" opacity="0.35" strokeLinecap="round" />
      <line x1="29" y1="30" x2="29" y2="35" stroke="#00CFAA" strokeWidth="0.8" opacity="0.35" strokeLinecap="round" />
    </svg>
  )
}

function PadraoIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Baseline */}
      <line x1="5" y1="35" x2="35" y2="35" stroke="#00CFAA" strokeWidth="0.6" opacity="0.2" />
      {/* Spectral bars — chemical fingerprint */}
      <rect x="7" y="22" width="3.5" height="13" rx="1" fill="#00CFAA" opacity="0.45" />
      <rect x="12.5" y="12" width="3.5" height="23" rx="1" fill="#0099CC" opacity="0.5" />
      <rect x="18" y="17" width="3.5" height="18" rx="1" fill="#00E5C0" opacity="0.4" />
      <rect x="23.5" y="7" width="3.5" height="28" rx="1" fill="#00CFAA" opacity="0.55" />
      <rect x="29" y="19" width="3.5" height="16" rx="1" fill="#0099CC" opacity="0.35" />
    </svg>
  )
}

function IdentificacaoIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer ring */}
      <circle cx="20" cy="20" r="14" stroke="#00CFAA" strokeWidth="1.2" fill="rgba(0,207,170,0.04)" />
      {/* Checkmark */}
      <path
        d="M13 20l5 5 9-10"
        stroke="#00E5C0"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Accent dots — cardinal positions */}
      <circle cx="20" cy="4" r="1" fill="#00CFAA" opacity="0.3" />
      <circle cx="20" cy="36" r="1" fill="#00CFAA" opacity="0.3" />
      <circle cx="4" cy="20" r="1" fill="#0099CC" opacity="0.3" />
      <circle cx="36" cy="20" r="1" fill="#0099CC" opacity="0.3" />
    </svg>
  )
}

// ─── Subcomponents ────────────────────────────────────────────────────────────

function FlowStep({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="oque-step">
      <div className="oque-step__icon">{icon}</div>
      <span className="oque-step__label">{label}</span>
    </div>
  )
}

function FlowConnector({ delay }: { delay?: string }) {
  return (
    <div
      className={`oque-connector${delay ? ` oque-connector--${delay}` : ''}`}
      aria-hidden="true"
    />
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function OQueESection() {
  return (
    <section
      id="o-que-e"
      aria-labelledby="o-que-e-title"
      className="relative isolate overflow-hidden border-b border-white/10 bg-[#070b14] px-6 py-16 sm:px-8 sm:py-20"
    >
      {/* Subtle ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-8 -z-10 h-[380px] w-[380px] rounded-full blur-[100px]"
        style={{
          background:
            'radial-gradient(circle, rgba(0,153,204,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="mx-auto w-full max-w-[1216px]">
        {/* ── Title ──────────────────────────────────────────────────── */}
        <h2
          id="o-que-e-title"
          className="max-w-[600px] font-jakarta text-[32px] font-extrabold leading-[1.08] tracking-[-0.035em] text-white sm:text-[40px] lg:text-[48px]"
        >
          O que é um nariz eletrônico?
        </h2>

        {/* ── Explanatory text ───────────────────────────────────────── */}
        <p className="mt-5 max-w-[62ch] font-inter text-base leading-[1.7] text-[#cbd5e1] sm:text-lg">
          Um nariz eletrônico é um sistema capaz de reconhecer padrões químicos
          presentes no ar, de forma semelhante ao funcionamento do olfato humano.
        </p>
        <p className="mt-3 max-w-[62ch] font-inter text-sm leading-[1.7] text-slate-400 sm:text-base">
          O projeto utiliza um conjunto de sensores MQ, que respondem à presença
          de diferentes gases. A combinação dessas respostas permite identificar
          padrões associados às diferentes amostras analisadas.
        </p>

        {/* ── Flow Visual ────────────────────────────────────────────── */}
        <div
          className="oque-flow"
          role="img"
          aria-label="Fluxo: amostra passa pelos sensores MQ, gera um padrão, e o padrão é identificado"
        >
          <FlowStep icon={<AmostraIcon />} label="Amostra" />
          <FlowConnector />
          <FlowStep icon={<SensoresIcon />} label="Sensores MQ" />
          <FlowConnector delay="d1" />
          <FlowStep icon={<PadraoIcon />} label="Padrão" />
          <FlowConnector delay="d2" />
          <FlowStep icon={<IdentificacaoIcon />} label="Identificação" />
        </div>

        {/* ── Closing text ───────────────────────────────────────────── */}
        <p className="oque-closing">
          O sistema recebe uma amostra, os sensores MQ respondem aos gases
          presentes nela, essas respostas formam um padrão — e o padrão pode ser
          identificado.
        </p>
      </div>
    </section>
  )
}
