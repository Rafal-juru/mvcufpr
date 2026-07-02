import type { BlogPost, BlogPostInput, AuthSession } from '../types'
import { mockStore } from './mockStore'

/*
  ─────────────────────────────────────────────────────────────────────────
  Cliente de API do blog.

  Backend real em PHP/MySQL (server/public/api, ver backend-php/), mesmo
  domínio, prefixo /api — sem CORS. Se `VITE_USE_MOCK=true` no `.env`, o
  cliente opera em modo MOCK (localStorage) para desenvolvimento sem backend.

    Público
      GET  /api/posts                 → BlogPost[]  (apenas publicados)
      GET  /api/posts/{slug}          → BlogPost

    Admin (requer header Authorization: Bearer <token>)
      POST /api/auth/login            → { token, user }      body: { email, password }
      GET  /api/admin/posts           → BlogPost[]  (todos, inclusive rascunhos)
      GET  /api/admin/posts/{id}      → BlogPost
      POST /api/admin/posts           → BlogPost              body: BlogPostInput
      PUT  /api/admin/posts/{id}      → BlogPost              body: BlogPostInput
      DELETE /api/admin/posts/{id}    → 204 No Content
  ─────────────────────────────────────────────────────────────────────────
*/

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'
const API_BASE = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : `${import.meta.env.BASE_URL}api`
const TOKEN_KEY = 'cesmvc.blog.token'

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

function setToken(token: string | null): void {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  else localStorage.removeItem(TOKEN_KEY)
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken()
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })

  if (!res.ok) {
    let message = `Erro ${res.status}`
    try {
      const body = await res.json()
      if (body?.message) message = body.message
    } catch {
      /* resposta sem corpo JSON */
    }
    throw new Error(message)
  }

  if (res.status === 204) return undefined as T
  return res.json() as Promise<T>
}

/* ── API pública e administrativa do blog ── */
export const blogApi = {
  listPublished(): Promise<BlogPost[]> {
    if (USE_MOCK) return mockStore.listPublished()
    return request<BlogPost[]>('/posts')
  },

  getBySlug(slug: string): Promise<BlogPost | null> {
    if (USE_MOCK) return mockStore.getBySlug(slug)
    return request<BlogPost>(`/posts/${encodeURIComponent(slug)}`).catch(() => null)
  },

  listAll(): Promise<BlogPost[]> {
    if (USE_MOCK) return mockStore.listAll()
    return request<BlogPost[]>('/admin/posts')
  },

  getById(id: number): Promise<BlogPost | null> {
    if (USE_MOCK) return mockStore.getById(id)
    return request<BlogPost>(`/admin/posts/${id}`).catch(() => null)
  },

  create(input: BlogPostInput): Promise<BlogPost> {
    if (USE_MOCK) return mockStore.create(input)
    return request<BlogPost>('/admin/posts', {
      method: 'POST',
      body: JSON.stringify(input),
    })
  },

  update(id: number, input: BlogPostInput): Promise<BlogPost> {
    if (USE_MOCK) return mockStore.update(id, input)
    return request<BlogPost>(`/admin/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(input),
    })
  },

  remove(id: number): Promise<void> {
    if (USE_MOCK) return mockStore.remove(id)
    return request<void>(`/admin/posts/${id}`, { method: 'DELETE' })
  },
}

/* ── Autenticação do painel admin ── */
export const authApi = {
  async login(email: string, password: string): Promise<AuthSession> {
    const session = USE_MOCK
      ? await mockStore.login(email, password)
      : await request<AuthSession>('/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
        })
    setToken(session.token)
    return session
  },

  logout(): void {
    setToken(null)
    if (USE_MOCK) mockStore.logout()
  },

  /** Sessão persistida localmente (modo mock) ou apenas o token (API real). */
  currentSession(): AuthSession | null {
    if (USE_MOCK) return mockStore.getSession()
    const token = getToken()
    return token ? { token, user: { id: 0, name: 'Admin', email: '' } } : null
  },
}
