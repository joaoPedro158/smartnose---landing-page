import { ArrowUp, ArrowUpRight, Activity } from 'lucide-react'

const footerLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'O software', href: '#recursos' },
  { label: 'Análises', href: '#analises' },
  { label: 'Administração', href: '#administracao' },
]

export default function SoftwareFooter() {
  return (
    <footer className="software-footer" aria-label="Rodapé da página de software">
      <div className="software-footer__inner">
        <div className="software-footer__main">
          <div className="software-footer__brand">
            <a className="software-footer__brand-link" href="#inicio" aria-label="SmartNose — voltar ao início">
              <span className="software-footer__brand-mark" aria-hidden="true">
                <Activity size={20} strokeWidth={2.4} />
              </span>
              <span>smart<span>nose</span></span>
            </a>
            <p>Dados do SmartNose organizados para acompanhar, analisar e decidir.</p>
          </div>

          <nav className="software-footer__nav" aria-label="Navegação do rodapé">
            <p>Explorar</p>
            {footerLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="software-footer__hardware">
            <p>Conheça também</p>
            <h2>O dispositivo que reúne os dados.</h2>
            <a className="software-footer__cta" href="#/hardware">
              Conhecer o hardware
              <ArrowUpRight size={16} strokeWidth={2.5} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="software-footer__bottom">
          <p>© {new Date().getFullYear()} SmartNose</p>
          <a href="#inicio" className="software-footer__top">
            Voltar ao topo
            <ArrowUp size={15} strokeWidth={2.5} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
