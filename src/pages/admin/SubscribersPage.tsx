import { useEffect, useState } from 'react'
import { getToken } from '../../lib/api'
import AdminLayout from '../../components/admin/AdminLayout'

interface Subscriber {
  id: number
  email: string
  created_at: string
}

const API = '/api/admin/subscribers'

function authHeaders() {
  const token = getToken()
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [removingId, setRemovingId] = useState<number | null>(null)

  useEffect(() => {
    fetch(API, { headers: authHeaders() })
      .then((r) => {
        if (!r.ok) throw new Error()
        return r.json()
      })
      .then(setSubscribers)
      .catch(() => setError('Não foi possível carregar os inscritos.'))
      .finally(() => setLoading(false))
  }, [])

  async function handleRemove(sub: Subscriber) {
    if (!window.confirm(`Remover ${sub.email} da newsletter?`)) return
    setRemovingId(sub.id)
    try {
      const res = await fetch(`${API}/${sub.id}`, {
        method: 'DELETE',
        headers: authHeaders(),
      })
      if (!res.ok) throw new Error()
      setSubscribers((prev) => prev.filter((s) => s.id !== sub.id))
    } catch {
      setError('Falha ao remover o inscrito.')
    } finally {
      setRemovingId(null)
    }
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    })
  }

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-grift text-gray-900 font-bold text-2xl">Newsletter</h1>
          <p className="text-gray-500 text-sm mt-1">
            {loading ? '…' : `${subscribers.length} ${subscribers.length === 1 ? 'inscrito' : 'inscritos'}`}
          </p>
        </div>
      </div>

      {error && (
        <p className="text-cesmvc-orange-dark bg-cesmvc-orange/10 rounded-lg px-4 py-3 mb-6 text-sm">{error}</p>
      )}

      {loading ? (
        <p className="text-gray-500 py-16 text-center">Carregando…</p>
      ) : subscribers.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <p className="text-gray-400 text-sm">Nenhum inscrito ainda.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-gray-400 text-xs uppercase tracking-wider">
                <th className="px-5 py-3 font-semibold">E-mail</th>
                <th className="px-5 py-3 font-semibold hidden sm:table-cell">Inscrito em</th>
                <th className="px-5 py-3 font-semibold text-right">Ação</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((sub) => (
                <tr key={sub.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60">
                  <td className="px-5 py-4 text-gray-800 font-medium">{sub.email}</td>
                  <td className="px-5 py-4 text-gray-500 hidden sm:table-cell whitespace-nowrap">
                    {formatDate(sub.created_at)}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => handleRemove(sub)}
                      disabled={removingId === sub.id}
                      className="text-cesmvc-orange-dark hover:text-cesmvc-orange font-semibold px-3 py-1.5 rounded-lg hover:bg-cesmvc-orange/5 transition-colors disabled:opacity-50 text-sm"
                    >
                      {removingId === sub.id ? 'Removendo…' : 'Remover'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  )
}
