import { Search, ShieldCheck, Users } from 'lucide-react'
import adminPanel from '../img/painel de controle.png'

const adminFeatures = [
  {
    icon: Users,
    title: 'Usuários em uma só lista',
    description: 'Consulte nomes, e-mails, datas de acesso e perfis de administrador no mesmo painel.',
  },
  {
    icon: Search,
    title: 'Encontre cadastros rapidamente',
    description: 'Use a busca por nome para localizar uma conta sem percorrer toda a lista.',
  },
  {
    icon: ShieldCheck,
    title: 'Ações de administração à mão',
    description: 'Acesse os controles de edição e remoção diretamente em cada cadastro.',
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
