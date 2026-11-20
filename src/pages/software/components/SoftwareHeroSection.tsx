import { House } from 'lucide-react'

export default function SoftwareHeroSection() {
  return (
    <section className="software-hero" id="inicio" aria-labelledby="software-hero-title">
      <div className="software-hero__copy">
        <h1 id="software-hero-title">Acompanhamento em tempo real <span>e na palma da mão.</span></h1>
        <p className="software-hero__description">Acompanhe cada variação dos sensores, entenda o processo e tome decisões com mais segurança — de onde estiver.</p>
        <div className="software-hero__actions">
          <a className="software-button software-button--primary" href="#recursos">Conhecer dispositivo</a>
        </div>
      </div>
    </section>
  )
}

