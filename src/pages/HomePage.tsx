import Header           from '../components/layout/Header'
import Footer           from '../components/layout/Footer'
import HeroSection      from '../components/sections/HeroSection'
import AboutCourse      from '../components/sections/AboutCourse'
import CoursePillars    from '../components/sections/CoursePillars'
import Faculty          from '../components/sections/Faculty'
import Testimonials     from '../components/sections/Testimonials'
import PricingInfo      from '../components/sections/PricingInfo'
import BlogSection      from '../components/sections/BlogSection'
import NewsletterSection from '../components/sections/NewsletterSection'
import WhatsAppButton   from '../components/ui/WhatsAppButton'

/*
  ─── IDs das seções (devem bater com os hrefs do Header) ───────
  #hero             → HeroSection
  #sobre-o-curso    → AboutCourse
  #pilares          → CoursePillars
  #docentes         → Faculty
  #depoimentos      → Testimonials
  #investimento     → PricingInfo
*/

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-cesmvc-sand font-sans">
      {/* ── Fixed top navigation ── */}
      <Header />

      {/* ── Page sections in order ── */}
      <main>
        <HeroSection  />   {/* id="hero"            */}
        <div className="w-full h-[2px] bg-gradient-to-r from-[#0B281E] via-[#2E6F57] to-[#F9E8C7]" />
        <AboutCourse  />   {/* id="sobre-o-curso"   */}
        <CoursePillars />  {/* id="pilares"         */}
        <Faculty      />   {/* id="docentes"        */}
        <Testimonials />   {/* id="depoimentos"     */}
        <PricingInfo  />   {/* id="valores"         */}
        <BlogSection     />   {/* id="blog"            */}
        <NewsletterSection />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
