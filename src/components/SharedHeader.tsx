import { useCallback, useEffect, useState } from 'react'
import { Activity, ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react'

type HeaderPage = 'hardware' | 'software'

const linksByPage = {
  hardware: [
    { label: 'O QUE É', href: '#o-que-e' },
    { label: 'PROBLEMA', href: '#problema' },
    { label: 'SOLUÇÃO', href: '#solucao' },
    { label: 'IMPACTO', href: '#impacto' },
    { label: 'EQUIPE', href: '#equipe' },

  ],
  software: [
    { label: 'INÍCIO', href: '#inicio' },
    { label: 'O SOFTWARE', href: '#recursos' },
    { label: 'ANÁLISES', href: '#analises' },
    { label: 'ADMINISTRAÇÃO', href: '#administracao' },

  ],
} as const

export default function SharedHeader({ page }: { page: HeaderPage }) {
  const links = linksByPage[page]
  const [activeSection, setActiveSection] = useState(page === 'hardware' ? 'hero' : 'inicio')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const isSoftware = page === 'software'
  const ctaHref = isSoftware ? '#/hardware' : '#/software'
  const ctaLabel = isSoftware ? 'Ir para Hardware' : 'Ir para Software'

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20)
    for (const link of [...links].reverse()) {
      if ('external' in link) continue
      const id = link.href.slice(1)
      const element = document.getElementById(id)
      if (element && window.scrollY >= element.getBoundingClientRect().top + window.scrollY - 90) {
        setActiveSection(id)
        break
      }
    }
  }, [links])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [handleScroll])

  const navigate = (href: string, external = false) => {
    setMenuOpen(false)
    if (external) return
    const target = document.getElementById(href.slice(1))
    if (!target) return
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 64, behavior: 'smooth' })
  }

  return (
    <header id="header" className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-in-out ${scrolled ? 'bg-[rgba(5,8,14,0.95)] backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)]' : 'bg-[rgba(5,8,14,0.6)] backdrop-blur-sm border-b border-white/[0.06]'}`}>
      <div className="w-full max-w-[1280px] mx-auto px-8 h-16 flex items-center justify-between">
        <a href={isSoftware ? '#inicio' : '#hero'} onClick={e => { e.preventDefault(); navigate(isSoftware ? '#inicio' : '#hero') }} className="flex items-center gap-3 shrink-0 group" aria-label="SmartNose, início">
          <span className="relative flex items-center justify-center w-[46px] h-[46px] rounded-[8px] border border-white/10 transition-all duration-300 group-hover:border-primary/30 bg-white/[0.05]" style={{ boxShadow: '0 0 8px rgba(0,207,170,0.3)' }}>
            {isSoftware ? <Activity size={26} color="#00CFAA" aria-hidden="true" /> : <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-label="SmartNose logo"><rect x="4" y="9" width="28" height="18" rx="4" fill="#0d1f1a" stroke="#00CFAA" strokeWidth="1.2"/><circle cx="12" cy="18" r="2.5" fill="#00CFAA"/><circle cx="18" cy="18" r="2.5" fill="#0099CC"/><circle cx="24" cy="18" r="2.5" fill="#00E5C0"/><line x1="18" y1="9" x2="18" y2="5" stroke="#00CFAA" strokeWidth="1.2"/><circle cx="18" cy="4" r="1.2" fill="#00E5C0"/><path d="M7 27 Q10 24 13 27 M4 29 Q8.5 24 13 29" stroke="#00CFAA" strokeWidth="1" fill="none"/></svg>}
          </span>
          <span className="flex flex-col"><span className="font-jakarta font-extrabold text-[20px] text-white leading-none tracking-[-0.5px]">SmartNose</span><span className="font-mono font-bold text-[9px] uppercase tracking-[0.9px] leading-none mt-[3px] text-[#00E5C0]">E-NOSE TECH</span></span>
        </a>
        <nav id="desktop-nav" className="hidden lg:flex items-center gap-6" aria-label="Navegação principal">
          {links.map(link => {
            const section = 'external' in link ? '' : link.href.slice(1)
            const active = section !== '' && activeSection === section
            return <a key={link.href} href={link.href} onClick={e => { if (!('external' in link)) { e.preventDefault(); navigate(link.href) } }} aria-current={active ? 'page' : undefined} className={`relative font-jakarta font-bold text-[13px] uppercase tracking-[0.65px] whitespace-nowrap transition-colors duration-200 pb-1 ${active ? 'text-[#00E5C0]' : 'text-[#9CA3AF] hover:text-white'}`}>{link.label}<span className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full transition-all duration-300 ${active ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`} style={{ background: '#00E5C0' }}/></a>
          })}
        </nav>
        <div className="hidden lg:flex items-center shrink-0">
          <a href={ctaHref} onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-5 py-2.5 rounded-full font-jakarta font-bold text-[12px] uppercase tracking-[0.6px] text-[#020617] transition-all duration-300 hover:scale-[1.04] hover:brightness-110" style={{ background: 'linear-gradient(90deg,#00CFAA 0%,#0099CC 100%)', boxShadow: '0 0 25px -3px rgba(0,207,170,.35)' }}>{ctaLabel}<ArrowRight size={14}/></a>
        </div>
        <button id="btn-menu-mobile" type="button" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(v => !v)} className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-white/10 bg-white/[0.05] text-white transition-all duration-200 hover:bg-white/10">{menuOpen ? <X size={20}/> : <Menu size={20}/>}</button>
      </div>
      {menuOpen && <div id="mobile-menu" className="lg:hidden border-t border-white/[0.08]" style={{ background: 'rgba(5,8,14,.98)', backdropFilter: 'blur(16px)' }}><nav className="max-w-[1280px] mx-auto px-8 py-6 flex flex-col gap-1" aria-label="Navegação mobile">
        {links.map(link => { const external = 'external' in link; const section = external ? '' : link.href.slice(1); const active = section !== '' && activeSection === section; return <a key={link.href} href={link.href} onClick={e => { if (!external) { e.preventDefault(); navigate(link.href) } else setMenuOpen(false) }} aria-current={active ? 'page' : undefined} className={`flex items-center justify-between px-4 py-3.5 rounded-lg font-jakarta font-bold text-[13px] uppercase tracking-[0.65px] ${active ? 'text-[#00E5C0] bg-[rgba(0,229,192,0.08)]' : 'text-[#9CA3AF] hover:text-white hover:bg-white/[0.04]'}`}>{link.label}{active && <span className="w-1.5 h-1.5 rounded-full bg-[#00E5C0]"/>}</a> })}
        <div className="mt-4 pt-4 border-t border-white/[0.08]"><a href={ctaHref} onClick={() => setMenuOpen(false)} className="flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-full font-jakarta font-bold text-[13px] uppercase tracking-[0.6px] text-[#020617]" style={{ background: 'linear-gradient(90deg,#00CFAA 0%,#0099CC 100%)' }}>{ctaLabel}<ArrowRight size={16}/></a></div>
      </nav></div>}
    </header>
  )
}
