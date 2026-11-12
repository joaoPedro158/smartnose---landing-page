import { KeyRound, MonitorCog, Radio } from 'lucide-react'
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
  return (
    <section className="software-admin" id="administracao" aria-labelledby="software-admin-title">
      <div className="software-admin__inner">
        <header className="software-admin__header">
          <h2 id="software-admin-title">Gestão de usuários em um só lugar</h2>
          <p>O painel do administrador reúne os cadastros e as ferramentas para manter os acessos organizados.</p>
        </header>

        <figure className="software-admin__preview">
          <img
            src={adminPanel}
            alt="Painel do administrador SmartNose com lista de usuários, busca por nome e ações para cada cadastro"
            width={1895}
            height={911}
            loading="lazy"
            decoding="async"
          />
        </figure>

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
