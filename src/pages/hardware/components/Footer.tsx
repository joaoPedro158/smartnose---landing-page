import { ArrowRight, ArrowUp, Activity } from 'lucide-react'

const FOOTER_LINKS = [
  { label: 'O que é', href: '#o-que-e' },
  { label: 'Problema', href: '#problema' },
  { label: 'Como funciona', href: '#solucao' },
  { label: 'Impacto', href: '#impacto' },
  { label: 'Equipe', href: '#equipe' },
]

export default function Footer() {
  const scrollToSection = (href: string) => {
    const section = document.querySelector(href)
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <footer className="hardware-footer" aria-label="Rodapé da página">
      <div className="hardware-footer__inner">
        <div className="hardware-footer__main">
          <div className="hardware-footer__brand">
            <a
              className="hardware-footer__brand-link"
              href="#hero"
              onClick={(event) => {
                event.preventDefault()
                scrollToSection('#hero')
              }}
              aria-label="SmartNose, voltar ao início"
            >
              <span className="hardware-footer__brand-mark" aria-hidden="true">
                <Activity size={20} strokeWidth={2.4} />
              </span>
              <span className="hardware-footer__brand-name">
                Smart<span>Nose</span>
              </span>
            </a>
            <p>
              Monitoramento inteligente por sensores olfativos e inteligência artificial.
            </p>
          </div>

          <nav className="hardware-footer__nav" aria-label="Navegação do rodapé">
            <p className="hardware-footer__label">Explorar</p>
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => {
                  event.preventDefault()
                  scrollToSection(link.href)
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hardware-footer__system">
            <p className="hardware-footer__label">Plataforma</p>
            <h2>Conheça o sistema que transforma dados em respostas.</h2>
            <a className="hardware-footer__cta" href="#/software">
              Conhecer o software
              <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="hardware-footer__bottom">
          <p>© {new Date().getFullYear()} SmartNose</p>
          <a
            className="hardware-footer__top"
            href="#hero"
            onClick={(event) => {
              event.preventDefault()
              scrollToSection('#hero')
            }}
          >
            Voltar ao topo
            <ArrowUp size={15} strokeWidth={2.5} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
