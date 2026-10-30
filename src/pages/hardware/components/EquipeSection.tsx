interface TeamMember {
  name: string
  initials: string
  position: 'Estudante' | 'Orientador'
  area: string
  responsibilities: string
}

const TEAM: TeamMember[] = [
  {
    name: 'João Pedro da Silva Neto',
    initials: 'JP',
    position: 'Estudante',
    area: 'Hardware',
    responsibilities: 'Montagem do protótipo e programação das placas Arduino e ESP32.',
  },
  {
    name: 'Luana Gomes',
    initials: 'LG',
    position: 'Estudante',
    area: 'Hardware',
    responsibilities: 'Montagem do protótipo e programação das placas Arduino e ESP32.',
  },
  {
    name: 'João Vitor',
    initials: 'JV',
    position: 'Estudante',
    area: 'Software',
    responsibilities: 'Backend e operações de infraestrutura (DevOps).',
  },
  {
    name: 'Bruno',
    initials: 'B',
    position: 'Estudante',
    area: 'Software',
    responsibilities: 'Desenvolvimento do sistema que recebe os dados do SmartNose.',
  },
  {
    name: 'Ary Souza',
    initials: 'AS',
    position: 'Orientador',
    area: 'Engenharia elétrica',
    responsibilities: 'Orientação da montagem física e dos sistemas elétricos.',
  },
  {
    name: 'Leandro',
    initials: 'L',
    position: 'Orientador',
    area: 'Engenharia de software',
    responsibilities: 'Arquitetura de software e modelos de análise.',
  },
  {
    name: 'Hanniel Freitas',
    initials: 'HF',
    position: 'Orientador',
    area: 'Química',
    responsibilities: 'Preparação das amostras para análise.',
  },
]

const CONTACTS = [
  { name: 'LinkedIn', label: 'LinkedIn', path: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></> },
  { name: 'GitHub', label: 'GitHub', path: <><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></> },
  { name: 'E-mail', label: 'E-mail', path: <><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></> },
  { name: 'Currículo Lattes', label: 'Lattes', path: <><path d="M12 3v12m0 0 4-4m-4 4-4-4"/><path d="M5 17v3h14v-3"/></> },
]

function ContactIcons() {
  return (
    <ul className="team-contacts" aria-label="Canais de contato">
      {CONTACTS.map((contact) => (
        <li key={contact.name}>
          <span className="team-contact-icon" aria-label={`${contact.name}: link não informado`} title={`${contact.name}: link não informado`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {contact.path}
            </svg>
            <span className="sr-only">{contact.label}</span>
          </span>
        </li>
      ))}
    </ul>
  )
}

function MemberCards({ members }: { members: TeamMember[] }) {
  return (
    <div className="team-grid">
      {members.map((member) => (
        <article className="team-member" key={member.name}>
          <div className="team-member__portrait" aria-hidden="true">
            <div className="team-member__avatar">
              <span>{member.initials}</span>
            </div>
            <span className="team-member__portrait-mark">SmartNose</span>
          </div>
          <div className="team-member__content">
            <div className="team-member__details">
              <h3>{member.name}</h3>
              <p className="team-member__position">{member.position}</p>
              <span className="team-member__area">{member.area}</span>
            </div>
            <p className="team-member__description">{member.responsibilities}</p>
            <div className="team-member__contact">
              <ContactIcons />
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

export default function EquipeSection() {
  const students = TEAM.filter((member) => member.position === 'Estudante')
  const mentors = TEAM.filter((member) => member.position === 'Orientador')

  return (
    <section
      id="equipe"
      aria-labelledby="equipe-title"
      className="team-section border-b border-white/10 bg-[#05080e] px-6 py-16 sm:px-8 sm:py-20"
    >
      <div className="mx-auto w-full max-w-[1216px]">
        <header className="team-heading">
          <h2 id="equipe-title">A equipe do SmartNose</h2>
          <p>Conheça quem trabalha no desenvolvimento do protótipo, do software e da pesquisa.</p>
        </header>

        <p className="team-note" role="note">
          Os ícones indicam canais disponíveis; links de perfis serão adicionados quando informados.
        </p>

        <div className="team-category">
          <header className="team-category__heading">
            <h3>Membros do Projeto</h3>
            <span>{students.length} pessoas</span>
          </header>
          <MemberCards members={students} />
        </div>

        <div className="team-category team-category--mentors">
          <header className="team-category__heading">
            <h3>Orientadores / Mentores</h3>
            <span>{mentors.length} pessoas</span>
          </header>
          <MemberCards members={mentors} />
        </div>
      </div>
    </section>
  )
}
