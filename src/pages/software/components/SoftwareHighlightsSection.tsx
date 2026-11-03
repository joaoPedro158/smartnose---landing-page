import dashboard from '../img/dashboard.png'
import experiments from '../img/lista-experimentos.png'
import sensors from '../img/controle-sensores.png'

const highlights = [
  {
    title: 'Entenda o que acontece em tempo real',
    description: 'Acompanhe a variação dos sensores em um só painel e consulte os dados reunidos ao longo do monitoramento.',
    image: dashboard,
    width: 1432,
    height: 741,
    alt: 'Painel SmartNose com gráfico de variação dos sensores ao longo do tempo',
  },
  {
    title: 'Consulte seus experimentos',
    description: 'Encontre os registros de cada experimento e visualize informações como dispositivo utilizado e data de conclusão.',
    image: experiments,
    width: 1402,
    height: 842,
    alt: 'Lista de experimentos com datas, dispositivos e opções para consultar análises',
  },
  {
    title: 'Tenha seus sensores organizados',
    description: 'Visualize os sensores cadastrados, confira sua disponibilidade e localize rapidamente cada dispositivo.',
    image: sensors,
    width: 1456,
    height: 912,
    alt: 'Lista de sensores cadastrados com função, data e status de exibição',
  },
]

export default function SoftwareHighlightsSection() {
  return (
    <section className="software-updates" id="recursos" aria-labelledby="software-updates-title">
      <div className="software-updates__inner">
        <header className="software-updates__header">
          <h2 id="software-updates-title">Conheça o sistema por dentro</h2>
          <p>Dados, experimentos e sensores em uma plataforma para acompanhar cada etapa do processo.</p>
        </header>
        <div className="software-highlights">
          {highlights.map((item) => (
            <article className="software-highlight" key={item.title}>
              <div className="software-highlight__media">
                <img src={item.image} alt={item.alt} width={item.width} height={item.height} loading="lazy" decoding="async" />
              </div>
              <div className="software-highlight__copy">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
