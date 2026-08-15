import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import CheckInTime from './components/sections/CheckInTime'
import AboutUs from './components/sections/AboutUs'
import CatBoarding from './components/sections/CatBoarding'
import DogKennels from './components/sections/DogKennels'
import WhatToPack from './components/sections/WhatToPack'
import Pricing from './components/sections/Pricing'
import Testimonials from './components/sections/Testimonials'
import BlogPreview from './components/sections/BlogPreview'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CheckInTime />
        <AboutUs />
        <div id="boarding"><CatBoarding /><DogKennels /></div>
        <WhatToPack />
        <Pricing />
        <Testimonials />
        <BlogPreview />
      </main>
      <Footer />
    </>
  )
}

export default App
