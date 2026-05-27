import Header       from './components/layout/Header'
import HeroSection  from './components/sections/HeroSection'
import CoursePillars from './components/sections/CoursePillars'
import Faculty      from './components/sections/Faculty'
import Testimonials from './components/sections/Testimonials'
import PricingInfo  from './components/sections/PricingInfo'

/*
  ─── IDs das seções (devem bater com os hrefs do Header) ───────
  #hero         → HeroSection
  #pilares      → CoursePillars
  #docentes     → Faculty
  #depoimentos  → Testimonials
  #valores      → PricingInfo
*/

function App() {
  return (
    <div className="relative min-h-screen bg-cesmvc-sand font-sans">
      {/* ── Fixed top navigation ── */}
      <Header />

      {/* ── Page sections in order ── */}
      <main>
        <HeroSection  />   {/* id="hero"        */}
        <CoursePillars />  {/* id="pilares"     */}
        <Faculty      />   {/* id="docentes"    */}
        <Testimonials />   {/* id="depoimentos" */}
        <PricingInfo  />   {/* id="valores"     */}
      </main>

      {/* ── Footer minimal ── */}
      <footer className="bg-gray-900 text-white/50 text-center py-8 text-xs">
        <p>
          © {new Date().getFullYear()} CESMVC – Centro de Especialização em Medicina
          Veterinária Coletiva · UFPR · Todos os direitos reservados.
        </p>
      </footer>
    </div>
  )
}

export default App