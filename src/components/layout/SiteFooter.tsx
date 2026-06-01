/* SiteFooter.tsx — Rodapé compartilhado entre as páginas */
export default function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-white/50 text-center py-8 text-xs">
      <p>
        © {new Date().getFullYear()} CESMVC – Centro de Especialização em Medicina
        Veterinária Coletiva · UFPR · Todos os direitos reservados.
      </p>
    </footer>
  )
}
