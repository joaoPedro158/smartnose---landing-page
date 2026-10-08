import './App.css'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import ProblemaSection from './components/ProblemaSection'
import OQueESection from './components/OQueESection'

function App() {
  return (
    <main className="min-h-screen bg-brand-dark overflow-hidden">
      <Header />
      <HeroSection />
      <OQueESection />
      <ProblemaSection />
    </main>
  )
}

export default App
