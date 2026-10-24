import { useEffect, useState } from 'react'
import { ArrowUpRight, Activity, Menu } from 'lucide-react'
import softwareHero from './img/hero_2.png'
import SoftwareHeroSection from './components/SoftwareHeroSection'
import SoftwareDemoSection from './components/SoftwareDemoSection'
import './styles/software.css'

const navigation = ['Início', 'O software', 'Recursos', 'Contato']

export default function SoftwareLandingPage() {
  const [headerSolid, setHeaderSolid] = useState(false)

  useEffect(() => {
    const updateHeader = () => {
      const hero = document.getElementById('inicio')
      const header = document.querySelector('.software-header')
      const exitPoint = Math.max(0, (hero?.offsetHeight ?? window.innerHeight) - (header?.getBoundingClientRect().height ?? 72))
      setHeaderSolid(window.scrollY >= exitPoint)
    }

    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    window.addEventListener('resize', updateHeader)
    return () => {
      window.removeEventListener('scroll', updateHeader)
      window.removeEventListener('resize', updateHeader)
    }
  }, [])

  return (
    <main className="software-page">
      <div className="software-page__image" aria-hidden="true"><img src={softwareHero} alt="" /></div>
      <div className="software-page__image-glow" aria-hidden="true" />
      <header className={`software-header${headerSolid ? ' is-scrolled' : ''}`}>
        <a className="software-brand" href="#inicio" aria-label="SmartNose — início"><span className="software-brand__mark" aria-hidden="true"><Activity size={19} strokeWidth={2.4} /></span><span>smart<span>nose</span></span></a>
        <nav className="software-nav" aria-label="Navegação principal"><a href="#/hardware">Hardware</a>{navigation.map((item, index) => <a href={index === 0 ? '#inicio' : index === 2 ? '#novidades' : '#'} key={item} aria-current={index === 0 ? 'page' : undefined}>{item}</a>)}</nav>
        <a className="software-header__cta" href="#">Acessar plataforma <ArrowUpRight size={15} aria-hidden="true" /></a>
        <button className="software-header__menu" type="button" aria-label="Abrir menu"><Menu size={22} aria-hidden="true" /></button>
      </header>
      <SoftwareHeroSection />
      <SoftwareDemoSection />
    </main>
  )
}
