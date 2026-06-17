/* SiteFooter.tsx — Rodapé compartilhado entre as páginas */
export default function SiteFooter() {
  return (
    <footer className="bg-cesmvc-blue text-white/60 text-center py-8 text-xs">
      <p>
        © {new Date().getFullYear()} CESMVC – Centro de Especialização em Medicina
        Veterinária Coletiva · UFPR · Todos os direitos reservados.
      </p>
    </footer>
  )
}
