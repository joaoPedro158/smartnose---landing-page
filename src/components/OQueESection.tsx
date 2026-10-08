import { Activity, FlaskConical, History, MonitorSmartphone } from 'lucide-react'

const benefits = [
  {
    icon: FlaskConical,
    title: 'Sem coleta manual de amostras',
    description: 'Acompanhe os gases liberados durante a fermentação sem retirar amostras do líquido.',
  },
  {
    icon: MonitorSmartphone,
    title: 'Acesso remoto',
    description: 'Consulte as leituras pela plataforma em um computador ou celular.',
  },
  {
    icon: History,
    title: 'Histórico e relatórios',
    description: 'Organize os registros dos experimentos para análise e documentação.',
  },
]

export default function OQueESection() {
  return (
    <section
      id="beneficios"
      aria-labelledby="beneficios-title"
      className="relative isolate overflow-hidden border-b border-white/10 bg-[#070b14] px-6 py-20 sm:px-8 sm:py-24 lg:py-28"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-10 -z-10 h-[420px] w-[420px] rounded-full bg-[#0099cc]/[0.07] blur-[100px]" />
      <div className="mx-auto w-full max-w-[1216px]">
        <header className="max-w-[780px]">
          <h2
            id="beneficios-title"
            className="max-w-[760px] font-jakarta text-[38px] font-extrabold leading-[1.06] tracking-[-0.035em] text-white sm:text-5xl sm:leading-[1.08] lg:text-[56px]"
          >
            Acompanhe a fermentação sem interromper o processo
          </h2>
          <p className="mt-5 max-w-[66ch] font-inter text-base leading-[1.7] text-[#cbd5e1] sm:text-lg">
            O SmartNose analisa os gases liberados durante a fermentação e transmite os dados para uma plataforma de monitoramento remoto.
          </p>
        </header>

        <ul aria-label="Benefícios do SmartNose" className="mt-12 grid list-none gap-x-10 gap-y-8 p-0 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-x-12">
          {benefits.map(({ icon: Icon, title, description }) => (
            <li key={title} className="min-w-0 border-t border-white/10 pt-5">
              <Icon aria-hidden="true" className="mb-5 text-[#00cfaa]" size={23} strokeWidth={1.7} />
              <h3 className="font-jakarta text-lg font-bold leading-snug text-white sm:text-xl">{title}</h3>
              <p className="mt-2 max-w-[38ch] font-inter text-sm leading-[1.7] text-slate-300 sm:text-[15px]">{description}</p>
            </li>
          ))}
        </ul>

        <section aria-labelledby="platform-title" className="mt-20 border-t border-white/10 pt-10 sm:mt-24 sm:pt-12">
          <div className="mb-7 flex flex-col gap-2 sm:mb-9 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
            <div>
              <h3 id="platform-title" className="font-jakarta text-[30px] font-bold leading-tight tracking-[-0.025em] text-white sm:text-[38px]">
                Conheça a plataforma
              </h3>
              <p className="mt-2 font-inter text-[15px] leading-6 text-slate-300 sm:text-base">
                Da visualização das leituras à análise dos dados experimentais.
              </p>
            </div>
            <span className="shrink-0 font-mono text-xs text-slate-400">Capturas da plataforma</span>
          </div>

          <div className="relative flex min-h-[250px] items-center justify-center overflow-hidden border border-white/10 bg-[#090f1a] px-6 py-12 sm:min-h-[340px] sm:px-10 lg:min-h-[440px]">
            <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00cfaa]/35 to-transparent" />
            <div className="relative max-w-[440px] text-center">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-[#00cfaa]/25 bg-[#00cfaa]/[0.07] text-[#00cfaa]">
                <Activity aria-hidden="true" size={21} strokeWidth={1.6} />
              </div>
              <p className="font-jakarta text-lg font-semibold text-white">As telas do sistema serão exibidas aqui</p>
              <p className="mt-2 font-inter text-sm leading-6 text-slate-400">
                Ainda não há capturas reais da plataforma neste projeto.
              </p>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}
