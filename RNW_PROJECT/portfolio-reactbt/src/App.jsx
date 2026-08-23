import { ThemeProvider } from './context/ThemeContext'
import { LenisProvider } from './context/LenisContext'
import Header from './components/Header/Header'
import TechStackSlider from './components/TechStackSlider/TechStackSlider'
import Work from './components/Work/Work'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import MarqueeStrip from './components/common/MarqueeStrip'
import Hero from './components/Hero/Hero'

function App() {
  return (
    <ThemeProvider>
      <LenisProvider>
        <Header />

        <main style={{ paddingTop: '84px' }}>
          <Hero />
          <TechStackSlider />
          <MarqueeStrip />
          <Work />
          <Contact />
        </main>

        <Footer />
      </LenisProvider>
    </ThemeProvider>
  )
}

export default App
