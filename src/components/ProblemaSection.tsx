import { Activity, FlaskConical, Hand } from 'lucide-react'

const problemSteps = [
  {
    number: '01',
    title: 'Coleta manual',
    description:
      'A coleta exige intervenção no processo e pode interromper o acompanhamento da fermentação.',
    icon: Hand,
    tone: 'problem-step--teal',
  },
  {
    number: '02',
    title: 'Análises recorrentes',
    description:
      'Ensaios laboratoriais aumentam o tempo e o custo necessários para acompanhar cada etapa do processo.',
    icon: FlaskConical,
    tone: 'problem-step--blue',
  },
  {
    number: '03',
    title: 'Monitoramento limitado',
    description:
      'Sem acompanhamento contínuo, mudanças importantes podem passar despercebidas entre uma análise e outra.',
    icon: Activity,
    tone: 'problem-step--teal',
  },
]

function ProblemaSection() {
  return (
    <section
      id="problema"
      aria-labelledby="problema-title"
      className="problem-section border-b border-white/10 bg-[#05080e] px-6 py-20 sm:px-8 sm:py-24"
    >
      <div className="mx-auto w-full max-w-[1216px]">
        <header className="mb-10 max-w-[768px] sm:mb-12">
          <h2
            id="problema-title"
            className="font-jakarta text-[36px] font-extrabold leading-[1.04] tracking-[-0.035em] text-white sm:text-5xl sm:leading-[1.08]"
          >
            O custo invisível das{' '}
            <span className="problem-title__accent">coletas manuais</span>
          </h2>
          <p className="mt-4 max-w-[68ch] font-inter text-base leading-[1.65] text-[#d1d5db] sm:text-lg">
            Monitorar a fermentação ainda pode exigir intervenções manuais, tornando o processo mais demorado, caro e difícil de acompanhar continuamente.
          </p>
        </header>

        <ol className="problem-flow" aria-label="Desafios do monitoramento da fermentação">
          {problemSteps.map((step) => {
            const Icon = step.icon

            return (
              <li className={`problem-step ${step.tone}`} key={step.number}>
                <div className="problem-step__marker">
                  <span className="problem-step__number">{step.number}</span>
                  <Icon size={19} strokeWidth={1.7} aria-hidden="true" />
                </div>
                <h3 className="font-jakarta text-lg font-bold leading-7 text-white sm:text-xl">
                  {step.title}
                </h3>
                <p className="font-inter text-sm leading-[1.7] text-slate-300">
                  {step.description}
                </p>
              </li>
            )
          })}
        </ol>

        <p className="problem-conclusion font-jakarta text-xl font-semibold leading-snug text-white sm:text-2xl">
          O processo precisa ser{' '}
          <span>mais simples, contínuo e acessível.</span>
        </p>
      </div>
    </section>
  )
}

export default ProblemaSection
