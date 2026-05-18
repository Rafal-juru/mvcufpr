import Header from './components/layout/Header'
import HeroSection from './components/sections/HeroSection'
import CoursePillars from './components/sections/CoursePillars'

// Componentes que vamos criar na Parte 2:
// import Faculty from './components/sections/Faculty'
// import Testimonials from './components/sections/Testimonials'
// import BlogSection from './components/sections/BlogSection'
// import PricingInfo from './components/sections/PricingInfo'
// import FloatingCTA from './components/ui/FloatingCTA'

function App() {
  return (
    <div className="relative min-h-screen bg-cesmvc-sand font-sans">
      {/* Fixed top navigation */}
      <Header />

      {/* Page sections in order */}
      <main>
        <HeroSection />
        <CoursePillars />

        {/*
        <Faculty />
        <Testimonials />
        <BlogSection />
        <PricingInfo />
        */}
      </main>

      {/* Fixed WhatsApp CTA */}
      {/* <FloatingCTA /> */}
    </div>
  )
}

export default App