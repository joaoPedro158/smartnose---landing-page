import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { KeyRound, Maximize2, Minus, MonitorCog, Plus, Radio } from 'lucide-react'
import adminPanel from '../img/painel de controle.png'

const adminFeatures = [
  {
    icon: KeyRound,
    title: 'Controle de acesso',
    description: 'Gerencie quem pode acessar a plataforma e mantenha as permissões organizadas em um só lugar.',
  },
  {
    icon: MonitorCog,
    title: 'Controle de dispositivo',
    description: 'Acompanhe os dispositivos cadastrados e mantenha suas configurações sempre sob controle.',
  },
  {
    icon: Radio,
    title: 'Controle de sensores',
    description: 'Visualize os sensores disponíveis e organize o monitoramento de cada ambiente.',
  },
]

export default function SoftwareAdminSection() {
  const [isPreviewExpanded, setIsPreviewExpanded] = useState(false)
  const [previewZoom, setPreviewZoom] = useState(1)

  useEffect(() => {
    if (!isPreviewExpanded) return

    const previousBodyOverflow = document.body.style.overflow
    const previousHtmlOverflow = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousHtmlOverflow
    }
  }, [isPreviewExpanded])

  const changePreviewZoom = (amount: number) => {
    setPreviewZoom((currentZoom) => Math.min(4, Math.max(1, currentZoom + amount)))
  }

  return (
    <section className="software-admin" id="administracao" aria-labelledby="software-admin-title">
      <div className="software-admin__inner">
        <header className="software-admin__header">
          <h2 id="software-admin-title">Gestão de usuários em um só lugar</h2>
          <p>O painel do administrador reúne os cadastros e as ferramentas para manter os acessos organizados.</p>
        </header>

        <figure className="software-admin__preview">
          <button
            className="software-admin__preview-trigger"
            type="button"
            aria-label="Ampliar imagem do painel do administrador"
            onClick={() => {
              setPreviewZoom(1)
              setIsPreviewExpanded(true)
            }}
          >
          <img
            src={adminPanel}
            alt="Painel do administrador SmartNose com lista de usuários, busca por nome e ações para cada cadastro"
            width={1895}
            height={911}
            loading="lazy"
            decoding="async"
          />
          <span className="software-admin__preview-icon" aria-hidden="true">
            <Maximize2 size={20} strokeWidth={2} />
          </span>
          </button>
        </figure>

        {isPreviewExpanded && createPortal((
          <div
            className="software-admin__lightbox"
            role="presentation"
            onClick={() => setIsPreviewExpanded(false)}
            onWheel={(event) => {
              event.preventDefault()
              changePreviewZoom(event.deltaY < 0 ? 0.25 : -0.25)
            }}
          >
            <div className="software-admin__lightbox-tools" onClick={(event) => event.stopPropagation()}>
              <button type="button" aria-label="Diminuir zoom" disabled={previewZoom <= 1} onClick={() => changePreviewZoom(-0.25)}>
                <Minus size={18} />
              </button>
              <span aria-live="polite">{Math.round(previewZoom * 100)}%</span>
              <button type="button" aria-label="Aumentar zoom" disabled={previewZoom >= 4} onClick={() => changePreviewZoom(0.25)}>
                <Plus size={18} />
              </button>
            </div>
            <img
              className="software-admin__lightbox-image"
              src={adminPanel}
              alt="Painel do administrador SmartNose ampliado"
              style={{
                width: `${Math.min(window.innerWidth - 32, (window.innerHeight - 32) * 1895 / 911) * previewZoom}px`,
              }}
              onClick={(event) => event.stopPropagation()}
            />
          </div>
        ), document.body)}

        <div className="software-admin__features">
          {adminFeatures.map(({ icon: Icon, title, description }) => (
            <article className="software-admin__feature" key={title}>
              <span className="software-admin__feature-icon" aria-hidden="true"><Icon size={20} strokeWidth={1.8} /></span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
