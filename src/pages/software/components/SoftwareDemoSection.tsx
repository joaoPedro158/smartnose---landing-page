import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import dashboard from '../img/dashboard.png'
import sensors from '../img/controle-sensores.png'
import experiments from '../img/lista-experimentos.png'
import hardware from '../img/controle-hardware.png'

const updates = [
  { title: 'Acompanhe os sensores em um só lugar', description: 'Consulte os sensores cadastrados, confira seu status e encontre rapidamente cada dispositivo.', image: dashboard, alt: 'Dashboard SmartNose com gráfico de variação dos sensores', action: 'Explorar dashboard' },
  { title: 'Controle sua lista de sensores', description: 'Pesquise os sensores cadastrados e visualize sua função, data de cadastro e disponibilidade.', image: sensors, alt: 'Tela da lista de sensores cadastrados', action: 'Ver sensores' },
  { title: 'Organize seus experimentos', description: 'Consulte os experimentos registrados, seus dispositivos e as informações de cada análise.', image: experiments, alt: 'Tela da lista de experimentos SmartNose', action: 'Ver experimentos' },
  { title: 'Gerencie os dispositivos conectados', description: 'Visualize os dispositivos de hardware disponíveis e acesse os controles correspondentes.', image: hardware, alt: 'Tela de seleção e controle de hardware', action: 'Ver hardware' },
]

export default function SoftwareDemoSection() {
  const [activeUpdate, setActiveUpdate] = useState(0)
  const hasSelectedUpdate = useRef(false)
  const update = updates[activeUpdate]
  const moveUpdate = (direction: number) => setActiveUpdate((index) => (index + direction + updates.length) % updates.length)

  useEffect(() => {
    if (!hasSelectedUpdate.current) {
      hasSelectedUpdate.current = true
      return
    }
    document.getElementById(`software-update-${activeUpdate}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
  }, [activeUpdate])

  return (
    <section className="software-updates" id="novidades" aria-labelledby="software-updates-title">
      <div className="software-updates__inner">
        <header className="software-updates__header">
          <div>
            <h2 id="software-updates-title">O que está acontecendo</h2>
            <p>Veja o que você pode fazer com o SmartNose.</p>
          </div>
          <div className="software-updates__controls" role="group" aria-label="Navegação das demonstrações">
            <button type="button" onClick={() => moveUpdate(-1)} aria-label="Demonstração anterior"><ArrowLeft size={19} aria-hidden="true" /></button>
            <button type="button" onClick={() => moveUpdate(1)} aria-label="Próxima demonstração"><ArrowRight size={19} aria-hidden="true" /></button>
          </div>
        </header>
        <div className="software-updates__rail" aria-label="Demonstrações do software">
          {updates.map((item, index) => (
            <button
              className={`software-update-card${index === activeUpdate ? ' is-active' : ''}`}
              id={`software-update-${index}`}
              key={item.title}
              type="button"
              aria-label={`Selecionar: ${item.title}`}
              aria-pressed={index === activeUpdate}
              onClick={() => setActiveUpdate(index)}
            >
              <img src={item.image} alt={item.alt} />
              <span className="software-update-card__shade" aria-hidden="true" />
              <span className="software-update-card__title">{item.title}</span>
            </button>
          ))}
        </div>
        <div className="software-updates__feature" aria-live="polite" aria-atomic="true">
          <p><strong>{update.title}.</strong> {update.description}</p>
          <a href="#inicio">{update.action}<ArrowRight size={16} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  )
}
